import { Category } from './../category/entities/category.entity';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  controllers: [UserController],
  providers: [UserService, CategoryService],
})
export class UserModule {}
