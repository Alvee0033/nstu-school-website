import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('results')
@Controller({ version: '1' })
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Public()
  @Get('public/results/exams')
  @ApiOperation({ summary: 'Get published exams list' })
  getActiveExams() {
    return this.resultsService.findActiveExams();
  }

  @Public()
  @Get('public/results/classes')
  @ApiOperation({ summary: 'Get classes and sections' })
  getActiveClasses() {
    return this.resultsService.findActiveClasses();
  }

  @Public()
  @Get('public/results/search')
  @ApiOperation({ summary: 'Search exam results' })
  @ApiQuery({ name: 'examId', required: true })
  @ApiQuery({ name: 'studentId', required: false })
  @ApiQuery({ name: 'rollNumber', required: false })
  @ApiQuery({ name: 'sectionId', required: false })
  search(
    @Query('examId') examId: string,
    @Query('studentId') studentId?: string,
    @Query('rollNumber') rollNumber?: string,
    @Query('sectionId') sectionId?: string,
  ) {
    const roll = rollNumber ? parseInt(rollNumber, 10) : undefined;
    return this.resultsService.search({
      examId,
      studentId,
      rollNumber: roll,
      sectionId,
    });
  }

  // ── Exam Admin Endpoints ──────────────────────────────────────────────────

  @Get('admin/results/exams')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: list all exams' })
  findAllExamsAdmin(@Query() query: PaginationDto) {
    return this.resultsService.findAllExams(query);
  }

  @Get('admin/results/exams/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: get single exam details' })
  findOneExam(@Param('id') id: string) {
    return this.resultsService.findOneExam(id);
  }

  @Post('admin/results/exams')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: create exam definition' })
  createExam(@Body() dto: CreateExamDto) {
    return this.resultsService.createExam(dto);
  }

  @Patch('admin/results/exams/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update exam definition' })
  updateExam(@Param('id') id: string, @Body() dto: CreateExamDto) {
    return this.resultsService.updateExam(id, dto);
  }

  @Delete('admin/results/exams/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: delete exam definition' })
  removeExam(@Param('id') id: string) {
    return this.resultsService.removeExam(id);
  }

  // ── Result Admin Endpoints ────────────────────────────────────────────────

  @Get('admin/results')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: list all results' })
  findAllAdmin(@Query() query: PaginationDto) {
    return this.resultsService.findAll(query);
  }

  @Get('admin/results/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: get single result details' })
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(id);
  }

  @Post('admin/results')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: create result record' })
  create(@Body() dto: CreateResultDto) {
    return this.resultsService.create(dto);
  }

  @Patch('admin/results/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update result record' })
  update(@Param('id') id: string, @Body() dto: UpdateResultDto) {
    return this.resultsService.update(id, dto);
  }

  @Delete('admin/results/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: delete result record' })
  remove(@Param('id') id: string) {
    return this.resultsService.remove(id);
  }
}
