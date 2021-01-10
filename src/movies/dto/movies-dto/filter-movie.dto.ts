/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { IsInCustomSort } from '../../../common/decorators/is-in-custom.decorator';

const transformSortInput = (inputValue: string) => {
  const order = inputValue[0] === '-' ? 'DESC' : 'ASC';
  const value = inputValue.substring(1, inputValue.length);
  return {
    value,
    order,
  };
};

export class FilterMovieDto {
  @IsOptional()
  @IsInCustomSort('sort', ['title', 'likes'])
  @Transform(transformSortInput)
  @ApiProperty({ required: false, format: 'string', default: '' })
  sort: { value: string; order: 'ASC' | 'DESC' } = {
    value: 'title',
    order: 'ASC',
  };

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  title: string = '';

  @IsBoolean()
  @IsOptional()
  @Transform((availability: string) => (availability === 'true' ? true : false))
  @ApiProperty({ required: false })
  availability: boolean = true;

  @IsString({
    each: true,
  })
  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false, format: 'string', default: '' })
  @Transform((tags: string | string[]) =>
    typeof tags === 'string' ? tags.split(',') : tags,
  )
  tags: string[] = [];
}
