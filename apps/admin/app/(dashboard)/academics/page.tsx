import React from 'react';
import { api } from '@/lib/api';
import AcademicsManager from './AcademicsManager';

export const dynamic = 'force-dynamic';

export default async function AcademicsAdminPage() {
  let classesList: any[] = [];
  try {
    const res: any = await api.get('/admin/academics/classes');
    classesList = res.data?.data || res.data || [];
  } catch (e) {
    // fallback
  }

  return (
    <div>
      <AcademicsManager initialClasses={classesList} />
    </div>
  );
}
