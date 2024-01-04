import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_PRIVATE, SECRET_PUBLIC } from 'src/constants';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    PrismaModule,
    JwtModule.register({
      privateKey: SECRET_PRIVATE,
      publicKey: SECRET_PUBLIC,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
