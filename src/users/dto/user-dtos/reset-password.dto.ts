import { PartialType } from '@nestjs/swagger';
import { LoginDTO } from '../../../auth/dto/login.dto';

export class ResetPasswordDTO extends PartialType(LoginDTO) {}
