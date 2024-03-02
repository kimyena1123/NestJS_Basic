import { readFile, writeFile } from "fs/promises";
import { PostDto } from "./blog.model";

//블로그 repository 인터페이스 정의
export interface BlogRepository{
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto);
    getPost(id: String): Promise<PostDto>;
    deletePost(id: String);
    updatePost(id: String, postDto: PostDto);
}

//BlogRepository를 구현한 클래스. 파일을 읽고 쓰기
export class BlogFileRepository implements BlogRepository{

    FILE_NAME = './src/blog.data.json';

    //파일을 읽어서 모든 게시물 불러오기
    async getAllPost(): Promise<PostDto[]>{
        const datas = await readFile(this.FILE_NAME, 'utf8');
        const posts = JSON.parse(datas);

        return posts;
    }

    //게시글 쓰기
    async createPost(postDto: PostDto){
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = { id: id.toString(), ...postDto, createdDt: new Date() };
        posts.push(createPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

    //게시글 하나 가져오기
    async getPost(id: String): Promise<PostDto>{
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);

        return result;
    }

    //게시글 하나 삭제
    async deletePost(id: String) {
        //내가 삭제하려는 해당 게시글의 id와 일치하지 않는 게시글을 filteredPosts에 저장
        //this.posts.filter((post) => post.id !== id) : this.posts 배열에서 id와 일치하지 않는 게시물을 필터링하여 새로운 배열을 생성
        //생성된 새 배열을 filteredPosts 변수에 할당
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);

        await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    }


    //게시글 하나 수정하기
    async updatePost(id: String, postDto: PostDto) {
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        const updatePost = {id, ...postDto, updateDt: new Date()};
        posts[index] = updatePost;

        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
}