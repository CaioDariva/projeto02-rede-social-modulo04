import { User, UserCreateInput } from '.prisma/client';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async findUnique(username: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(data: UserCreateInput): Promise<User> {
    const existing = await this.db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (existing) {
      throw new ConflictException('username_already_exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.db.user.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}
