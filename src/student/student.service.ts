import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { Student } from './entities/student.entity';
import { student } from '../generated/prisma/client';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async students(): Promise<student[]> {
    return this.prisma.student.findMany();
  }

  async student(id: number) {
    const res = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!res) {
      throw new NotFoundException(`Студент с id ${id} не найден`);
    }

    return res;
  }

  async create(createStudentDto: CreateStudentDto) {
    const existingStudent = await this.prisma.student.findUnique({
      where: { email: createStudentDto.email },
    });

    if (existingStudent) {
      throw new ConflictException(
        `Студент с email "${createStudentDto.email}" уже существует`,
      );
    }
    const student = this.prisma.student.create({
      data: createStudentDto,
    });
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      throw new NotFoundException(`Студент с id ${id} не найден`);
    }

    return this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  async delete(id: number) {
    const student = await this.prisma.student.delete({
      where: { id },
    });
    return student;
  }
}
