import { NotFoundException } from '@nestjs/common';
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
import { TagEntity } from '../entities/tag.entity';
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
  let moviesController: MoviesController;
  let moviesService: MoviesService;

  //this is defined becouse at the end , the findOneById function is used
  let tagsRepository: MockRepository;

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
        {
          provide: getRepositoryToken(TagEntity),
          useValue: createMockRepository(),
        },
      ],
      controllers: [MoviesController],
    }).compile();

    moviesController = module.get<MoviesController>(MoviesController);
    tagsRepository = module.get<MockRepository>(getRepositoryToken(TagEntity));
    moviesService = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(moviesRepository).toBeDefined();
    expect(tagsRepository).toBeDefined();
    expect(moviesController).toBeDefined();
    expect(moviesService).toBeDefined();
  });

  describe('find One movie', () => {
    describe('success find', () => {
      it('found by id', async () => {
        const id = '1';
        const expectedMovie = {};
        moviesRepository.findOne.mockReturnValue(expectedMovie);
        const movie = await moviesController.findOne(id);
        expect(movie).toEqual(expectedMovie);
      });

      describe('otherwise find one', () => {
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
    });

    describe('failed find one', () => {
      it('throw find', async () => {
        const id = '1';
        moviesRepository.findOne.mockReturnValue(undefined);
        try {
          await moviesController.findOne(id);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  }); // end of find one

  describe('find many movies', () => {
    describe('success find many', () => {
      it('should be an array', async () => {
        const expectedMovies = [];
        moviesRepository.find.mockReturnValue(expectedMovies);
        const movies = await moviesController.findSortedMovies();
        expect(movies).toBe(expectedMovies);
      });
    });

    describe('failed find many', () => {
      it('failed find many', async () => {
        moviesRepository.find.mockReturnValue(undefined);
        try {
          await moviesController.findSortedMovies();
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); //end find many

  describe('Create one', () => {
    describe('create success', () => {
      it('success create without tags', async () => {
        const expectedMovie: MovieEntity = {
          id: 1,
          ...mockCreateDTO,
          availability: !!mockCreateDTO.stock,
        };

        moviesRepository.save.mockReturnValue(expectedMovie);
        const movie = await moviesController.create(mockCreateDTO);
        expect(movie).toEqual(expectedMovie);
      });
    });

    describe('failed create', () => {
      it('throw create', async () => {
        try {
          await moviesController.create(mockCreateDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); // end of create

  describe('update a movie', () => {
    describe('success update', () => {
      it('by id', async () => {
        const movieId = '1';

        const updateData: UpdateMovieDto = {
          title: 'Avatar 2',
        };

        const expectedMovie: MovieEntity = {
          id: +movieId,
          ...mockCreateDTO,
          ...updateData,
          availability: !!mockCreateDTO.stock,
        };

        moviesRepository.findOne.mockReturnValue(expectedMovie);
        moviesRepository.save.mockReturnValue(expectedMovie);
        const updatedMovie = await moviesController.update(movieId, updateData);
        expect(updatedMovie).toEqual(expectedMovie);
      });

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

    describe('failed update by id', () => {
      it('Notfound movie ', async () => {
        const movieId = '1';
        const updateDTO: UpdateMovieDto = {};
        moviesRepository.save.mockReturnValue(undefined);

        try {
          await moviesController.update(movieId, updateDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });

      it('failed TypeErorr', async () => {
        const movieId = '1';
        const updateDTO: UpdateMovieDto = {};
        moviesRepository.findOne.mockReturnValue({});
        moviesRepository.save.mockReturnValue({});
        try {
          await moviesController.update(movieId, updateDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
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

  describe('Remove one movie', () => {
    describe('success remove', () => {
      it('remove by id', async () => {
        const movieId = '1';
        moviesRepository.findOne.mockReturnValue({});
        const deleteUser = await moviesController.remove(movieId);
        expect(deleteUser).toBeTruthy();
      });
    });

    describe('failed remove', () => {
      it('failed remove by id', async () => {
        const movieId = '1';
        try {
          await moviesController.remove(movieId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  }); //end of remove

  describe('add tag to movie', () => {
    describe('success ', () => {
      it('sucess with idtag and idmovie', async () => {
        const idTag = '1';
        const idMovie = '1';

        moviesRepository.findOne.mockReturnValue({ tags: [] });
        tagsRepository.findOne.mockReturnValue({});
        moviesRepository.save.mockReturnValue({});
        const added = await moviesController.addTag(idTag, idMovie);

        expect(added).toBeTruthy();
      });
    });

    describe('failed ', () => {
      it('failed by notFoundEx', async () => {
        const idTag = '1';
        const idMovie = '1';
        try {
          await moviesController.addTag(idTag, idMovie);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });

      it('type error', async () => {
        const idTag = '1';
        const idMovie = '1';

        moviesRepository.findOne.mockReturnValue({});
        tagsRepository.findOne.mockReturnValue({});
        moviesRepository.save.mockReturnValue({});

        try {
          await moviesController.addTag(idTag, idMovie);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  });

  describe('get tags', () => {
    it('get tags', async () => {
      const idMovie = '1';
      const expectedData = ['terror'];

      moviesRepository.findOne.mockReturnValue({ tags: ['terror'] });
      const data = await moviesController.getTags(idMovie);
      expect(data).toEqual(expectedData);
    });

    it('failed', async () => {
      const idMovie = '1';
      try {
        await moviesController.getTags(idMovie);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove tag', () => {
    describe('success', () => {
      it('removed', async () => {
        const idTag = '1';
        const idMovie = '1';

        moviesRepository.findOne.mockReturnValue({});
        tagsRepository.findOne.mockReturnValue({});
        moviesRepository.save.mockReturnValue({});
        const added = await moviesController.removeTag(idTag, idMovie);

        expect(added).toBeTruthy();
      });
    });

    describe('failed ', () => {
      it('failed by notFoundEx', async () => {
        const idTag = '1';
        const idMovie = '1';
        try {
          await moviesController.addTag(idTag, idMovie);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
