import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('students')
@Controller({ version: '1' })
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Public()
  @Get('public/students')
  @ApiOperation({ summary: 'Get active students list' })
  findPublished(@Query() query: PaginationDto) {
    return this.studentsService.findAll(query, true);
  }

  @Public()
  @Get('public/students/:id')
  @ApiOperation({ summary: 'Get single student details' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Get('admin/students')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: list all students' })
  findAllAdmin(@Query() query: PaginationDto) {
    return this.studentsService.findAll(query, false);
  }

  @Post('admin/students')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: create student' })
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Patch('admin/students/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update student' })
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete('admin/students/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: delete student' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
