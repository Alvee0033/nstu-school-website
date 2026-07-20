'use client';

import React, { useState, useTransition } from 'react';
import {
  createAlbumAction,
  updateAlbumAction,
  deleteAlbumAction
} from '../../actions';
import styles from './gallery.module.css';

interface GalleryManagerProps {
  initialAlbums: any[];
}

export default function GalleryManager({ initialAlbums }: GalleryManagerProps) {
  const [albums] = useState(initialAlbums);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [mediaItems, setMediaItems] = useState<{ url: string; caption: string; order: number }[]>([]);

  const openAddForm = () => {
    setEditingAlbum(null);
    setTitleEn('');
    setTitleBn('');
    setDescription('');
    setCoverImageUrl('');
    setEventDate('');
    setIsPublished(false);
    setMediaItems([]);
    setError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (album: any) => {
    setEditingAlbum(album);
    setTitleEn(album.titleEn || '');
    setTitleBn(album.titleBn || '');
    setDescription(album.description || '');
    setCoverImageUrl(album.coverImageUrl || '');
    setEventDate(album.eventDate ? new Date(album.eventDate).toISOString().split('T')[0] : '');
    setIsPublished(album.isPublished || false);
    setMediaItems(album.media || []);
    setError(null);
    setIsFormOpen(true);
  };

  const handleAddMediaRow = () => {
    setMediaItems([...mediaItems, { url: '', caption: '', order: mediaItems.length }]);
  };

  const handleRemoveMediaRow = (index: number) => {
    setMediaItems(mediaItems.filter((_, idx) => idx !== index));
  };

  const handleMediaChange = (index: number, key: string, value: any) => {
    const updated = [...mediaItems];
    updated[index] = { ...updated[index], [key]: value };
    setMediaItems(updated);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      titleEn,
      titleBn: titleBn || undefined,
      description: description || undefined,
      coverImageUrl: coverImageUrl || undefined,
      eventDate: eventDate ? new Date(eventDate).toISOString() : undefined,
      isPublished,
      media: mediaItems.filter(m => m.url.trim() !== '').map((m, idx) => ({
        url: m.url,
        caption: m.caption || undefined,
        order: Number(m.order) || idx,
      })),
    };

    startTransition(async () => {
      let res;
      if (editingAlbum) {
        res = await updateAlbumAction(editingAlbum.id, payload);
      } else {
        res = await createAlbumAction(payload);
      }

      if (res.error) {
        setError(res.error);
      } else {
        window.location.reload();
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery album and all of its media?')) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteAlbumAction(id);
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
          <h1 className={styles.pageTitle}>Gallery Albums</h1>
          <p className={styles.pageSubtitle}>Manage photo and video albums of school programs, sports days, and campus events.</p>
        </div>
        {!isFormOpen && (
          <button onClick={openAddForm} className={styles.addButton}>
            ➕ Add Album
          </button>
        )}
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {isFormOpen && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>
            {editingAlbum ? 'Edit Gallery Album' : 'Create Gallery Album'}
          </h2>
          <form onSubmit={handleFormSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Album Title (English) *</label>
                <input type="text" required value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className={styles.input} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Album Title (Bangla)</label>
                <input type="text" value={titleBn} onChange={(e) => setTitleBn(e.target.value)} className={styles.input} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Cover Image URL</label>
                <input type="text" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} className={styles.input} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Event Date</label>
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={styles.input} />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Album Description</label>
                <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className={styles.textarea} />
              </div>

              <div className={styles.checkboxGroup}>
                <input id="isPublished" type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className={styles.checkbox} />
                <label htmlFor="isPublished" className={styles.checkboxLabel}>📢 Publish album publicly</label>
              </div>
            </div>

            <div className={styles.mediaSection}>
              <div className={styles.mediaHeader}>
                <h3 className={styles.mediaSectionTitle}>Album Photos / Media Items</h3>
                <button type="button" onClick={handleAddMediaRow} className={styles.btnSecondary}>
                  ➕ Add Image
                </button>
              </div>

              <div className={styles.mediaRows}>
                {mediaItems.length === 0 ? (
                  <div className={styles.noMedia}>No photos added yet. Click "Add Image" above to populate the album.</div>
                ) : (
                  mediaItems.map((item, idx) => (
                    <div key={idx} className={styles.mediaRow}>
                      <div className={styles.mediaInputGroup}>
                        <input
                          type="text"
                          required
                          value={item.url}
                          placeholder="Image URL"
                          onChange={(e) => handleMediaChange(idx, 'url', e.target.value)}
                          className={styles.input}
                        />
                        <input
                          type="text"
                          value={item.caption || ''}
                          placeholder="Caption"
                          onChange={(e) => handleMediaChange(idx, 'caption', e.target.value)}
                          className={styles.input}
                        />
                        <input
                          type="number"
                          value={item.order || 0}
                          placeholder="Order"
                          onChange={(e) => handleMediaChange(idx, 'order', Number(e.target.value))}
                          className={styles.smallInput}
                        />
                        <button type="button" onClick={() => handleRemoveMediaRow(idx)} className={styles.btnDangerIcon}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="button" onClick={() => setIsFormOpen(false)} className={styles.cancelButton}>Cancel</button>
              <button type="submit" disabled={isPending} className={styles.saveButton}>Save Album</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Album Title</th>
              <th>Description</th>
              <th>Photos Count</th>
              <th>Status</th>
              <th className={styles.textRight}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {albums.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>No albums created.</td>
              </tr>
            ) : (
              albums.map((album) => (
                <tr key={album.id}>
                  <td>
                    {album.coverImageUrl ? (
                      <img src={album.coverImageUrl} alt={album.titleEn} className={styles.albumCover} />
                    ) : (
                      <div className={styles.coverPlaceholder}>🖼️</div>
                    )}
                  </td>
                  <td>
                    <div className={styles.boldText}>{album.titleEn}</div>
                    <div className={styles.mutedText}>{album.titleBn}</div>
                  </td>
                  <td>{album.description || '-'}</td>
                  <td>{album.media?.length || 0} items</td>
                  <td>
                    <span className={`${styles.badge} ${album.isPublished ? styles.published : styles.draft}`}>
                      {album.isPublished ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <button onClick={() => openEditForm(album)} disabled={isPending} className={`${styles.actionButton} ${styles.btnEdit}`}>Edit</button>
                    <button onClick={() => handleDelete(album.id)} disabled={isPending} className={`${styles.actionButton} ${styles.btnDelete}`}>Delete</button>
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
