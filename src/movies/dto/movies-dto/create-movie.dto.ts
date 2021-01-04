import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @Length(2, 30)
  title: string;

  @IsString()
  @Length(30, 1000)
  description: string;

  @IsUrl()
  @Length(8, 100)
  poster: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  stock: number;

  @IsUrl()
  @Length(8, 100)
  trailerLink: string;

  @IsNumber()
  @Min(1)
  @Max(1000)
  salePrice: number;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;
}
