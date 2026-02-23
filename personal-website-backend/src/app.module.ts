import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestbookModule } from './guestbook/guestbook.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads your .env keys
    GuestbookModule, // This pulls in the logic we just fixed above
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}