import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { PaginationDto, PaginatedResult, paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveExams() {
    return this.prisma.exam.findMany({
      where: { isPublished: true },
      select: { id: true, titleEn: true, titleBn: true, year: true },
      orderBy: { year: 'desc' },
    });
  }

  async findActiveClasses() {
    return this.prisma.class.findMany({
      select: {
        id: true,
        nameEn: true,
        nameBn: true,
        grade: true,
        sections: {
          select: { id: true, name: true },
        },
      },
      orderBy: { grade: 'asc' },
    });
  }

  async search(query: { examId: string; studentId?: string; rollNumber?: number; sectionId?: string }) {
    const { examId, studentId, rollNumber, sectionId } = query;

    let studentWhere = {};
    if (studentId) {
      studentWhere = { studentId };
    } else if (rollNumber && sectionId) {
      studentWhere = { rollNumber, sectionId };
    } else {
      throw new Error('Please provide either Student ID, or Roll Number and Section');
    }

    const student = await this.prisma.student.findFirst({
      where: { ...studentWhere, isActive: true },
      include: {
        section: {
          include: { class: true },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const results = await this.prisma.result.findMany({
      where: {
        studentId: student.id,
        examId,
        isPublished: true,
      },
      include: {
        exam: true,
      },
    });

    return {
      student: {
        nameEn: student.nameEn,
        nameBn: student.nameBn,
        studentId: student.studentId,
        rollNumber: student.rollNumber,
        class: student.section.class.nameEn,
        section: student.section.name,
      },
      results: results.map((r) => ({
        id: r.id,
        subject: r.subject,
        marksObtained: r.marksObtained,
        totalMarks: r.totalMarks,
        grade: r.grade,
        gpa: r.gpa,
      })),
    };
  }

  // ── Exam Admin CRUD Actions ──────────────────────────────────────────────

  async findAllExams(query: PaginationDto): Promise<PaginatedResult<any>> {
    const [data, total] = await Promise.all([
      this.prisma.exam.findMany({
        orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.exam.count(),
    ]);

    return paginate(data, total, query);
  }

  async findOneExam(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
    });
    if (!exam) throw new NotFoundException('Exam not found');
    return exam;
  }

  async createExam(dto: CreateExamDto) {
    return this.prisma.exam.create({
      data: dto,
    });
  }

  async updateExam(id: string, dto: Partial<CreateExamDto>) {
    await this.findOneExam(id);
    return this.prisma.exam.update({
      where: { id },
      data: dto,
    });
  }

  async removeExam(id: string) {
    await this.findOneExam(id);
    return this.prisma.exam.delete({
      where: { id },
    });
  }

  // ── Result Admin CRUD Actions ────────────────────────────────────────────

  async findAll(query: PaginationDto): Promise<PaginatedResult<any>> {
    const [data, total] = await Promise.all([
      this.prisma.result.findMany({
        include: {
          student: true,
          exam: true,
          section: {
            include: { class: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.result.count(),
    ]);

    return paginate(data, total, query);
  }

  async findOne(id: string) {
    const result = await this.prisma.result.findUnique({
      where: { id },
      include: {
        student: true,
        exam: true,
        section: true,
      },
    });
    if (!result) throw new NotFoundException('Result record not found');
    return result;
  }

  async create(dto: CreateResultDto) {
    return this.prisma.result.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateResultDto) {
    await this.findOne(id);
    return this.prisma.result.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.result.delete({
      where: { id },
    });
  }
}
