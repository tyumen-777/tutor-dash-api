import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    const res = await this.studentRepository.findOneBy({ id });

    if (!res) {
      throw new NotFoundException(`Студент с id ${id} не найден`);
    }

    return res;
  }

  async create(createStudentDto: CreateStudentDto) {
    const existingStudent = await this.studentRepository.findOne({
      where: { email: createStudentDto.email },
    });

    if (existingStudent) {
      throw new ConflictException(
        `Студент с email "${createStudentDto.email}" уже существует`,
      );
    }
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.studentRepository.preload({
      id: id,
      ...updateStudentDto,
    });
    if (!existingStudent) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return this.studentRepository.save(existingStudent);
  }

  async delete(id: number) {
    const student = await this.findOne(id);
    return this.studentRepository.remove(student);
  }
}
