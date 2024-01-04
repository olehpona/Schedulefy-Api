import { Controller, Get, Header, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async SignIn(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token } = (await this.authService.Auth(
      request.body.email,
      request.body.password,
    )) as { token };
    if (token) {
      response.cookie('auth', token, {
        maxAge: 604800000,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });
      return { status: 'OK' };
    } else {
      return { status: 'BAD' };
    }
  }

  @Get('fetch')
  @UseGuards(AuthGuard)
  Fetch(){
    return {status: "OK"}
  }
}
