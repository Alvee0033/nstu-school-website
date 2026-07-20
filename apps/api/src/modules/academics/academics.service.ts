import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class AcademicsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Class Actions ────────────────────────────────────────────────────────

  async findAllClasses() {
    return this.prisma.class.findMany({
      include: {
        sections: true,
      },
      orderBy: { grade: 'asc' },
    });
  }

  async findOneClass(id: string) {
    const record = await this.prisma.class.findUnique({
      where: { id },
      include: { sections: true },
    });
    if (!record) throw new NotFoundException('Class not found');
    return record;
  }

  async createClass(dto: CreateClassDto) {
    return this.prisma.class.create({ data: dto });
  }

  async updateClass(id: string, dto: Partial<CreateClassDto>) {
    await this.findOneClass(id);
    return this.prisma.class.update({
      where: { id },
      data: dto,
    });
  }

  async removeClass(id: string) {
    await this.findOneClass(id);
    return this.prisma.class.delete({ where: { id } });
  }

  // ── Section Actions ──────────────────────────────────────────────────────

  async findAllSections() {
    return this.prisma.section.findMany({
      include: {
        class: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOneSection(id: string) {
    const record = await this.prisma.section.findUnique({
      where: { id },
      include: { class: true },
    });
    if (!record) throw new NotFoundException('Section not found');
    return record;
  }

  async createSection(dto: CreateSectionDto) {
    return this.prisma.section.create({ data: dto });
  }

  async updateSection(id: string, dto: Partial<CreateSectionDto>) {
    await this.findOneSection(id);
    return this.prisma.section.update({
      where: { id },
      data: dto,
    });
  }

  async removeSection(id: string) {
    await this.findOneSection(id);
    return this.prisma.section.delete({ where: { id } });
  }
}
