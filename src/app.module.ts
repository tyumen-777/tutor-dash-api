import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [ConfigModule.forRoot(), StudentModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
