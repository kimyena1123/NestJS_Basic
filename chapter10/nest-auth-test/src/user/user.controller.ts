//유저 컨트롤러는 유저가 요청을 보냈을 때 실행되는 핸들러 메서드를 정의한다. 
//유저 추가, 로그인에 사용할 1명의 유저 찾기, 정보 업데이트, 삭제 : 4가지 API에 대한 헨들러 메서드를 만들 예정

//유저 생성(/user/create)
//유저 정보 확인(/user/email)
//유저 정보 수정(/user/update)
//유저 삭제(/user/delete)

//유저가 HTTP 요청을 보내면 UserController -> UserService -> UserRepository 순으로 호출한다. 
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

//localhost:PORT/user
@Controller('user') //컨트롤러 설정 데코레이터
export class UserController {
    constructor(private userService: UserService){} //유저 서비스 주입

    @Post('/create') //localhost:PORT/user/create
    createUser(@Body() user: CreateUserDto){
        return this.userService.createUser(user);
    }

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string){
        const user = await this.userService.getUser(email);
        console.log(user);

        return user;
    }

    @Put('/update:/email')
    updateUser(@Param('email') email: string, @Body() user: UpdateUserDto){
        console.log(user);

        return this.userService.updateUser(email, user);
    }

    @Delete('/delete/:email')
    deleteUser(@Param('email') email: string){
        return this.userService.deleteUser(email);
    }

}
