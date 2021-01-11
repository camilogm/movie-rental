import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsOptional, ValidateNested } from 'class-validator';
import { RentMovieDTO } from './rent.dto/rent-movie.dto';
import { BuyMovieDTO } from './buy-dto/buy-movie.dto';

export class TransactionClientDTO {
  @ValidateNested({ each: true })
  @Type(() => RentMovieDTO)
  @IsOptional()
  @ArrayMaxSize(10)
  @ApiProperty({
    default: [
      {
        movieId: 1,
        quantity: 1,
        daysRent: 3,
      },
    ],
  })
  rentMovies: RentMovieDTO[] = [];

  @ValidateNested({ each: true })
  @Type(() => BuyMovieDTO)
  @IsOptional()
  @ArrayMaxSize(10)
  @ApiProperty({
    default: [
      {
        movieId: 1,
        quantity: 1,
      },
    ],
  })
  buyMovies: BuyMovieDTO[] = [];
}
