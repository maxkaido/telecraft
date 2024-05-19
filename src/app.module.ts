import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [TelegramBotModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
