import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const existingTeacher = await this.teacherRepository.findOne({
      where: { email: createTeacherDto.email },
    });

    if (existingTeacher) {
      throw new ConflictException(
        `Учитель c email "${createTeacherDto.email}" уже существует`,
      );
    }
    const teacher = this.teacherRepository.create(createTeacherDto);

    return this.teacherRepository.save(teacher);
  }
}
