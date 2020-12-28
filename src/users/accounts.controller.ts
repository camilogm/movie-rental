import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AccountsService } from './providers/accounts.service';
import { CreateUserDto } from './dto/user-dtos/create-user.dto';
import { UpdateUserDto } from './dto/user-dtos/update-user.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly usersService: AccountsService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createClient(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
