import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { CategoryRepository } from 'src/category/category.repository';
import { Category } from 'src/category/entities/category.entity';
import { MovieRating } from 'src/rating/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Category, MovieRating])],
  controllers: [MovieController],
  providers: [MovieService, CategoryRepository, MovieRating],
})
export class MovieModule {}
