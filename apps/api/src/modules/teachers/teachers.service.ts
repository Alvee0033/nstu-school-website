import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationDto, PaginatedResult, paginate } from '../../common/dto/pagination.dto';

const TEACHER_CACHE_TTL = 3600 as const;

type TeacherPublicItem = {
  id: string;
  nameEn: string;
  nameBn: string | null;
  designation: string;
  department: string | null;
  subject: string | null;
  photoUrl: string | null;
  email: string | null;
  phone: string | null;
};

type TeacherDetail = TeacherPublicItem & {
  bioEn: string | null;
  bioBn: string | null;
  qualification: string | null;
  joinedAt: Date | null;
};

const publicSelect = {
  id: true,
  nameEn: true,
  nameBn: true,
  designation: true,
  department: true,
  subject: true,
  photoUrl: true,
  email: true,
  phone: true,
} as const;

const detailSelect = {
  ...publicSelect,
  bioEn: true,
  bioBn: true,
  qualification: true,
  joinedAt: true,
} as const;

@Injectable()
export class TeachersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async findAll(
    department?: string,
    pagination: PaginationDto = { page: 1, limit: 50 },
  ): Promise<PaginatedResult<TeacherPublicItem>> {
    const cacheKey = `teachers:dept:${department ?? 'all'}:p:${pagination.page}`;
    const cached = await this.cache.get<PaginatedResult<TeacherPublicItem>>(cacheKey);
    if (cached) return cached;

    const where: Prisma.TeacherWhereInput = {
      isActive: true,
      ...(department && { department }),
    };

    const [data, total] = await Promise.all([
      this.prisma.teacher.findMany({
        where,
        select: publicSelect,
        orderBy: [{ order: 'asc' }, { nameEn: 'asc' }],
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
      }),
      this.prisma.teacher.count({ where }),
    ]);

    const result = paginate(data, total, pagination);
    await this.cache.set(cacheKey, result, TEACHER_CACHE_TTL);
    return result;
  }

  async findOne(id: string): Promise<TeacherDetail> {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id, isActive: true },
      select: detailSelect,
    });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async create(dto: CreateTeacherDto) {
    const teacher = await this.prisma.teacher.create({ data: dto });
    await this.invalidateTeacherCache();
    return teacher;
  }

  async update(id: string, dto: UpdateTeacherDto) {
    await this.getOrThrow(id);
    const teacher = await this.prisma.teacher.update({ where: { id }, data: dto });
    await this.invalidateTeacherCache();
    return teacher;
  }

  async remove(id: string): Promise<void> {
    await this.getOrThrow(id);
    await this.prisma.teacher.update({ where: { id }, data: { isActive: false } });
    await this.invalidateTeacherCache();
  }

  private async invalidateTeacherCache(): Promise<void> {
    const departments = ['all', 'Science', 'Arts', 'Commerce', 'Mathematics', 'English', 'Physics', 'Chemistry'];
    const pages = [1, 2, 3, 4, 5];
    await Promise.all(
      departments.flatMap((dept) =>
        pages.map((p) => this.cache.del(`teachers:dept:${dept}:p:${p}`)),
      ),
    );
  }

  private async getOrThrow(id: string): Promise<{ id: string }> {
    const teacher = await this.prisma.teacher.findUnique({ where: { id }, select: { id: true } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }
}
