import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MESSAGES } from 'src/common/constant/constant';
import { successResponse } from 'src/common/error/responseHandler';
import { JwtAuthService } from 'src/utils/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtAuthService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    return successResponse(MESSAGES.AUTH.LOGIN_SUCCESS, {
      access_token: await this.jwtService.createToken(user.userId || ''),
    });
  }
}
