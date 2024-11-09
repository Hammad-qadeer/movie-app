import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() CreateRatingDto: CreateRatingDto) {
    return this.ratingService.create(CreateRatingDto);
  }

  @Get('with-user-rating/:userId')
  async getAllMoviesWithUserRating(@Param('userId') userId: number) {
    return this.ratingService.getAllMoviesWithUserRating(userId);
  }
}
