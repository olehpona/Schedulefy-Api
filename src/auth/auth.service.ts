import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async Auth(
    email: string,
    password: string,
  ): Promise<{ token: string } | UnauthorizedException> {
    const user = await this.userService.findUser(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const payload = { id: user.id, name: user.name };
        return {
          token: this.jwt.sign(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
