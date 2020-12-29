import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { OWN_PROFILE_CHAGNES } from 'src/common/decorators/authorization.decorator';
import { LoginDTO } from '../dto/login.dto';
import { PayloadDTO } from '../dto/payload.dto';

@Injectable()
export class OwnProfileChangesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const ownProfileChanges = this.reflector.get<boolean>(
      OWN_PROFILE_CHAGNES,
      context.getHandler(),
    );

    if (!ownProfileChanges) return true;

    const user = request.user as PayloadDTO;
    const credentials = request.body as LoginDTO;
    const matchUser = user.username === credentials.username;

    if (matchUser) return true;

    throw new ForbiddenException();
  }
}
