import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Categoy with ID ${id} not found`);
    }

    return category;
  }

  async createCategory(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name });
    return await this.categoryRepository.save(category);
  }

  async updatedCateogry(id: number, name: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    category.name = name;
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoy with ID ${id} not found`);
    }
  }
}
