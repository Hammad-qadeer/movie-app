import { IsInt, IsPositive, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty({
    message: 'Rating value is required and should be between 1 and 5.',
  })
  ratingNumber: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty({
    message: 'Movie ID is required and should be a positive integer.',
  })
  movieId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty({
    message: 'User ID is required and should be a positive integer.',
  })
  userId: number;
}
