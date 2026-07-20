import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({ example: 'Abdur Rahim' })
  @IsString()
  @MaxLength(100)
  nameEn: string;

  @ApiPropertyOptional({ example: 'আব্দুর রহিম' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameBn?: string;

  @ApiProperty({ example: 'Office Assistant' })
  @IsString()
  @MaxLength(100)
  designation: string;

  @ApiPropertyOptional({ example: '+8801700000000' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'rahim@school.edu' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '/avatar-placeholder.png' })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
