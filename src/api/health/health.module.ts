import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { JwtAuthModule } from 'src/utils/jwt/jwt.module';
import { CacheModule } from 'src/utils/redis/redis.module';
// import { KafkaModule } from 'src/utils/kafka/kafka.module';
import { RabbitMqModule } from 'src/utils/rabbitmq/rabbitmq.module';
import { GrpcModule } from '../grpc/grpc.module';

@Module({
  imports: [
    JwtAuthModule,
    CacheModule,
    // KafkaModule,
    RabbitMqModule,
    GrpcModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
