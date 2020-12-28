import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from '../providers/movies.service';
import { CreateMovieDto } from '../dto/movies-dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/movies-dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findSortedAlphabetic();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }

  @Post(':idMovie/tags/:idTag')
  @HttpCode(HttpStatus.NO_CONTENT)
  addTag(@Param('idMovie') idMovie: string, @Param('idTag') idTag: string) {
    return this.moviesService.addTagToMovie(+idTag, +idMovie);
  }
}
