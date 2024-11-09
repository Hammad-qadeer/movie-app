import { Entity, EntityRepository, Repository } from 'typeorm';
import { Movie } from '../movie/entities/movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}
