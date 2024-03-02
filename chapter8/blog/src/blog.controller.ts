import {Controller, Param, Body, Delete, Get, Post, Put} from '@nestjs/common';
import {BlogService} from './blog.service';

@Controller('blog') //클래스에 붙이는 controller 데코레이터 => {서버주소}/blog 이하의 요청을 처리한다는 뜻.
export class BlogController{

    blogService: BlogService;

    constructor(){
        this.blogService = new BlogService(); //생성자에서 블로그 서비스 생성
    }

    @Get() 
    getAllPosts(){
        console.log("모든 게시물 가져오기");
        
        return this.blogService.getAllPosts();
    }

    @Post()
    createPost(@Body() postDto){ // HTTP 요청의 body 내용을 post에 할당
        console.log("게시글 작성");
        this.blogService.createPost(postDto);

        return 'success';
    }

    @Get('/:id')
    getPost(@Param('id') id: string){
        console.log(`[id: ${id}] 게시글 하나 가져오기`)

        return this.blogService.getPost(id);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string){
        console.log("게시글 삭제");

        return 'success';
    }

    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() postDto){
        console.log(`[${id}] 게시글 업데이트`);

        return this.blogService.updatePost(id, postDto);
    }
}