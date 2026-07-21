import type { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

interface Notice {
  id: string;
  titleEn: string;
  titleBn: string;
  contentEn?: string;
  contentBn?: string;
  category: string;
  isUrgent: boolean;
  attachmentUrl?: string;
  publishedAt: string;
}

const FALLBACK_NOTICES: Record<string, Notice> = {
  n1: {
    id: 'n1',
    titleEn: 'Admission Open for Class 1 to 10 — Academic Year 2026',
    titleBn: 'শ্রেণী ১ থেকে ১০ পর্যন্ত ভর্তি চলছে — শিক্ষাবর্ষ ২০২৬',
    contentBn: 'নোবিপ্রবি মডেল স্কুলে ২০২৬ শিক্ষাবর্ষের জন্য শ্রেণী ১ থেকে ১০ পর্যন্ত ভর্তি কার্যক্রম শুরু হয়েছে। আগ্রহী অভিভাবক ও শিক্ষার্থীদের অনলাইনের মাধ্যমে আবেদন করার অনুরোধ করা হচ্ছে। ভর্তির আবেদন ফরম পূরণের শেষ সময় ২০ জানুয়ারি ২০২৬। আবেদনের বিস্তারিত নিয়মাবলী ও প্রসপেক্টাস নিচে সংযুক্ত ফাইলে দেওয়া হলো।',
    category: 'ADMISSION',
    isUrgent: true,
    publishedAt: '2026-01-10T00:00:00Z',
    attachmentUrl: '#',
  },
  n2: {
    id: 'n2',
    titleEn: 'Annual Sports Day Scheduled for 25 January 2026',
    titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২৫ জানুয়ারি ২০২৬',
    contentBn: 'নোবিপ্রবি মডেল স্কুলের বার্ষিক ক্রীড়া প্রতিযোগিতা আগামী ২৫ জানুয়ারি ২০২৬ তারিখে বিশ্ববিদ্যালয় কেন্দ্রীয় খেলার মাঠে অনুষ্ঠিত হবে। ক্রীড়া প্রতিযোগিতায় বিভিন্ন ইভেন্টে অংশগ্রহণে ইচ্ছুক শিক্ষার্থীদের নিজ নিজ শ্রেণীর শ্রেণী শিক্ষকের নিকট নাম জমা দেওয়ার জন্য বলা হলো। নাম জমা দেওয়ার শেষ তারিখ ১৫ জানুয়ারি ২০২৬।',
    category: 'GENERAL',
    isUrgent: false,
    publishedAt: '2026-01-08T00:00:00Z',
  },
  n3: {
    id: 'n3',
    titleEn: 'JSC Result 2025 Published — 98.6% Pass Rate',
    titleBn: 'জেএসসি ফলাফল ২০২৫ প্রকাশিত — পাসের হার ৯৮.৬%',
    contentBn: 'জেএসসি ২০২৫ পরীক্ষার ফলাফল প্রকাশিত হয়েছে। এ বছর আমাদের স্কুলের পাসের হার ৯৮.৬% এবং জিপিএ-৫ পেয়েছে ৬০ জন শিক্ষার্থী। সকল সফল শিক্ষার্থী, অভিভাবক ও শিক্ষকদের এই গৌরবময় অর্জনে আন্তরিক অভিনন্দন ও শুভেচ্ছা জানানো হচ্ছে।',
    category: 'RESULT',
    isUrgent: false,
    publishedAt: '2026-01-05T00:00:00Z',
    attachmentUrl: '#',
  },
  n4: {
    id: 'n4',
    titleEn: 'Final Examination Routine for Class 5 — February 2026',
    titleBn: 'পঞ্চম শ্রেণীর বার্ষিক পরীক্ষার রুটিন — ফেব্রুয়ারি ২০২৬',
    contentBn: 'পঞ্চম শ্রেণীর বার্ষিক পরীক্ষা ২০২৬ এর সময়সূচী ও রুটিন প্রকাশিত হয়েছে। আগামী ৫ ফেব্রুয়ারি ২০২৬ থেকে পরীক্ষা শুরু হবে। সকল শিক্ষার্থীদের নির্ধারিত সময় অনুযায়ী পরীক্ষায় অংশগ্রহণের নির্দেশ দেওয়া হচ্ছে। রুটিনটি পিডিএফ আকারে সংযুক্ত করা হলো।',
    category: 'EXAM',
    isUrgent: false,
    publishedAt: '2026-01-03T00:00:00Z',
    attachmentUrl: '#',
  },
  n5: {
    id: 'n5',
    titleEn: 'Science Fair 2026 Registration Now Open',
    titleBn: 'বিজ্ঞান মেলা ২০২৬-এ নিবন্ধন শুরু হয়েছে',
    contentBn: 'নোবিপ্রবি মডেল স্কুল বিজ্ঞান ক্লাব আয়োজিত বিজ্ঞান মেলা ২০২৬ এ অংশগ্রহণের জন্য নিবন্ধন শুরু হয়েছে। আগ্রহী শিক্ষার্থীরা ২ বা ৩ জনের দল গঠন করে আগামী ১৫ জানুয়ারির মধ্যে বিজ্ঞান ক্লাবের সমন্বয়ক শিক্ষকের নিকট প্রজেক্টের সারসংক্ষেপ জমা দিন। মেলা অনুষ্ঠিত হবে ৫ ফেব্রুয়ারি ২০২৬।',
    category: 'ACADEMIC',
    isUrgent: false,
    publishedAt: '2025-12-28T00:00:00Z',
  },
  n6: {
    id: 'n6',
    titleEn: 'Parent-Teacher Meeting on 15 February 2026',
    titleBn: 'অভিভাবক-শিক্ষক সভা ১৫ ফেব্রুয়ারি ২০২৬',
    contentBn: 'আগামী ১৫ ফেব্রুয়ারি ২০২৬ সকাল ১০:০০ টায় স্কুল মিলনায়তনে অভিভাবক-শিক্ষক সভা (Parent-Teacher Meeting) অনুষ্ঠিত হবে। শিক্ষার্থীদের শিক্ষাবর্ষের অর্ধবার্ষিক একাডেমিক অগ্রগতি পর্যালোচনা ও ভবিষ্যত পরিকল্পনা প্রণয়নে সকল সম্মানিত অভিভাবকদের উপস্থিত থাকার জন্য বিশেষভাবে অনুরোধ করা হচ্ছে।',
    category: 'GENERAL',
    isUrgent: false,
    publishedAt: '2025-12-25T00:00:00Z',
  },
};

const VARIANT_MAP: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'neutral'> = {
  ACADEMIC: 'primary',
  EXAM: 'warning',
  RESULT: 'success',
  GENERAL: 'neutral',
  ADMISSION: 'primary',
};

async function getNotice(id: string): Promise<Notice | null> {
  try {
    const result = await api.get<Notice>(`/public/notices/${id}`);
    if (!result || !result.titleEn) {
      return FALLBACK_NOTICES[id] || FALLBACK_NOTICES['n1'];
    }
    return result;
  } catch {
    return FALLBACK_NOTICES[id] || FALLBACK_NOTICES['n1'];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const notice = await getNotice(id);
  if (!notice) return { title: 'নোটিশ পাওয়া যায়নি' };
  return {
    title: notice.titleBn || notice.titleEn,
    description: `${notice.category} notice from NSTU Model School`,
  };
}

export default async function NoticePage({ params }: PageProps) {
  const { id } = await params;
  const notice = await getNotice(id);
  
  if (!notice) {
    return (
      <div className={styles.page}>
        <div className="container">
          <p className={styles.errorText}>দুঃখিত, নোটিশটি পাওয়া যায়নি।</p>
          <Button href="/notices" variant="secondary">নোটিশ বোর্ডে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  const dateVal = new Date(notice.publishedAt);
  const day = isNaN(dateVal.getTime()) ? '10' : dateVal.getDate().toString().padStart(2, '০');
  const monthBn = 'জানুয়ারি';

  return (
    <div className={styles.page}>
      {/* Banner Section */}
      <div className={styles.headerBanner}>
        <div className="container">
          <span className={styles.bannerTag}>নোটিশ বিবরণী</span>
          <h1 className={styles.heading}>{notice.titleBn || notice.titleEn}</h1>
          <p className={styles.bannerSub}>প্রকাশের তারিখ: {formatDate(notice.publishedAt)}</p>
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">হোম</Link>
          <span aria-hidden className={styles.breadSep}>/</span>
          <Link href="/notices">নোটিশ বোর্ড</Link>
          <span aria-hidden className={styles.breadSep}>/</span>
          <span aria-current="page" className={styles.breadActive}>বিস্তারিত</span>
        </nav>

        <article className={styles.article}>
          <div className={styles.articleHeader}>
            <div className={styles.badgeRow}>
              <Badge label={notice.category} variant={VARIANT_MAP[notice.category] ?? 'neutral'} />
              {notice.isUrgent && <Badge label="জরুরি বিজ্ঞপ্তি" variant="danger" />}
            </div>
            
            <div className={styles.articleMeta}>
              <div className={styles.calendarBadge}>
                <span className={styles.calDay}>{day}</span>
                <span className={styles.calMonth}>{monthBn}</span>
              </div>
              <div className={styles.metaInfo}>
                <span className={styles.publishedLabel}>প্রকাশক: নোবিপ্রবি মডেল স্কুল প্রশাসন</span>
                <time className={styles.date} dateTime={notice.publishedAt}>
                  {formatDate(notice.publishedAt)}
                </time>
              </div>
            </div>
          </div>

          <div className={styles.body}>
            <p className={styles.paragraph}>{notice.contentBn || notice.contentEn || 'এই বিজ্ঞপ্তির বিস্তারিত কোনো বিবরণ নেই।'}</p>
          </div>

          {notice.attachmentUrl && (
            <div className={styles.attachmentSection}>
              <h3 className={styles.attachmentTitle}>সংযুক্ত ফাইল ডাউনলোড করুন</h3>
              <a
                href={notice.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.attachment}
              >
                <svg className={styles.pdfIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.363 2c4.155 0 7.637 3.39 7.637 7.5v3.5h-1V9.5c0-3.584-2.99-6.5-6.637-6.5S4.726 5.916 4.726 9.5v8c0 3.584 2.99 6.5 6.637 6.5h4.637v1h-4.637c-4.155 0-7.637-3.39-7.637-7.5v-8C3.726 5.39 7.208 2 11.363 2z" />
                  <path d="M19 14.5l-3 3h2v4h2v-4h2l-3-3z" />
                </svg>
                <span>বিজ্ঞপ্তি সংযুক্তি ফাইল (PDF / Image)</span>
              </a>
            </div>
          )}

          <div className={styles.actions}>
            <Button href="/notices" variant="secondary" size="md" className={styles.backBtn}>
              <svg className={styles.backArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
              </svg>
              নোটিশ বোর্ডে ফিরে যান
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
