import { Follow, User } from '.prisma/client';
import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private service: FollowsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  follow(@Param('id') id: number, @Req() req: Request): Promise<Follow> {
    const user = req.user as User;
    const idUser = user.id;
    return this.service.follow(idUser, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('unfollow/:id')
  unfollow(@Param('id', ParseIntPipe) id: number): Promise<Follow> {
    return this.service.unfollow(id);
  }
}
