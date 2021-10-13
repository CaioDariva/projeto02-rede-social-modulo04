import { Follow } from '.prisma/client';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private db: PrismaService) {}

  async follow(idUser: number, id: number): Promise<Follow> {
    const follow = await this.db.follow.create({
      data: {
        userId: idUser,
        followedId: id,
      },
    });

    return follow;
  }

  async unfollow(id: number): Promise<Follow> {
    const unfollow = await this.db.follow.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!unfollow) {
      throw new NotFoundException();
    }

    if (unfollow.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.follow.delete({
      where: { id },
    });
  }
}
