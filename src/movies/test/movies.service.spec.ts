import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagsService } from '../providers/tags.service';
import {
  createMockRepository,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { UpdateMovieDto } from '../dto/movies-dto/update-movie.dto';
import { MovieEntity } from '../entities/movie.entity';
import { MoviesService } from '../providers/movies.service';
import { MoviesController } from '../controllers/movies.controller';
import { CreateMovieDto } from '../dto/movies-dto/create-movie.dto';

const mockCreateDTO: CreateMovieDto = {
  title: 'Rock I',
  description: 'The interesting movie about the fighter Rock Balboa',
  poster:
    'https://static1.abc.es/media/play/2017/09/28/avatar-kVmB--1240x698@abc.jpeg',
  salePrice: 5,
  stock: 2,
  trailerLink: 'https://youtube.com/',
};

describe('MoviesService', () => {
  let moviesRepository: MockRepository;
  let moviesService: MoviesService;

  //this is defined becouse at the end , the findOneById function is used

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: TagsService,
          useValue: { findOneById: jest.fn() },
        },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: createMockRepository(),
        },
      ],
      controllers: [MoviesController],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(moviesRepository).toBeDefined();
    expect(moviesService).toBeDefined();
  });

  describe('find One movie', () => {
    describe('success find', () => {
      it('found with tags', async () => {
        const id = '1';
        const expectedMovie = { tags: [] };

        moviesRepository.findOne.mockReturnValue(expectedMovie);
        const movie = await moviesService.findOneById(+id, true);
        expect(movie).toEqual(expectedMovie);
      });

      it('found with users', async () => {
        const id = '1';

        const expectedMovie = { users: [] };

        moviesRepository.findOne.mockReturnValue(expectedMovie);
        const movie = await moviesService.findOneById(+id, false, true);
        expect(movie).toEqual(expectedMovie);
      });
    });
  }); // end of find one

  describe('update a movie', () => {
    describe('success update', () => {
      it('by entity', async () => {
        const movieId = '1';

        const updateData: UpdateMovieDto = {
          title: 'Avatar ',
          description: 'The movie of the blue beings',
        };

        const movieRegistered: MovieEntity = {
          id: +movieId,
          ...mockCreateDTO,
          availability: !!mockCreateDTO.stock,
        };

        const expectedData: MovieEntity = {
          id: +movieId,
          ...mockCreateDTO,
          ...updateData,
          availability: !!mockCreateDTO.stock,
        };

        moviesRepository.save.mockReturnValue(expectedData);
        const data = await moviesService.updateByEntity(
          movieRegistered,
          updateData,
        );
        expect(data).toEqual(expectedData);
      });
    });

    describe('failed update by movieEntity', () => {
      it('type error', async () => {
        const movieId = '1';

        const updateData: UpdateMovieDto = {};

        const movieRegistered: MovieEntity = {
          id: +movieId,
          ...mockCreateDTO,
          availability: !!mockCreateDTO.stock,
        };
        moviesRepository.save.mockReturnValue({});
        try {
          await moviesService.updateByEntity(movieRegistered, updateData);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); //end of update
});
