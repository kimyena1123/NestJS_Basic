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

    async validateUser(email:string, password:string){
        //이메일로 유저 정보를 받아옴
        const user = await this.userService.getUser(email);

        if(!user){ //유저가 없으면 검증 실패
            return null;
        }
        
        //패스워드를 따로 뽑아냄
        //패스워드를 검증해야 하는데 유저 정보에서 패스워드만 따로 뽑아서 hashedPassword라는 변수로 받아온다.
        const {password: hashedPassword, ...userInfo} = user;
        if(bcrypt.compareSync(password, hashedPassword)){ 
            //bcrypt.compasreSync(data, encrypted) 함수에서 
            //data는 입력받은 패스워드 값, 두번째에는 패스워드 해시값을 넣어주면, 바르게 암호화된 경우 userInfo를 반환한다. 아니라면 null을 반환한다.
            return userInfo;
        }
        return null;
    }

    
}


