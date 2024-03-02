import {PostDto} from './blog.model';

export class BlogService{
    posts = []; // 게시글 배열 선언

    getAllPosts(){
        return this.posts;
    }

    createPost(postDto: PostDto){ //매개변수명: 매개변수타입
        const id = this.posts.length + 1;
        this.posts.push({ id: id.toString(), ...postDto, createDt: new Date() });
    }

    getPost(id){
        const post = this.posts.find((post) => {
            return post.id === id;
        });
        console.log(post);
        return post;
    }

    delete(id){
        //내가 삭제하려는 해당 게시글의 id와 일치하지 않는 게시글을 filteredPosts에 저장
        //this.posts.filter((post) => post.id !== id) : this.posts 배열에서 id와 일치하지 않는 게시물을 필터링하여 새로운 배열을 생성
        //생성된 새 배열을 filteredPosts 변수에 할당
        const filteredPosts = this.posts.filter((post) => post.id !== id);

        // filteredPosts 배열을 기존의 this.posts 배열로 교체합니다. 따라서 id와 일치하지 않는 게시물만 포함된 새로운 배열이 this.posts에 저장된다.
        this.posts = [...filteredPosts];
    } 

    updatePost(id, postDto: PostDto){
        // let updateIndex = this.posts.findIndex((post) => post.id === id): 주어진 id와 일치하는 게시물을 찾아 해당 게시물의 인덱스를 updateIndex에 저장. 
        // findIndex 메서드는 주어진 조건을 만족하는 첫 번째 요소의 인덱스를 반환합니다. 만약 찾지 못하면 -1이 됩니다.
        let updateIndex = this.posts.findIndex((post) => post.id === id); //내가 만약 아이디가 10번 게시물을 삭제하고 싶다면 updateIndex는 10을 담고 있다.

        // 업데이트된 게시물을 나타내는 새로운 객체 updatePost를 생성합니다. 이 객체는 주어진 id를 유지하고 postDto에 있는 속성들을 병합하며, 
        // updateDt 속성에 현재 날짜 및 시간을 할당합니다. 
        const updatePost = {id, ...postDto, updateDt: new Date()};

        // 객체로 기존의 게시물을 업데이트합니다. updateIndex를 사용하여 해당 인덱스의 게시물을 새로운 값으로 대체합니다.
        this.posts[updateIndex] = updatePost;
        
        return updatePost;
    }
}