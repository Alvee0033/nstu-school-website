'use client';

import React, { useState, useTransition } from 'react';
import {
  createNoticeAction,
  updateNoticeAction,
  deleteNoticeAction,
  publishNoticeAction,
  unpublishNoticeAction
} from '../../actions';
import styles from './notices.module.css';

interface NoticesManagerProps {
  initialNotices: any[];
}

export default function NoticesManager({ initialNotices }: NoticesManagerProps) {
  const [notices] = useState(initialNotices);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentBn, setContentBn] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [isUrgent, setIsUrgent] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState('');

  const openAddForm = () => {
    setEditingNotice(null);
    setTitleEn('');
    setTitleBn('');
    setContentEn('');
    setContentBn('');
    setCategory('GENERAL');
    setIsUrgent(false);
    setAttachmentUrl('');
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (notice: any) => {
    setEditingNotice(notice);
    setTitleEn(notice.titleEn || '');
    setTitleBn(notice.titleBn || '');
    setContentEn(notice.contentEn || '');
    setContentBn(notice.contentBn || '');
    setCategory(notice.category || 'GENERAL');
    setIsUrgent(notice.isUrgent || false);
    setAttachmentUrl(notice.attachmentUrl || '');
    setError(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      titleEn,
      titleBn,
      contentEn,
      contentBn,
      category,
      isUrgent,
      attachmentUrl: attachmentUrl || undefined,
    };

    startTransition(async () => {
      let res;
      if (editingNotice) {
        res = await updateNoticeAction(editingNotice.id, payload);
      } else {
        res = await createNoticeAction(payload);
      }

      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteNoticeAction(id);
      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handlePublishToggle = async (notice: any) => {
    setError(null);
    startTransition(async () => {
      let res;
      if (notice.status === 'PUBLISHED') {
        res = await unpublishNoticeAction(notice.id);
      } else {
        res = await publishNoticeAction(notice.id);
      }

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
          <h1 className={styles.pageTitle}>Notice Board Management</h1>
          <p className={styles.pageSubtitle}>Publish urgent announcements, academic instructions, or admission updates.</p>
        </div>
        {!isFormOpen && (
          <button onClick={openAddForm} className={styles.addButton}>
            + Add New Notice
          </button>
        )}
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {isFormOpen && (
        <div className={styles.formModalOverlay}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>
              {editingNotice ? 'Edit Notice Details' : 'Create New Notice'}
            </h2>
            <form onSubmit={handleFormSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Title (English) *</label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Class 10 Exam Schedule"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Title (Bangla)</label>
                <input
                  type="text"
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. ১০ম শ্রেণীর পরীক্ষার সময়সূচী"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={styles.select}
                >
                  <option value="GENERAL">General</option>
                  <option value="ACADEMIC">Academic</option>
                  <option value="ADMISSION">Admission</option>
                  <option value="EXAM">Exam</option>
                  <option value="RESULT">Result</option>
                  <option value="EVENT">Event</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Attachment URL (PDF/Link)</label>
                <input
                  type="text"
                  value={attachmentUrl}
                  onChange={(e) => setAttachmentUrl(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. https://notunkurihighschool.edu/files/schedule.pdf"
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Content (English)</label>
                <textarea
                  rows={4}
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  className={styles.textarea}
                  placeholder="Detailed description in English..."
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Content (Bangla)</label>
                <textarea
                  rows={4}
                  value={contentBn}
                  onChange={(e) => setContentBn(e.target.value)}
                  className={styles.textarea}
                  placeholder="Detailed description in Bangla..."
                />
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  id="isUrgent"
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="isUrgent" className={styles.checkboxLabel}>
                  Mark as Urgent Notice (Show in Scrolling Ticker)
                </label>
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
                {isPending ? 'Saving...' : 'Save Notice'}
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
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Urgent?</th>
              <th>Published At</th>
              <th className={styles.textRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  No notices found. Add a notice to get started!
                </td>
              </tr>
            ) : (
              notices.map((notice) => (
                <tr key={notice.id}>
                  <td>
                    <div className={styles.noticeTitleEn}>{notice.titleEn}</div>
                    <div className={styles.noticeTitleBn}>{notice.titleBn}</div>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles[notice.category.toLowerCase()]}`}>
                      {notice.category}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${notice.status === 'PUBLISHED' ? styles.published : styles.draft}`}>
                      {notice.status}
                    </span>
                  </td>
                  <td>{notice.isUrgent ? 'Yes' : 'No'}</td>
                  <td>{notice.publishedAt ? new Date(notice.publishedAt).toLocaleDateString() : '-'}</td>
                  <td className={styles.actionsCell}>
                    <button
                      onClick={() => handlePublishToggle(notice)}
                      disabled={isPending}
                      className={`${styles.actionButton} ${notice.status === 'PUBLISHED' ? styles.btnUnpublish : styles.btnPublish}`}
                    >
                      {notice.status === 'PUBLISHED' ? 'Draft' : 'Publish'}
                    </button>
                    <button
                      onClick={() => openEditForm(notice)}
                      disabled={isPending}
                      className={`${styles.actionButton} ${styles.btnEdit}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
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
