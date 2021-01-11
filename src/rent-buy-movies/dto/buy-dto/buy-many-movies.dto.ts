import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsOptional, ValidateNested } from 'class-validator';
import { NonDuplicateValues } from '../../../common/decorators/no-duplicate-values.decorator';
import { BuyMovieDTO } from './buy-movie.dto';

export class BuyManyMoviesDTO {
  @ValidateNested({ each: true })
  @NonDuplicateValues('movieId')
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
