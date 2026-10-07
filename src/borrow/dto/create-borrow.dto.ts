import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateBorrowDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  readerId: number;

  @IsNotEmpty()
  @IsDateString()
  borrowDate: string; // YYYY-MM-DD

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;    // YYYY-MM-DD
}