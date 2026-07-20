import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({ example: 'Section A' })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'class-cuid' })
  @IsString()
  classId: string;
}
