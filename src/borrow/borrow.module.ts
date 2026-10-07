import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { BorrowedRecord } from './entities/borrowed-record.entity';
import { Book } from '../books/entities/book.entity';
import { Reader } from '../readers/entities/reader.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedRecord, Book, Reader])],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}