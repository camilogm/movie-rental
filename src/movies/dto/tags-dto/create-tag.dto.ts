import { IsString, Length } from 'class-validator';

export class CreateTagDTO {
  @IsString()
  @Length(1, 30)
  name: string;
}
