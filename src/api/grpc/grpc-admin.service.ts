import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ADMIN_GRPC } from './grpc.constant';

@Injectable()
export class GrpcAdminService {
  constructor(
    @Inject(ADMIN_GRPC.SERVICE_NAME) private readonly adminClient: ClientGrpc,
  ) {}
  // user GRPC client
  private adminSvc: any = this.adminClient.getService(ADMIN_GRPC.SERVICE_NAME);
  public helloAdmin(data: any): Promise<any> {
    return this.adminSvc.GetHello(data).toPromise();
  }
}
