import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { BuyMovieDTO } from '../buy-dto/buy-movie.dto';

export class RentMovieDTO extends BuyMovieDTO {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  @IsInt()
  daysRent = 3;
}
