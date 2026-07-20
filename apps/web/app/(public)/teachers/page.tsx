import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'শিক্ষকবৃন্দ',
  description: 'NSTU Model School teacher directory and faculty member list.',
};

interface Teacher {
  id: string;
  nameEn: string;
  nameBn: string | null;
  designation: string;
  department: string | null;
  subject: string | null;
  photoUrl: string | null;
  email: string | null;
  phone: string | null;
}

interface PaginatedResult {
  data: Teacher[];
  total: number;
  page: number;
  totalPages: number;
}

const FALLBACK_TEACHERS: Teacher[] = [
  {
    id: 't1',
    nameEn: 'Professor Dr. Muhammad Alam',
    nameBn: 'প্রফেসর ড. মুহাম্মদ আলম',
    designation: 'প্রধান শিক্ষক',
    department: 'Science',
    subject: 'Physics',
    photoUrl: '/principal.png',
    email: 'headmaster@school.edu.bd',
    phone: '+৮৮০১৭১২৩৪NTUA',
  },
  {
    id: 't2',
    nameEn: 'Kazi Farhana',
    nameBn: 'কাজী ফারহানা',
    designation: 'সহকারী প্রধান শিক্ষিকা',
    department: 'English',
    subject: 'English Literature',
    photoUrl: '/teacher_1.png',
    email: 'farhana.eng@school.edu.bd',
    phone: '+৮৮০১৭১২৩৪NTUB',
  },
  {
    id: 't3',
    nameEn: 'Md. Abdur Rahman',
    nameBn: 'মোঃ আব্দুর রহমান',
    designation: 'জ্যেষ্ঠ শিক্ষক (গণিত)',
    department: 'Mathematics',
    subject: 'Higher Mathematics',
    photoUrl: '/teacher_2.png',
    email: 'rahman.math@school.edu.bd',
    phone: '+৮৮০১৭১২৩৪NTUC',
  },
  {
    id: 't4',
    nameEn: 'Sultana Razia',
    nameBn: 'সুলতানা রাজিয়া',
    designation: 'সহকারী শিক্ষিকা (রসায়ন)',
    department: 'Science',
    subject: 'Chemistry',
    photoUrl: '/teacher_1.png',
    email: 'razia.chem@school.edu.bd',
    phone: '+৮৮০১৭১২৩৪NTUD',
  },
];

async function getTeachers(page: number, department?: string): Promise<PaginatedResult> {
  const query = new URLSearchParams({ page: String(page), limit: '24' });
  if (department) query.set('department', department);
  try {
    const result = await api.get<PaginatedResult>(`/public/teachers?${query}`);
    if (!result.data || result.data.length === 0) {
      return getFilteredFallback(department);
    }
    return result;
  } catch {
    return getFilteredFallback(department);
  }
}

function getFilteredFallback(department?: string): PaginatedResult {
  const data = department
    ? FALLBACK_TEACHERS.filter((t) => t.department?.toLowerCase() === department.toLowerCase())
    : FALLBACK_TEACHERS;
  return {
    data,
    total: data.length,
    page: 1,
    totalPages: 1,
  };
}

const DEPARTMENTS = [
  { value: 'Science', label: 'বিজ্ঞান' },
  { value: 'Arts', label: 'মানবিক' },
  { value: 'Commerce', label: 'ব্যবসায় শিক্ষা' },
  { value: 'Mathematics', label: 'গণিত' },
  { value: 'English', label: 'ইংরেজি' },
];

interface PageProps {
  searchParams: Promise<{ page?: string; department?: string }>;
}

export default async function TeachersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const department = params.department;
  const result = await getTeachers(page, department);

  return (
    <div className={styles.page}>
      {/* Banner Section */}
      <div className={styles.headerBanner}>
        <div className="container">
          <span className={styles.bannerTag}>শিক্ষক তালিকা</span>
          <h1 className={styles.heading}>আমাদের দক্ষ ও অভিজ্ঞ শিক্ষক মণ্ডলী</h1>
          <p className={styles.bannerSub}>শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ ও নৈতিক চরিত্র গঠনে নিবেদিতপ্রাণ</p>
        </div>
      </div>

      <div className="container">
        {/* Filters */}
        <div className={styles.filtersWrapper}>
          <span className={styles.filterTitle}>বিভাগ নির্বাচন করুন:</span>
          <div className={styles.filters} role="group" aria-label="Filter by department">
            <Link
              href="/teachers"
              className={[styles.filter, !department && styles.active].filter(Boolean).join(' ')}
            >
              সকল শিক্ষক
            </Link>
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.value}
                href={`/teachers?department=${dept.value}`}
                className={[styles.filter, department === dept.value && styles.active].filter(Boolean).join(' ')}
              >
                {dept.label} ({dept.value})
              </Link>
            ))}
          </div>
        </div>

        {result.data.length === 0 ? (
          <div className={styles.emptyContainer}>
            <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className={styles.empty}>কোনো শিক্ষক পাওয়া যায়নি।</p>
          </div>
        ) : (
          <ul className={styles.grid} role="list">
            {result.data.map((teacher) => (
              <li key={teacher.id}>
                <Card className={styles.card}>
                  <div className={styles.cardAccent} />
                  <div className={styles.avatarWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={teacher.photoUrl || '/avatar-placeholder.png'}
                      alt={teacher.nameEn}
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.name}>{teacher.nameBn || teacher.nameEn}</h2>
                    {teacher.nameBn && <p className={styles.nameEn}>{teacher.nameEn}</p>}
                    <span className={styles.designation}>{teacher.designation}</span>
                    {teacher.department && (
                      <span className={styles.dept}>{teacher.department} বিভাগ</span>
                    )}
                  </div>
                  <div className={styles.contactInfo}>
                    {teacher.email && (
                      <a href={`mailto:${teacher.email}`} className={styles.contactLink} title={teacher.email}>
                        <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{teacher.email}</span>
                      </a>
                    )}
                    {teacher.phone && (
                      <div className={styles.contactItem}>
                        <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{teacher.phone}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {result.totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Pagination">
            {page > 1 && (
              <Link
                href={`/teachers?page=${page - 1}${department ? `&department=${department}` : ''}`}
                className={styles.pageBtn}
              >
                পূর্ববর্তী
              </Link>
            )}
            <span className={styles.pageInfo}>পৃষ্ঠা {page} / {result.totalPages}</span>
            {page < result.totalPages && (
              <Link
                href={`/teachers?page=${page + 1}${department ? `&department=${department}` : ''}`}
                className={styles.pageBtn}
              >
                পরবর্তী
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
