import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WeatherModule } from './weather/weather.module';
import { WeatherController } from './weather/weather.controller';

console.log('env: ' + process.env.NODE_ENV); //기동 시 환경 변수 출력

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), WeatherModule], //전역 모듈 설정 추가
  controllers: [AppController, WeatherController],
  providers: [AppService],
})

export class AppModule {}