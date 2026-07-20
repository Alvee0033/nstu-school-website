import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';
import { PremiumHero } from '@/components/layout/PremiumHero/PremiumHero';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'নোবিপ্রবি মডেল স্কুল — নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ক্যাম্পাসের একটি আধুনিক শিক্ষা প্রতিষ্ঠান।',
};

interface Notice {
  id: string;
  titleEn: string;
  titleBn: string;
  category: string;
  isUrgent: boolean;
  publishedAt: string;
}

const CATEGORY_VARIANT_MAP: Record<
  string,
  'primary' | 'success' | 'warning' | 'danger' | 'neutral'
> = {
  ACADEMIC: 'primary',
  EXAM: 'warning',
  RESULT: 'success',
  GENERAL: 'neutral',
};

async function getLatestNotices(): Promise<Notice[]> {
  try {
    const result = await api.get<{ data: Notice[] }>('/public/notices?limit=6');
    return result.data;
  } catch {
    return FALLBACK_NOTICES;
  }
}

const FALLBACK_NOTICES: Notice[] = [
  {
    id: '1',
    titleEn: 'Admission Open for Class 1 to 10 — Academic Year 2026',
    titleBn: 'শ্রেণী ১ থেকে ১০ পর্যন্ত ভর্তি চলছে — শিক্ষাবর্ষ ২০২৬',
    category: 'ACADEMIC',
    isUrgent: true,
    publishedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: '2',
    titleEn: 'Annual Sports Day Scheduled for 25 January 2026',
    titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২৫ জানুয়ারি ২০২৬',
    category: 'GENERAL',
    isUrgent: false,
    publishedAt: '2026-01-08T00:00:00Z',
  },
  {
    id: '3',
    titleEn: 'JSC Result 2025 Published — 98.6% Pass Rate',
    titleBn: 'জেএসসি ফলাফল ২০২৫ প্রকাশিত — পাসের হার ৯৮.৬%',
    category: 'RESULT',
    isUrgent: false,
    publishedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: '4',
    titleEn: 'Final Examination Routine for Class 5 — February 2026',
    titleBn: 'পঞ্চম শ্রেণীর বার্ষিক পরীক্ষার রুটিন — ফেব্রুয়ারি ২০২৬',
    category: 'EXAM',
    isUrgent: false,
    publishedAt: '2026-01-03T00:00:00Z',
  },
  {
    id: '5',
    titleEn: 'Science Fair 2026 Registration Now Open',
    titleBn: 'বিজ্ঞান মেলা ২০২৬-এ নিবন্ধন শুরু হয়েছে',
    category: 'ACADEMIC',
    isUrgent: false,
    publishedAt: '2025-12-28T00:00:00Z',
  },
  {
    id: '6',
    titleEn: 'Parent-Teacher Meeting on 15 February 2026',
    titleBn: 'অভিভাবক-শিক্ষক সভা ১৫ ফেব্রুয়ারি ২০২৬',
    category: 'GENERAL',
    isUrgent: false,
    publishedAt: '2025-12-25T00:00:00Z',
  },
];

const TICKER_NOTICES = [
  'ভর্তি চলছে ২০২৬ — আজই অনলাইনে আবেদন করুন',
  'বার্ষিক ক্রীড়া প্রতিযোগিতা: ২৫ জানুয়ারি ২০২৬',
  'জেএসসি ফলাফল ২০২৫ প্রকাশিত: পাসের হার ৯৮.৬%',
  'বিজ্ঞান মেলা ২০২৬ — নিবন্ধন চলছে',
  'অভিভাবক-শিক্ষক সভা: ১৫ ফেব্রুয়ারি ২০২৬',
];

export default async function HomePage() {
  const notices = await getLatestNotices();

  return (
    <div className={styles.homeWrapper}>

      {/* ── 1. HERO SECTION ── */}
      <PremiumHero />

      {/* Notice Ticker */}
      <div className={styles.tickerBar} role="marquee" aria-label="Latest announcements">
        <span className={styles.tickerLabel}>
          <svg className={styles.tickerIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          বিজ্ঞপ্তি
        </span>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerInner}>
            {[...TICKER_NOTICES, ...TICKER_NOTICES].map((text, i) => (
              <span key={i} className={styles.tickerItem}>{text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. KPI STATS ── */}
      <section className={`${styles.kpiSection} reveal`} aria-labelledby="kpi-heading">
        <div className="container">
          <h2 id="kpi-heading" className={styles.srOnly}>School Statistics</h2>
          <div className={styles.kpiGrid}>
            {[
              {
                value: '১,২০০+',
                label: 'শিক্ষার্থী',
                icon: (
                  <svg className={styles.kpiIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                value: '৬০+',
                label: 'অভিজ্ঞ শিক্ষক',
                icon: (
                  <svg className={styles.kpiIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                )
              },
              {
                value: '৯৮%+',
                label: 'পাসের হার',
                icon: (
                  <svg className={styles.kpiIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                value: '২০+',
                label: 'বছরের গৌরব',
                icon: (
                  <svg className={styles.kpiIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0H4m8 0h8M4 12h16m-16 4h16" />
                  </svg>
                )
              }
            ].map((stat, i) => (
              <div key={i} className={styles.kpiCard}>
                <div className={styles.kpiIconFrame}>{stat.icon}</div>
                <div className={styles.kpiInfo}>
                  <strong className={styles.kpiValue}>{stat.value}</strong>
                  <span className={styles.kpiLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PRINCIPAL'S WELCOME ── */}
      <section className={`${styles.welcomeSection} reveal`} aria-labelledby="welcome-heading">
        <div className="container">
          <div className={styles.welcomeLayout}>
            <div className={styles.welcomeVisual}>
              <div className={styles.photoContainer}>
                <Image
                  src="/principal.png"
                  alt="প্রফেসর ড. মুহাম্মদ আলম, প্রধান শিক্ষক"
                  width={280}
                  height={350}
                  className={styles.welcomePhoto}
                  priority
                />
                <div className={styles.photoDecor} />
              </div>
            </div>
            <div className={styles.welcomeContent}>
              <span className={styles.welcomeSub}>প্রধান শিক্ষকের বার্তা</span>
              <h2 id="welcome-heading" className={styles.welcomeTitle}>
                সুপ্রিয় শিক্ষার্থীবৃন্দ, অভিভাবক ও শুভানুধ্যায়ী
              </h2>
              
              <div className={styles.quoteBlock}>
                <svg className={styles.quoteIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.748-9.791 9-10.361v2.244c-4.103.566-6.606 2.499-6.606 5.866h5.589v9.642h-7.983zm-14.017 0v-7.391c0-5.704 3.748-9.791 9-10.361v2.244c-4.103.566-6.606 2.499-6.606 5.866h5.589v9.642h-7.983z" />
                </svg>
                <p className={styles.welcomeText}>
                  নোবিপ্রবি মডেল স্কুল প্রতিটি শিক্ষার্থীর সুপ্ত প্রতিভা বিকাশ এবং একটি উন্নত, মানবিক ও বিজ্ঞানমনস্ক ভবিষ্যৎ প্রজন্ম গড়ে তুলতে প্রতিশ্রুতিবদ্ধ। আমরা বিশ্ববিদ্যালয় মানের শিক্ষা, আধুনিক ডিজিটাল ল্যাব ও অত্যন্ত দক্ষ শিক্ষক মণ্ডলীর সাহায্যে পাঠদান নিশ্চিত করি। আমাদের লক্ষ্য কেবল প্রাতিষ্ঠানিক সাফল্য নয়, বরং নৈতিক মূল্যবোধের সঠিক সংমিশ্রণে শিক্ষার্থীদের সুনাগরিক হিসেবে গড়ে তোলা।
                </p>
              </div>

              <div className={styles.welcomeAuthor}>
                <strong>প্রফেসর ড. মুহাম্মদ আলম</strong>
                <span>প্রধান শিক্ষক, নোবিপ্রবি মডেল স্কুল</span>
              </div>

              <Button href="/about" variant="ghost" size="sm" className={styles.welcomeLink}>
                পরিচিতি ও লক্ষ্য
                <svg className={styles.linkArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CORE HIGHLIGHTS ── */}
      <section className={styles.highlightsSection} aria-labelledby="highlights-heading">
        <div className="container">
          <header className={styles.sectionHeaderCentered}>
            <span className={styles.sectionTag}>আমাদের সুবিধা সমূহ</span>
            <h2 id="highlights-heading" className={styles.sectionTitle}>কেন নোবিপ্রবি মডেল স্কুল?</h2>
            <p className={styles.sectionSub}>
              শিক্ষার্থীদের মানসম্মত ও যুগোপযোগী শিক্ষা নিশ্চিত করতে আমাদের রয়েছে আধুনিক সব সুযোগ-সুবিধা
            </p>
          </header>
          
          <div className={styles.highlightsGrid}>
            {[
              {
                title: 'একাডেমিক শ্রেষ্ঠত্ব',
                desc: 'বিশ্ববিদ্যালয় প্রশাসনের সরাসরি তত্ত্বাবধান এবং অভিজ্ঞ শিক্ষক মণ্ডলী দ্বারা পাঠদান পরিচালনা।',
                image: '/gallery_classroom.png',
                bgColor: 'rgba(21, 128, 61, 0.04)',
                borderColor: 'rgba(21, 128, 61, 0.15)',
              },
              {
                title: 'আধুনিক বিজ্ঞান ও কম্পিউটার ল্যাব',
                desc: 'তত্ত্বীয় জ্ঞানের সাথে বাস্তবসম্মত প্রয়োগের জন্য আধুনিক যন্ত্রপাতি সমৃদ্ধ ল্যাবরেটরি।',
                image: '/gallery_lab.png',
                bgColor: 'rgba(2, 132, 199, 0.04)',
                borderColor: 'rgba(2, 132, 199, 0.15)',
              },
              {
                title: 'ক্রীড়া ও সাংস্কৃতিক বিকাশ',
                desc: 'নিয়মিত বার্ষিক ক্রীড়া প্রতিযোগিতা, বিতর্ক ও সাংস্কৃতিক কর্মকাণ্ডের মাধ্যমে মানসিক ও শারীরিক সুস্থতা।',
                image: '/gallery_sports.png',
                bgColor: 'rgba(234, 179, 8, 0.04)',
                borderColor: 'rgba(234, 179, 8, 0.15)',
              },
              {
                title: 'নৈতিক ও মানবিক শিক্ষা',
                desc: 'প্রতিটি শিক্ষার্থীকে একজন আদর্শ ও বিবেকবান মানুষ হিসেবে গড়ে তুলতে নৈতিক শিক্ষা সেশন।',
                image: '/teacher_2.png',
                bgColor: 'rgba(168, 85, 247, 0.04)',
                borderColor: 'rgba(168, 85, 247, 0.15)',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={styles.highlightCard}
                style={{
                  backgroundColor: item.bgColor,
                  borderColor: item.borderColor,
                }}
              >
                <div className={styles.hlImageContainer}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={styles.hlImage}
                    loading="lazy"
                  />
                  <div className={styles.hlImageOverlay} />
                </div>
                <div className={styles.hlCardContent}>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. LATEST NOTICES ── */}
      <section className={`${styles.noticesSection} reveal`} aria-labelledby="notices-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.leftAlign}>
              <span className={styles.sectionTag}>তথ্য ও বিজ্ঞপ্তি</span>
              <h2 id="notices-heading" className={styles.sectionTitle}>সাম্প্রতিক নোটিশসমূহ</h2>
            </div>
            <Button href="/notices" variant="secondary" size="md" className={styles.allNoticesBtn}>
              সবগুলো দেখুন
              <svg className={styles.btnArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
          
          <div className={styles.noticeListLayout}>
            {notices.map((notice, i) => {
              const d = new Date(notice.publishedAt);
              const day = isNaN(d.getTime()) ? '15' : d.getDate().toString().padStart(2, '০');
              const monthBn = 'জানুয়ারি'; // Simple localized display for notices
              return (
                <Link key={notice.id} href={`/notices/${notice.id}`} className={`${styles.noticeListItem} reveal reveal-delay-${(i % 3) + 1}`}>
                  <div className={styles.noticeDateBadge}>
                    <span className={styles.noticeDateDay}>{day}</span>
                    <span className={styles.noticeDateMonth}>{monthBn}</span>
                  </div>
                  <div className={styles.noticeListInfo}>
                    <div className={styles.noticeCategoryRow}>
                      <Badge
                        label={notice.category}
                        variant={CATEGORY_VARIANT_MAP[notice.category] ?? 'neutral'}
                      />
                      {notice.isUrgent && <Badge label="জরুরি" variant="danger" />}
                    </div>
                    <h3 className={styles.noticeListTitle}>{notice.titleBn || notice.titleEn}</h3>
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
        </div>
      </section>

      {/* ── 6. QUICK ACCESS ── */}
      <section className={`${styles.quickSection} reveal`} aria-labelledby="quick-heading">
        <div className="container">
          <header className={styles.sectionHeaderCentered}>
            <span className={styles.sectionTag}>এক নজরে</span>
            <h2 id="quick-heading" className={styles.sectionTitle}>গুরুত্বপূর্ণ লিঙ্কসমূহ</h2>
            <p className={styles.sectionSub}>প্রয়োজনীয় তথ্যে সহজে ও সরাসরি প্রবেশ করুন</p>
          </header>
          
          <div className={styles.quickGrid}>
            {[
              { href: '/notices', label: 'নোটিশ বোর্ড', desc: 'সকল বিজ্ঞপ্তি, নোটিশ ও ছুটির তালিকা।' },
              { href: '/results', label: 'ফলাফল অনুসন্ধান', desc: 'শ্রেণীভিত্তিক ও বার্ষিক পরীক্ষার ফলাফল।' },
              { href: '/teachers', label: 'শিক্ষক মণ্ডলী', desc: 'কর্মরত শিক্ষক ও শিক্ষিকাদের তালিকা।' },
              { href: '/gallery', label: 'ফটো গ্যালারি', desc: 'ক্যাম্পাসের কার্যক্রমের কিছু স্থিরচিত্র।' },
              { href: '/about', label: 'পরিচিতি ও ইতিহাস', desc: 'আমাদের পথচলা, অর্জন ও লক্ষ্য।' },
              { href: '/contact', label: 'যোগাযোগ করুন', desc: 'অফিস হেল্পলাইন ও লোকেশন ম্যাপ।' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className={`${styles.quickCard} reveal reveal-delay-${(i % 3) + 1}`}>
                <div className={styles.quickCardContent}>
                  <h3 className={styles.quickLabel}>{item.label}</h3>
                  <p className={styles.quickDesc}>{item.desc}</p>
                </div>
                <div className={styles.quickArrowCircle}>
                  <svg className={styles.quickCardArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. GALLERY PREVIEW ── */}
      <section className={`${styles.galleryPreviewSection} reveal`} aria-labelledby="gallery-heading">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.leftAlign}>
              <span className={styles.sectionTag}>স্থিরচিত্র</span>
              <h2 id="gallery-heading" className={styles.sectionTitle}>ক্যাম্পাস গ্যালারি</h2>
            </div>
            <Button href="/gallery" variant="secondary" size="md">
              সকল ছবি
              <svg className={styles.btnArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          <div className={styles.galleryPreviewGrid}>
            {[
              { title: 'আধুনিক ক্লাসরুম', img: '/gallery_classroom.png' },
              { title: 'বিজ্ঞানাগার ও ল্যাব', img: '/gallery_lab.png' },
              { title: 'বার্ষিক ক্রীড়া উৎসব', img: '/gallery_sports.png' },
            ].map((item, i) => (
              <div key={i} className={`${styles.galleryWrapperCard} reveal reveal-delay-${(i % 3) + 1}`}>
                <div className={styles.galleryFrame}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.galleryImage}
                    loading="lazy"
                  />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryCategory}>ক্যাম্পাস লাইফ</span>
                    <h3 className={styles.galleryCardTitle}>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CONTACT CTA ── */}
      <section className={`${styles.ctaSection} reveal`} aria-labelledby="cta-heading">
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaText}>
              <h2 id="cta-heading" className={styles.ctaTitle}>ভর্তি সংক্রান্ত তথ্যের জন্য যোগাযোগ করুন</h2>
              <p className={styles.ctaSub}>
                ভর্তি প্রক্রিয়া, যোগ্যতা বা যেকোনো বিষয়ে জানতে আমাদের হেল্পলাইন নম্বরে সরাসরি যোগাযোগ করতে পারেন।
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Button href="/contact" size="lg" className={styles.ctaBtnPrimary}>যোগাযোগ পেজ</Button>
              <Button href="tel:+88০১৭১২৩৪৫৬৭৮" variant="ghost" size="lg" className={styles.ctaBtnSecondary}>
                <svg className={styles.phoneIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +৮৮০১৭১২-৩৪৫৬৭৮
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
