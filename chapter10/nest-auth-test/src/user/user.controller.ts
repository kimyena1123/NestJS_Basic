import { Body, Controller, Get, Post, Param, Put, Delete } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('user') //localhost:3000/user 로 시작한다.
export class UserController{

    //userService 주입
    constructor(private userService: UserService){}; 

    //유저 생성
    @Post('/create') //localhost:3000/user/create
    createUser(@Body() user: User){
        return this.userService.createUser(user);
    }

    //유저 한 명 찾기(email로 한 행 정보 가져오기)
    @Get('/getUser/:email') //localhost:3000/user/getUser/[email정보]
    async getUser(@Param('email') email: string){
        const user = await this.userService.getUser(email);
        console.log(user);

        return user;
    }

    //email로 해당 유저 정보 수정하기(업데이트)
    @Put('/update/:email') //localhost:3000/user/update/[email정보]
    updateUser(@Param('email') email: string, @Body() user: User){
        console.log(user);

        return this.userService.updateUser(email, user);
    }

    //헤당 email에 일치하는 유저 삭제하기
    @Delete('/delete/:email') //localhost:3000/user/delete/[email정보]
    deleteUser(@Param('email') email: string){
        return this.userService.deleteUser(email);
    }




}