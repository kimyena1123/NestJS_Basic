import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController{
  constructor(private configService: ConfigService){} //ConfigService 주입

  @Get()
  getHello(): string{
    const message= this.configService.get("MESSAGE"); //configService.get() 호출
    
    return message;
  }

  @Get('service-url')
  getServiceUrl(): string{
    return this.configService.get('SERVER_URL'); 
  }

  @Get('db-info')
  getTest(): string{
    console.log(this.configService.get('logLevel')); //logLevel 터미널에 출력
    console.log(this.configService.get('apiVersion')); //apiVersion 터미널에 출력

    return this.configService.get('dbInfo'); //웹 브라우저에 dbInfo 표시
  }
  
  @Get('redis-info')
  getRedisInfo(): string{
    return `${this.configService.get('redis.host')}: ${this.configService.get('redis.port')}`;
  }





  
}