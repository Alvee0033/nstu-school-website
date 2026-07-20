import React from 'react';
import { api } from '@/lib/api';
import ResultsManager from './ResultsManager';

export const dynamic = 'force-dynamic';

export default async function ResultsAdminPage() {
  let examsList: any[] = [];
  let resultsList: any[] = [];
  let studentsList: any[] = [];
  let sectionsList: any[] = [];

  try {
    const examsRes: any = await api.get('/admin/results/exams?limit=100');
    examsList = examsRes.data?.data || examsRes.data || [];
  } catch (e) {}

  try {
    const resultsRes: any = await api.get('/admin/results?limit=100');
    resultsList = resultsRes.data?.data || resultsRes.data || [];
  } catch (e) {}

  try {
    const studentsRes: any = await api.get('/admin/students?limit=100');
    studentsList = studentsRes.data?.data || studentsRes.data || [];
  } catch (e) {}

  try {
    const res: any = await api.get('/admin/academics/sections');
    sectionsList = res.data?.data || res.data || [];
  } catch (e) {}

  return (
    <div>
      <ResultsManager
        initialExams={examsList}
        initialResults={resultsList}
        students={studentsList}
        sections={sectionsList}
      />
    </div>
  );
}
