import { NotFoundException } from '@nestjs/common';
import { RoleEntity } from '../entities/role.entity';

export class RolesDTO {
  readonly SUPERADMIN: RoleEntity;
  readonly ADMIN: RoleEntity;
  readonly CLIENT: RoleEntity;

  constructor(SUPERADMIN: RoleEntity, ADMIN: RoleEntity, CLIENT: RoleEntity) {
    this.SUPERADMIN = SUPERADMIN;
    this.ADMIN = ADMIN;
    this.CLIENT = CLIENT;
  }

  findRoleById(idRole: number) {
    switch (idRole) {
      case this.SUPERADMIN.id:
        return this.SUPERADMIN;
      case this.ADMIN.id:
        return this.ADMIN;
      case this.CLIENT.id:
        return this.CLIENT;
      default:
        throw new NotFoundException();
    }
  }
}
