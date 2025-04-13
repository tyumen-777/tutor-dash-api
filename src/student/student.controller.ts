import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Patch(':id')
  updateStudent(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Get()
  getAllStudents() {
    return this.studentService.findAll();
  }

  @Get(':id')
  getStudent(@Param('id') id: number) {
    return this.studentService.findOne(id);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: number) {
    return this.studentService.delete(id);
  }
}
