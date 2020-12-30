import { Test } from '@nestjs/testing';
import { MoviesService } from '../../providers/movies.service';
import { AccountsService } from '../../../users/providers/accounts.service';
import { RentBuyService } from '../../providers/rent-buy.service';
import {
  createMockRepository,
  MockRepository,
} from '../../../../test/TypeORM.mock';
import { RentBuyEntity } from '../../entities/rent-buy.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BUY_OPERATION,
  RENT_OPERATION,
  RETURN_OPERATION,
  STATES_MOVIES_PROVIDER,
} from '../../../constants';
import { StateMoviesDTO } from '../../dto/movies-dto/state-movies.dto';
import { CreateRentBuy } from '../../dto/movies-dto/create-rent-buy.dto';
import * as moment from 'moment';
import { UserEntity } from '../../../users/entities/user.entity';
import { MovieEntity } from '../../entities/movie.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('rentbuy service', () => {
  let rentBuy: RentBuyService;
  let rentBuyMockRepository: MockRepository;
  let moviesProvider: StateMoviesDTO;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RentBuyService,
        {
          provide: AccountsService,
          useValue: { findOneById: () => UserEntity },
        },
        {
          provide: MoviesService,
          useValue: {
            findOneById: () => MovieEntity,
            updateByEntity: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(RentBuyEntity),
          useValue: createMockRepository(),
        },
        {
          provide: STATES_MOVIES_PROVIDER,
          useValue: {
            RENT: {},
            BUY: {},
            DELAYED: {},
            RETURNED: {},
          },
        },
      ],
    }).compile();

    rentBuy = module.get<RentBuyService>(RentBuyService);

    moviesProvider = module.get<StateMoviesDTO>(STATES_MOVIES_PROVIDER);
    rentBuyMockRepository = module.get<MockRepository>(
      getRepositoryToken(RentBuyEntity),
    );
  });

  it('should be defined', () => {
    expect(rentBuy).toBeDefined();
    expect(rentBuyMockRepository).toBeDefined();
    expect(moviesProvider).toBeDefined();
  });

  describe('find rented movie', () => {
    describe('success found op', () => {
      it('found movie rented by clientId', async () => {
        const clientId = 1;
        const rentedMovieExpected = {};

        rentBuyMockRepository.findOne.mockReturnValue(rentedMovieExpected);
        const rentedMovieDetail = await rentBuy.getMovieRentedByClientId(
          clientId,
        );

        expect(rentedMovieDetail).toEqual(rentedMovieExpected);
      });

      it(`client doesn't have rented movie`, async () => {
        const clientId = 1;
        const rentedMovieExpected = undefined;

        rentBuyMockRepository.findOne.mockReturnValue(rentedMovieExpected);
        const rentedMovieDetail = await rentBuy.getMovieRentedByClientId(
          clientId,
        );

        expect(rentedMovieDetail).toEqual(rentedMovieDetail);
      });
    });

    describe('failed success found', () => {
      it('throw type error ', async () => {
        const clientId = 1;
        try {
          await rentBuy.getMovieRentedByClientId(clientId);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); // end of get movie rented

  describe('get buy/rent data', () => {
    it('rent information (sale and date) is setting well', () => {
      const salePrice = 2;
      const rentDays = 10;

      const expectedData = {
        price: salePrice * 0.25 * rentDays,
        returnDate: moment().add(rentDays, 'days').format(),
        state: {},
      };

      const data = rentBuy.getBuyRentData(salePrice, rentDays, RENT_OPERATION);

      expect(data).toEqual(expectedData);
    });

    it('buy information is setting well', () => {
      const salePrice = 2;

      const expectedData = {
        price: salePrice,
        returnDate: null,
        state: {},
      };
      const data = rentBuy.getBuyRentData(salePrice, 0, BUY_OPERATION);

      expect(data).toEqual(expectedData);
    });
  }); //end of check data

  describe('buy or rent movie', () => {
    describe('success ', () => {
      it('rent movie', async () => {
        const clientId = 1;
        const rentMovieDTo: CreateRentBuy = {
          movieId: 1,
        };
        const expectedData = {};

        rentBuyMockRepository.save.mockReturnValue(expectedData);
        const data = await rentBuy.operation(
          clientId,
          rentMovieDTo,
          RENT_OPERATION,
        );

        expect(data).toEqual(expectedData);
      });

      it('buy movie', async () => {
        const clientId = 1;
        const rentMovieDTO: CreateRentBuy = {
          movieId: 1,
        };
        const expectedData = {};

        rentBuyMockRepository.save.mockReturnValue(expectedData);
        const data = await rentBuy.operation(
          clientId,
          rentMovieDTO,
          BUY_OPERATION,
        );
        expect(data).toEqual(expectedData);
      });
    });

    describe('failed buy/rent', () => {
      it('throw typeError', async () => {
        const clientId = 1;

        try {
          //Uses RENT_OPERATION or BUY_OPERATION is complety arbitrary for the test
          // is the same for both use cases
          await rentBuy.operation(
            clientId,
            {
              movieId: 1,
            },
            RENT_OPERATION,
          );
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });

      it('throw notFoundException', async () => {
        const clientId = 1;
        try {
          //Uses RENT_OPERATION or BUY_OPERATION is complety arbitrary for the test
          // is the same for both use cases
          await rentBuy.operation(
            clientId,
            {
              movieId: 1,
            },
            BUY_OPERATION,
          );
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  }); // end of buy/rent operation

  describe('return or buy rented movie', () => {
    describe('success', () => {
      it('return the movie', async () => {
        const clientId = 1;
        //must have a movie defined
        const expectedData = {
          movie: {},
        };

        rentBuyMockRepository.findOne.mockReturnValue(expectedData);
        rentBuyMockRepository.save.mockReturnValue(expectedData);
        const data = await rentBuy.returnOrBuyMovieRented(
          clientId,
          RETURN_OPERATION,
        );

        expect(data).toEqual(expectedData);
      });
    });

    it('buy the movie', async () => {
      const clientId = 1;
      //must have a movie defined
      const expectedData = {
        movie: {},
      };

      rentBuyMockRepository.findOne.mockReturnValue(expectedData);
      rentBuyMockRepository.save.mockReturnValue(expectedData);
      const data = await rentBuy.returnOrBuyMovieRented(
        clientId,
        BUY_OPERATION,
      );

      expect(data).toEqual(expectedData);
    });
  });

  describe('failed', () => {
    it('throw typeError', async () => {
      const clientId = 1;
      const expectedData = { movie: {} };

      try {
        // the use of return or buy operation is complety arbistrary
        // is the same for both use cases
        rentBuyMockRepository.findOne.mockReturnValue(expectedData);
        await rentBuy.returnOrBuyMovieRented(clientId, RETURN_OPERATION);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    it('throw Conflict', async () => {
      const clientId = 1;
      try {
        // the use of return or buy operation is complety arbistrary
        // is the same for both use cases
        rentBuyMockRepository.findOne.mockReturnValue(undefined);
        await rentBuy.returnOrBuyMovieRented(clientId, RETURN_OPERATION);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });
});
