'use client';

import React, { useState, useTransition } from 'react';
import {
  createTeacherAction,
  updateTeacherAction,
  deleteTeacherAction
} from '../../actions';
import styles from './teachers.module.css';

interface TeachersManagerProps {
  initialTeachers: any[];
}

export default function TeachersManager({ initialTeachers }: TeachersManagerProps) {
  const [teachers] = useState(initialTeachers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [bioEn, setBioEn] = useState('');
  const [bioBn, setBioBn] = useState('');
  const [order, setOrder] = useState(0);

  const openAddForm = () => {
    setEditingTeacher(null);
    setNameEn('');
    setNameBn('');
    setDesignation('');
    setDepartment('');
    setSubject('');
    setQualification('');
    setEmail('');
    setPhone('');
    setPhotoUrl('');
    setBioEn('');
    setBioBn('');
    setOrder(0);
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (teacher: any) => {
    setEditingTeacher(teacher);
    setNameEn(teacher.nameEn || '');
    setNameBn(teacher.nameBn || '');
    setDesignation(teacher.designation || '');
    setDepartment(teacher.department || '');
    setSubject(teacher.subject || '');
    setQualification(teacher.qualification || '');
    setEmail(teacher.email || '');
    setPhone(teacher.phone || '');
    setPhotoUrl(teacher.photoUrl || '');
    setBioEn(teacher.bioEn || '');
    setBioBn(teacher.bioBn || '');
    setOrder(teacher.order || 0);
    setError(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      nameEn,
      nameBn: nameBn || undefined,
      designation,
      department: department || undefined,
      subject: subject || undefined,
      qualification: qualification || undefined,
      email: email || undefined,
      phone: phone || undefined,
      photoUrl: photoUrl || undefined,
      bioEn: bioEn || undefined,
      bioBn: bioBn || undefined,
      order: Number(order),
    };

    startTransition(async () => {
      let res;
      if (editingTeacher) {
        res = await updateTeacherAction(editingTeacher.id, payload);
      } else {
        res = await createTeacherAction(payload);
      }

      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate/delete this teacher?')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteTeacherAction(id);
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
          <h1 className={styles.pageTitle}>Teacher Directory Management</h1>
          <p className={styles.pageSubtitle}>Add, edit, or deactivate teachers displayed in the faculty directory.</p>
        </div>
        {!isFormOpen && (
          <button onClick={openAddForm} className={styles.addButton}>
            + Add New Teacher
          </button>
        )}
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {isFormOpen && (
        <div className={styles.formModalOverlay}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>
              {editingTeacher ? 'Edit Teacher Profile' : 'Create Teacher Profile'}
            </h2>
            <form onSubmit={handleFormSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name (English) *</label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Dr. Muhammad Khan"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Name (Bangla)</label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. ড. মুহাম্মদ খান"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Designation *</label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Assistant Professor, Principal"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Science, Commerce, Arts"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Physics, Mathematics"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Qualification</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. M.Sc. in Physics, B.Ed."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. khan@school.edu"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. +8801700000000"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Photo URL</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. /teachers/khan.png"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Display Order (Sort weight)</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className={styles.input}
                  placeholder="0"
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Biography (English)</label>
                <textarea
                  rows={3}
                  value={bioEn}
                  onChange={(e) => setBioEn(e.target.value)}
                  className={styles.textarea}
                  placeholder="Short bio description in English..."
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Biography (Bangla)</label>
                <textarea
                  rows={3}
                  value={bioBn}
                  onChange={(e) => setBioBn(e.target.value)}
                  className={styles.textarea}
                  placeholder="Short bio description in Bangla..."
                />
              </div>
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
                {isPending ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
      )}

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department / Subject</th>
              <th>Contact</th>
              <th className={styles.textRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  No teachers found. Add a teacher profile to get started!
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    {teacher.photoUrl ? (
                      <img src={teacher.photoUrl} alt={teacher.nameEn} className={styles.avatar} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>{teacher.nameEn?.[0] || 'T'}</div>
                    )}
                  </td>
                  <td>
                    <div className={styles.teacherNameEn}>{teacher.nameEn}</div>
                    <div className={styles.teacherNameBn}>{teacher.nameBn}</div>
                  </td>
                  <td>
                    <div className={styles.teacherDesignation}>{teacher.designation}</div>
                  </td>
                  <td>
                    <div className={styles.teacherDept}>{teacher.department || '-'}</div>
                    <div className={styles.teacherSubject}>{teacher.subject || ''}</div>
                  </td>
                  <td>
                    <div className={styles.teacherEmail}>{teacher.email || ''}</div>
                    <div className={styles.teacherPhone}>{teacher.phone || ''}</div>
                  </td>
                  <td className={styles.actionsCell}>
                    <button
                      onClick={() => openEditForm(teacher)}
                      disabled={isPending}
                      className={`${styles.actionButton} ${styles.btnEdit}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.id)}
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
