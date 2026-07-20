import React from 'react';
import { api } from '@/lib/api';
import StudentsManager from './StudentsManager';

export const dynamic = 'force-dynamic';

export default async function StudentsAdminPage() {
  let studentsList: any[] = [];
  let sectionsList: any[] = [];
  
  try {
    const res: any = await api.get('/admin/students?limit=100');
    studentsList = res.data?.data || res.data || [];
  } catch (e) {
    // fallback
  }

  try {
    const res: any = await api.get('/admin/academics/sections');
    sectionsList = res.data?.data || res.data || [];
  } catch (e) {
    // fallback
  }

  return (
    <div>
      <StudentsManager initialStudents={studentsList} sections={sectionsList} />
    </div>
  );
}
