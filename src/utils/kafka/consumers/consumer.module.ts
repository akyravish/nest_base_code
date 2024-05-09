import { KafkaModule } from '../kafka.module';
import { Module } from '@nestjs/common';
import { UserConsumer } from './user.consumer';

@Module({
  imports: [KafkaModule],
  providers: [UserConsumer],
})
export class ConsumerModule {}
