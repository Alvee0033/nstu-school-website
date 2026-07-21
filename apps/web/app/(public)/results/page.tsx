import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { ResultsForm } from './ResultsForm';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ফলাফল',
  description: 'NSTU Model School exam results search portal.',
};

interface Exam {
  id: string;
  titleEn: string;
  titleBn: string;
  year: number;
}

interface Section {
  id: string;
  name: string;
}

interface ClassItem {
  id: string;
  nameEn: string;
  nameBn: string;
  grade: number;
  sections: Section[];
}

const FALLBACK_EXAMS: Exam[] = [
  { id: 'ex1', titleEn: 'Annual Examination 2025', titleBn: 'বার্ষিক পরীক্ষা ২০২৫', year: 2025 },
  { id: 'ex2', titleEn: 'Half-Yearly Examination 2026', titleBn: 'অর্ধ-বার্ষিক পরীক্ষা ২০২৬', year: 2026 },
  { id: 'ex3', titleEn: 'Model Test Examination 2026', titleBn: 'মডেল টেস্ট পরীক্ষা ২০২৬', year: 2026 },
];

const FALLBACK_CLASSES: ClassItem[] = [
  {
    id: 'c6',
    nameEn: 'Class 6',
    nameBn: 'ষষ্ঠ শ্রেণী',
    grade: 6,
    sections: [
      { id: 'c6_s1', name: 'ক (A)' },
      { id: 'c6_s2', name: 'খ (B)' },
    ],
  },
  {
    id: 'c7',
    nameEn: 'Class 7',
    nameBn: 'সপ্তম শ্রেণী',
    grade: 7,
    sections: [
      { id: 'c7_s1', name: 'ক (A)' },
      { id: 'c7_s2', name: 'খ (B)' },
    ],
  },
  {
    id: 'c8',
    nameEn: 'Class 8',
    nameBn: 'অষ্টম শ্রেণী',
    grade: 8,
    sections: [
      { id: 'c8_s1', name: 'ক (A)' },
      { id: 'c8_s2', name: 'খ (B)' },
    ],
  },
  {
    id: 'c9',
    nameEn: 'Class 9',
    nameBn: 'নবম শ্রেণী',
    grade: 9,
    sections: [
      { id: 'c9_s1', name: 'ক (A)' },
      { id: 'c9_s2', name: 'খ (B)' },
    ],
  },
  {
    id: 'c10',
    nameEn: 'Class 10',
    nameBn: 'দশম শ্রেণী',
    grade: 10,
    sections: [
      { id: 'c10_s1', name: 'ক (A)' },
      { id: 'c10_s2', name: 'খ (B)' },
    ],
  },
];

async function getInitialData() {
  try {
    const [exams, classes] = await Promise.all([
      api.get<Exam[]>('/public/results/exams'),
      api.get<ClassItem[]>('/public/results/classes'),
    ]);
    const validExams = exams && exams.length > 0 ? exams : FALLBACK_EXAMS;
    const validClasses = classes && classes.length > 0 ? classes : FALLBACK_CLASSES;
    return { exams: validExams, classes: validClasses };
  } catch {
    return { exams: FALLBACK_EXAMS, classes: FALLBACK_CLASSES };
  }
}

export default async function ResultsPage() {
  const { exams, classes } = await getInitialData();

  return (
    <div className={styles.page}>
      {/* Banner Section */}
      <div className={styles.headerBanner}>
        <div className="container">
          <span className={styles.bannerTag}>পরীক্ষার ফলাফল</span>
          <h1 className={styles.heading}>ফলাফল অনুসন্ধান পোর্টাল</h1>
          <p className={styles.bannerSub}>পরীক্ষা, শ্রেণী, সেকশন এবং রোল নম্বর দিয়ে শিক্ষার্থীদের গ্রেডশিট দেখুন</p>
        </div>
      </div>

      <div className="container">
        <ResultsForm initialExams={exams} initialClasses={classes} />
      </div>
    </div>
  );
}
