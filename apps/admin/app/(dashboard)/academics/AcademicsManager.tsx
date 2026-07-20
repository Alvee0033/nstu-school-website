'use client';

import React, { useState, useTransition } from 'react';
import {
  createClassAction,
  updateClassAction,
  deleteClassAction,
  createSectionAction,
  deleteSectionAction
} from '../../actions';
import styles from './academics.module.css';

interface AcademicsManagerProps {
  initialClasses: any[];
}

export default function AcademicsManager({ initialClasses }: AcademicsManagerProps) {
  const [classes] = useState(initialClasses);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Class Form Fields
  const [classNameEn, setClassNameEn] = useState('');
  const [classNameBn, setClassNameBn] = useState('');
  const [classGrade, setClassGrade] = useState(1);
  const [isClassFormOpen, setIsClassFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);

  // Section Form Fields
  const [sectionName, setSectionName] = useState('');
  const [sectionClassId, setSectionClassId] = useState('');
  const [isSectionFormOpen, setIsSectionFormOpen] = useState(false);

  const openAddClass = () => {
    setEditingClass(null);
    setClassNameEn('');
    setClassNameBn('');
    setClassGrade(1);
    setIsClassFormOpen(true);
    setIsSectionFormOpen(false);
  };

  const openEditClass = (cls: any) => {
    setEditingClass(cls);
    setClassNameEn(cls.nameEn || '');
    setClassNameBn(cls.nameBn || '');
    setClassGrade(cls.grade || 1);
    setIsClassFormOpen(true);
    setIsSectionFormOpen(false);
  };

  const openAddSection = (classId: string) => {
    setSectionName('');
    setSectionClassId(classId);
    setIsSectionFormOpen(true);
    setIsClassFormOpen(false);
  };

  const handleClassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      nameEn: classNameEn,
      nameBn: classNameBn || undefined,
      grade: Number(classGrade),
    };

    startTransition(async () => {
      let res;
      if (editingClass) {
        res = await updateClassAction(editingClass.id, payload);
      } else {
        res = await createClassAction(payload);
      }

      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm('Are you sure you want to delete this class? All linked sections will be affected.')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteClassAction(id);
      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleSectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      name: sectionName,
      classId: sectionClassId,
    };

    startTransition(async () => {
      const res = await createSectionAction(payload);
      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteSectionAction(id);
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
          <h1 className={styles.pageTitle}>Academics Setup</h1>
          <p className={styles.pageSubtitle}>Define classes and section groups for enrollment directory mapping.</p>
        </div>
        <button onClick={openAddClass} className={styles.addButton}>
          Create Class
        </button>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {isClassFormOpen && (
        <div className={styles.formModalOverlay}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>
              {editingClass ? 'Edit Class Definition' : 'Define New Class'}
            </h2>
            <form onSubmit={handleClassSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Class Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={classNameEn}
                    onChange={(e) => setClassNameEn(e.target.value)}
                    className={styles.input}
                    placeholder="e.g. Class 10"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Class Name (Bangla)</label>
                  <input
                    type="text"
                    value={classNameBn}
                    onChange={(e) => setClassNameBn(e.target.value)}
                    className={styles.input}
                    placeholder="e.g. ১০ম শ্রেণী"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Numerical Grade (Sort order) *</label>
                  <input
                    type="number"
                    required
                    value={classGrade}
                    onChange={(e) => setClassGrade(Number(e.target.value))}
                    className={styles.input}
                    placeholder="e.g. 10"
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setIsClassFormOpen(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className={styles.saveButton}
                >
                  {isPending ? 'Saving...' : 'Save Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSectionFormOpen && (
        <div className={styles.formModalOverlay}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Create New Section</h2>
            <form onSubmit={handleSectionSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Section Name *</label>
                  <input
                    type="text"
                    required
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className={styles.input}
                    placeholder="e.g. Section A, Science"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Class Reference</label>
                  <select
                    disabled
                    value={sectionClassId}
                    onChange={(e) => setSectionClassId(e.target.value)}
                    className={styles.select}
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setIsSectionFormOpen(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className={styles.saveButton}
                >
                  {isPending ? 'Saving...' : 'Save Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.classesList}>
        {classes.length === 0 ? (
          <div className={styles.emptyState}>No classes defined. Create one to begin.</div>
        ) : (
          classes.map((cls) => (
            <div key={cls.id} className={styles.classCard}>
              <div className={styles.classHeader}>
                <div>
                  <h3 className={styles.classTitle}>{cls.nameEn}</h3>
                  <span className={styles.classGrade}>Grade/Sort: {cls.grade}</span>
                </div>
                <div className={styles.classActions}>
                  <button onClick={() => openAddSection(cls.id)} className={styles.btnSecondary}>
                    + Add Section
                  </button>
                  <button onClick={() => openEditClass(cls)} className={styles.btnSecondary}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClass(cls.id)} className={styles.btnDanger}>
                    Delete
                  </button>
                </div>
              </div>

              <div className={styles.sectionsList}>
                <h4 className={styles.sectionsTitle}>Section Groups:</h4>
                {cls.sections && cls.sections.length > 0 ? (
                  <div className={styles.badgeContainer}>
                    {cls.sections.map((sec: any) => (
                      <div key={sec.id} className={styles.sectionBadge}>
                        <span>{sec.name}</span>
                        <button
                          onClick={() => handleDeleteSection(sec.id)}
                          className={styles.deleteBadgeBtn}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noSections}>No sections configured for this class.</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
