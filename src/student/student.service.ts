import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserRole } from '../generated/prisma/client';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async students(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { role: UserRole.STUDENT },
      include: {
        studentsInfo: true,
      },
    });
  }

  async student(id: number) {
    const res = await this.prisma.user.findUnique({
      where: { id },
      include: {
        studentsInfo: true,
      },
    });

    if (!res) {
      throw new NotFoundException(`Студент с id ${id} не найден`);
    }

    return res;
  }

  async create(createStudentDto: CreateStudentDto): Promise<User> {
    const { teacherId, languageLevel, ...userData } = createStudentDto;
    const existingStudent = await this.prisma.user.findUnique({
      where: { email: createStudentDto.email },
    });

    if (existingStudent) {
      throw new ConflictException(
        `Пользователь с email "${createStudentDto.email}" уже существует`,
      );
    }
    const teacher = await this.prisma.user.findUnique({
      where: { role: UserRole.TEACHER, id: teacherId },
    });

    if (!teacher) {
      throw new NotFoundException(
        `Учитель с id ${createStudentDto.teacherId} не найден`,
      );
    }

    const student = await this.prisma.user.create({
      data: {
        ...userData,
        role: UserRole.STUDENT,
        studentsInfo: {
          create: {
            teacherId: teacher.id,
            languageLevel,
          },
        },
      },
      include: { studentsInfo: true },
    });

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.prisma.user.findUnique({
      where: { id, role: UserRole.STUDENT },
    });

    if (!existingStudent) {
      throw new NotFoundException(`Студент с id ${id} не найден`);
    }

    if (
      updateStudentDto.email &&
      updateStudentDto.email !== existingStudent.email
    ) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: updateStudentDto.email },
      });

      if (existingEmail) {
        throw new ConflictException(
          `Пользователь с email "${updateStudentDto.email}" уже существует`,
        );
      }
    }

    const { teacherId, languageLevel, ...rest } = updateStudentDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        studentsInfo: {
          update: {
            teacherId,
            languageLevel,
          },
        },
      },
      include: { studentsInfo: true },
    });
  }

  async delete(id: number) {
    const student = await this.prisma.user.delete({
      where: { id },
    });
    return student;
  }
}
