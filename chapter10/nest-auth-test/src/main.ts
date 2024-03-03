import { ValidationPipe } from '@nestjs/common'; //validationPipe 임포트 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //전역 파이프에 validationPipe 객체 추가

  await app.listen(3000);
}
bootstrap();
