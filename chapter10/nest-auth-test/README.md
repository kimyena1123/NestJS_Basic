### install
```
mkdir chapter10 
cd chapter10
nest new nest-auth-test
```

## explain
AppModule : 전체 애플리케이션 관련 설정
AuthModule: 인증 관련 기능  
  => AuthController와 AuthService 클래스로 구성된다
  AuthController: 인증에 필요한 핸들러 메서드를 설정함
  AuthService: 회원가입과 회원 유효성을 검증하는 메서드를 추가    
    AuthService의 회원가입 메서드에서 UserService를 주입해 사용한다. 
UserModule: 유저 데이터를 다루는 기능

AppModule 하위에 AuthModule과 UserModule을 둔다.

```
cd nest-auth-test
nest g module user
nest g controller user --no-spec
nest g service user --no-spec
```

### SQLite 데이터베이스 설정하기
SQLite3와 typeORM, typeorm을 nest에서 편하게 사용하기 위한 @nestjs/typeorm이 필요
```
npm install sqlite3 typeorm @nestjs/typeorm
```

## 서버 기동
```
npm run start:dev
```

# 파이프로 유효성 검증하기
ValidationPipe를 사용하려면 class-validator와 class-tranformer를 설치해야 한다. 
1. class-tranformer는 JSON 정보를 "클래스 객체"로 변경한다. 
받은 요청(payload)을 변환한 클래스가 controller의 핸들러 메서드의 매개변수에 선언되어 있는 클래스와 같다면 유효성 검증을 한다. 
2. class-validator는 데코레이터를 사용해 간편하게 유효성 검증을 하는 라이브러리이다. 


## 전역 ValidationPipe tjfwjdgkrl
유효성 검증을 하려면 ValidationPipe를 main.ts에 설정해야 한다. (의존성 설치 -> 임포트 -> 전역 파이프 설정에 ValidationPipe객체를 생성해 넣기)
```
npm install class-validator class-transformer
```

# 인증 모듈 생성 및 회원 가입하기
인증은 "정확성"과 "신간 측면"에서 사용자의 자격증명을 확인하는 것.
정확성 측면 - 사용자의 자격증명을 기존 정보를 기바으로 확ㅇ니 후 "인증 토큰"을 발급하는 것
시간 측면 - 사용자에게 부여된 인증 토큰은 특정 기간 동안만 유효한다는 것을 말ㅎ마

인증을 만드는 법 
  1. 쿠키를 기반으로 만들거나
  2. 토큰 기반으로 만들 수 있다. (쿠키가 없는 토큰 기반을 쿠키리스라고 부름)
    쿠키는 서버에서 보낸준 크키를 클라이언트에 저장해 관리한다. 토큰은 서버에 상태를 저장할 필요가 없다. 