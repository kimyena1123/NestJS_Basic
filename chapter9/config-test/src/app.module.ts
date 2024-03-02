import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WeatherModule } from './weather/weather.module';
import { WeatherController } from './weather/weather.controller';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), WeatherModule], //전역 모듈 설정 추가
  controllers: [AppController, WeatherController],
  providers: [AppService],
})

export class AppModule {}