import { getConnectionToken } from '@nestjs/typeorm';
import { ROLES_PROVIDER } from '../../constants';
import { Connection } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { RolesDTO } from '../dto/roles.dto';

export const RolesDBProvider = {
  provide: ROLES_PROVIDER,
  useFactory: async (connection: Connection) => {
    const RolesRepo = connection.getRepository(RoleEntity);
    const [SUPERADMIN, ADMIN, CLIENT] = await RolesRepo.find();
    const roles = new RolesDTO(SUPERADMIN, ADMIN, CLIENT);
    return roles;
  },
  inject: [getConnectionToken()],
};
