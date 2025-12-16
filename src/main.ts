import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validationOptions } from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS для всех origins (для разработки)
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Student API')
    .setDescription('Student API description')
    .setVersion('1.0')
    .addTag('students')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  await app.listen(3000);
}
bootstrap();
