import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import JwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user._doc.username,
      sub: user._doc._id,
      role: user._doc.role,
    };
    const token = this._generateToken(payload);
    return {
      ...token,
      fullName: user._doc.fullName,
      username: user._doc.username,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const tokenDecoded = JwtDecode(refreshToken);
      if (!tokenDecoded || !tokenDecoded['username'])
        throw new BadRequestException('Refresh token is invalid');

      const user = await this.userService.findOne(tokenDecoded['username']);
      if (!user) throw new NotFoundException('User not found');

      const payload = {
        username: user.username,
        sub: user['_id'],
        role: user.role,
      };
      const token = this._generateToken(payload);
      return {
        ...token,
        fullName: user.fullName,
        username: user.username,
      };
    } catch (error) {
      console.log('refreshTokenError:::', error);
      throw new BadRequestException('Refresh token is invalid');
    }
  }

  _generateToken(payload: any) {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expiresIn,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: jwtConstants.refreshTokenSecretKey,
        expiresIn: jwtConstants.refreshTokenExpiresIn,
      }),
    };
  }
}
