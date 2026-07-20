import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

export class AlbumMediaDto {
  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  @IsString()
  url: string;

  @ApiPropertyOptional({ example: 'Classroom view' })
  @IsOptional()
  @IsString()
  caption?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  order?: number;
}

export class CreateAlbumDto {
  @ApiProperty({ example: 'Annual Sports Day 2026' })
  @IsString()
  titleEn: string;

  @ApiPropertyOptional({ example: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬' })
  @IsOptional()
  @IsString()
  titleBn?: string;

  @ApiPropertyOptional({ example: 'Photos from the sports events.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/cover.jpg' })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiPropertyOptional({ example: '2026-02-15T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ type: [AlbumMediaDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AlbumMediaDto)
  media?: AlbumMediaDto[];
}
