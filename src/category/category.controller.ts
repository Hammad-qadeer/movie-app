import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body('name') name: string): Promise<Category> {
    return await this.categoryService.createCategory(name);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body('name') name: string,
  ): Promise<Category> {
    return await this.categoryService.updatedCateogry(id, name);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    return await this.categoryService.deleteCategory(id);
  }
}
