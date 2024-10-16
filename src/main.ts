import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe()); // for adding validations to the application
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
  logger.log('Application listening on port 3000');
}
bootstrap();
