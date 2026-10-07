import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Book } from './books/entities/book.entity';
import { Reader } from './readers/entities/reader.entity';
import { BorrowedRecord } from './borrow/entities/borrowed-record.entity';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Mthaidoan05',
      database: 'library_db',
      entities: [Book, Reader, BorrowedRecord],
      synchronize: true,
    }),
    BorrowModule,
  ],
})
export class AppModule {}