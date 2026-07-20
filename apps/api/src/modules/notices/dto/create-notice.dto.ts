import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NoticeCategory } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateNoticeDto {
  @ApiProperty({ maxLength: 200 })
  @IsString()
  @MaxLength(200)
  titleEn: string;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  titleBn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contentEn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contentBn?: string;

  @ApiProperty({ enum: NoticeCategory })
  @IsEnum(NoticeCategory)
  category: NoticeCategory;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  attachmentUrl?: string;

  @ApiPropertyOptional({ description: 'ISO 8601 date-time string' })
  @IsOptional()
  @IsISO8601()
  expiresAt?: string;
}
