import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from 'src/generated/prisma/enums';

export class CreateTeacherDto {
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
}
