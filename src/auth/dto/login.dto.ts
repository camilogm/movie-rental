import { IsString, Length } from 'class-validator';

export class LoginDTO {
  @IsString()
  @Length(2, 20)
  username: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
