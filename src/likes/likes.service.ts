import { Like } from '.prisma/client';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private db: PrismaService) {}

  async like(idUser: number, id: number): Promise<Like> {
    const like = await this.db.like.create({
      data: {
        userId: idUser,
        tweetId: id,
      },
    });

    return like;
  }

  async dislike(id: number): Promise<Like> {
    const dislike = await this.db.like.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!dislike) {
      throw new NotFoundException();
    }

    if (dislike.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.like.delete({
      where: { id },
    });
  }
}
