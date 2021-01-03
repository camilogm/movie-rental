import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { PayloadDTO } from '../auth/dto/payload.dto';
import {
  AllowedRoles,
  ROLE_CLIENT,
} from '../common/decorators/authorization.decorator';
import { BUY_OPERATION, RENT_OPERATION } from '../constants';
import { CreateRentBuy } from './dto/create-rent-buy.dto';
import { RentBuyService } from './providers/rent-buy.service';

@Controller('me/movie')
@AllowedRoles(ROLE_CLIENT)
export class RentBuyController {
  constructor(private readonly rentBuyService: RentBuyService) {}

  @Post('/rent')
  @HttpCode(HttpStatus.OK)
  clientRentMovie(@Req() request, @Body() rentOrBuyMovieDTO: CreateRentBuy) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.rentBuyTransaction(
      user.sub,
      rentOrBuyMovieDTO,
      RENT_OPERATION,
    );
  }

  @Post('/buy')
  @HttpCode(HttpStatus.OK)
  clientBuyMovie(@Req() request, @Body() rentOrBuyMovieDTO: CreateRentBuy) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.rentBuyTransaction(
      user.sub,
      rentOrBuyMovieDTO,
      BUY_OPERATION,
    );
  }

  @Get('/return')
  @HttpCode(HttpStatus.NO_CONTENT)
  returnRentedMovie(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.returnRentedMovie(user.sub);
  }

  @Post('/rented/buy/')
  @HttpCode(HttpStatus.OK)
  buyRentedMovie(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.buyRentedMovie(user.sub);
  }
}
