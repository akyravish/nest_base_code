import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKER],
    });
    this.consumer = this.kafka.consumer({
      groupId: process.env.KAFKA_GROUP_ID,
    });
  }

  private readonly consumers: Consumer[] = [];

  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topics: topic.topics,
      fromBeginning: true,
    });
    await this.consumer.run(config);
    this.consumers.push(this.consumer);
  }
}
