import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AcademicsService } from './academics.service';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('academics')
@Controller({ version: '1' })
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  // ── Public Routes ────────────────────────────────────────────────────────

  @Public()
  @Get('public/academics/classes')
  @ApiOperation({ summary: 'Get all classes' })
  findClasses() {
    return this.academicsService.findAllClasses();
  }

  @Public()
  @Get('public/academics/sections')
  @ApiOperation({ summary: 'Get all sections' })
  findSections() {
    return this.academicsService.findAllSections();
  }

  // ── Admin Class Routes ───────────────────────────────────────────────────

  @Get('admin/academics/classes')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: list all classes' })
  findAllClassesAdmin() {
    return this.academicsService.findAllClasses();
  }

  @Post('admin/academics/classes')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: create class' })
  createClass(@Body() dto: CreateClassDto) {
    return this.academicsService.createClass(dto);
  }

  @Patch('admin/academics/classes/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update class' })
  updateClass(@Param('id') id: string, @Body() dto: CreateClassDto) {
    return this.academicsService.updateClass(id, dto);
  }

  @Delete('admin/academics/classes/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: delete class' })
  removeClass(@Param('id') id: string) {
    return this.academicsService.removeClass(id);
  }

  // ── Admin Section Routes ─────────────────────────────────────────────────

  @Get('admin/academics/sections')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: list all sections' })
  findAllSectionsAdmin() {
    return this.academicsService.findAllSections();
  }

  @Post('admin/academics/sections')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: create section' })
  createSection(@Body() dto: CreateSectionDto) {
    return this.academicsService.createSection(dto);
  }

  @Patch('admin/academics/sections/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update section' })
  updateSection(@Param('id') id: string, @Body() dto: CreateSectionDto) {
    return this.academicsService.updateSection(id, dto);
  }

  @Delete('admin/academics/sections/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: delete section' })
  removeSection(@Param('id') id: string) {
    return this.academicsService.removeSection(id);
  }
}
