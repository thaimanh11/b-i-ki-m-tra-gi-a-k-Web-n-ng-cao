import { Controller, Post, Get, Body } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  // POST /borrow: Mượn sách (Câu 3.3)
  @Post()
  async borrowBook(@Body() dto: CreateBorrowDto) {
    return await this.borrowService.borrowBook(dto);
  }

  // GET /borrow/list: Xem danh sách sách đã mượn (Câu 3.4)
  @Get('list')
  async getBorrowedBooks() {
    return await this.borrowService.getBorrowedBooks();
  }

  // POST /borrow/seed: Tạo nhanh sách và độc giả mẫu
  @Post('seed')
  async seed() {
    return await this.borrowService.seedInitialData();
  }
}