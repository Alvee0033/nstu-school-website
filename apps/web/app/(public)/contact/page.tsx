import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'যোগাযোগ',
  description: 'Contact info, address, map location, and query form of NSTU Model School.',
};

interface SchoolInfo {
  nameEn: string;
  nameBn: string;
  eiin: string;
  address?: string;
  phone?: string;
  email?: string;
  mapEmbedUrl?: string;
}

async function getSchoolInfo(): Promise<SchoolInfo | null> {
  try {
    return await api.get<SchoolInfo>('/public/school-info');
  } catch {
    return null;
  }
}

export default async function ContactPage() {
  const info = await getSchoolInfo();

  const address = info?.address || 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ক্যাম্পাস, সোনাপুর, নোয়াখালী-৩৮১৪';
  const phone = info?.phone || '+৮৮০ ১৭১২-৩৪৫৬৭৮';
  const email = info?.email || 'info@school.edu.bd';
  const mapEmbedUrl = info?.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.119253457597!2d91.1009133!3d22.7915332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754af5d4ebff45f%3A0xe543c7b744d2d46e!2sNoakhali%20Science%20and%20Technology%20University!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd';

  return (
    <div className={styles.page}>
      {/* Page Header Banner */}
      <div className={styles.headerBanner}>
        <div className="container">
          <span className={styles.bannerTag}>যোগাযোগ</span>
          <h1 className={styles.heading}>আমাদের সাথে সরাসরি যোগাযোগ করুন</h1>
          <p className={styles.bannerSub}>যেকোনো জিজ্ঞাসা, তথ্য বা সহযোগিতার জন্য আমরা প্রস্তুত</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Contact Details */}
          <div className={styles.infoCol}>
            <Card className={styles.card}>
              <h2 className={styles.sectionTitle}>যোগাযোগের বিবরণী</h2>
              
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <div className={styles.iconFrame}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>ক্যাম্পাস ঠিকানা</span>
                    <span className={styles.detailValue}>{address}</span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.iconFrame}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>হেল্পলাইন / মোবাইল</span>
                    <a href={`tel:${phone}`} className={styles.link}>{phone}</a>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.iconFrame}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>অফিসিয়াল ইমেইল</span>
                    <a href={`mailto:${email}`} className={styles.link}>{email}</a>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map Embed */}
            <Card className={`${styles.card} ${styles.mapCard}`}>
              <h2 className={styles.sectionTitle}>গুগল ম্যাপে নোবিপ্রবি ক্যাম্পাস</h2>
              <div className={styles.iframeWrapper}>
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Google Map Location"
                />
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className={styles.formCol}>
            <Card className={styles.card}>
              <h2 className={styles.sectionTitle}>আমাদের সরাসরি বার্তা লিখুন</h2>
              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="user-name" className={styles.label}>আপনার নাম</label>
                  <input type="text" id="user-name" className={styles.input} placeholder="সম্পূর্ণ নামটি লিখুন" required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="user-email" className={styles.label}>আপনার ইমেইল ঠিকানা</label>
                  <input type="email" id="user-email" className={styles.input} placeholder="name@email.com" required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="message-subject" className={styles.label}>বার্তার বিষয়</label>
                  <input type="text" id="message-subject" className={styles.input} placeholder="যোগাযোগের মূল উদ্দেশ্য" required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="user-message" className={styles.label}>বার্তার বিবরণ</label>
                  <textarea id="user-message" rows={6} className={styles.textarea} placeholder="আপনার বার্তাটি বিস্তারিত এখানে লিখুন..." required />
                </div>
                <Button type="button" className={styles.submitBtn}>বার্তা পাঠান</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
