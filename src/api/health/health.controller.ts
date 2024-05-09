import { Controller, Get, HttpException, Req, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { CacheService } from 'src/utils/redis/redis.service';
// import { ProducerService } from 'src/utils/kafka/producer.service';
import { RabbitMQService } from 'src/utils/rabbitmq/rabbitmq.service';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthService } from 'src/utils/jwt/jwt.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly cacheService: CacheService,
    // private readonly producerService: ProducerService,
    private readonly rabbitMqService: RabbitMQService,
    private readonly jwtService: JwtAuthService,
  ) {}

  /*
   * @desc: health check
   * @param: {}
   * @return: { error: boolean, statusCode: number, timestamp: string, path: string, method: string, message: string, data: any }
   */
  @Get('')
  async healthCheck(@Req() req: any): Promise<any> {
    try {
      const obj = {
        pattern: 'test',
        data: {
          name: 'test',
          email: 'test@gmail.com',
          phone: '1234567890',
        },
      };
      // const message = await this.rabbitMqService.sendBlogToQueue(obj.pattern, obj.data);
      return await this.healthService.healthCheck();
    } catch (error: any) {
      console.log(
        '🚀 ~ file: health.controller.ts:17 ~ HealthController ~ healthCheck ~ error:',
        error,
      );
      throw new HttpException(error.message, error.status);
    }
  }

  @MessagePattern('test')
  public async acceptOffer(@Payload() data: any, @Ctx() context: any) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log(
      '🚀 ~ file: health.controller.ts:17 ~ HealthController ~ acceptOffer ~ data',
      data,
    );
    // channel.ack(originalMsg);
  }

  @Get('grpc-hello-nft')
  public async helloNft(): Promise<any> {
    try {
      const data = {
        message: 'HI, NFT',
      };
      return await this.healthService.helloNft(data);
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('grpc-hello-admin')
  public async helloAdmin(): Promise<any> {
    try {
      const data = {
        message: 'HI ADMIN',
      };
      return await this.healthService.helloAdmin(data);
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('jwt-test')
  public async jwtTest(@Req() req: any): Promise<any> {
    console.log(
      '🚀 ~ file: health.controller.ts:69 ~ HealthController ~ jwtTest ~ req:',
      req.user,
    );
    try {
      const data = {
        id: '1',
      };
      const token = await this.jwtService.createToken(data.id);
      console.log(
        '🚀 ~ file: health.controller.ts:72 ~ HealthController ~ jwtTest ~ token:',
        token,
      );
      return {
        token,
      };
    } catch (error: any) {
      console.log(
        '🚀 ~ file: health.controller.ts:55 ~ HealthController ~ grpcTest ~ error:',
        error,
      );
      throw new HttpException(error.message, error.status);
    }
  }
}
