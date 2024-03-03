import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WeatherModule } from './weather/weather.module';
import { WeatherController } from './weather/weather.controller';

console.log('env: ' + process.env.NODE_ENV); //기동 시 환경 변수 출력
console.log('current working directory: ' + process.cwd()); //현재 디렉토리 출력
//process.cwd()는 현재 디렉터리의 절대 경로를 출력해준다. 
//npm run을 실행하면 chapter9/config-test의 경로에서 실행하므로 {사용자의 프로젝트 경로}/chapter9/config-test가 출력된다. 
//이 값을 envFilePath에서 사용한다. 

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,
                                  envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`
                                }), 
                                WeatherModule, 
           ], //전역 모듈 설정 추가
  controllers: [AppController, WeatherController],
  providers: [AppService],
})

export class AppModule {}