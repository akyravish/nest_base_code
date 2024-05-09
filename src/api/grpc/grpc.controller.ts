import { Controller, HttpException } from '@nestjs/common';
import { GrpcService } from './grpc.service';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_GRPC } from './grpc.constant';

@Controller('grpc')
export class GrpcController {
  constructor(private readonly grpcService: GrpcService) {}

  @GrpcMethod(USER_GRPC.SERVICE_NAME, 'GetHello')
  private async GetHello(data: any): Promise<any> {
    try {
      return {
        error: false,
        message: 'SUCCESS',
        data: {
          message: data.message,
        },
      };
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }
}
