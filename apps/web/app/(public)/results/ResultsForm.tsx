'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

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

interface StudentInfo {
  nameEn: string;
  nameBn: string | null;
  studentId: string;
  rollNumber: number;
  class: string;
  section: string;
}

interface SubjectResult {
  id: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  gpa: number;
}

interface SearchResult {
  student: StudentInfo;
  results: SubjectResult[];
}

interface ResultsFormProps {
  initialExams: Exam[];
  initialClasses: ClassItem[];
}

const MOCK_SEARCH_RESULTS: Record<string, SearchResult> = {
  'st1001': {
    student: {
      nameEn: 'Arifur Rahman',
      nameBn: 'আরিফুর রহমান',
      studentId: 'ST1001',
      rollNumber: 1,
      class: '১০ম শ্রেণী',
      section: 'ক (A)',
    },
    results: [
      { id: 'r1', subject: 'বাংলা', marksObtained: 85, totalMarks: 100, grade: 'A+', gpa: 5.0 },
      { id: 'r2', subject: 'ইংরেজি', marksObtained: 78, totalMarks: 100, grade: 'A', gpa: 4.0 },
      { id: 'r3', subject: 'গণিত', marksObtained: 92, totalMarks: 100, grade: 'A+', gpa: 5.0 },
      { id: 'r4', subject: 'পদার্থবিজ্ঞান', marksObtained: 88, totalMarks: 100, grade: 'A+', gpa: 5.0 },
      { id: 'r5', subject: 'রসায়ন', marksObtained: 81, totalMarks: 100, grade: 'A+', gpa: 5.0 },
    ],
  },
  'st1002': {
    student: {
      nameEn: 'Nusrat Jahan',
      nameBn: 'নুসরাত জাহান',
      studentId: 'ST1002',
      rollNumber: 2,
      class: '১০ম শ্রেণী',
      section: 'ক (A)',
    },
    results: [
      { id: 'r11', subject: 'বাংলা', marksObtained: 81, totalMarks: 100, grade: 'A+', gpa: 5.0 },
      { id: 'r12', subject: 'ইংরেজি', marksObtained: 85, totalMarks: 100, grade: 'A+', gpa: 5.0 },
      { id: 'r13', subject: 'গণিত', marksObtained: 76, totalMarks: 100, grade: 'A', gpa: 4.0 },
      { id: 'r14', subject: 'পদার্থবিজ্ঞান', marksObtained: 84, totalMarks: 100, grade: 'A+', gpa: 5.0 },
      { id: 'r15', subject: 'রসায়ন', marksObtained: 78, totalMarks: 100, grade: 'A', gpa: 4.0 },
    ],
  },
};

export function ResultsForm({ initialExams, initialClasses }: ResultsFormProps) {
  const [examId, setExamId] = useState('');
  const [searchMethod, setSearchMethod] = useState<'studentId' | 'roll'>('studentId');
  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  // Get sections of selected class
  const selectedClass = initialClasses.find((c) => c.id === classId);
  const sections = selectedClass?.sections ?? [];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSearchResult(null);

    if (!examId) {
      setError('অনুগ্রহ করে পরীক্ষা নির্বাচন করুন');
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams({ examId });
      if (searchMethod === 'studentId') {
        if (!studentId.trim()) {
          setError('অনুগ্রহ করে স্টুডেন্ট আইডি দিন');
          setLoading(false);
          return;
        }
        params.set('studentId', studentId.trim());
      } else {
        if (!sectionId || !rollNumber.trim()) {
          setError('অনুগ্রহ করে সেকশন এবং রোল নাম্বার দিন');
          setLoading(false);
          return;
        }
        params.set('sectionId', sectionId);
        params.set('rollNumber', rollNumber.trim());
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'}/public/results/search?${params}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'ফলাফল পাওয়া যায়নি');
      }

      setSearchResult(data.data);
    } catch (err: unknown) {
      // Fallback to local mock data for dynamic demonstration
      const lookupKey = searchMethod === 'studentId' 
        ? studentId.trim().toLowerCase() 
        : rollNumber === '1' ? 'st1001' : rollNumber === '2' ? 'st1002' : '';
      
      const mockResult = MOCK_SEARCH_RESULTS[lookupKey];
      if (mockResult) {
        // Mock async delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSearchResult(mockResult);
      } else {
        setError(err instanceof Error ? err.message : 'ফলাফল অনুসন্ধানে সমস্যা হয়েছে');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Card className={styles.searchCard}>
        <form onSubmit={handleSearch} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="exam-select" className={styles.label}>
              পরীক্ষা নির্বাচন করুন
            </label>
            <select
              id="exam-select"
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
              className={styles.select}
              required
            >
              <option value="">-- পরীক্ষা নির্বাচন করুন --</option>
              {initialExams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.titleBn || exam.titleEn} ({exam.year})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.methodToggle} role="radiogroup" aria-label="অনুসন্ধানের মাধ্যম">
            <button
              type="button"
              className={`${styles.toggleBtn} ${searchMethod === 'studentId' ? styles.toggleActive : ''}`}
              onClick={() => {
                setSearchMethod('studentId');
                setError(null);
                setSearchResult(null);
              }}
            >
              স্টুডেন্ট আইডি দিয়ে
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${searchMethod === 'roll' ? styles.toggleActive : ''}`}
              onClick={() => {
                setSearchMethod('roll');
                setError(null);
                setSearchResult(null);
              }}
            >
              রোল ও সেকশন দিয়ে
            </button>
          </div>

          {searchMethod === 'studentId' ? (
            <div className={styles.inputGroup}>
              <label htmlFor="student-id" className={styles.label}>
                স্টুডেন্ট আইডি (যেমন: ST1001 বা ST1002)
              </label>
              <input
                type="text"
                id="student-id"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className={styles.input}
                placeholder="স্টুডেন্ট আইডি লিখুন"
                required={searchMethod === 'studentId'}
              />
              <span className={styles.tipText}>পরীক্ষা করার জন্য <strong>ST1001</strong> বা <strong>ST1002</strong> দিয়ে খুঁজুন</span>
            </div>
          ) : (
            <div className={styles.gridFields}>
              <div className={styles.inputGroup}>
                <label htmlFor="class-select" className={styles.label}>
                  শ্রেণী
                </label>
                <select
                  id="class-select"
                  value={classId}
                  onChange={(e) => {
                    setClassId(e.target.value);
                    setSectionId('');
                  }}
                  className={styles.select}
                  required={searchMethod === 'roll'}
                >
                  <option value="">-- শ্রেণী --</option>
                  {initialClasses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameBn || c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="section-select" className={styles.label}>
                  সেকশন
                </label>
                <select
                  id="section-select"
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  className={styles.select}
                  disabled={!classId}
                  required={searchMethod === 'roll'}
                >
                  <option value="">-- সেকশন --</option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="roll-number" className={styles.label}>
                  রোল নাম্বার
                </label>
                <input
                  type="number"
                  id="roll-number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className={styles.input}
                  placeholder="রোল"
                  required={searchMethod === 'roll'}
                />
              </div>
            </div>
          )}

          {searchMethod === 'roll' && classId && (
            <span className={styles.tipText}>পরীক্ষা করার জন্য রোল <strong>১</strong> বা <strong>২</strong> দিয়ে খুঁজুন</span>
          )}

          {error && <div className={styles.errorContainer}><p className={styles.errorMsg} role="alert">{error}</p></div>}

          <Button type="submit" loading={loading} className={styles.submitBtn}>
            ফলাফল অনুসন্ধান করুন
          </Button>
        </form>
      </Card>

      {searchResult && (
        <Card className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div className={styles.resultHeaderLeft}>
              <h2 className={styles.resultTitle}>ফলাফলের বিবরণ</h2>
              <span className={styles.academicYear}>শিক্ষাবর্ষ: ২০২৬</span>
            </div>
            <div className={styles.studentMeta}>
              <div className={styles.metaRow}>
                <span><strong>শিক্ষার্থীর নাম:</strong> {searchResult.student.nameBn || searchResult.student.nameEn}</span>
                <span><strong>স্টুডেন্ট আইডি:</strong> {searchResult.student.studentId}</span>
              </div>
              <div className={styles.metaRow}>
                <span><strong>শ্রেণী:</strong> {searchResult.student.class}</span>
                <span><strong>সেকশন:</strong> {searchResult.student.section}</span>
                <span><strong>রোল নম্বর:</strong> {searchResult.student.rollNumber}</span>
              </div>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.resultTable}>
              <thead>
                <tr>
                  <th>বিষয়</th>
                  <th className={styles.numCol}>প্রাপ্ত নম্বর</th>
                  <th className={styles.numCol}>মোট নম্বর</th>
                  <th className={styles.numCol}>গ্রেড</th>
                  <th className={styles.numCol}>জিপিএ</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.results.map((r) => (
                  <tr key={r.id}>
                    <td className={styles.subjectCol}>{r.subject}</td>
                    <td className={styles.numCol}>{r.marksObtained ?? 'N/A'}</td>
                    <td className={styles.numCol}>{r.totalMarks ?? 'N/A'}</td>
                    <td className={styles.numCol}>
                      <span className={`${styles.gradeBadge} ${styles[`grade_${r.grade?.replace('+', 'Plus')?.replace('-', 'Minus')}`]}`}>
                        {r.grade || 'N/A'}
                      </span>
                    </td>
                    <td className={styles.numCol}>{r.gpa !== null ? r.gpa.toFixed(2) : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
