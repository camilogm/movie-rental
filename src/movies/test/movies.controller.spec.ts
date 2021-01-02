import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TagsService } from '../providers/tags.service';
import {
  createMockRepository,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { CreateMovieDto } from '../dto/movies-dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/movies-dto/update-movie.dto';
import { MovieEntity } from '../entities/movie.entity';
import { MoviesService } from '../providers/movies.service';
import { TagEntity } from '../entities/tag.entity';
import { MoviesController } from '../controllers/movies.controller';

describe('MoviesService', () => {
  let moviesRepository: MockRepository;
  let moviesController: MoviesController;

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
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
  });

  it('should be defined', () => {
    expect(moviesRepository).toBeDefined();
    expect(tagsRepository).toBeDefined();
    expect(moviesController).toBeDefined();
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
        const mockCreateDTO: CreateMovieDto = {
          title: 'Avatar',
          description: 'An interesting movie about the space',
          poster:
            'https://static1.abc.es/media/play/2017/09/28/avatar-kVmB--1240x698@abc.jpeg',
          salePrice: 5,
          stock: 0,
          trailerLink: 'https://youtube.com/',
        };

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
        const mockCreateDTO: CreateMovieDto = {
          title: 'Avatar',
          description: 'An interesting movie about the space',
          poster:
            'https://static1.abc.es/media/play/2017/09/28/avatar-kVmB--1240x698@abc.jpeg',
          salePrice: 5,
          stock: 0,
          trailerLink: 'https://youtube.com/',
        };

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

        const mockCreateDTO: CreateMovieDto = {
          title: 'Avatar',
          description: 'An interesting movie about the space',
          poster:
            'https://static1.abc.es/media/play/2017/09/28/avatar-kVmB--1240x698@abc.jpeg',
          salePrice: 5,
          stock: 0,
          trailerLink: 'https://youtube.com/',
        };

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
    });

    describe('failed update', () => {
      it('update by id ', async () => {
        const movieId = '1';
        const updateDTO: UpdateMovieDto = {};
        moviesRepository.save.mockReturnValue(undefined);

        try {
          await moviesController.update(movieId, updateDTO);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
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

        moviesRepository.findOne.mockReturnValue({});
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
});
