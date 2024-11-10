import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieRating } from '../rating/entities/rating.entity';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(MovieRating)
    private readonly movieRatingRepository: Repository<MovieRating>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllMoviesWithUserRating(userId: number): Promise<any[]> {
    // Fetch all movies
    const movies = await this.movieRepository.find({relations: ['categories']});

    // Fetch all ratings by this user
    const userRatings = await this.movieRatingRepository.find({
      where: { user: { id: userId } },
      relations: ['movie'],
    });

    // return this.movieRepository.find({ relations: ['categories'] });

    // Map user ratings by movie ID for quick lookup
    const userRatingsMap = userRatings.reduce((map, rating) => {
      

      map[rating.movie.id] = rating.rating;
      return map;
    }, {});

    // Attach user rating to each movie, if available
    return movies.map((movie) => ({
      ...movie,
      userRating: userRatingsMap[movie.id] || null, // If rated, show rating; otherwise, null
    }));
  }

  async create(createRatingDto: CreateRatingDto): Promise<MovieRating> {
    const { ratingNumber, movieId, userId } = createRatingDto;
    // Fetch user and movie entities
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found.`);
    }

    // Create or update the rating
    let movieRating = await this.movieRatingRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
    });

    if (movieRating) {
      // Update existing rating
      movieRating.rating = ratingNumber;
    } else {
      // Create a new rating
      movieRating = this.movieRatingRepository.create({
        rating: ratingNumber,
        user,
        movie,
      });
    }

    try {
      return await this.movieRatingRepository.save(movieRating);
    } catch (error) {
      throw new BadRequestException('Failed to save rating.');
    }
  }
}
