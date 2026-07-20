import React from 'react';
import { api } from '@/lib/api';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  let noticeCount = 0;
  let teacherCount = 0;
  let studentCount = 0;
  let staffCount = 0;
  let classCount = 0;

  try {
    const notices: any = await api.get('/public/notices?limit=1');
    noticeCount = notices.total || 0;
  } catch (e) {
    // fallback
  }

  try {
    const teachers: any = await api.get('/public/teachers?limit=1');
    teacherCount = teachers.total || 0;
  } catch (e) {
    // fallback
  }

  try {
    const students: any = await api.get('/public/students?limit=1');
    studentCount = students.total || 0;
  } catch (e) {
    // fallback
  }

  try {
    const staff: any = await api.get('/public/staff?limit=1');
    staffCount = staff.total || 0;
  } catch (e) {
    // fallback
  }

  try {
    const classes: any = await api.get('/public/academics/classes');
    classCount = classes.length || 0;
  } catch (e) {
    // fallback
  }

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

