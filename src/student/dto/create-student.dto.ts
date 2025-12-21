import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { Gender } from '../../generated/prisma/enums';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNumber()
  teacherId: number;
}
