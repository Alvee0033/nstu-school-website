import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { NoticeCategory, NoticeStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { QueryNoticesDto } from './dto/query-notices.dto';
import { PaginatedResult, paginate } from '../../common/dto/pagination.dto';

const CACHE_TTL = {
  urgent: 300,
  list: 600,
} as const;

const CACHE_PAGE_RANGE = [1, 2, 3, 4, 5] as const;
const CACHE_CATEGORIES = ['all', 'GENERAL', 'ACADEMIC', 'ADMISSION', 'EXAM', 'RESULT', 'EVENT'] as const;

function noticeListCacheKey(page: number, category: string): string {
  return `notices:page:${page}:cat:${category}`;
}

type NoticePublicItem = {
  id: string;
  titleEn: string;
  titleBn: string | null;
  category: NoticeCategory;
  isUrgent: boolean;
  attachmentUrl: string | null;
  publishedAt: Date | null;
  expiresAt: Date | null;
};

type NoticeUrgentItem = {
  id: string;
  titleEn: string;
  titleBn: string | null;
};

type NoticeDetail = {
  id: string;
  titleEn: string;
  titleBn: string | null;
  contentEn: string | null;
  contentBn: string | null;
  category: NoticeCategory;
  isUrgent: boolean;
  attachmentUrl: string | null;
  publishedAt: Date | null;
};

@Injectable()
export class NoticesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async findPublished(query: QueryNoticesDto): Promise<PaginatedResult<NoticePublicItem>> {
    const cacheKey = noticeListCacheKey(query.page, query.category ?? 'all');
    const cached = await this.cache.get<PaginatedResult<NoticePublicItem>>(cacheKey);
    if (cached) return cached;

    const where: Prisma.NoticeWhereInput = {
      status: NoticeStatus.PUBLISHED,
      ...(query.category && { category: query.category }),
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    };

    const [data, total] = await Promise.all([
      this.prisma.notice.findMany({
        where,
        select: {
          id: true,
          titleEn: true,
          titleBn: true,
          category: true,
          isUrgent: true,
          attachmentUrl: true,
          publishedAt: true,
          expiresAt: true,
        },
        orderBy: [{ isUrgent: 'desc' }, { publishedAt: 'desc' }],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.notice.count({ where }),
    ]);

    const result = paginate(data, total, query);
    await this.cache.set(cacheKey, result, CACHE_TTL.list);
    return result;
  }

  async findUrgent(): Promise<NoticeUrgentItem[]> {
    const cacheKey = 'notices:urgent';
    const cached = await this.cache.get<NoticeUrgentItem[]>(cacheKey);
    if (cached) return cached;

    const data = await this.prisma.notice.findMany({
      where: {
        status: NoticeStatus.PUBLISHED,
        isUrgent: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      select: { id: true, titleEn: true, titleBn: true },
      orderBy: { publishedAt: 'desc' },
      take: 10,
    });

    await this.cache.set(cacheKey, data, CACHE_TTL.urgent);
    return data;
  }

  async findOne(id: string): Promise<NoticeDetail> {
    const notice = await this.prisma.notice.findUnique({
      where: { id, status: NoticeStatus.PUBLISHED },
      select: {
        id: true,
        titleEn: true,
        titleBn: true,
        contentEn: true,
        contentBn: true,
        category: true,
        isUrgent: true,
        attachmentUrl: true,
        publishedAt: true,
      },
    });
    if (!notice) throw new NotFoundException('Notice not found');
    return notice;
  }

  async create(dto: CreateNoticeDto, authorId: string) {
    const notice = await this.prisma.notice.create({
      data: { ...dto, authorId },
    });
    await this.invalidateCache();
    return notice;
  }

  async update(id: string, dto: UpdateNoticeDto) {
    await this.findById(id);
    const notice = await this.prisma.notice.update({ where: { id }, data: dto });
    await this.invalidateCache();
    return notice;
  }

  async publish(id: string) {
    await this.findById(id);
    const notice = await this.prisma.notice.update({
      where: { id },
      data: { status: NoticeStatus.PUBLISHED, publishedAt: new Date() },
    });
    await this.invalidateCache();
    return notice;
  }

  async unpublish(id: string) {
    await this.findById(id);
    const notice = await this.prisma.notice.update({
      where: { id },
      data: { status: NoticeStatus.DRAFT, publishedAt: null },
    });
    await this.invalidateCache();
    return notice;
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.prisma.notice.delete({ where: { id } });
    await this.invalidateCache();
  }

  async findAllAdmin(query: QueryNoticesDto): Promise<PaginatedResult<Prisma.NoticeGetPayload<Record<string, never>>>> {
    const where: Prisma.NoticeWhereInput = {
      ...(query.category && { category: query.category }),
    };

    const [data, total] = await Promise.all([
      this.prisma.notice.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.notice.count({ where }),
    ]);

    return paginate(data, total, query);
  }

  private async findById(id: string): Promise<{ id: string }> {
    const notice = await this.prisma.notice.findUnique({ where: { id }, select: { id: true } });
    if (!notice) throw new NotFoundException('Notice not found');
    return notice;
  }

  private async invalidateCache(): Promise<void> {
    const keys: string[] = ['notices:urgent'];
    for (const page of CACHE_PAGE_RANGE) {
      for (const cat of CACHE_CATEGORIES) {
        keys.push(noticeListCacheKey(page, cat));
      }
    }
    await Promise.all(keys.map((k) => this.cache.del(k)));
  }
}
