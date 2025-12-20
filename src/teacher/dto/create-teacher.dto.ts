import { IsEmail, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
