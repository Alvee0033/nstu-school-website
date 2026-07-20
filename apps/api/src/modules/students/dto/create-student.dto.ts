import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'STU12345' })
  @IsString()
  @MaxLength(50)
  studentId: string;

  @ApiProperty({ example: 'Nusrat Jahan' })
  @IsString()
  @MaxLength(100)
  nameEn: string;

  @ApiPropertyOptional({ example: 'নুসরাত জাহান' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameBn?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  rollNumber: number;

  @ApiProperty({ example: 'section-cuid' })
  @IsString()
  sectionId: string;

  @ApiPropertyOptional({ example: 'Female' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isMerit?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  meritRank?: number;
}
