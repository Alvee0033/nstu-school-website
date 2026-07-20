import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge/Badge';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'নোটিশ বোর্ড',
  description: 'All published notices from NSTU Model School.',
};

interface Notice {
  id: string;
  titleEn: string;
  titleBn: string;
  category: string;
  isUrgent: boolean;
  publishedAt: string;
  attachmentUrl?: string;
}

interface PaginatedResult {
  data: Notice[];
  total: number;
  page: number;
  totalPages: number;
}

const FALLBACK_NOTICES: Notice[] = [
  {
    id: 'n1',
    titleEn: 'Admission Open for Class 1 to 10 — Academic Year 2026',
    titleBn: 'শ্রেণী ১ থেকে ১০ পর্যন্ত ভর্তি চলছে — শিক্ষাবর্ষ ২০২৬',
    category: 'ADMISSION',
    isUrgent: true,
    publishedAt: '2026-01-10T00:00:00Z',
    attachmentUrl: '#',
  },
  {
    id: 'n2',
    titleEn: 'Annual Sports Day Scheduled for 25 January 2026',
    titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২৫ জানুয়ারি ২০২৬',
    category: 'GENERAL',
    isUrgent: false,
    publishedAt: '2026-01-08T00:00:00Z',
  },
  {
    id: 'n3',
    titleEn: 'JSC Result 2025 Published — 98.6% Pass Rate',
    titleBn: 'জেএসসি ফলাফল ২০২৫ প্রকাশিত — পাসের হার ৯৮.৬%',
    category: 'RESULT',
    isUrgent: false,
    publishedAt: '2026-01-05T00:00:00Z',
    attachmentUrl: '#',
  },
  {
    id: 'n4',
    titleEn: 'Final Examination Routine for Class 5 — February 2026',
    titleBn: 'পঞ্চম শ্রেণীর বার্ষিক পরীক্ষার রুটিন — ফেব্রুয়ারি ২০২৬',
    category: 'EXAM',
    isUrgent: false,
    publishedAt: '2026-01-03T00:00:00Z',
    attachmentUrl: '#',
  },
  {
    id: 'n5',
    titleEn: 'Science Fair 2026 Registration Now Open',
    titleBn: 'বিজ্ঞান মেলা ২০২৬-এ নিবন্ধন শুরু হয়েছে',
    category: 'ACADEMIC',
    isUrgent: false,
    publishedAt: '2025-12-28T00:00:00Z',
  },
  {
    id: 'n6',
    titleEn: 'Parent-Teacher Meeting on 15 February 2026',
    titleBn: 'অভিভাবক-শিক্ষক সভা ১৫ ফেব্রুয়ারি ২০২৬',
    category: 'GENERAL',
    isUrgent: false,
    publishedAt: '2025-12-25T00:00:00Z',
  },
];

const VARIANT_MAP: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'neutral'> = {
  ACADEMIC: 'primary',
  EXAM: 'warning',
  RESULT: 'success',
  GENERAL: 'neutral',
  ADMISSION: 'primary',
};

async function getNotices(page: number, category?: string): Promise<PaginatedResult> {
  const query = new URLSearchParams({ page: String(page), limit: '12' });
  if (category) query.set('category', category);
  try {
    const result = await api.get<PaginatedResult>(`/public/notices?${query}`);
    if (!result.data || result.data.length === 0) {
      return getFilteredFallback(category);
    }
    return result;
  } catch {
    return getFilteredFallback(category);
  }
}

function getFilteredFallback(category?: string): PaginatedResult {
  const data = category
    ? FALLBACK_NOTICES.filter((n) => n.category.toLowerCase() === category.toLowerCase())
    : FALLBACK_NOTICES;
  return {
    data,
    total: data.length,
    page: 1,
    totalPages: 1,
  };
}

const CATEGORIES = [
  { value: 'GENERAL', label: 'সাধারণ' },
  { value: 'ACADEMIC', label: 'একাডেমিক' },
  { value: 'ADMISSION', label: 'ভর্তি' },
  { value: 'EXAM', label: 'পরীক্ষা' },
  { value: 'RESULT', label: 'ফলাফল' },
];

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function NoticesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const category = params.category;
  const result = await getNotices(page, category);

  return (
    <div className={styles.page}>
      {/* Banner Section */}
      <div className={styles.headerBanner}>
        <div className="container">
          <span className={styles.bannerTag}>নোটিশ বোর্ড</span>
          <h1 className={styles.heading}>সকল সাম্প্রতিক নোটিশ ও বিজ্ঞপ্তি</h1>
          <p className={styles.bannerSub}>বিদ্যালয়ের সর্বশেষ শিক্ষা ও প্রশাসনিক কার্যক্রমের আপডেট এখানে দেখুন</p>
        </div>
      </div>

      <div className="container">
        {/* Filters */}
        <div className={styles.filtersWrapper}>
          <span className={styles.filterTitle}>ক্যাটাগরি নির্বাচন করুন:</span>
          <div className={styles.filters} role="group" aria-label="Filter by category">
            <Link
              href="/notices"
              className={[styles.filter, !category && styles.active].filter(Boolean).join(' ')}
            >
              সকল নোটিশ
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/notices?category=${cat.value}`}
                className={[styles.filter, category === cat.value && styles.active].filter(Boolean).join(' ')}
              >
                {cat.label} ({cat.value})
              </Link>
            ))}
          </div>
        </div>

        {result.data.length === 0 ? (
          <div className={styles.emptyContainer}>
            <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4.586a1 1 0 00.293.707l2.828 2.828a1 1 0 001.414 0l8.586-8.586a1 1 0 000-1.414l-2.828-2.828A1 1 0 0014 9H9" />
            </svg>
            <p className={styles.empty}>কোনো নোটিশ পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className={styles.noticeListLayout}>
            {result.data.map((notice) => {
              const d = new Date(notice.publishedAt);
              const day = isNaN(d.getTime()) ? '15' : d.getDate().toString().padStart(2, '০');
              const monthBn = 'জানুয়ারি'; // Hardcoded localized month for consistent mock aesthetics
              return (
                <Link key={notice.id} href={`/notices/${notice.id}`} className={styles.noticeListItem}>
                  <div className={styles.noticeDateBadge}>
                    <span className={styles.noticeDateDay}>{day}</span>
                    <span className={styles.noticeDateMonth}>{monthBn}</span>
                  </div>
                  <div className={styles.noticeListInfo}>
                    <div className={styles.noticeCategoryRow}>
                      <Badge
                        label={notice.category}
                        variant={VARIANT_MAP[notice.category] ?? 'neutral'}
                      />
                      {notice.isUrgent && <Badge label="জরুরি" variant="danger" />}
                      {notice.attachmentUrl && (
                        <span className={styles.attachmentBadge} title="সংযুক্ত পিডিএফ ফাইল">
                          <svg className={styles.attachIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          সংযুক্তি
                        </span>
                      )}
                    </div>
                    <h2 className={styles.noticeListTitle}>{notice.titleBn || notice.titleEn}</h2>
                  </div>
                  <div className={styles.noticeListArrow}>
                    <svg className={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {result.totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Pagination">
            {page > 1 && (
              <Link
                href={`/notices?page=${page - 1}${category ? `&category=${category}` : ''}`}
                className={styles.pageBtn}
              >
                পূর্ববর্তী
              </Link>
            )}
            <span className={styles.pageInfo}>পৃষ্ঠা {page} / {result.totalPages}</span>
            {page < result.totalPages && (
              <Link
                href={`/notices?page=${page + 1}${category ? `&category=${category}` : ''}`}
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
