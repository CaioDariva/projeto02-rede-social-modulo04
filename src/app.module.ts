import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TweetsModule } from './tweets/tweets.module';
import { LikesModule } from './likes/likes.module';
import { FollowsController } from './follows/follows.controller';
import { FollowsService } from './follows/follows.service';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [UsersModule, AuthModule, TweetsModule, LikesModule, FollowsModule],
  controllers: [AppController, FollowsController],
  providers: [AppService, FollowsService],
})
export class AppModule {}
