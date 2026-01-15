import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';

import { PrismaModule } from '@common/database';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    StudentModule,
    TeacherModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
