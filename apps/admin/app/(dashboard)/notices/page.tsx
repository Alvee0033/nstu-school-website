import React from 'react';
import { api } from '@/lib/api';
import NoticesManager from './NoticesManager';

export const dynamic = 'force-dynamic';

export default async function NoticesAdminPage() {
  let noticesList: any[] = [];
  try {
    const res: any = await api.get('/admin/notices?limit=100');
    noticesList = res.data?.data || res.data || [];
  } catch (e) {
    // fallback
  }

  return (
    <div>
      <NoticesManager initialNotices={noticesList} />
    </div>
  );
}
