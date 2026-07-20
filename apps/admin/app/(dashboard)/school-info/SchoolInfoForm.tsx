'use client';

import React, { useState, useTransition } from 'react';
import { updateSchoolInfoAction } from '../../actions';
import styles from './school-info.module.css';

interface SchoolInfoFormProps {
  initialData: any;
}

export default function SchoolInfoForm({ initialData }: SchoolInfoFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [nameEn, setNameEn] = useState(initialData?.nameEn || '');
  const [nameBn, setNameBn] = useState(initialData?.nameBn || '');
  const [eiin, setEiin] = useState(initialData?.eiin || '');
  const [emis, setEmis] = useState(initialData?.emis || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [mapEmbedUrl, setMapEmbedUrl] = useState(initialData?.mapEmbedUrl || '');
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || '');
  const [fbPageUrl, setFbPageUrl] = useState(initialData?.fbPageUrl || '');
  const [ytChannelUrl, setYtChannelUrl] = useState(initialData?.ytChannelUrl || '');
  
  const [historyEn, setHistoryEn] = useState(initialData?.historyEn || '');
  const [historyBn, setHistoryBn] = useState(initialData?.historyBn || '');
  const [visionEn, setVisionEn] = useState(initialData?.visionEn || '');
  const [visionBn, setVisionBn] = useState(initialData?.visionBn || '');
  const [missionEn, setMissionEn] = useState(initialData?.missionEn || '');
  const [missionBn, setMissionBn] = useState(initialData?.missionBn || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const payload = {
      nameEn,
      nameBn,
      eiin,
      emis: emis || undefined,
      address: address || undefined,
      phone: phone || undefined,
      email: email || undefined,
      mapEmbedUrl: mapEmbedUrl || undefined,
      logoUrl: logoUrl || undefined,
      fbPageUrl: fbPageUrl || undefined,
      ytChannelUrl: ytChannelUrl || undefined,
      historyEn: historyEn || undefined,
      historyBn: historyBn || undefined,
      visionEn: visionEn || undefined,
      visionBn: visionBn || undefined,
      missionEn: missionEn || undefined,
      missionBn: missionBn || undefined,
    };

    startTransition(async () => {
      const res = await updateSchoolInfoAction(payload);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Edit School Profile</h1>
        <p className={styles.pageSubtitle}>Update contact directories, maps, historical records, and vision/mission statements.</p>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successAlert}>School Profile updated successfully!</div>}

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.sectionHeader}>Basic Info & Identity</div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>School Name (English) *</label>
              <input type="text" required value={nameEn} onChange={(e) => setNameEn(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>School Name (Bangla) *</label>
              <input type="text" required value={nameBn} onChange={(e) => setNameBn(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>EIIN Code *</label>
              <input type="text" required value={eiin} onChange={(e) => setEiin(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>EMIS Code</label>
              <input type="text" value={emis} onChange={(e) => setEmis(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Logo URL</label>
              <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className={styles.input} />
            </div>
          </div>

          <div className={styles.sectionHeader}>Contact Details & Coordinates</div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={styles.input} />
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Google Map Embed URL</label>
              <input type="text" value={mapEmbedUrl} onChange={(e) => setMapEmbedUrl(e.target.value)} className={styles.input} placeholder="https://google.com/maps/embed..." />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Facebook Page Link</label>
              <input type="text" value={fbPageUrl} onChange={(e) => setFbPageUrl(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>YouTube Channel Link</label>
              <input type="text" value={ytChannelUrl} onChange={(e) => setYtChannelUrl(e.target.value)} className={styles.input} />
            </div>
          </div>

          <div className={styles.sectionHeader}>History, Vision & Mission</div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>History (English)</label>
              <textarea rows={4} value={historyEn} onChange={(e) => setHistoryEn(e.target.value)} className={styles.textarea} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>History (Bangla)</label>
              <textarea rows={4} value={historyBn} onChange={(e) => setHistoryBn(e.target.value)} className={styles.textarea} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Vision (English)</label>
              <textarea rows={3} value={visionEn} onChange={(e) => setVisionEn(e.target.value)} className={styles.textarea} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Vision (Bangla)</label>
              <textarea rows={3} value={visionBn} onChange={(e) => setVisionBn(e.target.value)} className={styles.textarea} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mission (English)</label>
              <textarea rows={3} value={missionEn} onChange={(e) => setMissionEn(e.target.value)} className={styles.textarea} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mission (Bangla)</label>
              <textarea rows={3} value={missionBn} onChange={(e) => setMissionBn(e.target.value)} className={styles.textarea} />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" disabled={isPending} className={styles.saveButton}>
              {isPending ? 'Saving Updates...' : 'Update School Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
