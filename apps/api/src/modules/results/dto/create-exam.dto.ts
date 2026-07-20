import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateExamDto {
  @ApiProperty({ example: 'First Term Examination 2026' })
  @IsString()
  @MaxLength(200)
  titleEn: string;

  @ApiPropertyOptional({ example: 'প্রথম সাময়িক পরীক্ষা ২০২৬' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  titleBn?: string;

  @ApiProperty({ example: 2026 })
  @IsInt()
  @Min(2000)
  year: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
