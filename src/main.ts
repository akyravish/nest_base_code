import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as hpp from 'hpp';
import { HttpException, Inject, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './utils/interceptors/logging.interceptor';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import {
  ClientKafka,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export class App {
  async start() {
    // PORT
    const port = process.env.PORT || 3001;
    const app = await NestFactory.create(AppModule);

    // RABBITMQ SERVICE CONNETION
    const connectToQueue = async (queue: string) => {
      try {
        app.connectMicroservice<MicroserviceOptions>({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue,
            noAck: false,
            prefetchCount: 1,
          },
        });
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    };

    await connectToQueue('GREEN_BLOG_SERVICE');

    // GRPC SERVICE CONNETION
    await app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
        url: process.env.GRPC_USER_URL,
        package: 'user',
        protoPath: ['src/proto/user.proto'],
        loader: { keepCase: true, arrays: true },
      },
    });

    // CORS
    app.enableCors();

    // HELMET
    app.use(
      helmet({
        contentSecurityPolicy: {
          // which sources are allowed to be used
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            fontSrc: ["'self'"],
            imgSrc: ["'self'"],
          },
        },
        referrerPolicy: { policy: 'same-origin' }, // how much information the browser sends in the HTTP Referer
        frameguard: { action: 'sameorigin' }, // allows you to control whether your site can be put in a frame
        dnsPrefetchControl: { allow: false }, // controls browser DNS prefetching
        expectCt: { maxAge: 86400, enforce: true }, // helps mitigate the risk of HTTPS misconfiguration by reducing the window of exposure to potential
        hidePoweredBy: true, // removes the X-Powered-By header
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // HTTP Strict Transport Security
        ieNoOpen: true, // sets X-Download-Options for IE8+
        noSniff: true, // sets X-Content-Type-Options to nosniff
        xssFilter: true, // sets X-XSS-Protection to 0
      }),
    );

    // HPP
    app.use(hpp());

    // SET GLOBAL PREFIX
    app.setGlobalPrefix('users/api/v1');

    // VALIDATION
    app.useGlobalPipes(new ValidationPipe());

    // LOGGING
    const logger = WinstonModule.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'logs/info.log',
          level: 'info',
        }),
      ],
    });

    app.useGlobalInterceptors(new LoggingInterceptor(logger));

    app.startAllMicroservices();

    await app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}

const app = new App();
app.start();
