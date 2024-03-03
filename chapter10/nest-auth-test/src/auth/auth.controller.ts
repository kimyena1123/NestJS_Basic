import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){} //AuthSerivce를 주입받음

    @Post('register') //localhost:3000/auth/register
    async register(@Body() userDto: CreateUserDto){
        
        return await this.authService.register(userDto);
    }

}
