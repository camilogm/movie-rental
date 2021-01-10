import { StateMovieEntity } from 'src/rent-buy-movies/entities/state-movie.entity';

export class StateMoviesDTO {
  RENT: StateMovieEntity;
  BUY: StateMovieEntity;
  DELAYED: StateMovieEntity;
  RETURNED: StateMovieEntity;

  constructor(
    RENT: StateMovieEntity,
    BUY: StateMovieEntity,
    DELAYED: StateMovieEntity,
    RETURNED: StateMovieEntity,
  ) {
    this.RENT = RENT;
    this.BUY = BUY;
    this.DELAYED = DELAYED;
    this.RETURNED = RETURNED;
  }
}
