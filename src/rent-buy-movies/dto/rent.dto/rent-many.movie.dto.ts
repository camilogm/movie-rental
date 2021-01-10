import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsOptional, ValidateNested } from 'class-validator';
import { NonDuplicateValues } from '../../../common/decorators/no-duplicate-values.decorator';
import { RentMovieDTO } from './rent-movie.dto';

export class RentManyMoviesDTO {
  @ValidateNested({ each: true })
  @NonDuplicateValues('movieId')
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
}
