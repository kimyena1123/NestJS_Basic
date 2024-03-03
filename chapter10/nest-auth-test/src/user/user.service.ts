import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //repository 주입 데코레이터
import { Repository } from 'typeorm'; //repository 임포트
import { User } from './user.entity';

@Injectable() //의존성 주입을 위한 데코레이터
export class UserService {

    // repository 주입 (여기서 repository는 내가 만든 게 아닌 라이브러리 repository이다)
    constructor(
        //형식: Repository<Entity>
        @InjectRepository(User) private userRepsitory: Repository<User>, //User 테이블의 Repository라고 생각하면 됨
    ){}

    //Repository<Entity>메서드
            // find: DB의 select 역할. 
            // findOne: 값을 하나만 찾을 때(한 개의 행 select)
            // findAndCount: find로 쿼리해오는 객체와 더불어 엔티티의 개수가 필요한 경우 사용
            // create: 새로운 엔티티 인스턴스를 만들 때 사용한다(행 한 개 추가할 때 - insert)
            // update: 엔티티의 일부를 업데이트할 때 사용한다 => update(조건, Partial<Entity>, 옵션)
            // save : 엔티티를 데이터베이스에 저장한다. 엔티티가 없으면 insert를 하고, 있으면 update를 한다.
            // delete: 엔티티가 데이터베이스에 있는 체크하지 않고 조건에 해당하는 delete 쿼리를 실행한다.
            // remove: 받은 엔티티를 데이터베이스에서 삭제한다.


    //유저 생성
    createUser(user): Promise<User>{
        return this.userRepsitory.save(user);
    }

    //유저 한 명 찾기(email로 한 행 정보 가져오기)
    async getUser(email: string){
        const result = await this.userRepsitory.findOne({
            where: {email},
        });

        return result;
    }

    //email로 해당 유저 정보 수정하기
    async updateUser(email: string, _user){
        //username과 password만 변경

        //email에 해당하는 유저 정보 가져와서 
        const user: User = await this.getUser(email);
        console.log(user);

        user.username = _user.username;
        user.password = _user.password;
        console.log(user);

        this.userRepsitory.save(user);
    }

    //해당 email에 해당하는 유저 삭제하지
    deleteUser(email: any){
        return this.userRepsitory.delete({email});
    }
    

}
