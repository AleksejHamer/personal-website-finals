import { Module } from '@nestjs/common';
import { GuestbookController } from './guestbook.controller';
import { GuestbookService } from './guestbook.service';

@Module({
  controllers: [GuestbookController],
  providers: [GuestbookService],
  exports: [GuestbookService], // Optional: allows other modules to use it
})
export class GuestbookModule {} // Make sure this name is correct!