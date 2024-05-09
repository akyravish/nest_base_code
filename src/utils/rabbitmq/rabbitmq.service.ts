import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('GREEN_BLOG_SERVICE')
    private readonly blogServiceClient: ClientProxy,
  ) {}

  public async sendBlogToQueue(pattern: string, data: any) {
    return this.blogServiceClient.send(pattern, data).subscribe();
  }
}
