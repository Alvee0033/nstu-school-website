import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ম্যানেজিং কমিটি',
  description: 'নতুন কুঁড়ি হাই স্কুলের স্কুল ম্যানেজিং কমিটি (SMC) সদস্যবৃন্দের তালিকা।',
};

const COMMITTEE_MEMBERS = [
  { sl: '০১', name: 'প্রফেসর ড. মোঃ আশরাফুল আলম', designation: 'সভাপতি', role: 'স্কুল ম্যানেজিং কমিটি (SMC)', phone: '+৮৮০১৭১২-৩৪৫৬৭৮' },
  { sl: '০২', name: 'মোঃ রফিকুল ইসলাম', designation: 'সহ-সভাপতি', role: 'অভিভাবক প্রতিনিধি', phone: '+৮৮০১৮২৩-৪৫৬৭৮৯' },
  { sl: '০৩', name: 'মোঃ সালাউদ্দিন আহমেদ', designation: 'সদস্য-সচিব / প্রধান শিক্ষক', role: 'বিদ্যালয় প্রশাসন', phone: '+৮৮০১৭১২-৯৮৭৬৫৪' },
  { sl: '০৪', name: 'মোসাঃ রাহেলা বেগম', designation: 'শিক্ষক প্রতিনিধি', role: 'সিনিয়র শিক্ষক', phone: '+৮৮০১৮১১-৩৪৫৬৭৮' },
  { sl: '০৫', name: 'মোঃ জসিম উদ্দিন', designation: 'দাতা সদস্য', role: 'স্থানীয় ব্যবসায়ী ও শিক্ষানুরাগী', phone: '+৮৮০১৭৩৩-৪৫৬৭৮৯' },
  { sl: '০৬', name: 'ফারজানা আক্তার', designation: 'অভিভাবক প্রতিনিধি (মহিলা)', role: 'অভিভাবক', phone: '+৮৮০১৯২২-৩৪৫৬৭৮' },
  { sl: '০৭', name: 'মোঃ কামরুল হাসান', designation: 'ওয়ার্ড কাউন্সিলর প্রতিনিধি', role: 'স্থানীয় সরকার প্রতিনিধি', phone: '+৮৮০১৭৫৫-৬৭৮৯০১' },
];

export default function CommitteePage() {
  return (
    <div className={styles.page}>
      <div className={styles.headerBanner}>
        <div className="container">
          <span className={styles.bannerTag}>প্রশাসন</span>
          <h1 className={styles.heading}>স্কুল ম্যানেজিং কমিটি (SMC)</h1>
          <p className={styles.bannerSub}>নতুন কুঁড়ি হাই স্কুলের পরিচালনা ও প্রশাসনিক কার্যক্রম পরিচালনাকারী কমিটির সদস্যবৃন্দ</p>
        </div>
      </div>

      <div className="container">
        {/* Legal Notice */}
        <div className={styles.legalNotice}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.noticeIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা অধিদপ্তর (DSHE) নির্দেশনা অনুযায়ী প্রতিটি শিক্ষা প্রতিষ্ঠানের ওয়েবসাইটে ম্যানেজিং কমিটির তথ্য প্রকাশ বাধ্যতামূলক।</p>
        </div>

        {/* Committee Table */}
        <div className={styles.tableWrapper}>
          <h2 className={styles.sectionTitle}>বর্তমান কমিটির সদস্যবৃন্দ (২০২৫–২০২৭)</h2>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ক্রমিক</th>
                  <th>সদস্যের নাম</th>
                  <th>পদবি</th>
                  <th>ভূমিকা</th>
                  <th>মোবাইল</th>
                </tr>
              </thead>
              <tbody>
                {COMMITTEE_MEMBERS.map((m) => (
                  <tr key={m.sl}>
                    <td>{m.sl}</td>
                    <td><strong>{m.name}</strong></td>
                    <td><span className={styles.badge}>{m.designation}</span></td>
                    <td>{m.role}</td>
                    <td><a href={`tel:${m.phone}`} className={styles.phoneLink}>{m.phone}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Cards */}
        <div className={styles.termCards}>
          <div className={styles.termCard}>
            <div className={styles.termIcon}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <strong>কমিটির মেয়াদ</strong>
              <span>২০২৫ – ২০২৭ সাল</span>
            </div>
          </div>
          <div className={styles.termCard}>
            <div className={styles.termIcon}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <strong>অনুমোদনকারী কর্তৃপক্ষ</strong>
              <span>মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা অধিদপ্তর (DSHE)</span>
            </div>
          </div>
          <div className={styles.termCard}>
            <div className={styles.termIcon}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <strong>মোট সদস্য সংখ্যা</strong>
              <span>৭ জন (সরকারি নির্দেশনা অনুযায়ী)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
