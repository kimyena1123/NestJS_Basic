// 숫자로 이루어진 배열
const test1: number[] = [1, 2, 3];
const test2: number[] = [4, 5, 6]

// 또는

// 제네릭 배열 타입
const otherTest1: Array<number> = [1, 2, 3];
const otherTest2: Array<number> = [4, 5, 6];
//##############################################################################

//두 배열 합치기
const combineTest: number[] = [...test1, ...test2];

console.log(combineTest);





