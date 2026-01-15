import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { UserRole } from 'src/generated/prisma/enums';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<User> {
    const existingTeacher = await this.prisma.user.findUnique({
      where: { email: createTeacherDto.email },
    });

    if (existingTeacher) {
      throw new ConflictException(
        `Пользователь c email "${createTeacherDto.email}" уже существует`,
      );
    }
    const teacher = await this.prisma.user.create({
      data: {
        ...createTeacherDto,
        role: UserRole.TEACHER,
        teachersInfo: { create: {} },
      },
      include: { teachersInfo: true },
    });

    return teacher;
  }

  teachers(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { role: UserRole.TEACHER },
      include: {
        teachersInfo: true,
      },
    });
  }

  async teacher(id: number) {
    const res = await this.prisma.user.findUnique({
      where: { id },
      include: {
        teachersInfo: true,
      },
    });

    if (!res) {
      throw new NotFoundException(`Учитель с id ${id} не найден`);
    }

    return res;
  }
}
