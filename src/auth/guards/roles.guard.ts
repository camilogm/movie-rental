import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ALL_ROLES,
  OVERRIDE_ROLES,
  USER_ROLES,
} from '../../common/decorators/authorization.decorator';
import { Connection } from 'typeorm';
import { TokenEntity } from '../entities/token.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private connection: Connection,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = request.isPublic;

    // isPublic constant is defined in jwt Auth Guard, the fist guard in the Chain
    if (isPublic) return true;

    const metaDataRoles = this.getAllowedRoles(context);
    const allowedRoles = metaDataRoles;

    //extracts the token to check if exists into the database
    const bearerToken = request.headers.authorization
      .toString()
      .replace('Bearer ', '');

    const userRole = await this.getRoleIfTokenExists(bearerToken);

    //jwtguard set request.user and contains the user role

    if (allowedRoles.includes(userRole)) return true;

    throw new ForbiddenException(
      `You don't have access to this resource. Ask to an administrator to get permissions`,
    );
  }

  getAllowedRoles(context: ExecutionContext): string[] {
    //Get if has override roles
    const overrideRolesMetadata = this.reflector.get<string[]>(
      OVERRIDE_ROLES,
      context.getHandler(),
    );

    //If has a override of roles allowd, return that if not, search
    // the metadata roles
    if (overrideRolesMetadata) return overrideRolesMetadata;

    //get roles in metada controller if the controller has
    const rolesMetaDataController = this.reflector.get<string[]>(
      USER_ROLES,
      context.getClass(),
    );

    //get roles in the handler if the handler has
    const rolesMetadataHandler = this.reflector.get<string[]>(
      USER_ROLES,
      context.getHandler(),
    );

    //merge both results to get all of the roles allowed
    const rolesMetaData = []
      .concat(rolesMetaDataController ? rolesMetaDataController : [])
      .concat(rolesMetadataHandler ? rolesMetadataHandler : []);

    //if not roles metadata in none, allowed to all roles

    return rolesMetaData?.length ? rolesMetaData : ALL_ROLES;
  }

  async getRoleIfTokenExists(tokenStr: string): Promise<string> {
    const token = await this.connection
      .createQueryBuilder(TokenEntity, 'tokens')
      .leftJoinAndSelect('tokens.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .where('tokens.token = :token', { token: tokenStr })
      .getOne();

    if (token) return token.user?.role?.name;

    throw new ForbiddenException('Invalid token');
  }
}
