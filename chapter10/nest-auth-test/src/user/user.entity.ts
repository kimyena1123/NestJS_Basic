//데코레이터 임포트
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//entity 객체임을 알려주기 위한 데코레이터
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number; //id는 pk이며 자동 증가하는 값임

    @Column({unique: true})
    email: string; 

    @Column()
    password: string;

    @Column()
    username: string;

    //생성일 데이터는 기본값을 넣도록 default: true 설정을 추가해준다.
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdDt: Date = new Date(); //기본값을 넣어줌
}