import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { setDefaultUser } from 'src/config/defaul-user';
import { Auth } from '../common/decorators/auth.decorator';
import { User } from '../common/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    setDefaultUser(config);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'login exitoso',
      data,
    };
  }

  @Auth()
  @Get('profile')
  profile(@User() user: UserEntity) {
    return {
      message: 'perfil de usuario',
      user,
    };
  }

  @Auth()
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'refresh exitoso',
      data,
    };
  }
}
