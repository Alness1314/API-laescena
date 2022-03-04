import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserEmail({ email });
    if (user && (await compare(password, user.password))) {
      return user;
    }

    return null;
  }

  login(user: UserEntity) {
    const { id, avatar, fbId, fbLink, createdAt, status, ...rest } = user;
    const payload = { sub: id };
    delete rest.password;
    return {
      ...rest,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
