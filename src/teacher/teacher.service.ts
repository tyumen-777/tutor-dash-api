import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const existingTeacher = await this.prisma.teacher.findUnique({
      where: { phone: createTeacherDto.phone },
    });

    if (existingTeacher) {
      throw new ConflictException(
        `Учитель c phone "${createTeacherDto.phone}" уже существует`,
      );
    }
    const teacher = this.prisma.teacher.create({
      data: createTeacherDto,
    });

    return teacher;
  }

  teachers() {
    return this.prisma.teacher.findMany({
      include: {
        students: true,
      },
    });
  }

  async teacher(id: number) {
    const res = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!res) {
      throw new NotFoundException(`Учитель с id ${id} не найден`);
    }

    return res;
  }
}
