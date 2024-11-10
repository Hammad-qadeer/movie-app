import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Action, Horror, Comedy',
  })
  categoryName: string;

  @ApiProperty({
    description: 'Description of the category',
    example: 'Action movies',
  })
  categoryDescription: string;

  @ApiProperty({
    description: 'Id of the category',
    example: 'horror , comedy, sci_fi',
  })
  categoryId: string;
}
