import { Controller, Get, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SchoolInfoService } from './school-info.service';
import { UpdateSchoolInfoDto } from './dto/update-school-info.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('school-info')
@Controller({ version: '1' })
export class SchoolInfoController {
  constructor(private readonly schoolInfoService: SchoolInfoService) {}

  @Public()
  @Get('public/school-info')
  @ApiOperation({ summary: 'Get school profile details' })
  get() {
    return this.schoolInfoService.get();
  }

  @Patch('admin/school-info')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update school profile details' })
  update(@Body() dto: UpdateSchoolInfoDto) {
    return this.schoolInfoService.update(dto);
  }
}
