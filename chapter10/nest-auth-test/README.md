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