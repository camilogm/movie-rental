import * as moment from 'moment';
import { MovieEntity } from '../../movies/entities/movie.entity';
import { BuyMovieDTO } from '../dto/buy-dto/buy-a-movie.dto';
import { RentMovieDTO } from '../dto/rent.dto/rent-movie.dto';
import { StateMoviesDTO } from '../dto/state-movies.dto';
import { InvoiceDetailEntity } from '../entities/invoice-detail.entity';
import { StateMovieEntity } from '../entities/state-movie.entity';

export const mockStates = new StateMoviesDTO(
  new StateMovieEntity(1, 'rent'),
  new StateMovieEntity(2, 'buy'),
  new StateMovieEntity(3, 'delayed'),
  new StateMovieEntity(1, 'returned'),
);

export const mockMovie: MovieEntity = {
  id: 1,
  availability: true,
  description: 'des',
  title: 'titleee',
  poster: 'www.google.com',
  trailerLink: 'www.youtube.com',
  stock: 8,
  salePrice: 15.4,
};

export const mockBuyMovieDTO: BuyMovieDTO = {
  movieId: 1,
  quantity: 3,
};

export const mockRentMovieDTO: RentMovieDTO = {
  ...mockBuyMovieDTO,
  daysRent: 3,
};

export const mockBuyDetail: InvoiceDetailEntity = {
  id: undefined,
  movie: mockMovie,
  price: mockMovie.salePrice * mockBuyMovieDTO.quantity,
  quantity: mockBuyMovieDTO.quantity,
  returnDate: null,
  state: mockStates.BUY,
};

export const mockRentDetail: InvoiceDetailEntity = {
  id: undefined,
  movie: mockMovie,
  price:
    mockMovie.salePrice *
    0.1 *
    mockRentMovieDTO.daysRent *
    mockRentMovieDTO.quantity,
  quantity: mockRentMovieDTO.quantity,
  returnDate: new Date(
    moment().add(mockRentMovieDTO.daysRent, 'days').format(),
  ),
  state: mockStates.RENT,
};

export const expectedDataBuy: InvoiceDetailEntity = {
  id: undefined,
  movie: mockMovie,
  price: mockMovie.salePrice * mockBuyMovieDTO.quantity,
  returnDate: null,
  quantity: mockBuyMovieDTO.quantity,
  state: mockStates.BUY,
};

export const expectedDataRent: InvoiceDetailEntity = {
  id: undefined,
  movie: mockMovie,
  price:
    mockMovie.salePrice *
    0.1 *
    mockRentMovieDTO.quantity *
    mockRentMovieDTO.daysRent,
  quantity: mockRentMovieDTO.quantity,
  returnDate: new Date(
    moment().add(mockRentMovieDTO.daysRent, 'days').format(),
  ),
  state: mockStates.RENT,
};

export const mockMoviesArrayRent: RentMovieDTO[] = [mockRentMovieDTO];
export const mockDetailsEntityRent: InvoiceDetailEntity[] = [mockRentDetail];
export const expectedDetailsRent: InvoiceDetailEntity[] = [expectedDataRent];

export const mockMoviesArrayBuy: RentMovieDTO[] = [
  { ...mockBuyMovieDTO, daysRent: 0 },
];
export const mockDetailsEntityBuy: InvoiceDetailEntity[] = [mockBuyDetail];
export const expectedDetailsBuy: InvoiceDetailEntity[] = [expectedDataBuy];
