import { Controller, Body, Get, Post, Param, UseGuards } from '@nestjs/common';
import { User } from '.prisma/client';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(':username')
  findUnique(@Param('username') username: string): Promise<User> {
    return this.service.findUnique(username);
  }

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }
}
