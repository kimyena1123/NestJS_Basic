import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

//블로그 타입이면서 다큐먼트로 사용할 수 있는 BlogDocument 타입을 생성한다. 
//왼쪽에 type <이름>, 오른쪽에 두 개의 타입을 &로 연결해 "교차타입"을 만든다. 
//C = A & B로 만들었다면 C는 A와 B의 모든 프로퍼티를 가지고 있어야 한다. 
export type BlogDocument = Blog & Document; //블로그이면서 다큐먼트인 타입 정의


@Schema() //스키마임을 나타냄
export class Blog{
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    name: string;

    @Prop()
    createdDt: Date;

    @Prop()
    updatedDt: Date;
}

//스키마 생성
export const BlogSchema = SchemaFactory.createForClass(Blog); 