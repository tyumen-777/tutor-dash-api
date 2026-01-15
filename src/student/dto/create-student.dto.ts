import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LanguageLevel, Gender } from 'src/generated/prisma/enums';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsNumber()
  teacherId: number;

  @IsOptional()
  @IsEnum(LanguageLevel)
  languageLevel?: LanguageLevel;
}
