import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PaginationDto, PaginatedResult, paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PaginationDto, activeOnly = true): Promise<PaginatedResult<any>> {
    const where: Prisma.GalleryAlbumWhereInput = activeOnly ? { isPublished: true } : {};

    const [data, total] = await Promise.all([
      this.prisma.galleryAlbum.findMany({
        where,
        include: {
          media: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { eventDate: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.galleryAlbum.count({ where }),
    ]);

    return paginate(data, total, query);
  }

  async findOne(id: string) {
    const record = await this.prisma.galleryAlbum.findUnique({
      where: { id },
      include: {
        media: {
          orderBy: { order: 'asc' },
        },
      },
    });
    if (!record) throw new NotFoundException('Gallery album not found');
    return record;
  }

  async create(dto: CreateAlbumDto) {
    const { media, ...albumData } = dto;
    return this.prisma.galleryAlbum.create({
      data: {
        ...albumData,
        media: media ? {
          createMany: {
            data: media,
          },
        } : undefined,
      },
      include: {
        media: true,
      },
    });
  }

  async update(id: string, dto: UpdateAlbumDto) {
    await this.findOne(id);
    const { media, ...albumData } = dto;

    return this.prisma.$transaction(async (tx) => {
      if (media) {
        await tx.galleryMedia.deleteMany({
          where: { albumId: id },
        });
      }

      return tx.galleryAlbum.update({
        where: { id },
        data: {
          ...albumData,
          media: media ? {
            createMany: {
              data: media,
            },
          } : undefined,
        },
        include: {
          media: true,
        },
      });
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.galleryAlbum.delete({
      where: { id },
    });
  }
}
