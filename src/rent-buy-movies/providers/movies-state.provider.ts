import { getConnectionToken } from '@nestjs/typeorm';
import { STATES_MOVIES_PROVIDER } from '../../constants';
import { Connection } from 'typeorm';
import { StateMovieEntity } from '../entities/state-movie.entity';

export const MoviesStatesProviders = {
  provide: STATES_MOVIES_PROVIDER,
  useFactory: async (connection: Connection) => {
    const RolesRepo = connection.getRepository(StateMovieEntity);
    const [RENT, BUY, DELAYED, RETURNED] = await RolesRepo.find();
    const roles = {
      RENT,
      BUY,
      DELAYED,
      RETURNED,
    };
    return roles;
  },
  inject: [getConnectionToken()],
};
