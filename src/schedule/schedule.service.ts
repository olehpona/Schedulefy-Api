import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Schedule } from 'src/prisma/types';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async createSchedule(
    name: string | undefined,
    price: string | undefined,
    daysAfter: number,
    lastPayDate: Date | undefined,
    userId: number,
  ): Promise<Schedule | undefined> {
    const schedule = await this.prisma.schedule.create({
      data: {
        name: name,
        price: price,
        daysAfter: daysAfter,
        lastPayDate: lastPayDate,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return schedule;
    
  }

  async deleteSchedule(id: number): Promise<Schedule | undefined> {
    const schedule = await this.prisma.schedule.delete({
      where: {
        id: id,
      },
    });
    return schedule;
  }

  async reSchedule(id: number): Promise<Schedule | undefined> {
    const schedule = await this.prisma.schedule.update({
      where: {
        id: id,
      },
      data: {
        lastPayDate: new Date(Date.now()),
      },
    });
    return schedule;
  }

  async updateSchedule(
    name: string,
    nextDays: number,
    price: string,
    id: number,
  ): Promise<Schedule | undefined> {
    const schedule = await this.prisma.schedule.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        daysAfter: nextDays,
        price: price,
      },
    });
    return schedule;
  }

  async getUserSchedule(userId: number): Promise<Schedule[] | undefined> {
    const schedule = await this.prisma.schedule.findMany({
      where: {
        userId: userId,
      },
    });
    return schedule;
  }
}
