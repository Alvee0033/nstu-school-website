import React from 'react';
import { api } from '@/lib/api';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

interface PaginatedResponse {
  data: unknown[];
  total: number;
  page: number;
  limit: number;
}

interface ClassItem {
  id: string;
  nameEn: string;
}

async function safeCount(path: string): Promise<number> {
  try {
    const res = await api.get<PaginatedResponse>(path);
    // Admin API returns { data: [...], total, page, limit }
    if (res && typeof res === 'object' && 'total' in res) {
      return (res as PaginatedResponse).total ?? 0;
    }
    if (Array.isArray(res)) return (res as unknown[]).length;
    return 0;
  } catch {
    return 0;
  }
}

async function safeListCount(path: string): Promise<number> {
  try {
    const res = await api.get<unknown>(path);
    if (Array.isArray(res)) return res.length;
    // Handle wrapped array
    if (res && typeof res === 'object' && 'data' in res && Array.isArray((res as { data: ClassItem[] }).data)) {
      return (res as { data: ClassItem[] }).data.length;
    }
    return 0;
  } catch {
    return 0;
  }
}

export default async function DashboardPage() {
  const [noticeCount, teacherCount, studentCount, staffCount, classCount] = await Promise.all([
    safeCount('/admin/notices?limit=1'),
    safeCount('/admin/teachers?limit=1'),
    safeCount('/admin/students?limit=1'),
    safeCount('/admin/staff?limit=1'),
    safeListCount('/admin/academics/classes'),
  ]);

  return (
    <DashboardClient
      initialStats={{
        noticeCount,
        classCount,
        teacherCount,
        studentCount,
        staffCount,
      }}
    />
  );
}


