import {Module} from '@nestjs/common'; 
import { BlogFileRepository } from './blog.repository';
import {BlogController} from './blog.controller';
import {BlogService} from './blog.service';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository], //프로바이더 설정
})

export class AppModule {}