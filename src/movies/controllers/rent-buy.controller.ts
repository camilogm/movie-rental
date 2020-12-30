import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { PayloadDTO } from 'src/auth/dto/payload.dto';
import {
  AllowedRoles,
  ROLE_CLIENT,
} from 'src/common/decorators/authorization.decorator';
import { BUY_OPERATION, RENT_OPERATION, RETURN_OPERATION } from 'src/constants';
import { CreateRentBuy } from '../dto/movies-dto/create-rent-buy.dto';
import { RentBuyService } from '../providers/rent-buy.service';

@Controller('accounts/me/movie')
@AllowedRoles(ROLE_CLIENT)
export class RentBuyController {
  constructor(private readonly rentBuyService: RentBuyService) {}

  @Post('/rent')
  @HttpCode(HttpStatus.OK)
  clientRentMovie(@Req() request, @Body() rentOrBuyMovieDTO: CreateRentBuy) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.operation(
      user.sub,
      rentOrBuyMovieDTO,
      RENT_OPERATION,
    );
  }

  @Post('/buy')
  @HttpCode(HttpStatus.OK)
  clientBuyMovie(@Req() request, @Body() rentOrBuyMovieDTO: CreateRentBuy) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.operation(
      user.sub,
      rentOrBuyMovieDTO,
      BUY_OPERATION,
    );
  }

  @Patch('/return')
  @HttpCode(HttpStatus.NO_CONTENT)
  returnRentedMovie(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.returnOrBuyMovieRented(
      user.sub,
      RETURN_OPERATION,
    );
  }

  @Post('/rent/buy')
  @HttpCode(HttpStatus.OK)
  buyRentedMovie(@Req() request) {
    const user: PayloadDTO = request.user;
    return this.rentBuyService.returnOrBuyMovieRented(user.sub, BUY_OPERATION);
  }
}
