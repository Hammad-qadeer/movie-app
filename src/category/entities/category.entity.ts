import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from '../../movie/entities/movie.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  categoryName: string;

  @Column({ type: 'varchar', length: 255 })
  categoryDescription: string;

  @Column({ type: 'varchar', length: 255 })
  categoryId: string;

  @ManyToMany(() => Movie, (movie) => movie.categories)
  movies: Movie[];
}
