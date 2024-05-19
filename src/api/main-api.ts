import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ApiModule } from './api.module';

async function bootstrapApi() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'api_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen();
  console.log('API Microservice is listening');
}

bootstrapApi();
