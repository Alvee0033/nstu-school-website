import React from 'react';
import { api } from '@/lib/api';
import SchoolInfoForm from './SchoolInfoForm';

export const dynamic = 'force-dynamic';

export default async function SchoolInfoAdminPage() {
  let schoolInfo = null;
  try {
    const res: any = await api.get('/admin/school-info');
    schoolInfo = res.data?.data || res.data || null;
  } catch (e) {
    // fallback
  }

  return (
    <div>
      <SchoolInfoForm initialData={schoolInfo} />
    </div>
  );
}
