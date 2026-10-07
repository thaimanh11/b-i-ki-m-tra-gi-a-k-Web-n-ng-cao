import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { Reader } from '../../readers/entities/reader.entity';

@Entity('borrowed_records')
export class BorrowedRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.borrowedRecords, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => Reader, (reader) => reader.borrowedRecords, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reader_id' })
  reader: Reader;

  @Column({ type: 'date' })
  borrowDate: string;

  @Column({ type: 'date' })
  dueDate: string;

  @Column({ type: 'date', nullable: true })
  returnDate: string;
}