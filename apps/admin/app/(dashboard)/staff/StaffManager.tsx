'use client';

import React, { useState, useTransition } from 'react';
import {
  createStaffAction,
  updateStaffAction,
  deleteStaffAction
} from '../../actions';
import styles from './staff.module.css';

interface StaffManagerProps {
  initialStaff: any[];
}

export default function StaffManager({ initialStaff }: StaffManagerProps) {
  const [staff] = useState(initialStaff);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [designation, setDesignation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [order, setOrder] = useState(0);

  const openAddForm = () => {
    setEditingStaff(null);
    setNameEn('');
    setNameBn('');
    setDesignation('');
    setPhone('');
    setEmail('');
    setPhotoUrl('');
    setOrder(0);
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (stf: any) => {
    setEditingStaff(stf);
    setNameEn(stf.nameEn || '');
    setNameBn(stf.nameBn || '');
    setDesignation(stf.designation || '');
    setPhone(stf.phone || '');
    setEmail(stf.email || '');
    setPhotoUrl(stf.photoUrl || '');
    setOrder(stf.order || 0);
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
      phone: phone || undefined,
      email: email || undefined,
      photoUrl: photoUrl || undefined,
      order: Number(order),
    };

    startTransition(async () => {
      let res;
      if (editingStaff) {
        res = await updateStaffAction(editingStaff.id, payload);
      } else {
        res = await createStaffAction(payload);
      }

      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff record?')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteStaffAction(id);
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
          <h1 className={styles.pageTitle}>Staff Directory</h1>
          <p className={styles.pageSubtitle}>Manage office assistants, librarians, security personnel, and non-academic staff.</p>
        </div>
        {!isFormOpen && (
          <button onClick={openAddForm} className={styles.addButton}>
            ➕ Add Staff Member
          </button>
        )}
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {isFormOpen && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>
            {editingStaff ? 'Edit Staff Profile' : 'Add Staff Member'}
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
                  placeholder="e.g. Abdur Rahim"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Name (Bangla)</label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. আব্দুর রহিম"
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
                  placeholder="e.g. Office Assistant"
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
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. rahim@school.edu"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Photo URL</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. /staff/rahim.png"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Display Order (Sort weight)</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className={styles.input}
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
      )}

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Contact Info</th>
              <th>Display Order</th>
              <th className={styles.textRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  No staff records found. Add one to populate the directory.
                </td>
              </tr>
            ) : (
              staff.map((stf) => (
                <tr key={stf.id}>
                  <td>
                    {stf.photoUrl ? (
                      <img src={stf.photoUrl} alt={stf.nameEn} className={styles.avatar} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>👥</div>
                    )}
                  </td>
                  <td>
                    <div className={styles.boldText}>{stf.nameEn}</div>
                    <div className={styles.mutedText}>{stf.nameBn}</div>
                  </td>
                  <td>{stf.designation}</td>
                  <td>
                    <div>{stf.phone || '-'}</div>
                    <div className={styles.mutedText}>{stf.email || ''}</div>
                  </td>
                  <td>{stf.order}</td>
                  <td className={styles.actionsCell}>
                    <button
                      onClick={() => openEditForm(stf)}
                      disabled={isPending}
                      className={`${styles.actionButton} ${styles.btnEdit}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(stf.id)}
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
