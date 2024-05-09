import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import * as dotenv from 'dotenv';
dotenv.config();

const rabbitMqUrls = [process.env.RABBITMQ_URL];
const queues = ['GREEN_BLOG_SERVICE'];

@Module({
  imports: [
    ClientsModule.register(
      queues.map((queue) => ({
        name: queue,
        transport: Transport.RMQ,
        options: {
          urls: rabbitMqUrls,
          queue,
          queueOptions: { durable: true },
          prefetchCount: 1, // 1 message per receiver
        },
      })),
    ),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMqModule {}
