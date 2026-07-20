import React from 'react';
import { api } from '@/lib/api';
import TeachersManager from './TeachersManager';

export const dynamic = 'force-dynamic';

export default async function TeachersAdminPage() {
  let teachersList: any[] = [];
  try {
    const res: any = await api.get('/admin/teachers?limit=100');
    teachersList = res.data?.data || res.data || [];
  } catch (e) {
    // fallback
  }

  return (
    <div>
      <TeachersManager initialTeachers={teachersList} />
    </div>
  );
}
