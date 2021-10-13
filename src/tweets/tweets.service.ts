import { Prisma, Tweet } from '.prisma/client';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTweetDto } from './dto/tweets.dto';

@Injectable()
export class TweetsService {
  constructor(private db: PrismaService) {}

  @UseGuards(AuthGuard('jwt'))
  async findUnique(id: number): Promise<Tweet> {
    const tweet = await this.db.tweet.findUnique({
      where: {
        id,
      },
    });

    if (!tweet) {
      throw new NotFoundException();
    }

    return tweet;
  }

  async create(data: CreateTweetDto, idUser: number): Promise<Tweet> {
    const tweet = await this.db.tweet.create({
      data: {
        ...data,
        userId: idUser,
      },
    });

    return tweet;
  }

  async deleteTweet(id: number): Promise<Tweet> {
    const tweetDel = await this.db.tweet.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!tweetDel) {
      throw new NotFoundException();
    }

    if (tweetDel.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.tweet.delete({
      where: { id },
    });
  }
}
