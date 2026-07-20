import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSchoolInfoDto } from './dto/create-school-info.dto';
import { UpdateSchoolInfoDto } from './dto/update-school-info.dto';

@Injectable()
export class SchoolInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    let info = await this.prisma.schoolInfo.findFirst({
      include: {
        principals: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!info) {
      info = await this.prisma.schoolInfo.create({
        data: {
          nameEn: 'NSTU Model School',
          nameBn: 'নোবিপ্রবি মডেল স্কুল',
          eiin: '138240',
        },
        include: {
          principals: true,
        },
      });
    }

    return info;
  }

  async update(dto: UpdateSchoolInfoDto) {
    const info = await this.get();
    return this.prisma.schoolInfo.update({
      where: { id: info.id },
      data: dto,
    });
  }
}
