import { Test } from '@nestjs/testing';
import { MoviesService } from '../../movies/providers/movies.service';
import { AccountsService } from '../../users/providers/accounts.service';
import { RentBuyService } from '../providers/rent-buy.service';
import {
  createMockRepository,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { RentBuyEntity } from '../entities/rent-buy.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BUY_OPERATION,
  RENT_OPERATION,
  STATES_MOVIES_PROVIDER,
} from '../../constants';
import * as moment from 'moment';
import { UserEntity } from '../../users/entities/user.entity';
import { MovieEntity } from '../../movies/entities/movie.entity';
import {} from '@nestjs/common';
import { RentBuyController } from '../rent-buy.controller';
import { MailerService } from '@nestjs-modules/mailer';

describe('rentbuy service', () => {
  let rentBuyService: RentBuyService;
  let rentBuyMockRepository: MockRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [RentBuyController],
      providers: [
        {
          provide: MailerService,
          useValue: { sendMail: jest.fn() },
        },
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
          provide: getRepositoryToken(MovieEntity),
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

    rentBuyService = module.get<RentBuyService>(RentBuyService);
    rentBuyMockRepository = module.get<MockRepository>(
      getRepositoryToken(RentBuyEntity),
    );
  });

  it('should be defined', () => {
    expect(rentBuyService).toBeDefined();
    expect(rentBuyMockRepository).toBeDefined();
  });

  describe('find rented movie', () => {
    describe('success found op', () => {
      it('found movie rented by clientId', async () => {
        const clientId = 1;
        const rentedMovieExpected = {};

        rentBuyMockRepository.findOne.mockReturnValue(rentedMovieExpected);
        const rentedMovieDetail = await rentBuyService.getMovieRentedByClientId(
          clientId,
        );

        expect(rentedMovieDetail).toEqual(rentedMovieExpected);
      });

      it(`client doesn't have rented movie`, async () => {
        const clientId = 1;
        const rentedMovieExpected = undefined;

        rentBuyMockRepository.findOne.mockReturnValue(rentedMovieExpected);
        const rentedMovieDetail = await rentBuyService.getMovieRentedByClientId(
          clientId,
        );

        expect(rentedMovieDetail).toEqual(rentedMovieDetail);
      });
    });

    describe('failed success found', () => {
      it('throw type error ', async () => {
        const clientId = 1;
        try {
          await rentBuyService.getMovieRentedByClientId(clientId);
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
        price: salePrice * 0.1 * rentDays,
        returnDate: moment().add(rentDays, 'days').format(),
        state: {},
      };

      const data = rentBuyService.getBuyRentData(
        salePrice,
        rentDays,
        RENT_OPERATION,
      );

      expect(data).toEqual(expectedData);
    });

    it('buy information is setting well', () => {
      const salePrice = 2;

      const expectedData = {
        price: salePrice,
        returnDate: null,
        state: {},
      };
      const data = rentBuyService.getBuyRentData(salePrice, 0, BUY_OPERATION);

      expect(data).toEqual(expectedData);
    });
  }); //end of check data

  describe('send facture', () => {
    describe('success', () => {
      it('sended mail', async () => {
        const clientId = '1';
        const typeOperation = BUY_OPERATION;

        rentBuyMockRepository.create.mockReturnValue({});
        const repo = await rentBuyService.rentOrBuyBuilder(
          +clientId,
          {
            movieId: 1,
          },
          typeOperation,
        );

        const sendedMail = rentBuyService.sendFacture(
          repo.user,
          repo,
          typeOperation,
        );
        expect(sendedMail).toBeTruthy();
      });
    });

    describe('fail', () => {
      it('type error', async () => {
        const clientId = '1';
        const typeOperation = BUY_OPERATION;

        rentBuyMockRepository.create.mockReturnValue({});
        const repo = await rentBuyService.rentOrBuyBuilder(
          +clientId,
          {
            movieId: 1,
          },
          typeOperation,
        );

        try {
          rentBuyService.sendFacture(repo.user, repo, typeOperation);
        } catch (error) {
          expect(error).toBeInstanceOf(TypeError);
        }
      });
    });
  }); //end of send mail
});
