import { User, Prisma } from '.prisma/client';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  @UseGuards(AuthGuard('jwt'))
  async findUnique(username: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.password;
    delete user.updatedAt;

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
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
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const userDel = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!userDel) {
      throw new NotFoundException();
    }

    if (userDel.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.user.delete({
      where: { id },
    });
  }

  async updateUser(id: number, data: CreateUserDto): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    return await this.db.user.update({
      where: { id },
      data,
    });
  }
}
