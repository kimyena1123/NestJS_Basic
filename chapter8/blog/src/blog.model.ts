export interface PostDto{ //게시물의 타입을 인터페이스로 정의
    id: string;
    title: string;
    content: string;
    name: string;
    createdDt: Date; 
    updatedDt?: Date; // 수정일시는 필수가 아니다 => 필수값이 아니면 뒤에 ?를 붙인다.
}
// 타입스크립트에서는 데이터만 가지고 있는 타입을 선언할 때 클래스보다는 인터페이스를 많이 사용한다. 
