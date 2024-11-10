import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Title of the movie',
    example: 'The Shawshank Redemption',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the movie',
    example:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  })
  description: string;

  @ApiProperty({
    description: 'Release date of the movie',
    example: '1994-09-23',
  })
  release_date: Date;

  @ApiProperty({
    description: 'List of category IDs associated with the movie',
    example: ['horror', 'comedy', 'drama'],
  })
  categoryIds: string[];
}
