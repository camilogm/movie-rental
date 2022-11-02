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
import {
  Public,
  AllowedRoles,
  ROLE_ADMIN,
  ROLE_SUPER_ADMIN,
} from '../../common/decorators/authorization.decorator';

@Controller('movies')
@AllowedRoles(ROLE_SUPER_ADMIN, ROLE_ADMIN)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @Public()
  findSortedMovies() {
    return this.moviesService.findSortedAlphabetic();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.moviesService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.updateById(+id, updateMovieDto);
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

  @Get(':idMovie/tags')
  @Public()
  getTags(@Param('idMovie') idMovie: string) {
    return this.moviesService.getMovieTags(+idMovie);
  }
}
