import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'শিক্ষার্থীবৃন্দ',
  description: 'Notun Kuri High School student directory and achievers list.',
};

interface Student {
  id: string;
  nameEn: string;
  nameBn: string;
  class: string;
  classBn: string;
  group: string;
  groupBn: string;
  role: string;
  roll: string;
  achievement?: string;
  photoUrl: string;
}

const FALLBACK_STUDENTS: Student[] = [
  {
    id: 's1',
    nameEn: 'Nusrat Jahan Liya',
    nameBn: 'নুসরাত জাহান লিয়া',
    class: '10',
    classBn: 'দশম শ্রেণী',
    group: 'Science',
    groupBn: 'বিজ্ঞান',
    role: 'শ্রেণী প্রতিনিধি ও বিজ্ঞান ক্লাব সমন্বয়কারী',
    roll: '০১',
    achievement: 'জাতীয় শিশু-কিশোর বিজ্ঞান মেলা ২০২৫-এ ১ম স্থান অর্জনকারী।',
    photoUrl: '/avatar-placeholder.png',
  },
  {
    id: 's2',
    nameEn: 'Tahsin Ahmed Tanim',
    nameBn: 'তাহসিন আহমেদ তানিম',
    class: '9',
    classBn: 'নবম শ্রেণী',
    group: 'Science',
    groupBn: 'বিজ্ঞান',
    role: 'আইটি ক্লাব প্রধান',
    roll: '০২',
    achievement: 'জাতীয় গণিত অলিম্পিয়াড ২০২৫-এ বিভাগীয় পর্যায়ে চ্যাম্পিয়ন।',
    photoUrl: '/avatar-placeholder.png',
  },
  {
    id: 's3',
    nameEn: 'Sadia Afrin Mariya',
    nameBn: 'সাদিয়া আফরিন মারিয়া',
    class: '8',
    classBn: 'অষ্টম শ্রেণী',
    group: 'Arts',
    groupBn: 'মানবিক',
    role: 'বিতর্ক ক্লাব সাধারণ সম্পাদক',
    roll: '০৩',
    achievement: 'আন্তঃস্কুল বাংলা বিতর্ক প্রতিযোগিতা ২০২৫-এর সেরা তার্কিক।',
    photoUrl: '/avatar-placeholder.png',
  },
  {
    id: 's4',
    nameEn: 'Shariful Islam',
    nameBn: 'শরিফুল ইসলাম',
    class: '10',
    classBn: 'দশম শ্রেণী',
    group: 'Commerce',
    groupBn: 'ব্যবসায় শিক্ষা',
    role: 'সাংস্কৃতিক ক্লাব স্বেচ্ছাসেবক',
    roll: '০৫',
    photoUrl: '/avatar-placeholder.png',
  },
  {
    id: 's5',
    nameEn: 'Jannatul Ferdous',
    nameBn: 'জান্নাতুল ফেরদৌস',
    class: '9',
    classBn: 'নবম শ্রেণী',
    group: 'Arts',
    groupBn: 'মানবিক',
    role: 'ক্রীড়া প্রতিনিধি (মেয়েদের শাখা)',
    roll: '০৪',
    photoUrl: '/avatar-placeholder.png',
  },
  {
    id: 's6',
    nameEn: 'Arifur Rahman',
    nameBn: 'আরিফুর রহমান',
    class: '8',
    classBn: 'অষ্টম শ্রেণী',
    group: 'Science',
    groupBn: 'বিজ্ঞান',
    role: 'গণিত ক্লাব সহ-সমন্বয়কারী',
    roll: '০১',
    photoUrl: '/avatar-placeholder.png',
  },
];

const CLASSES = [
  { value: 'all', label: 'সকল শ্রেণী' },
  { value: '10', label: 'দশম শ্রেণী' },
  { value: '9', label: 'নবম শ্রেণী' },
  { value: '8', label: 'অষ্টম শ্রেণী' },
];

const GROUPS = [
  { value: 'all', label: 'সকল বিভাগ' },
  { value: 'Science', label: 'বিজ্ঞান' },
  { value: 'Arts', label: 'মানবিক' },
  { value: 'Commerce', label: 'ব্যবসায় শিক্ষা' },
];

interface PageProps {
  searchParams: Promise<{ class?: string; group?: string }>;
}

export default async function StudentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeClass = params.class ?? 'all';
  const activeGroup = params.group ?? 'all';

  // Filter students based on queries
  const filteredStudents = FALLBACK_STUDENTS.filter((student) => {
    const matchesClass = activeClass === 'all' || student.class === activeClass;
    const matchesGroup = activeGroup === 'all' || student.group === activeGroup;
    return matchesClass && matchesGroup;
  });

  return (
    <div className={styles.page}>
      {/* Banner Section */}
      <div className={styles.headerBanner}>
        <div className="container">
          <span className={styles.bannerTag}>শিক্ষার্থী ডিরেক্টরি</span>
          <h1 className={styles.heading}>আমাদের কৃতি ও প্রতিনিধি শিক্ষার্থীবৃন্দ</h1>
          <p className={styles.bannerSub}>ভবিষ্যৎ নেতৃত্ব ও সুনাগরিক গড়ে তোলাই আমাদের প্রতিটি শিক্ষার্থীর অঙ্গীকার</p>
        </div>
      </div>

      <div className="container">
        {/* Filters Layout */}
        <div className={styles.filtersContainer}>
          {/* Class Filters */}
          <div className={styles.filterSection}>
            <span className={styles.filterTitle}>শ্রেণী নির্বাচন:</span>
            <div className={styles.filters} role="group" aria-label="Filter by class">
              {CLASSES.map((cls) => {
                const query = new URLSearchParams();
                if (cls.value !== 'all') query.set('class', cls.value);
                if (activeGroup !== 'all') query.set('group', activeGroup);
                const href = `/students${query.toString() ? `?${query.toString()}` : ''}`;
                const isActive = activeClass === cls.value;
                return (
                  <Link
                    key={cls.value}
                    href={href}
                    className={[styles.filter, isActive && styles.active].filter(Boolean).join(' ')}
                  >
                    {cls.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Group/Department Filters */}
          <div className={styles.filterSection}>
            <span className={styles.filterTitle}>বিভাগ নির্বাচন:</span>
            <div className={styles.filters} role="group" aria-label="Filter by group">
              {GROUPS.map((grp) => {
                const query = new URLSearchParams();
                if (activeClass !== 'all') query.set('class', activeClass);
                if (grp.value !== 'all') query.set('group', grp.value);
                const href = `/students${query.toString() ? `?${query.toString()}` : ''}`;
                const isActive = activeGroup === grp.value;
                return (
                  <Link
                    key={grp.value}
                    href={href}
                    className={[styles.filter, isActive && styles.active].filter(Boolean).join(' ')}
                  >
                    {grp.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        {filteredStudents.length === 0 ? (
          <div className={styles.emptyContainer}>
            <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className={styles.empty}>নির্বাচিত ফিল্টারে কোনো শিক্ষার্থী পাওয়া যায়নি।</p>
          </div>
        ) : (
          <ul className={styles.grid} role="list">
            {filteredStudents.map((student) => (
              <li key={student.id}>
                <Card className={styles.card}>
                  <div className={styles.cardAccent} />
                  <div className={styles.avatarWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={student.photoUrl}
                      alt={student.nameEn}
                      className={styles.avatar}
                    />
                    <span className={styles.rollBadge}>রোল: {student.roll}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.name}>{student.nameBn}</h2>
                    <p className={styles.nameEn}>{student.nameEn}</p>
                    <div className={styles.badgeRow}>
                      <span className={styles.classLabel}>{student.classBn}</span>
                      <span className={styles.groupLabel}>{student.groupBn}</span>
                    </div>
                    <span className={styles.designation}>{student.role}</span>
                    
                    {student.achievement && (
                      <div className={styles.achievementBox}>
                        <svg className={styles.trophyIcon} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v4a5 5 0 0010 0V4a2 2 0 00-2-2H5zm10.586 1.586A2 2 0 0014 3h-1v5a7 7 0 11-14 0V3H1a2 2 0 00-1.414.586C.2 4.01 0 4.634 0 5.293c0 .878.36 1.706 1.01 2.307A8.995 8.995 0 008 15.938v3.062H5a1 1 0 100 2h10a1 1 0 100-2h-3v-3.062a8.995 8.995 0 006.99-8.338 3.011 3.011 0 001.01-2.307c0-.66-.2-1.282-.586-1.707z" clipRule="evenodd" />
                        </svg>
                        <p>{student.achievement}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
