import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('teachers')
@Controller({ version: '1' })
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  // ── Public ──────────────────────────────────────────────────────────────

  @Public()
  @Get('public/teachers')
  @ApiQuery({ name: 'department', required: false })
  @ApiOperation({ summary: 'Get teacher directory' })
  findAll(
    @Query('department') department?: string,
    @Query() pagination?: PaginationDto,
  ) {
    return this.teachersService.findAll(department, pagination);
  }

  @Public()
  @Get('public/teachers/:id')
  @ApiOperation({ summary: 'Get teacher profile' })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  // ── Admin ────────────────────────────────────────────────────────────────

  @Get('admin/teachers')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: list all teachers' })
  findAllAdmin(@Query() pagination: PaginationDto) {
    return this.teachersService.findAll(undefined, pagination);
  }

  @Post('admin/teachers')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: create teacher' })
  create(@Body() dto: CreateTeacherDto) {
    return this.teachersService.create(dto);
  }

  @Patch('admin/teachers/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update teacher' })
  update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
    return this.teachersService.update(id, dto);
  }

  @Delete('admin/teachers/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: deactivate teacher' })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
