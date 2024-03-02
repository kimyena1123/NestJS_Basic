import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  constructor(private configService: ConfigService) {}

  @Get()
  public getWeather(): string {
    //환경 변수값 가져오기
    const apiUrl = this.configService.get('WEATHER_API_URL');
    const apiKey = this.configService.get('WEATHER_API_KEY');

    //내부 함수인 callWeatherAPI() 호출
    return this.callWeatherApi(apiUrl, apiKey);
  }

  private callWeatherApi(apiUrl: string, apiKey: string): string {
    console.log('get...');
    console.log(apiUrl);
    console.log(apiKey);
    return '내일은 맑음'; //localhost:3000/weather 이라고 구글창에.
  }
}