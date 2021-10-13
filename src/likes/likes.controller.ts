import { Like, User } from '.prisma/client';
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
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private service: LikesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('like/:id')
  like(@Param('id') id: number, @Req() req: Request): Promise<Like> {
    const user = req.user as User;
    const idUser = user.id;
    return this.service.like(idUser, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('dislike/:id')
  dislike(@Param('id', ParseIntPipe) id: number): Promise<Like> {
    return this.service.dislike(id);
  }
}
