import { IsNumber, IsOptional } from 'class-validator';

export class CreateRentBuy {
  @IsOptional()
  @IsNumber()
  daysRent?: number;

  @IsNumber()
  movieId: number;
}
