import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/api/users/users.service';

@Injectable()
export class JwtAuthService extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  /*
   * @desc: create token
   * @param: {id}
   * @return: {token}
   */
  async createToken(id: string): Promise<any> {
    try {
      const tokenPayload = { userId: id };
      const secret = process.env.JWT_SECRET;
      const token = await this.jwtService.signAsync(tokenPayload, {
        secret,
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      return {
        accessToken: token,
      };
    } catch (error: any) {
      console.log(
        '🚀 ~ file: jwt.service.ts:28 ~ JwtAuthService ~ createToken ~ error:',
        error,
      );
      throw new UnauthorizedException();
    }
  }

  /**
   * @description verify token and assign user to req
   * @param token
   * @returns {}
   */
  async validate(data: any): Promise<any> {
    try {
      const user = await this.userService.findOneById(data.userId);
      if (!user) {
        throw new HttpException('Invalid token', 401);
      }
      return user;
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }
}
