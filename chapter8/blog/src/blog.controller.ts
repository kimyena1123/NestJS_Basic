import {Controller, Param, Body, Delete, Get, Post, Put} from '@nestjs/common';

@Controller('blog') //클래스에 붙이는 controller 데코레이터 => {서버주소}/blog 이하의 요청을 처리한다는 뜻.
export class BlogController{
    @Get() 
    getAllPosts(){
        console.log("모든 게시물 가져오기");
    }

    @Post()
    createPost(@Body() post: any){ // HTTP 요청의 body 내용을 post에 할당
        console.log("게시글 작성");
        console.log(post);
    }

    @Get('/:id')
    getPost(@Param('id') id: string){
        console.log(`[id: ${id}] 게시글 하나 가져오기`)
    }

    @Delete('/:id')
    deletePost(){
        console.log("게시글 삭제");
    }

    @Put('/:id')
    updatePost(@Param('id') id, @Body() post: any){
        console.log(`[${id}] 게시글 업데이트`);
        console.log(post);
    }
}