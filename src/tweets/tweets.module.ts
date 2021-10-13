import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TweetsService, PrismaService],
  controllers: [TweetsController],
})
export class TweetsModule {}
