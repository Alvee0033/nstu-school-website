import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('staff')
@Controller({ version: '1' })
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Public()
  @Get('public/staff')
  @ApiOperation({ summary: 'Get active staff list' })
  findPublished(@Query() query: PaginationDto) {
    return this.staffService.findAll(query, true);
  }

  @Public()
  @Get('public/staff/:id')
  @ApiOperation({ summary: 'Get single staff details' })
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Get('admin/staff')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: list all staff' })
  findAllAdmin(@Query() query: PaginationDto) {
    return this.staffService.findAll(query, false);
  }

  @Post('admin/staff')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: create staff member' })
  create(@Body() dto: CreateStaffDto) {
    return this.staffService.create(dto);
  }

  @Patch('admin/staff/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update staff member' })
  update(@Param('id') id: string, @Body() dto: UpdateStaffDto) {
    return this.staffService.update(id, dto);
  }

  @Delete('admin/staff/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: delete staff member' })
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
