//생성 시와 수정 시 검사 항목이 다르기 때문에 CreateUserDto와 UpdateUserDto를 따로 만들 것임
//유효성 검증이 가능ㄴ하도록 class-validator를 임포트해주고
//IsEmail, IsString 임포트한다. 
import { IsEmail, IsString } from "class-validator";

//email, password, username 필드(열)을 만들고 데코레이터 붙이기
export class CreateUserDto{
    //User 테이블(엔티티)에 id, email, password, username이 있다.
    //email 필드엔는 @IsEmail을 붙여서 이메일인지 검증하고
    //그 외에는 IsString을 붙여서 문자열이 들어갈 수 있게 해준다.
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    username: string;
}

//업데이트의 유효성 검증 시 사용할 DTO
export class UpdateUserDto{
    @IsString()
    username: string;

    @IsString()
    password: string;
}