import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 30)
  @IsString()
  firstName: string;

  @Length(2, 30)
  @IsString()
  lastName: string;

  @Length(2, 20)
  @IsString()
  userName: string;

  @Length(1, 50)
  @IsEmail()
  email: string;

  @Length(8, 16)
  @IsString()
  password: string;
}
