import { Role } from '../entities/role.entity';

export class RolesDTO {
  readonly SUPERADMIN: Role;
  readonly ADMIN: Role;
  readonly CLIENT: Role;
}
