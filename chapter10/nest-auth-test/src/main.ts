import { ValidationPipe } from '@nestjs/common'; //validationPipe 임포트 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { join } from 'path';
import * as express from 'express';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe()); //전역 파이프에 validationPipe 객체 추가

  // EJS 설정 (타입 어설션)
  (app as any).engine('ejs', require('ejs').renderFile);
  (app as any).set('view engine', 'ejs');
  (app as any).set('views', join(__dirname, '..', 'views'));

  await app.listen(PORT);
}

bootstrap();

console.log("#############Check##########");
console.log(`http://localhost:${PORT}`);