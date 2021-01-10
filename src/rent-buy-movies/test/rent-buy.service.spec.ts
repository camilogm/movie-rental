import { Test } from '@nestjs/testing';
import { MoviesService } from '../../movies/providers/movies.service';
import { AccountsService } from '../../users/providers/accounts.service';
import { RentBuyService } from '../providers/rent-buy.service';
import {
  createMockRepository,
  MockRepository,
} from '../../../test/TypeORM.mock';
import { InvoiceDetailEntity } from '../entities/invoice-detail.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BUY_OPERATION,
  RENT_OPERATION,
  STATES_MOVIES_PROVIDER,
} from '../../constants';
import * as moment from 'moment';
import { UserEntity } from '../../users/entities/user.entity';
import { MovieEntity } from '../../movies/entities/movie.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InvoiceEntity } from '../entities/invoice.entity';
import { MailerCustomService } from '../../mailer/mailer.service';
import {
  expectedDataBuy,
  mockStates,
  mockBuyDetail,
  mockBuyMovieDTO,
  mockRentDetail,
  mockRentMovieDTO,
  mockMovie,
  expectedDataRent,
  mockMoviesArrayRent,
  mockDetailsEntityRent,
  expectedDetailsRent,
  mockDetailsEntityBuy,
  mockMoviesArrayBuy,
  expectedDetailsBuy,
} from './rent-buy.define';

const clientId = 1;
const movieId = 1;

describe('rentbuy service', () => {
  let rentBuyService: RentBuyService;
  let invoiceDetailsRepository: MockRepository;
  let invoicerRepository: MockRepository;
  let moviesRepository: MockRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RentBuyService,
        {
          provide: MailerCustomService,
          useValue: { sendMail: jest.fn() },
        },
        {
          provide: AccountsService,
          useValue: { findOneById: () => UserEntity },
        },
        {
          provide: MoviesService,
          useValue: {
            findOneById: () => mockMovie,
            updateByEntity: jest.fn(),
            updateManyByEntity: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(InvoiceDetailEntity),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(InvoiceEntity),
          useValue: createMockRepository(),
        },
        {
          provide: STATES_MOVIES_PROVIDER,
          useValue: mockStates,
        },
      ],
    }).compile();

    rentBuyService = module.get<RentBuyService>(RentBuyService);
    moviesRepository = module.get<MockRepository>(
      getRepositoryToken(MovieEntity),
    );
    invoicerRepository = module.get<MockRepository>(
      getRepositoryToken(InvoiceEntity),
    );
    invoiceDetailsRepository = module.get<MockRepository>(
      getRepositoryToken(InvoiceDetailEntity),
    );
  });

  it('should be defined', () => {
    expect(rentBuyService).toBeDefined();
    expect(invoiceDetailsRepository).toBeDefined();
    expect(moviesRepository).toBeDefined();
    expect(invoicerRepository).toBeDefined();
  });

  describe('builderDetail', () => {
    describe('success', () => {
      it('get buy detail', async () => {
        invoiceDetailsRepository.create.mockReturnValue(mockBuyDetail);
        const data = await rentBuyService.builderDetail(
          { daysRent: 0, ...mockBuyMovieDTO },
          BUY_OPERATION,
        );

        expect(data).toEqual(expectedDataBuy);
      });

      it('get rent detail', async () => {
        invoiceDetailsRepository.create.mockReturnValue(mockRentDetail);
        const data = await rentBuyService.builderDetail(
          mockRentMovieDTO,
          RENT_OPERATION,
        );

        expect(data).toEqual(expectedDataRent);
      });
    });

    describe('otherwhise', () => {
      it('Not enough stock in rent/buy', async () => {
        try {
          await rentBuyService.builderDetail(
            {
              ...mockBuyMovieDTO,
              quantity: mockMovie.stock + 1,
              daysRent: 0,
            },
            BUY_OPERATION,
          );
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
        }
      });
    });
  });

  describe('Get InvoiceDetails', () => {
    describe('success', () => {
      it('Buy details', async () => {
        mockDetailsEntityBuy.forEach((detail) =>
          invoiceDetailsRepository.create.mockReturnValue(detail),
        );

        const data = await rentBuyService.invoiceDetailsBuilder(
          mockMoviesArrayBuy,
          RENT_OPERATION,
        );

        const expectedDetailsBuilder = {
          details: expectedDetailsBuy,
          subTotal: expectedDetailsBuy.reduce(
            (acc, curr) => acc + curr.price,
            0,
          ),
        };

        expect(data).toEqual(expectedDetailsBuilder);
      });

      it('rent details', async () => {
        mockDetailsEntityRent.forEach((detail) =>
          invoiceDetailsRepository.create.mockReturnValue(detail),
        );

        const data = await rentBuyService.invoiceDetailsBuilder(
          mockMoviesArrayRent,
          RENT_OPERATION,
        );

        const expectedDetailsBuilder = {
          details: expectedDetailsRent,
          subTotal: expectedDetailsRent.reduce(
            (acc, curr) => acc + curr.price,
            0,
          ),
        };

        expect(data).toEqual(expectedDetailsBuilder);
      });
    });
  });

  describe('add likes', () => {
    it('success', async () => {
      const data = await rentBuyService.addLikeToMovie(clientId, movieId);
      expect(data).toBeTruthy();
    });

    it('not found exception', async () => {
      try {
        await rentBuyService.addLikeToMovie(clientId, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('type error exception', async () => {
      moviesRepository.save.mockReturnValue({});
      try {
        await rentBuyService.addLikeToMovie(clientId, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });

  describe('remove like', () => {
    it('success', async () => {
      const data = await rentBuyService.removeLikeToMovie(clientId, movieId);
      expect(data).toBeTruthy();
    });

    it('not found exception', async () => {
      try {
        await rentBuyService.removeLikeToMovie(clientId, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('type error exception', async () => {
      moviesRepository.save.mockReturnValue({});
      try {
        await rentBuyService.removeLikeToMovie(clientId, movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });
  });
});
