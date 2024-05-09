import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/error/exceptionFilter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './api/auth/auth.module';
import { HealthModule } from './api/health/health.module';
import { UsersModule } from './api/users/users.module';
import { JwtAuthModule } from './utils/jwt/jwt.module';
import * as dotenv from 'dotenv';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './utils/redis/redis.module';
// import { KafkaModule } from './utils/kafka/kafka.module';
// import { ConsumerModule } from './utils/kafka/consumers/consumer.module';
import { RabbitMqModule } from './utils/rabbitmq/rabbitmq.module';
import { GrpcModule } from './api/grpc/grpc.module';
import { SocketModule } from './api/socket/socket.module';
dotenv.config();

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // 60 seconds
      limit: 10, // 10 requests
    }),
    AuthModule,
    HealthModule,
    UsersModule,
    JwtAuthModule,
    DatabaseModule,
    CacheModule,
    // KafkaModule,
    // ConsumerModule,
    RabbitMqModule,
    GrpcModule,
    SocketModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
