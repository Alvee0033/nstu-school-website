import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { GalleryService } from './gallery.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('gallery')
@Controller({ version: '1' })
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Public()
  @Get('public/gallery')
  @ApiOperation({ summary: 'Get published gallery albums' })
  findPublished(@Query() query: PaginationDto) {
    return this.galleryService.findAll(query, true);
  }

  @Public()
  @Get('public/gallery/:id')
  @ApiOperation({ summary: 'Get single gallery album details' })
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Get('admin/gallery')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: list all gallery albums' })
  findAllAdmin(@Query() query: PaginationDto) {
    return this.galleryService.findAll(query, false);
  }

  @Post('admin/gallery')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: create gallery album' })
  create(@Body() dto: CreateAlbumDto) {
    return this.galleryService.create(dto);
  }

  @Patch('admin/gallery/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin: update gallery album' })
  update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.galleryService.update(id, dto);
  }

  @Delete('admin/gallery/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Admin: delete gallery album' })
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
