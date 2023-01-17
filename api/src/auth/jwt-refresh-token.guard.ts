import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
}
