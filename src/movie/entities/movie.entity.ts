import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { MovieRating } from 'src/rating/entities/rating.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  releaseYear: number;

  @ManyToMany(() => Category, (category) => category.movies)
  @JoinTable({
    name: 'movie_categories', // Custom join table name (optional)
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @OneToMany(() => MovieRating, (movieRating) => movieRating.movie)
  ratings: MovieRating[];
}
