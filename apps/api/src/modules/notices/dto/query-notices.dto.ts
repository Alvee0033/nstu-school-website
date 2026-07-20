import { ApiPropertyOptional } from '@nestjs/swagger';
import { NoticeCategory } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class QueryNoticesDto extends PaginationDto {
  @ApiPropertyOptional({ enum: NoticeCategory })
  @IsOptional()
  @IsEnum(NoticeCategory)
  category?: NoticeCategory;
}
