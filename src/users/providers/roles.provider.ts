import { getConnectionToken } from '@nestjs/typeorm';
import { ROLES_PROVIDER } from '../../constants';
import { Connection } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';

export const RolesDBProvider = {
  provide: ROLES_PROVIDER,
  useFactory: async (connection: Connection) => {
    const RolesRepo = connection.getRepository(RoleEntity);
    const [SUPERADMIN, ADMIN, CLIENT] = await RolesRepo.find();
    const roles = {
      SUPERADMIN,
      ADMIN,
      CLIENT,
    };
    return roles;
  },
  inject: [getConnectionToken()],
};
