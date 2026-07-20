import React from 'react';
import { api } from '@/lib/api';
import GalleryManager from './GalleryManager';

export const dynamic = 'force-dynamic';

export default async function GalleryAdminPage() {
  let albumsList: any[] = [];
  try {
    const res: any = await api.get('/admin/gallery?limit=100');
    albumsList = res.data?.data || res.data || [];
  } catch (e) {
    // fallback
  }

  return (
    <div>
      <GalleryManager initialAlbums={albumsList} />
    </div>
  );
}
