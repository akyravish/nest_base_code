import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../consumer.service';

@Injectable()
export class UserConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    this.consumerService.consume(
      {
        topics: ['test', 'green_blog_user_service'],
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: JSON.parse(message.value.toString()),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
