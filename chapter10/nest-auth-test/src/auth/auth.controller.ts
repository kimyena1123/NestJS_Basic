import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';


@Controller('auth') //localhost:port/auth
export class AuthController {
    constructor(private authService: AuthService){} //AuthSerivce 주입받음

    @Post('/register') //register 주소로 POST 온 요청 처리
    //class-validator가 자동으로 유효성 검증
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto); //authService를 사용해 user 정보 저장
    }

    @Post('/login')
    async login(@Request() req, @Response() res){
        //validateUser를 호출해 유저 정보 획득
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );

        //유저 정보가 있으면, 쿠키 정보를 response에 저장
        if(userInfo){
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false, //브라우저에서 읽을 수 있도록 한다.
                maxAge: 1000 * 60 * 60 * 24 * 7. //7day 단위는 밀리초
            });
        }
        return res.send({message: 'login success'});
    }
}
