import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable() //프로바이더로 사용
export class AuthService {
    //생성자에서 UserService를 주입받음
    constructor(private userService: UserService){}

    async register(userDto: CreateUserDto){
        //이미 가입된 유저가 있는지 체크
        const user = await this.userService.getUser(userDto.email);

        if(user){
            //이미 가입된 유저가 있다면 에러 발생
            throw new HttpException('해당 유저가 이미 있습니다.', HttpStatus.BAD_REQUEST,);
        };

        //패스워드 암호화
        const encryptedPassword = bcrypt.hashSync(userDto.password, 10); 

        //데이터베이스에 저장. 저장 중 에러가 나면 서버 에러 발생
        try{
            const user = await this.userService.createUser({
                ...userDto,
                password: encryptedPassword,
            });
            //회원가입 후 반환하는 값에는 password를 주지 않음
            user.password = undefined;

            return user;
        }catch(error){
            throw new HttpException('서버 에러', 500);
        }
    }

    
}


