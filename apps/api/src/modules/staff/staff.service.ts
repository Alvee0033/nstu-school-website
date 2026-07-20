import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PaginationDto, PaginatedResult, paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PaginationDto, activeOnly = true): Promise<PaginatedResult<any>> {
    const where: Prisma.StaffWhereInput = activeOnly ? { isActive: true } : {};

    const [data, total] = await Promise.all([
      this.prisma.staff.findMany({
        where,
        orderBy: [{ order: 'asc' }, { nameEn: 'asc' }],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.staff.count({ where }),
    ]);

    return paginate(data, total, query);
  }

  async findOne(id: string) {
    const record = await this.prisma.staff.findUnique({
      where: { id },
    });
    if (!record) throw new NotFoundException('Staff member not found');
    return record;
  }

  async create(dto: CreateStaffDto) {
    return this.prisma.staff.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateStaffDto) {
    await this.findOne(id);
    return this.prisma.staff.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.staff.delete({
      where: { id },
    });
  }
}
