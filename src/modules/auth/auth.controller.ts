import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    const data = await this.authService.login(user);
    return {
      message: 'login exitoso',
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() {
    return 'perfil usuario';
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  refreshToken() {}
}
