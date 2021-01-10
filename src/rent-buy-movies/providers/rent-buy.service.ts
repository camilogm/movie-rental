import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from '../../users/providers/accounts.service';
import { Repository } from 'typeorm';
import { RentMovieDTO } from '../dto/rent.dto/rent-movie.dto';
import { InvoiceDetailEntity } from '../entities/invoice-detail.entity';
import { MoviesService } from '../../movies/providers/movies.service';
import * as moment from 'moment';
import {
  BUY_OPERATION,
  RENT_OPERATION,
  STATES_MOVIES_PROVIDER,
} from '../../constants';
import { StateMoviesDTO } from '../dto/state-movies.dto';
import { InvoiceEntity } from '../entities/invoice.entity';
import { BuyMovieDTO } from '../dto/buy-dto/buy-a-movie.dto';
import { plainToClass } from 'class-transformer';
import { MailerCustomService } from '../../mailer/mailer.service';

@Injectable()
export class RentBuyService {
  constructor(
    private readonly mailService: MailerCustomService,
    private readonly userService: AccountsService,
    private readonly moviesService: MoviesService,
    @InjectRepository(InvoiceDetailEntity)
    private readonly invoiceDetailRepository: Repository<InvoiceDetailEntity>,
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
    @Inject(STATES_MOVIES_PROVIDER)
    private readonly stateMovies: StateMoviesDTO,
  ) {}

  async builderDetail(rentMovieDTO: RentMovieDTO, typeOperation: string) {
    const movie = await this.moviesService.findOneById(rentMovieDTO.movieId);

    const enoughStock = movie.stock >= rentMovieDTO.quantity;
    const isBuyOperation = typeOperation === BUY_OPERATION;

    if (!enoughStock)
      throw new ConflictException(
        `There are not enough stock for the movie ${movie?.title} with id ${movie?.id}`,
      );

    const daysRent = isBuyOperation ? null : rentMovieDTO.daysRent;

    const state = isBuyOperation ? this.stateMovies.BUY : this.stateMovies.RENT;
    const price =
      (isBuyOperation ? movie.salePrice : movie.salePrice * 0.1 * daysRent) *
      rentMovieDTO.quantity;

    const returnDate = isBuyOperation
      ? null
      : moment().add(daysRent, 'days').format();

    return this.invoiceDetailRepository.create({
      movie,
      state,
      price,
      returnDate,
      quantity: rentMovieDTO.quantity,
    });
  }

  async invoiceDetailsBuilder(
    moviesDetail: RentMovieDTO[],
    typeOperation: string,
  ) {
    if (!moviesDetail?.length)
      return {
        details: [],
        subTotal: 0,
      };

    const detailsPromise = moviesDetail.map((buyRentDTo) =>
      this.builderDetail(buyRentDTo, typeOperation),
    );

    const details = await Promise.all(detailsPromise);
    const total = details.reduce((acc, curr) => acc + curr?.price, 0);

    const updatedMovies = details.map((detail) => {
      detail.movie.stock = detail.movie.stock - detail.quantity;
      return detail.movie;
    });

    await this.moviesService.updateManyByEntity(updatedMovies);
    return {
      details,
      subTotal: total,
    };
  }

  async buyRentMovies(
    clientId: number,
    purchaseDetails: BuyMovieDTO[] = [],
    rentMoviesDetails: RentMovieDTO[] = [],
  ) {
    const boughtMovieDetails = plainToClass(RentMovieDTO, purchaseDetails);

    if (purchaseDetails?.length && rentMoviesDetails?.length)
      throw new BadRequestException(
        'Currently you cannot buy and rent at the same time',
      );

    if (!purchaseDetails.length && !rentMoviesDetails.length)
      throw new BadRequestException('Must add movies to do the operation');

    const [user, detailsPurchase, detailsRent] = await Promise.all([
      this.userService.findOneById(clientId),
      this.invoiceDetailsBuilder(boughtMovieDetails, BUY_OPERATION),
      this.invoiceDetailsBuilder(rentMoviesDetails, RENT_OPERATION),
    ]);

    const { details: boughtDetails, subTotal: bougthSubotal } = detailsPurchase;
    const { details: rentDetails, subTotal: rentSubtotal } = detailsRent;

    const transactionDate = moment().format();
    const details = boughtDetails.concat(...rentDetails);
    const total = bougthSubotal + rentSubtotal;

    const invoiceData = this.invoiceRepository.create({
      details,
      total,
      transactionDate,
      user,
    });

    const invoice = await this.invoiceRepository.save(invoiceData);

    this.mailService.sendMail({
      to: user?.email,
      from: 'noreply@movierental.com',
      subject: 'Thanks for prefer us! Transaction completed',
      template: 'purchase',
      context: {
        user,
        invoice,
        boughtDetails,
        rentDetails,
        buySubTotal: invoice.total,
      },
    });

    return invoice;
  }

  async addLikeToMovie(clientId: number, movieId: number) {
    const [movie, user] = await Promise.all([
      this.moviesService.findOneById(movieId, false, true),
      this.userService.findOneById(clientId),
    ]);

    movie.likes?.push(user);
    await this.moviesService.updateByEntity(movie, {});
    return true;
  }

  async removeLikeToMovie(clientId: number, movieId: number) {
    const movie = await this.moviesService.findOneById(movieId, false, true);

    movie.likes = movie.likes?.filter((user) => user.id !== clientId);

    await this.moviesService.updateByEntity(movie, {});
    return true;
  }

  async returnMovies(clientId: number, invoiceId: number) {
    const rentedDetails = await this.invoiceRepository
      .createQueryBuilder('invoices')
      .select()
      .leftJoinAndSelect('invoices.details', 'details')
      .where('invoices.id = :invoiceId', { invoiceId })
      .andWhere('invoices.userId = :userId', { userId: clientId })
      .andWhere('details.stateId = :stateId', {
        stateId: this.stateMovies.RENT.id,
      })
      .getOne();

    if (!rentedDetails)
      throw new ConflictException(
        `It seems that the invoice with Id ${invoiceId} could no reached by you, probabbly doesn't exist`,
      );

    rentedDetails.details = rentedDetails.details.map((detail) => {
      detail.state = this.stateMovies.RETURNED;
      return detail;
    });

    await this.invoiceRepository.save(rentedDetails);
  }

  async getMyInvoices(clientId: number) {
    const invoices = await this.invoiceRepository.find({
      where: { user: clientId },
    });

    return invoices;
  }

  async getInvoiceDetail(clientId: number, invoiceId: number) {
    const invoice = await this.invoiceRepository
      .createQueryBuilder('invoices')
      .select()
      .leftJoinAndSelect('invoices.details', 'details')
      .leftJoinAndSelect('details.state', 'state')
      .leftJoinAndSelect('invoices.user', 'user')
      .where('invoices.id = :invoiceId', { invoiceId })
      .andWhere('user.id = :clientId', { clientId })
      .getOne();

    if (!invoice)
      throw new BadRequestException(
        `It seems the invoice ${invoiceId} doesn't exist or doesn't belong to you`,
      );

    return invoice;
  }
}
