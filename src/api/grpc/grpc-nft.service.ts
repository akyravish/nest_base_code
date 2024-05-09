import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { NFT_GRPC } from './grpc.constant';

@Injectable()
export class GrpcNftService {
  constructor(
    @Inject(NFT_GRPC.SERVICE_NAME) private readonly nftClient: ClientGrpc,
  ) {}
  // user GRPC client
  private nftSvc: any = this.nftClient.getService(NFT_GRPC.SERVICE_NAME);

  public helloNft(data: any): Promise<any> {
    return this.nftSvc.GetHello(data).toPromise();
  }
}
