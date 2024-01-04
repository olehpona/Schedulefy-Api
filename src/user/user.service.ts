import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/prisma/types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
  async createUser(
    name: string | undefined,
    email: string,
    password: string,
  ): Promise<User | undefined> {
    return this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    });
  }
  async deleteUser(id: number): Promise<User | undefined> {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
