'use client';

import React, { useState, useTransition } from 'react';
import {
  createStudentAction,
  updateStudentAction,
  deleteStudentAction
} from '../../actions';
import styles from './students.module.css';

interface StudentsManagerProps {
  initialStudents: any[];
  sections: any[];
}

export default function StudentsManager({ initialStudents, sections }: StudentsManagerProps) {
  const [students] = useState(initialStudents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [studentId, setStudentId] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [rollNumber, setRollNumber] = useState(1);
  const [sectionId, setSectionId] = useState(sections[0]?.id || '');
  const [gender, setGender] = useState('Male');
  const [isMerit, setIsMerit] = useState(false);
  const [meritRank, setMeritRank] = useState(1);

  const openAddForm = () => {
    setEditingStudent(null);
    setStudentId('');
    setNameEn('');
    setNameBn('');
    setRollNumber(1);
    setSectionId(sections[0]?.id || '');
    setGender('Male');
    setIsMerit(false);
    setMeritRank(1);
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (student: any) => {
    setEditingStudent(student);
    setStudentId(student.studentId || '');
    setNameEn(student.nameEn || '');
    setNameBn(student.nameBn || '');
    setRollNumber(student.rollNumber || 1);
    setSectionId(student.sectionId || '');
    setGender(student.gender || 'Male');
    setIsMerit(student.isMerit || false);
    setMeritRank(student.meritRank || 1);
    setError(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!sectionId) {
      setError('Please create a class and section first before adding students.');
      return;
    }

    const payload = {
      studentId,
      nameEn,
      nameBn: nameBn || undefined,
      rollNumber: Number(rollNumber),
      sectionId,
      gender: gender || undefined,
      isMerit,
      meritRank: isMerit ? Number(meritRank) : undefined,
    };

    startTransition(async () => {
      let res;
      if (editingStudent) {
        res = await updateStudentAction(editingStudent.id, payload);
      } else {
        res = await createStudentAction(payload);
      }

      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student record?')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteStudentAction(id);
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
          <h1 className={styles.pageTitle}>Student Enrollment Management</h1>
          <p className={styles.pageSubtitle}>Add, edit, or remove student registration details, roll numbers, and merit status.</p>
        </div>
        {!isFormOpen && (
          <button onClick={openAddForm} className={styles.addButton}>
            ➕ Enroll Student
          </button>
        )}
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {isFormOpen && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>
            {editingStudent ? 'Edit Student Details' : 'Enroll New Student'}
          </h2>
          <form onSubmit={handleFormSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Student ID (Unique Reference) *</label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. STU12345"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Name (English) *</label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Nusrat Jahan"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Name (Bangla)</label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. নুসরাত জাহান"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Roll Number *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={rollNumber}
                  onChange={(e) => setRollNumber(Number(e.target.value))}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Class Section Assignment *</label>
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  className={styles.select}
                >
                  {sections.length === 0 ? (
                    <option value="">No sections configured</option>
                  ) : (
                    sections.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.class?.nameEn} — {sec.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={styles.select}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  id="isMerit"
                  type="checkbox"
                  checked={isMerit}
                  onChange={(e) => setIsMerit(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="isMerit" className={styles.checkboxLabel}>
                  🏆 Mark as Merit Student (Show in Merit List page)
                </label>
              </div>

              {isMerit && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Merit Rank</label>
                  <input
                    type="number"
                    min={1}
                    value={meritRank}
                    onChange={(e) => setMeritRank(Number(e.target.value))}
                    className={styles.input}
                  />
                </div>
              )}
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className={styles.saveButton}
              >
                {isPending ? 'Saving...' : 'Enroll Student'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Class & Section</th>
              <th>Gender</th>
              <th>Merit?</th>
              <th className={styles.textRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyCell}>
                  No students currently enrolled.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <span className={styles.studentId}>{student.studentId}</span>
                  </td>
                  <td>
                    <div className={styles.studentNameEn}>{student.nameEn}</div>
                    <div className={styles.studentNameBn}>{student.nameBn}</div>
                  </td>
                  <td>{student.rollNumber}</td>
                  <td>
                    {student.section?.class?.nameEn} — {student.section?.name}
                  </td>
                  <td>{student.gender || '-'}</td>
                  <td>
                    {student.isMerit ? (
                      <span className={`${styles.badge} ${styles.meritBadge}`}>
                        🏆 Rank {student.meritRank}
                      </span>
                    ) : (
                      'No'
                    )}
                  </td>
                  <td className={styles.actionsCell}>
                    <button
                      onClick={() => openEditForm(student)}
                      disabled={isPending}
                      className={`${styles.actionButton} ${styles.btnEdit}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      disabled={isPending}
                      className={`${styles.actionButton} ${styles.btnDelete}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
