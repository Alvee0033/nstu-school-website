import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSchoolInfoDto {
  @ApiProperty({ example: 'Notun Kuri High School' })
  @IsString()
  @MaxLength(200)
  nameEn: string;

  @ApiProperty({ example: 'নতুন কুঁড়ি হাই স্কুল' })
  @IsString()
  @MaxLength(200)
  nameBn: string;

  @ApiProperty({ example: '138240' })
  @IsString()
  @MaxLength(50)
  eiin: string;

  @ApiPropertyOptional({ example: '109312' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  emis?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  historyEn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  historyBn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  visionEn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  visionBn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  missionEn?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  missionBn?: string;

  @ApiPropertyOptional({ example: 'Noakhali Science and Technology University campus' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '+8801700000000' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'info@notunkurihighschool.edu' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mapEmbedUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fbPageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ytChannelUrl?: string;
}
