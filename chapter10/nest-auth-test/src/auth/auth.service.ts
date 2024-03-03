import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable() //프로바이더로 사용
export class AuthService {
    //생성자에서 UserService를 주입받음
    constructor(private userService: UserService){}

    async register(userDto: CreateUserDto){
        //이미 가입된 유저가 있는지 체크
        const user = await this.userService.getUser(userDto.email);

        if(user){
            //이미 가입된 유저라면 에러 발생
            throw new HttpException('해당 유저가 이미 있습니다.', HttpStatus.BAD_REQUEST,);
        }

        //이미 가입된 유저가 아니라면
        //패스워드 암호화
        //암호화 처리를 10번 하곗다는 의미. 숫자가 올라갈수록 해시값(암호화된 문자열)을 얻는데 시간이 오래 걸린다.
        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

        //데이터베이스에 저장. 저장 중 에러가 나면 에러 발생
        try{
            const user = await this.userService.createUser({
                ...userDto, 
                password: encryptedPassword,
            });

            //회원가입 후 반환하는 값에는 password를 주지 않음
            //패스워드 정보를 넘겨주는 것은 보안에 문제가 될 수 있으니 undefined로 해서 데이터를 넘겨주는 값에서 데이터를 삭제한다.
            user.password = undefined;
            
            return user;
        }catch(error){
            throw new HttpException('서버 에러', 500);
        }
    }
}
