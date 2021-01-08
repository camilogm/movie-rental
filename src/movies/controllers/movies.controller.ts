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
  Query,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterMovieDto } from '../dto/movies-dto/filter-movie.dto';

@Controller('movies')
@ApiTags('Movie endpoints')
@ApiBearerAuth()
@AllowedRoles(ROLE_SUPER_ADMIN, ROLE_ADMIN)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @Public()
  findFilterMovies(@Query() params: FilterMovieDto) {
    return this.moviesService.findFilterMovies(params);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.moviesService.findOneById(+id, false, true);
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

  @Get(':idMovie/tags')
  @Public()
  getTags(@Param('idMovie') idMovie: string) {
    return this.moviesService.getMovieTags(+idMovie);
  }

  @Post(':idMovie/tags/:idTag')
  @HttpCode(HttpStatus.NO_CONTENT)
  addTag(@Param('idMovie') idMovie: string, @Param('idTag') idTag: string) {
    return this.moviesService.addTagToMovie(+idTag, +idMovie);
  }

  @Delete(':idMovie/tags/:idTag')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTag(@Param('idMovie') idMovie: string, @Param('idTag') idTag: string) {
    return this.moviesService.removeTag(+idTag, +idMovie);
  }
}
