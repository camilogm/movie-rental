import { StateMovieEntity } from 'src/rent-buy-movies/entities/state-movie.entity';

export class StateMoviesDTO {
  RENT: StateMovieEntity;
  BUY: StateMovieEntity;
  DELAYED: StateMovieEntity;
  RETURNED: StateMovieEntity;
}
