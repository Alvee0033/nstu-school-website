import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'Class 10' })
  @IsString()
  @MaxLength(100)
  nameEn: string;

  @ApiPropertyOptional({ example: '১০ম শ্রেণী' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameBn?: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  grade: number;
}
