import { IsInt, IsNumber, Min } from 'class-validator';

export class BuyMovieDTO {
  @IsNumber()
  movieId: number;

  @IsNumber()
  @Min(1)
  @IsInt()
  quantity = 1;
}
