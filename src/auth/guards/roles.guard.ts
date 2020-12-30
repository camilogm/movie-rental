import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ALL_ROLES,
  USER_ROLES,
} from '../../common/decorators/authorization.decorator';
import { Connection } from 'typeorm';
import { PayloadDTO } from '../dto/payload.dto';
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
    const allowedRoles = rolesMetaData.length ? rolesMetaData : ALL_ROLES;

    //extracts the token to check if exists into the database
    const bearerToken = request.headers.authorization
      .toString()
      .replace('Bearer ', '');
    await this.checkToken(bearerToken);

    //jwtguard set request.user and contains the user role
    const user: PayloadDTO = request.user;

    if (allowedRoles.includes(user?.userRole)) return true;

    throw new ForbiddenException(
      `You don't have access to this resource. Ask to an administrator to get permissions`,
    );
  }

  async checkToken(tokenStr: string): Promise<boolean> {
    const tokenRepository = this.connection.getRepository(TokenEntity);
    const token = await tokenRepository.findOne({
      token: tokenStr,
    });
    if (token) return true;

    throw new ForbiddenException('Invalid token');
  }
}
