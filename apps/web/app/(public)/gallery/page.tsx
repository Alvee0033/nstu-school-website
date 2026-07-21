import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'গ্যালারি',
  description: 'Notun Kuri High School photo and video albums of various school events.',
};

interface GalleryAlbum {
  id: string;
  titleEn: string;
  titleBn: string | null;
  description: string | null;
  coverImageUrl: string | null;
  eventDate: string | null;
}

interface PaginatedResult {
  data: GalleryAlbum[];
  total: number;
  page: number;
  totalPages: number;
}

const FALLBACK_ALBUMS: GalleryAlbum[] = [
  {
    id: 'a1',
    titleEn: 'Modern Smart Classroom Facility',
    titleBn: 'আধুনিক ক্লাসরুম ও পাঠদান',
    description: 'ডিজিটাল প্রজেক্টর ও মাল্টিমিডিয়া প্রজেকশন সম্বলিত আধুনিক ক্লাসরুম ব্যবস্থা।',
    coverImageUrl: '/gallery_classroom.png',
    eventDate: '2026-01-10T00:00:00Z',
  },
  {
    id: 'a2',
    titleEn: 'Advanced Science & Computer Lab',
    titleBn: 'বিজ্ঞানাগার ও কম্পিউটার ল্যাব',
    description: 'বিজ্ঞান বিভাগের শিক্ষার্থীদের ব্যবহারিক ক্লাস ও তথ্যপ্রযুক্তি প্রশিক্ষণের সুব্যবস্থা।',
    coverImageUrl: '/gallery_lab.png',
    eventDate: '2026-01-08T00:00:00Z',
  },
  {
    id: 'a3',
    titleEn: 'Annual Sports Festival',
    titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও উৎসব',
    description: 'শিক্ষার্থীদের শারীরিক বিকাশ ও ক্রীড়া চর্চার জন্য বার্ষিক ক্রীড়া প্রতিযোগিতা উৎসব।',
    coverImageUrl: '/gallery_sports.png',
    eventDate: '2026-01-05T00:00:00Z',
  },
];

async function getAlbums(page: number): Promise<PaginatedResult> {
  try {
    const result = await api.get<PaginatedResult>(`/public/gallery/albums?page=${page}&limit=12`);
    if (!result.data || result.data.length === 0) {
      return { data: FALLBACK_ALBUMS, total: 3, page: 1, totalPages: 1 };
    }
    return result;
  } catch {
    return { data: FALLBACK_ALBUMS, total: 3, page: 1, totalPages: 1 };
  }
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function GalleryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const result = await getAlbums(page);

  return (
    <div className={styles.page}>
      {/* Banner Section */}
      <div className={styles.headerBanner}>
        <div className="container">
          <span className={styles.bannerTag}>ফটো গ্যালারি</span>
          <h1 className={styles.heading}>আমাদের ক্যাম্পাস ও কার্যক্রমের স্থিরচিত্র</h1>
          <p className={styles.bannerSub}>ক্লাসরুম, ল্যাব এবং শিক্ষার্থীদের বিভিন্ন উৎসব ও আনন্দের মুহূর্তগুলো</p>
        </div>
      </div>

      <div className="container">
        {result.data.length === 0 ? (
          <div className={styles.emptyContainer}>
            <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className={styles.empty}>কোনো গ্যালারি অ্যালবাম পাওয়া যায়নি।</p>
          </div>
        ) : (
          <ul className={styles.grid} role="list">
            {result.data.map((album) => (
              <li key={album.id}>
                <Card interactive className={styles.card}>
                  <div className={styles.imageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={album.coverImageUrl || '/gallery-placeholder.png'}
                      alt={album.titleEn}
                      className={styles.image}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                  <div className={styles.content}>
                    <span className={styles.albumTag}>অ্যালবাম</span>
                    <h2 className={styles.title}>{album.titleBn || album.titleEn}</h2>
                    {album.eventDate && (
                      <time className={styles.date} dateTime={album.eventDate}>
                        <svg className={styles.calendarIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(album.eventDate)}
                      </time>
                    )}
                    {album.description && (
                      <p className={styles.desc}>{album.description}</p>
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
              <Link href={`/gallery?page=${page - 1}`} className={styles.pageBtn}>
                পূর্ববর্তী
              </Link>
            )}
            <span className={styles.pageInfo}>পৃষ্ঠা {page} / {result.totalPages}</span>
            {page < result.totalPages && (
              <Link href={`/gallery?page=${page + 1}`} className={styles.pageBtn}>
                পরবর্তী
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
