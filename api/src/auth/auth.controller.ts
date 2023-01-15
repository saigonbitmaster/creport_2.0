import { Post, UseGuards, Request, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from '../decorators/public.api.decorator';
import { JwtRefreshTokenGuard } from './jwt-refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Public()
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh-token')
  @Public()
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user.refreshToken);
  }
}
