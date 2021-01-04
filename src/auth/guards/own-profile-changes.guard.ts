import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OWN_PROFILE_CHAGNES } from '../../common/decorators/authorization.decorator';
import { AuthService } from '../auth.service';
import { LoginDTO } from '../dto/login.dto';
import { PayloadDTO } from '../dto/payload.dto';

@Injectable()
export class OwnProfileChangesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const ownProfileChanges = this.reflector.get<boolean>(
      OWN_PROFILE_CHAGNES,
      context.getHandler(),
    );
    const credentials: LoginDTO = request.body;

    if (!ownProfileChanges) return true;
    if (!credentials || !credentials?.username || !credentials?.password)
      throw new BadRequestException(
        'You must add username and password to do this action',
      );

    const user: PayloadDTO = request.user;

    const matchUser =
      (await this.authService.validateUser(credentials)) &&
      user?.username === credentials?.username;

    if (matchUser) return true;

    throw new ForbiddenException('Your credentials are wrong');
  }
}
