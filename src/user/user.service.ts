import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private categoriesService: CategoryService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['categories'] });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const preferredCategories = await this.categoriesService.getCategoriesByIds(
      createUserDto.categories,
    );

    if (preferredCategories.length === 0) {
      throw new NotFoundException(
        `Categories with IDs ${createUserDto.categories} not found`,
      );
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      categories: preferredCategories,
    });
    return this.userRepository.save(newUser);
  }

  async updateUserData(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    const preferredCategories = await this.categoriesService.getCategoriesByIds(
      updateUserDto.categories,
    );

    if (preferredCategories.length === 0) {
      throw new NotFoundException(
        `Categories with IDs ${updateUserDto.categories} not found`,
      );
    }
    user.categories = preferredCategories;
    return await this.userRepository.save({...user, updateUserDto});
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
