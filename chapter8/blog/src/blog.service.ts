import {PostDto} from './blog.model';
import { BlogFileRepository, BlogRepository } from './blog.repository';


export class BlogService{
    // posts = []; // 게시글 배열 선언
    blogRepository: BlogRepository;

    constructor(){
        //블로그 repository 객체 생성
        this.blogRepository = new BlogFileRepository();
    }

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