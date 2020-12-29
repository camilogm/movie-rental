import { RoleEntity } from '../entities/role.entity';

export class RolesDTO {
  readonly SUPERADMIN: RoleEntity;
  readonly ADMIN: RoleEntity;
  readonly CLIENT: RoleEntity;
}
