import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({
    description: 'Rating value between 1 and 5',
    example: 4,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty({
    message: 'Rating value is required and should be between 1 and 5.',
  })
  ratingNumber: number;

  @ApiProperty({
    description: 'Movie ID',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty({
    message: 'Movie ID is required and should be a positive integer.',
  })
  movieId: number;

  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty({
    message: 'User ID is required and should be a positive integer.',
  })
  userId: number;
}
