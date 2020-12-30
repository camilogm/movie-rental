import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from '../../users/providers/accounts.service';
import { Repository } from 'typeorm';
import { CreateRentBuy } from '../dto/movies-dto/create-rent-buy.dto';
import { RentBuyEntity } from '../entities/rent-buy.entity';
import { MoviesService } from './movies.service';
import * as moment from 'moment';
import { BUY_OPERATION, STATES_MOVIES_PROVIDER } from '../../constants';
import { StateMoviesDTO } from '../dto/movies-dto/state-movies.dto';

@Injectable()
export class RentBuyService {
  constructor(
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

  async operation(
    clientId: number,
    rentMovieDTO: CreateRentBuy,
    typeOperation: string,
  ) {
    const user = await this.userService.findOneById(clientId);
    const movie = await this.moviesService.findOneById(rentMovieDTO.movieId);

    if (
      typeOperation !== BUY_OPERATION &&
      (await this.getMovieRentedByClientId(user.id))
    )
      throw new ConflictException('Client already has a movie in possesion');

    if (movie.stock === 0)
      throw new ConflictException('There are not enough stock for this movie');

    rentMovieDTO.daysRent = rentMovieDTO.daysRent ? rentMovieDTO.daysRent : 3;
    const operationTypes = this.getBuyRentData(
      movie.salePrice,
      rentMovieDTO.daysRent,
      typeOperation,
    );

    const rentBuyMovieData = this.rentBuyRepository.create({
      movie,
      user,
      transactionDate: moment().format(),
      ...operationTypes,
    });

    //updating stock, substract one
    await this.moviesService.updateByEntity(movie, {
      stock: movie.stock - 1,
    });

    return await this.rentBuyRepository.save(rentBuyMovieData);
  }

  async returnOrBuyMovieRented(clientId: number, typeOperation: string) {
    const movieRented = await this.getMovieRentedByClientId(clientId);

    if (!movieRented || !movieRented?.movie)
      throw new ConflictException(`Client doesn't have a movie rented`);

    movieRented.state =
      typeOperation === BUY_OPERATION
        ? this.stateMovies.BUY
        : this.stateMovies.RETURNED;

    //only returns the movie to the stock if the client returns it
    if (typeOperation !== BUY_OPERATION)
      await this.moviesService.updateByEntity(movieRented.movie, {
        stock: movieRented.movie.stock++,
      });

    return await this.rentBuyRepository.save(movieRented);
  }
}
