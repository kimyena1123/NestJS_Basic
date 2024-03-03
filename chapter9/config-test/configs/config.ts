import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';

//process.env.NODE_ENV을 여러 번 사용해야 하므로 phase 변수에 저장한다.
//phase값이 각각 local, dev, prod에 따라 conf에 저장하는 값이 달라진다. 
const phase = process.env.NODE_ENV; //phase에 NODE_ENV 값 저장

let conf = {}; //phase 값에 따라서 적절한 환경 변수값을 conf에 저장

if(phase === 'local'){
    conf= local;
}else if(phase === 'dev'){
    conf = dev;
}else if(phase === 'prod'){
    conf = prod;
}

//common과 conf에서 받은 값을 합쳐서 결과값으로 주는 함수 반환
export default() => ({
    //스프레드 연산자(...)을 사용해 common과 conf를 합쳐준다. 
    ...common,
    ...conf,
});