import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_PRIVATE, SECRET_PUBLIC } from 'src/constants';

@Module({
  providers: [ScheduleService],
  controllers: [ScheduleController],
  imports: [
    PrismaModule,
    JwtModule.register({
      privateKey: SECRET_PRIVATE,
      publicKey: SECRET_PUBLIC,
      signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class ScheduleModule {}
