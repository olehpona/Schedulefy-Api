import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  async Create(@Req() req: Request) {
    const schedule = await this.scheduleService.createSchedule(
      req.body.name,
      req.body.price,
      req.body.daysAfter,
      new Date(req.body.lastPayDate),
      req['auth'].id,
    );
    if (schedule) {
      return { status: 'OK' };
    } else {
      return { status: 'BAD' };
    }
  }

  @Post('/reschedule')
  @UseGuards(AuthGuard)
  async ReSchedule(@Req() req: Request) {
    const schedule = await this.scheduleService.reSchedule(req.body.id);
    if (schedule) {
      return { status: 'OK' };
    } else {
      return { status: 'BAD' };
    }
  }

  @Post('/update')
  @UseGuards(AuthGuard)
  async Update(@Req() req: Request) {
    const schedule = await this.scheduleService.updateSchedule(
      req.body.name,
      req.body.nextDays,
      req.body.price,
      req.body.id,
    );
    if (schedule) {
      return { status: 'OK' };
    } else {
      return { status: 'BAD' };
    }
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getScheduleByUser(@Req() req: Request) {
    const schedules = await this.scheduleService.getUserSchedule(
      req['auth'].id,
    );
    if (schedules) {
      return { status: 'OK', data: schedules };
    } else {
      return { status: 'BAD' };
    }
  }

  @Post('delete')
  @UseGuards(AuthGuard)
  async deleteSchedule(@Req() req: Request) {
    const schedule = await this.scheduleService.deleteSchedule(req.body.id);
    if (schedule) {
      return { status: 'OK' };
    } else {
      return { status: 'BAD' };
    }
  }
}
