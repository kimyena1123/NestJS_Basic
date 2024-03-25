import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number; //id는 pk이며 자동 증가하는 값

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    //셍성일 데이터는 기본값을 넣도록 default: true 설정
    @Column({type:"datetime", default: () => "CURRENT_TIMESTAMP"})
    createdDt: Date = new Date();
}