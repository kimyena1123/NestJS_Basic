import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // repository 주입 데코레이터
import { Repository } from 'typeorm'; //repository 임포트
import { User } from './user.entity';


//Injectable 데코레이터가 있으면 provider가 된다.
@Injectable()
export class UserService {
    constructor(
        //repository 주입
        //@InjectRepository(User)로 User 타입의 repository를 주입한다고 알려준다.
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    //유저 생성
    createUser(user): Promise<User>{
        return this.userRepository.save(user);
    }

    //이메일 정보로 한 명의 유저 정보 가져오기
    async getUser(email: string){
        const result = await this.userRepository.findOne({
            where: {email},
        });

        return result;
    }

    //유저 정보 업데이트, username과 password만 변경
    async updateUser(email, _user){
        const user: User = await this.getUser(email);
        console.log(_user);

        user.username = _user.username;
        user.password = _user.password;
        console.log(user);

        this.userRepository.save(user);
    }

    //유저 정보 삭제
    deleteUser(email: string){
        return this.userRepository.delete({email});
    }
}
