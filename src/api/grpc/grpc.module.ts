import { Module } from '@nestjs/common';
import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NFT_GRPC, ADMIN_GRPC } from './grpc.constant';
import { GrpcAdminService } from './grpc-admin.service';
import { GrpcNftService } from './grpc-nft.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NFT_GRPC.SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_NFT_URL,
          package: NFT_GRPC.PACKAGE_NAME,
          protoPath: ['src/proto/nft.proto'],
          loader: { keepCase: true, arrays: true },
        },
      },
      {
        name: ADMIN_GRPC.SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_ADMIN_URL,
          package: ADMIN_GRPC.PACKAGE_NAME,
          protoPath: ['src/proto/admin.proto'],
          loader: { keepCase: true, arrays: true },
        },
      },
    ]),
  ],
  controllers: [GrpcController],
  providers: [GrpcService, GrpcAdminService, GrpcNftService],
  exports: [GrpcService, GrpcAdminService, GrpcNftService],
})
export class GrpcModule {}
