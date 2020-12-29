import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/authorization.decorator';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
