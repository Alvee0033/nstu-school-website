import React from 'react';
import { api } from '@/lib/api';
import StaffManager from './StaffManager';

export const dynamic = 'force-dynamic';

export default async function StaffAdminPage() {
  let staffList: any[] = [];
  try {
    const res: any = await api.get('/admin/staff?limit=100');
    staffList = res.data?.data || res.data || [];
  } catch (e) {
    // fallback
  }

  return (
    <div>
      <StaffManager initialStaff={staffList} />
    </div>
  );
}
