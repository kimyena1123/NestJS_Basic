import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //서비스에서 사용하는 repository를 모듈에 등록ㄴ
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {}
