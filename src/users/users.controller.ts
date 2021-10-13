import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { User } from '.prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  findUnique(@Param('username') username: string): Promise<User> {
    return this.service.findUnique(username);
  }

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.deleteUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: CreateUserDto,
  ): Promise<User> {
    return this.service.updateUser(id, updateUser);
  }
}
