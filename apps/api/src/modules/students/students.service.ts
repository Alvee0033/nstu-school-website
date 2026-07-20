import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationDto, PaginatedResult, paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PaginationDto, activeOnly = true): Promise<PaginatedResult<any>> {
    const where: Prisma.StudentWhereInput = activeOnly ? { isActive: true } : {};
    
    const [data, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        include: {
          section: {
            include: { class: true },
          },
        },
        orderBy: [{ sectionId: 'asc' }, { rollNumber: 'asc' }],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.student.count({ where }),
    ]);

    return paginate(data, total, query);
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        section: {
          include: { class: true },
        },
      },
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto) {
    return this.prisma.student.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateStudentDto) {
    await this.findOne(id);
    return this.prisma.student.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.student.delete({
      where: { id },
    });
  }
}
