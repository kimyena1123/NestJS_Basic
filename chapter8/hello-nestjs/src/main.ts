import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

//NestJS를 시작시키는 함수
async function bootstrap(){
    //NestFactory를 사용해 NestApplication 객체 생성
    const app = await NestFactory.create(HelloModule);

    //3001번 포트로 서버 기동
    await app.listen(3001, () => {console.log("서버 시작!")});
}

bootstrap();
