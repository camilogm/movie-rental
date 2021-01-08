import { PartialType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { LoginDTO } from '../../../auth/dto/login.dto';

export class changePasswordDTO extends PartialType(LoginDTO) {
  @IsString()
  @Length(8, 16)
  newPassword: string;
}
