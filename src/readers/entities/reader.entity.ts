import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BorrowedRecord } from '../../borrow/entities/borrowed-record.entity';

@Entity('readers')
export class Reader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToMany(() => BorrowedRecord, (record) => record.reader)
  borrowedRecords: BorrowedRecord[];
}