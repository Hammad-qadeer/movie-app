import { EntityRepository, Repository } from 'typeorm';
import { MovieRating } from './entities/rating.entity';

@EntityRepository(MovieRating)
export class RatingRepository extends Repository<MovieRating> {}
