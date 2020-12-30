import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Request } from 'express';
import { Public } from '../common/decorators/authorization.decorator';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Get('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Req() request: Request) {
    const jwt = request.headers?.authorization
      ?.toString()
      .replace('Bearer ', '');
    this.authService.logout(jwt);
  }
}
