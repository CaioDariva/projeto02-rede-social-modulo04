import { Tweet, User } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateTweetDto } from './dto/tweets.dto';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
  constructor(private service: TweetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findUnique(@Param('id') id: number): Promise<Tweet> {
    return this.service.findUnique(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() data: CreateTweetDto, @Req() req: Request): Promise<Tweet> {
    const user = req.user as User;
    const idUser = user.id;
    return this.service.create(data, idUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deleteTweet(@Param('id', ParseIntPipe) id: number): Promise<Tweet> {
    return this.service.deleteTweet(id);
  }
}
