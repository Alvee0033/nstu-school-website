import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'যোগাযোগ',
  description: 'Contact info, address, map location, and query form of Notun Kuri High School.',
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

            {/* Grievance Officer */}
            <Card className={`${styles.card} ${styles.specialCard}`}>
              <div className={styles.specialHeader}>
                <div className={styles.specialIcon}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>অভিযোগ নিষ্পত্তি কর্মকর্তা</h2>
                  <p className={styles.specialSub}>DSHE নির্দেশনা অনুযায়ী মনোনীত কর্মকর্তা</p>
                </div>
              </div>
              <div className={styles.officerBox}>
                <div className={styles.officerInfo}>
                  <strong>মোঃ সালাউদ্দিন আহমেদ</strong>
                  <span>প্রধান শিক্ষক, নতুন কুঁড়ি হাই স্কুল</span>
                </div>
                <div className={styles.officerContacts}>
                  <a href="tel:+8801712987654" className={styles.contactLink}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    +৮৮০১৭১২-৯৮৭৬৫৪
                  </a>
                  <a href="mailto:principal@school.edu.bd" className={styles.contactLink}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    principal@school.edu.bd
                  </a>
                </div>
              </div>
              <p className={styles.noteText}>অভিযোগ কার্যদিবসে সকাল ৯টা থেকে বিকাল ৪টার মধ্যে সরাসরি বা ইমেইলে দাখিল করুন।</p>
            </Card>

            {/* Service Center */}
            <Card className={`${styles.card} ${styles.specialCard}`}>
              <div className={styles.specialHeader}>
                <div className={styles.specialIcon}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>তথ্য সেবাকেন্দ্র</h2>
                  <p className={styles.specialSub}>সরকারি তথ্য সেবার মনোনীত সেন্টার</p>
                </div>
              </div>
              <div className={styles.serviceRows}>
                <div className={styles.serviceRow}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>প্রধান শিক্ষকের অফিস কক্ষ, নতুন কুঁড়ি হাই স্কুল, সোনাপুর, নোয়াখালী-৩৮১৪</span>
                </div>
                <div className={styles.serviceRow}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <a href="tel:+8801712987654" className={styles.link}>+৮৮০১৭১২-৯৮৭৬৫৪</a>
                </div>
                <div className={styles.serviceRow}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>সেবার সময়: রবিবার – বৃহস্পতিবার, সকাল ৯:০০ – বিকাল ৪:০০ টা</span>
                </div>
              </div>
            </Card>

            {/* Map Embed */}
            <Card className={`${styles.card} ${styles.mapCard}`}>
              <h2 className={styles.sectionTitle}>গুগল ম্যাপে স্কুলের লোকেশন</h2>
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
