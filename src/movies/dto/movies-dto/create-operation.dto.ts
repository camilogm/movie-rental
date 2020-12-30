import { IsNumber, IsOptional } from 'class-validator';

export class CreateOperationDTO {
  @IsOptional()
  @IsNumber()
  daysRent: number;

  @IsNumber()
  movieId: number;
}
