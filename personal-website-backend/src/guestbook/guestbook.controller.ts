import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get() // Requirement: GET method
  findAll() {
    return this.guestbookService.getEntries();
  }

  @Post() // Requirement: POST method
  create(@Body() body: { name: string; message: string }) {
    return this.guestbookService.createEntry(body.name, body.message);
  }
}