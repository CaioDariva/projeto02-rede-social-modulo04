import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { User } from '.prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/users.dto';

//@UseGuards(AuthGuard('jwt'))
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
}
