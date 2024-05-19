import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TelegramBotModule } from './telegram-bot.module';

async function bootstrapTelegramBot() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TelegramBotModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'telegram_bot_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen();
  console.log('Telegram Bot Microservice is listening');
}

bootstrapTelegramBot();
