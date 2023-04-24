import {
  Injectable,
  Inject,
  forwardRef,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
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

  //generate token for register user
  async createToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_TOKEN_SECRET,
      expiresIn: process.env.JWT_TOKEN_EXPIRE,
    });
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }

  async login(user: any) {
    const tokens = await this.getTokens(user);
    console.log(user, tokens);
    await this.updateRefreshToken(user._doc._id, tokens.refreshToken);
    return {
      ...tokens,
      fullName: user._doc.fullName,
      username: user._doc.username,
    };
  }

  async getTokens(user) {
    const payload = {
      username: user._doc.username,
      sub: user._doc._id,
      roles: user._doc.roles,
      fullName: user._doc.fullName,
    };

    const refreshPayload = {
      sub: user._doc._id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_TOKEN_SECRET,
        expiresIn: process.env.JWT_TOKEN_EXPIRE,
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_RENEW_TOKEN_EXPIRE,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const saltOrRounds = 10;
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
