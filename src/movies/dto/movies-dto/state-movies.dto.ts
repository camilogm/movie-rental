import { StateMovieEntity } from 'src/movies/entities/state-movie.entity';

export class StateMoviesDTO {
  RENT: StateMovieEntity;
  BUY: StateMovieEntity;
  DELAYED: StateMovieEntity;
  RETURNED: StateMovieEntity;
}
