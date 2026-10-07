import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BorrowedRecord } from '../../borrow/entities/borrowed-record.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => BorrowedRecord, (record) => record.book)
  borrowedRecords: BorrowedRecord[];
}