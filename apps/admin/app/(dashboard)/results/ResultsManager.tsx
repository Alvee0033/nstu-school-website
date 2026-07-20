'use client';

import React, { useState, useTransition } from 'react';
import {
  createExamAction,
  updateExamAction,
  deleteExamAction,
  createResultAction,
  updateResultAction,
  deleteResultAction
} from '../../actions';
import styles from './results.module.css';

interface ResultsManagerProps {
  initialExams: any[];
  initialResults: any[];
  students: any[];
  sections: any[];
}

export default function ResultsManager({
  initialExams,
  initialResults,
  students,
  sections,
}: ResultsManagerProps) {
  const [activeTab, setActiveTab] = useState<'exams' | 'results'>('exams');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Exam Form
  const [isExamFormOpen, setIsExamFormOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);
  const [examTitleEn, setExamTitleEn] = useState('');
  const [examTitleBn, setExamTitleBn] = useState('');
  const [examYear, setExamYear] = useState(new Date().getFullYear());
  const [examIsPublished, setExamIsPublished] = useState(false);

  // Result Form
  const [isResultFormOpen, setIsResultFormOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<any>(null);
  const [resStudentId, setResStudentId] = useState(students[0]?.id || '');
  const [resExamId, setResExamId] = useState(initialExams[0]?.id || '');
  const [resSectionId, setResSectionId] = useState(sections[0]?.id || '');
  const [resSubject, setResSubject] = useState('');
  const [resMarks, setResMarks] = useState(80);
  const [resTotalMarks, setResTotalMarks] = useState(100);
  const [resGrade, setResGrade] = useState('A+');
  const [resGpa, setResGpa] = useState(5.0);

  const openAddExam = () => {
    setEditingExam(null);
    setExamTitleEn('');
    setExamTitleBn('');
    setExamYear(new Date().getFullYear());
    setExamIsPublished(false);
    setError(null);
    setIsExamFormOpen(true);
  };

  const openEditExam = (exam: any) => {
    setEditingExam(exam);
    setExamTitleEn(exam.titleEn || '');
    setExamTitleBn(exam.titleBn || '');
    setExamYear(exam.year || new Date().getFullYear());
    setExamIsPublished(exam.isPublished || false);
    setError(null);
    setIsExamFormOpen(true);
  };

  const handleExamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      titleEn: examTitleEn,
      titleBn: examTitleBn || undefined,
      year: Number(examYear),
      isPublished: examIsPublished,
    };

    startTransition(async () => {
      let res;
      if (editingExam) {
        res = await updateExamAction(editingExam.id, payload);
      } else {
        res = await createExamAction(payload);
      }

      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleDeleteExam = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exam definition? All linked results will be affected.')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteExamAction(id);
      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const openAddResult = () => {
    setEditingResult(null);
    setResStudentId(students[0]?.id || '');
    setResExamId(initialExams[0]?.id || '');
    setResSectionId(sections[0]?.id || '');
    setResSubject('');
    setResMarks(80);
    setResTotalMarks(100);
    setResGrade('A+');
    setResGpa(5.0);
    setError(null);
    setIsResultFormOpen(true);
  };

  const openEditResult = (res: any) => {
    setEditingResult(res);
    setResStudentId(res.studentId || '');
    setResExamId(res.examId || '');
    setResSectionId(res.sectionId || '');
    setResSubject(res.subject || '');
    setResMarks(res.marksObtained || 80);
    setResTotalMarks(res.totalMarks || 100);
    setResGrade(res.grade || 'A+');
    setResGpa(res.gpa || 5.0);
    setError(null);
    setIsResultFormOpen(true);
  };

  const handleResultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!resStudentId || !resExamId || !resSectionId) {
      setError('Please ensure students, exams, and sections are configured.');
      return;
    }

    const payload = {
      studentId: resStudentId,
      examId: resExamId,
      sectionId: resSectionId,
      subject: resSubject || undefined,
      marksObtained: Number(resMarks),
      totalMarks: Number(resTotalMarks),
      grade: resGrade || undefined,
      gpa: Number(resGpa),
      isPublished: true,
    };

    startTransition(async () => {
      let res;
      if (editingResult) {
        res = await updateResultAction(editingResult.id, payload);
      } else {
        res = await createResultAction(payload);
      }

      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleDeleteResult = async (id: string) => {
    if (!confirm('Are you sure you want to delete this result record?')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteResultAction(id);
      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Exams & Results</h1>
          <p className={styles.pageSubtitle}>Setup examination calendars, publish grades, and edit student marks sheets.</p>
        </div>
        <div className={styles.tabs}>
          <button
            onClick={() => { setActiveTab('exams'); setIsExamFormOpen(false); setIsResultFormOpen(false); }}
            className={`${styles.tabBtn} ${activeTab === 'exams' ? styles.activeTab : ''}`}
          >
            📋 Manage Exams
          </button>
          <button
            onClick={() => { setActiveTab('results'); setIsExamFormOpen(false); setIsResultFormOpen(false); }}
            className={`${styles.tabBtn} ${activeTab === 'results' ? styles.activeTab : ''}`}
          >
            ✏️ Manage Marks
          </button>
        </div>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {activeTab === 'exams' && (
        <>
          <div className={styles.actionRow}>
            <h2 className={styles.sectionTitle}>Exam Configurations</h2>
            {!isExamFormOpen && (
              <button onClick={openAddExam} className={styles.addButton}>
                ➕ Create Exam
              </button>
            )}
          </div>

          {isExamFormOpen && (
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>
                {editingExam ? 'Edit Exam Definition' : 'Define New Exam'}
              </h3>
              <form onSubmit={handleExamSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Exam Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={examTitleEn}
                      onChange={(e) => setExamTitleEn(e.target.value)}
                      className={styles.input}
                      placeholder="e.g. Term 1 Examination"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Exam Name (Bangla)</label>
                    <input
                      type="text"
                      value={examTitleBn}
                      onChange={(e) => setExamTitleBn(e.target.value)}
                      className={styles.input}
                      placeholder="e.g. প্রথম সাময়িক পরীক্ষা"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Year *</label>
                    <input
                      type="number"
                      required
                      value={examYear}
                      onChange={(e) => setExamYear(Number(e.target.value))}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.checkboxGroup}>
                    <input
                      id="examIsPublished"
                      type="checkbox"
                      checked={examIsPublished}
                      onChange={(e) => setExamIsPublished(e.target.checked)}
                      className={styles.checkbox}
                    />
                    <label htmlFor="examIsPublished" className={styles.checkboxLabel}>
                      📢 Publish Exam status publicly
                    </label>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={() => setIsExamFormOpen(false)} className={styles.cancelButton}>Cancel</button>
                  <button type="submit" disabled={isPending} className={styles.saveButton}>Save Exam</button>
                </div>
              </form>
            </div>
          )}

          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th className={styles.textRight}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialExams.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={styles.emptyCell}>No exams defined yet.</td>
                  </tr>
                ) : (
                  initialExams.map((exam) => (
                    <tr key={exam.id}>
                      <td>
                        <div className={styles.boldText}>{exam.titleEn}</div>
                        <div className={styles.mutedText}>{exam.titleBn}</div>
                      </td>
                      <td>{exam.year}</td>
                      <td>
                        <span className={`${styles.badge} ${exam.isPublished ? styles.published : styles.draft}`}>
                          {exam.isPublished ? 'PUBLISHED' : 'DRAFT'}
                        </span>
                      </td>
                      <td className={styles.actionsCell}>
                        <button onClick={() => openEditExam(exam)} className={`${styles.actionButton} ${styles.btnEdit}`}>Edit</button>
                        <button onClick={() => handleDeleteExam(exam.id)} className={`${styles.actionButton} ${styles.btnDelete}`}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'results' && (
        <>
          <div className={styles.actionRow}>
            <h2 className={styles.sectionTitle}>Grades & Marks Ledger</h2>
            {!isResultFormOpen && (
              <button onClick={openAddResult} className={styles.addButton}>
                ➕ Add Student Marks
              </button>
            )}
          </div>

          {isResultFormOpen && (
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>
                {editingResult ? 'Edit Marks Record' : 'Record Student Marks'}
              </h3>
              <form onSubmit={handleResultSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Select Student *</label>
                    <select
                      value={resStudentId}
                      onChange={(e) => setResStudentId(e.target.value)}
                      className={styles.select}
                    >
                      {students.map((stu) => (
                        <option key={stu.id} value={stu.id}>
                          {stu.nameEn} (ID: {stu.studentId})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Select Exam *</label>
                    <select
                      value={resExamId}
                      onChange={(e) => setResExamId(e.target.value)}
                      className={styles.select}
                    >
                      {initialExams.map((ex) => (
                        <option key={ex.id} value={ex.id}>
                          {ex.titleEn} ({ex.year})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Select Class & Section *</label>
                    <select
                      value={resSectionId}
                      onChange={(e) => setResSectionId(e.target.value)}
                      className={styles.select}
                    >
                      {sections.map((sec) => (
                        <option key={sec.id} value={sec.id}>
                          {sec.class?.nameEn} — {sec.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Subject *</label>
                    <input
                      type="text"
                      required
                      value={resSubject}
                      onChange={(e) => setResSubject(e.target.value)}
                      className={styles.input}
                      placeholder="e.g. Mathematics"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Marks Obtained *</label>
                    <input
                      type="number"
                      required
                      step="any"
                      value={resMarks}
                      onChange={(e) => setResMarks(Number(e.target.value))}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Total Marks *</label>
                    <input
                      type="number"
                      required
                      value={resTotalMarks}
                      onChange={(e) => setResTotalMarks(Number(e.target.value))}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Letter Grade *</label>
                    <input
                      type="text"
                      required
                      value={resGrade}
                      onChange={(e) => setResGrade(e.target.value)}
                      className={styles.input}
                      placeholder="A+"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>GPA Equivalent *</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={resGpa}
                      onChange={(e) => setResGpa(Number(e.target.value))}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={() => setIsResultFormOpen(false)} className={styles.cancelButton}>Cancel</button>
                  <button type="submit" disabled={isPending} className={styles.saveButton}>Save Marks</button>
                </div>
              </form>
            </div>
          )}

          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Exam</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade (GPA)</th>
                  <th className={styles.textRight}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialResults.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={styles.emptyCell}>No marks records found.</td>
                  </tr>
                ) : (
                  initialResults.map((res) => (
                    <tr key={res.id}>
                      <td>
                        <span className={styles.monoBadge}>{res.student?.studentId}</span>
                      </td>
                      <td>{res.student?.nameEn}</td>
                      <td>{res.exam?.titleEn}</td>
                      <td>
                        <span className={styles.boldText}>{res.subject}</span>
                      </td>
                      <td>{res.marksObtained} / {res.totalMarks}</td>
                      <td>
                        <span className={styles.gradeText}>{res.grade}</span> ({res.gpa?.toFixed(2)})
                      </td>
                      <td className={styles.actionsCell}>
                        <button onClick={() => openEditResult(res)} className={`${styles.actionButton} ${styles.btnEdit}`}>Edit</button>
                        <button onClick={() => handleDeleteResult(res.id)} className={`${styles.actionButton} ${styles.btnDelete}`}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
