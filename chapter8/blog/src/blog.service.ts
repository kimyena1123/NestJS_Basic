import { Injectable } from '@nestjs/common';
import {PostDto} from './blog.model';
// import { BlogFileRepository, BlogRepository } from './blog.repository';
//BlogFileRepository를 사용하는 부분을 만든 BlogMongoRepository로 변경해준다. 
import { BlogMongoRepository } from './blog.repository';
 
@Injectable()
export class BlogService{

    //클래스의 생성자에 매개변수로 설정된 타입이 프로바이더로 설정된 타입 중 하나라면,
    //NestJS에서 자동으로 필요한 객체를 주입해준다. BlogRepository는 "인터페이스"이므로 클래스를 생성할 수 없다. 
    //따라서 의존성 주입(@Injectable())을 할 수 없다. 
    //의존성 주입을 할 때는 실제로 사용할 "클래스"를 타입으로 주면 된다. 
    constructor(private blogRepository: BlogMongoRepository){}
    // private blogRepository: BlogFileRepository; // 위 코드를 요약할 수 있다

    async getAllPosts(){
        return await this.blogRepository.getAllPost();
    }

    createPost(postDto: PostDto){ //매개변수명: 매개변수타입
        this.blogRepository.createPost(postDto);
    }

    async getPost(id): Promise<PostDto>{
        return await this.blogRepository.getPost(id);
    }

    delete(id){
        this.blogRepository.deletePost(id);
    } 

    updatePost(id, postDto: PostDto){
        this.blogRepository.updatePost(id, postDto);
    }
}