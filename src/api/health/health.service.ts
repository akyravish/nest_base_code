import { Injectable } from '@nestjs/common';
import { successResponse } from 'src/common/error/responseHandler';
import { GrpcAdminService } from '../grpc/grpc-admin.service';
import { GrpcNftService } from '../grpc/grpc-nft.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly grpcAdminService: GrpcAdminService,
    private readonly grpcNftService: GrpcNftService,
  ) {}

  /*
   * @desc: health check
   * @param: {}
   * @return: { error: boolean, statusCode: number, timestamp: string, path: string, method: string, message: string, data: any }
   */
  async healthCheck(): Promise<any> {
    return successResponse('Health check success', {});
  }

  async helloNft(data: any): Promise<any> {
    const res = await this.grpcNftService.helloNft(data);
    return successResponse('SUCCESS', res);
  }

  async helloAdmin(data: any): Promise<any> {
    const res = await this.grpcAdminService.helloAdmin(data);
    return successResponse('SUCCESS', res);
  }
}
