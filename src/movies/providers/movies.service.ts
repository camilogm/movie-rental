import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/movies-dto/create-movie.dto';
import { FilterMovieDto } from '../dto/movies-dto/filter-movie.dto';
import { UpdateMovieDto } from '../dto/movies-dto/update-movie.dto';
import { MovieEntity } from '../entities/movie.entity';
import { TagsService } from './tags.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
    private readonly tagsService: TagsService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.moviesRepository.create({
      ...createMovieDto,
    });

    const savedMovie = await this.moviesRepository.save(movie);

    return savedMovie;
  }

  async findFilterMovies(filterMovieDTO: FilterMovieDto) {
    const { sort, title, availability, tags } = filterMovieDTO;

    const movies = this.moviesRepository
      .createQueryBuilder('movies')
      .leftJoinAndSelect('movies.likes', 'likes')
      .leftJoinAndSelect('movies.tags', 'tags')
      .orderBy(sort.value, sort.order)
      .where({ title: ILike(`%${title}%`) })
      .andWhere('movies.availability = :availability', { availability });

    if (tags?.length)
      movies.andWhere('tags.name ILIKE ALL(ARRAY[:...tags])', {
        tags: tags.map((tag) => `%${tag}%`),
      });

    return await movies.getMany();
  }

  async findOneById(id: number, addTags = false, addLikes = false) {
    const relations = [];

    if (addTags) relations.push('tags');
    if (addLikes) relations.push('likes');

    //if the client ask for relations this method provides
    const movie = relations.length
      ? await this.moviesRepository.findOne(id, {
          relations,
        })
      : await this.moviesRepository.findOne(id);

    if (!movie)
      throw new NotFoundException(`Not found a movie with  the id : ${id}`);

    return movie;
  }

  async updateById(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOneById(id);

    const updatedMovieData: MovieEntity = {
      ...movie,
      ...updateMovieDto,
    };

    const updatedMovie = await this.moviesRepository.save({
      ...updatedMovieData,
    });

    return updatedMovie;
  }

  async updateByEntity(movie: MovieEntity, updateMovieDto: UpdateMovieDto) {
    const updatedMovie: MovieEntity = await this.moviesRepository.save({
      ...movie,
      ...updateMovieDto,
    });

    return updatedMovie;
  }

  async updateManyByEntity(movies: MovieEntity[]) {
    return await this.moviesRepository.save(movies);
  }

  async remove(id: number) {
    const movie = await this.findOneById(id);

    await this.moviesRepository.remove(movie);

    return true;
  }

  async addTagToMovie(idTag: number, idMovie: number) {
    const movie = await this.findOneById(idMovie, true);
    const tag = await this.tagsService.findOneById(idTag);

    movie.tags.push(tag);
    await this.moviesRepository.save(movie);

    return true;
  }

  async removeTag(idTag: number, idMovie: number) {
    const movie = await this.findOneById(idMovie, true);

    movie.tags = movie.tags?.filter((tag) => tag.id !== idTag);
    await this.moviesRepository.save(movie);

    return true;
  }

  async getMovieTags(idMovie: number) {
    const movie = await this.findOneById(idMovie, true);

    return movie.tags ? movie.tags : [];
  }
}
