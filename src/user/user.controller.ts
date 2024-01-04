import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('create')
  async SignUp(@Req() request: Request) {
    const user = await this.usersService.createUser(
      request.body.name,
      request.body.email,
      request.body.password,
    );
    if (user) {
      return { status: 'OK' };
    } else {
      return { status: 'BAD' };
    }
  }

  @Post('delete')
  @UseGuards(AuthGuard)
  async Delete(@Req() request: Request) {
    const data = request['auth'];
    const user = await this.usersService.deleteUser(data.id);
    if (user) {
      return { status: 'OK' };
    } else {
      return { status: 'BAD' };
    }
  }


}
