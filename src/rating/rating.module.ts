import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRating } from './entities/rating.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRating, Movie, User])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
