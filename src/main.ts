import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validationOptions } from './utils/validation-options';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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
  const port = configService.get('APP_PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  await app.listen(port);
}
bootstrap();
