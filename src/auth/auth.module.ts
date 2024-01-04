import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_PRIVATE, SECRET_PUBLIC } from 'src/constants';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
  imports: [
    UserModule,
    JwtModule.register({
      privateKey: SECRET_PRIVATE,
      publicKey: SECRET_PUBLIC,
      signOptions: { expiresIn: '7d', algorithm: 'RS256' },
    }),
  ],
})
export class AuthModule {}
