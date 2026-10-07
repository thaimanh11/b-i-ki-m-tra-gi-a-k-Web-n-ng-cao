import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowedRecord } from './entities/borrowed-record.entity';
import { Book } from '../books/entities/book.entity';
import { Reader } from '../readers/entities/reader.entity';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowedRecord)
    private readonly borrowRepo: Repository<BorrowedRecord>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
    @InjectRepository(Reader)
    private readonly readerRepo: Repository<Reader>,
  ) {}

  // 3.3: Chức năng độc giả mượn sách, lưu vào BorrowedRecord
  async borrowBook(dto: CreateBorrowDto): Promise<BorrowedRecord> {
    const book = await this.bookRepo.findOne({ where: { id: dto.bookId } });
    if (!book) {
      throw new NotFoundException(`Không tìm thấy sách có ID: ${dto.bookId}`);
    }
    if (!book.isAvailable) {
      throw new BadRequestException('Sách đã có người mượn, vui lòng chọn cuốn khác.');
    }

    const reader = await this.readerRepo.findOne({ where: { id: dto.readerId } });
    if (!reader) {
      throw new NotFoundException(`Không tìm thấy độc giả có ID: ${dto.readerId}`);
    }

    // Đánh dấu sách không còn khả dụng
    book.isAvailable = false;
    await this.bookRepo.save(book);

    // Lưu bản ghi mượn sách
    const record = this.borrowRepo.create({
      book,
      reader,
      borrowDate: dto.borrowDate,
      dueDate: dto.dueDate,
    });

    return await this.borrowRepo.save(record);
  }

  // CÂU 3.4: Liệt kê danh sách Sách đã mượn
  async getBorrowedBooks() {
    const records = await this.borrowRepo.find({
      relations: {
        book: true,
        reader: true,
      },
      order: { id: 'DESC' },
    });

    return records.map((record) => ({
      borrowId: record.id,
      bookTitle: record.book?.title,
      author: record.book?.author,
      borrowerName: record.reader?.fullName,
      borrowerEmail: record.reader?.email,
      borrowDate: record.borrowDate,
      dueDate: record.dueDate,
      returnDate: record.returnDate || 'Chưa trả',
    }));
  }

  // Khởi tạo dữ liệu mẫu để test API
  async seedInitialData() {
    let book = await this.bookRepo.findOne({ where: { title: 'Lập trình NestJS' } });
    if (!book) {
      book = await this.bookRepo.save({
        title: 'Lập trình NestJS',
        author: 'Nest Core Team',
        isAvailable: true,
      });
    }

    let reader = await this.readerRepo.findOne({ where: { email: 'student@phenikaa.edu.vn' } });
    if (!reader) {
      reader = await this.readerRepo.save({
        fullName: 'Thái Doãn Mạnh',
        email: '23010336@st.phenikaa-uni.edu.vn',
        phoneNumber: '0987654321',
      });
    }

    return { message: 'Tạo dữ liệu mẫu thành công', book, reader };
  }
}