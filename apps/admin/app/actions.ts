'use server';

import { api } from '@/lib/api';
import { setSessionToken, clearSessionToken } from '@/lib/auth-cookies';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ── Authentication Actions ────────────────────────────────────────────────

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please enter both email and password' };
  }

  try {
    const res = await api.post<{ accessToken: string }>('/auth/login', { email, password });
    await setSessionToken(res.accessToken);
  } catch (err: any) {
    return { error: err.message || 'Login failed. Please try again.' };
  }

  redirect('/');
}

export async function logoutAction() {
  await clearSessionToken();
  redirect('/login');
}

// ── Notices Actions ───────────────────────────────────────────────────────

export async function createNoticeAction(data: any) {
  try {
    await api.post('/admin/notices', data);
    revalidatePath('/notices');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create notice' };
  }
}

export async function updateNoticeAction(id: string, data: any) {
  try {
    await api.patch(`/admin/notices/${id}`, data);
    revalidatePath('/notices');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update notice' };
  }
}

export async function deleteNoticeAction(id: string) {
  try {
    await api.delete(`/admin/notices/${id}`);
    revalidatePath('/notices');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete notice' };
  }
}

export async function publishNoticeAction(id: string) {
  try {
    await api.patch(`/admin/notices/${id}/publish`, {});
    revalidatePath('/notices');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to publish notice' };
  }
}

export async function unpublishNoticeAction(id: string) {
  try {
    await api.patch(`/admin/notices/${id}/unpublish`, {});
    revalidatePath('/notices');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to unpublish notice' };
  }
}

// ── Teachers Actions ──────────────────────────────────────────────────────

export async function createTeacherAction(data: any) {
  try {
    await api.post('/admin/teachers', data);
    revalidatePath('/teachers');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create teacher' };
  }
}

export async function updateTeacherAction(id: string, data: any) {
  try {
    await api.patch(`/admin/teachers/${id}`, data);
    revalidatePath('/teachers');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update teacher' };
  }
}

export async function deleteTeacherAction(id: string) {
  try {
    await api.delete(`/admin/teachers/${id}`);
    revalidatePath('/teachers');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete teacher' };
  }
}

// ── Students Actions ──────────────────────────────────────────────────────

export async function createStudentAction(data: any) {
  try {
    await api.post('/admin/students', data);
    revalidatePath('/students');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create student' };
  }
}

export async function updateStudentAction(id: string, data: any) {
  try {
    await api.patch(`/admin/students/${id}`, data);
    revalidatePath('/students');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update student' };
  }
}

export async function deleteStudentAction(id: string) {
  try {
    await api.delete(`/admin/students/${id}`);
    revalidatePath('/students');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete student' };
  }
}

// ── Exams Actions ─────────────────────────────────────────────────────────

export async function createExamAction(data: any) {
  try {
    await api.post('/admin/results/exams', data);
    revalidatePath('/results');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create exam' };
  }
}

export async function updateExamAction(id: string, data: any) {
  try {
    await api.patch(`/admin/results/exams/${id}`, data);
    revalidatePath('/results');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update exam' };
  }
}

export async function deleteExamAction(id: string) {
  try {
    await api.delete(`/admin/results/exams/${id}`);
    revalidatePath('/results');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete exam' };
  }
}

// ── Results Actions ───────────────────────────────────────────────────────

export async function createResultAction(data: any) {
  try {
    await api.post('/admin/results', data);
    revalidatePath('/results');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create result' };
  }
}

export async function updateResultAction(id: string, data: any) {
  try {
    await api.patch(`/admin/results/${id}`, data);
    revalidatePath('/results');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update result' };
  }
}

export async function deleteResultAction(id: string) {
  try {
    await api.delete(`/admin/results/${id}`);
    revalidatePath('/results');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete result' };
  }
}

// ── Staff Actions ─────────────────────────────────────────────────────────

export async function createStaffAction(data: any) {
  try {
    await api.post('/admin/staff', data);
    revalidatePath('/staff');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create staff member' };
  }
}

export async function updateStaffAction(id: string, data: any) {
  try {
    await api.patch(`/admin/staff/${id}`, data);
    revalidatePath('/staff');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update staff member' };
  }
}

export async function deleteStaffAction(id: string) {
  try {
    await api.delete(`/admin/staff/${id}`);
    revalidatePath('/staff');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete staff member' };
  }
}

// ── School Info Actions ───────────────────────────────────────────────────

export async function updateSchoolInfoAction(data: any) {
  try {
    await api.patch('/admin/school-info', data);
    revalidatePath('/school-info');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update school info' };
  }
}

// ── Academics (Classes & Sections) Actions ───────────────────────────────

export async function createClassAction(data: any) {
  try {
    await api.post('/admin/academics/classes', data);
    revalidatePath('/academics');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create class' };
  }
}

export async function updateClassAction(id: string, data: any) {
  try {
    await api.patch(`/admin/academics/classes/${id}`, data);
    revalidatePath('/academics');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update class' };
  }
}

export async function deleteClassAction(id: string) {
  try {
    await api.delete(`/admin/academics/classes/${id}`);
    revalidatePath('/academics');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete class' };
  }
}

export async function createSectionAction(data: any) {
  try {
    await api.post('/admin/academics/sections', data);
    revalidatePath('/academics');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create section' };
  }
}

export async function updateSectionAction(id: string, data: any) {
  try {
    await api.patch(`/admin/academics/sections/${id}`, data);
    revalidatePath('/academics');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update section' };
  }
}

export async function deleteSectionAction(id: string) {
  try {
    await api.delete(`/admin/academics/sections/${id}`);
    revalidatePath('/academics');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete section' };
  }
}

// ── Gallery Actions ───────────────────────────────────────────────────────

export async function createAlbumAction(data: any) {
  try {
    await api.post('/admin/gallery', data);
    revalidatePath('/gallery');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create gallery album' };
  }
}

export async function updateAlbumAction(id: string, data: any) {
  try {
    await api.patch(`/admin/gallery/${id}`, data);
    revalidatePath('/gallery');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update gallery album' };
  }
}

export async function deleteAlbumAction(id: string) {
  try {
    await api.delete(`/admin/gallery/${id}`);
    revalidatePath('/gallery');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete gallery album' };
  }
}
