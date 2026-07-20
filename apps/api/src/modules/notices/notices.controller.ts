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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { QueryNoticesDto } from './dto/query-notices.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/strategies/jwt.strategy';

@ApiTags('notices')
@Controller({ version: '1' })
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  // ── Public ──────────────────────────────────────────────────────────────

  @Public()
  @Get('public/notices')
  @ApiOperation({ summary: 'Get published notices' })
  findPublished(@Query() query: QueryNoticesDto) {
    return this.noticesService.findPublished(query);
  }

  @Public()
  @Get('public/notices/urgent')
  @ApiOperation({ summary: 'Get urgent notices for ticker' })
  findUrgent() {
    return this.noticesService.findUrgent();
  }

  @Public()
  @Get('public/notices/:id')
  @ApiOperation({ summary: 'Get single notice' })
  findOne(@Param('id') id: string) {
    return this.noticesService.findOne(id);
  }

  // ── Admin ────────────────────────────────────────────────────────────────

  @Get('admin/notices')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: list all notices' })
  findAllAdmin(@Query() query: QueryNoticesDto) {
    return this.noticesService.findAllAdmin(query);
  }

  @Post('admin/notices')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: create notice' })
  create(@Body() dto: CreateNoticeDto, @CurrentUser() user: JwtPayload) {
    return this.noticesService.create(dto, user.sub);
  }

  @Patch('admin/notices/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update notice' })
  update(@Param('id') id: string, @Body() dto: UpdateNoticeDto) {
    return this.noticesService.update(id, dto);
  }

  @Patch('admin/notices/:id/publish')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: publish notice' })
  publish(@Param('id') id: string) {
    return this.noticesService.publish(id);
  }

  @Patch('admin/notices/:id/unpublish')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: unpublish notice' })
  unpublish(@Param('id') id: string) {
    return this.noticesService.unpublish(id);
  }

  @Delete('admin/notices/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: delete notice' })
  remove(@Param('id') id: string) {
    return this.noticesService.remove(id);
  }
}
