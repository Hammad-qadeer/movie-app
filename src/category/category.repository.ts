import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
