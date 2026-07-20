import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateResultDto {
  @ApiProperty({ example: 'student-cuid' })
  @IsString()
  studentId: string;

  @ApiProperty({ example: 'exam-cuid' })
  @IsString()
  examId: string;

  @ApiProperty({ example: 'section-cuid' })
  @IsString()
  sectionId: string;

  @ApiPropertyOptional({ example: 'Mathematics' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  subject?: string;

  @ApiPropertyOptional({ example: 85.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  marksObtained?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalMarks?: number;

  @ApiPropertyOptional({ example: 'A+' })
  @IsOptional()
  @IsString()
  @MaxLength(5)
  grade?: string;

  @ApiPropertyOptional({ example: 5.0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  gpa?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  rank?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
