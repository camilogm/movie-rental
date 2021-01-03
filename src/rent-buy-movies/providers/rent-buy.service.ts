import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from '../../users/providers/accounts.service';
import { Repository } from 'typeorm';
import { CreateRentBuy } from '../dto/create-rent-buy.dto';
import { RentBuyEntity } from '../entities/rent-buy.entity';
import { MoviesService } from '../../movies/providers/movies.service';
import * as moment from 'moment';
import { BUY_OPERATION, STATES_MOVIES_PROVIDER } from '../../constants';
import { StateMoviesDTO } from '../dto/state-movies.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class RentBuyService {
  constructor(
    private readonly mailService: MailerService,
    private readonly userService: AccountsService,
    private readonly moviesService: MoviesService,
    @InjectRepository(RentBuyEntity)
    private readonly rentBuyRepository: Repository<RentBuyEntity>,
    @Inject(STATES_MOVIES_PROVIDER)
    private readonly stateMovies: StateMoviesDTO,
  ) {}

  getBuyRentData(salePrice: number, daysRent: number, typeOperation: string) {
    //this allows to know wich operations is implemented /BUY or /RENT
    const state =
      typeOperation === BUY_OPERATION
        ? this.stateMovies.BUY
        : this.stateMovies.RENT;

    const price =
      typeOperation === BUY_OPERATION ? salePrice : salePrice * 0.25 * daysRent;

    const returnDate =
      typeOperation === BUY_OPERATION
        ? null
        : moment().add(daysRent, 'days').format();

    return {
      price,
      returnDate,
      state,
    };
  }

  async getMovieRentedByClientId(userId: number) {
    const movieRented = await this.rentBuyRepository.findOne({
      where: {
        user: userId,
        state: this.stateMovies.RENT,
      },
      relations: ['movie'],
    });

    return movieRented;
  }

  async rentOrBuyBuilder(
    clientId: number,
    rentMovieDTO: CreateRentBuy,
    typeOperation: string,
  ) {
    const [user, movie] = await Promise.all([
      this.userService.findOneById(clientId),
      this.moviesService.findOneById(rentMovieDTO.movieId),
    ]);

    if (movie.stock === 0)
      throw new ConflictException('There are not enough stock for this movie');

    rentMovieDTO.daysRent = rentMovieDTO.daysRent ? rentMovieDTO.daysRent : 3;
    const operationTypes = this.getBuyRentData(
      movie.salePrice,
      rentMovieDTO.daysRent,
      typeOperation,
    );

    return this.rentBuyRepository.create({
      movie,
      user,
      transactionDate: moment().format(),
      ...operationTypes,
    });
  }

  async rentBuyTransaction(
    clientId: number,
    rentMovieDTO: CreateRentBuy,
    typeOperation: string,
  ) {
    const [detail, userRentedMovie] = await Promise.all([
      this.rentOrBuyBuilder(clientId, rentMovieDTO, typeOperation),
      this.getMovieRentedByClientId(clientId),
    ]);

    if (typeOperation !== BUY_OPERATION && userRentedMovie)
      throw new ConflictException('Client has a movie in possesion already');

    await this.moviesService.updateByEntity(detail.movie, {
      stock: detail.movie.stock - 1,
    });

    const invoiceSaved = await this.rentBuyRepository.save(detail);
    this.sendFacture(detail?.user, invoiceSaved, typeOperation);
    return invoiceSaved;
  }

  async returnRentedMovie(clientId: number) {
    const movieRented = await this.getMovieRentedByClientId(clientId);

    if (!movieRented || !movieRented?.movie)
      throw new ConflictException(`Client doesn't have a movie rented`);

    movieRented.state = this.stateMovies.RETURNED;

    //only returns the movie to the stock if the client returns it
    await this.moviesService.updateByEntity(movieRented.movie, {
      stock: movieRented.movie.stock + 1,
    });

    const detail = await this.rentBuyRepository.save(movieRented);

    return detail;
  }

  async buyRentedMovie(clientId: number) {
    const movieRented = await this.getMovieRentedByClientId(clientId);

    if (!movieRented || !movieRented?.movie)
      throw new ConflictException(`Client doesn't have a movie rented`);

    movieRented.state = this.stateMovies.BUY;

    const detail = await this.rentOrBuyBuilder(
      clientId,
      {
        movieId: movieRented.movie.id,
      },
      BUY_OPERATION,
    );

    await this.rentBuyRepository.save(movieRented);

    const invoiceSaved = await this.rentBuyRepository.save(detail);
    this.sendFacture(detail?.user, invoiceSaved, BUY_OPERATION);
    return detail;
  }

  sendFacture(user: UserEntity, detail: RentBuyEntity, typeOperation: string) {
    const subject = 'Thanks for prefer us! Transaction completed';
    const description =
      (typeOperation === BUY_OPERATION
        ? 'Purchase of the movie : '
        : 'Rent of the movie : ') + detail?.movie?.title;

    this.mailService.sendMail({
      to: user?.email,
      from: 'noreply@movierental.com',
      subject,
      template: 'purchase',
      context: {
        user,
        detail,
        description,
      },
    });

    return true;
  }
}
