import type { Metadata } from 'next';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'পরিচিতি',
  description: 'Notun Kuri High School history, vision, mission and SMC / principal message.',
};

interface Principal {
  id: string;
  name: string;
  designation: string;
  messageEn?: string;
  messageBn?: string;
  photoUrl?: string;
  type: string;
}

interface SchoolInfo {
  nameEn: string;
  nameBn: string;
  eiin: string;
  emis?: string;
  historyEn?: string;
  historyBn?: string;
  visionEn?: string;
  visionBn?: string;
  missionEn?: string;
  missionBn?: string;
  address?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  principals: Principal[];
}

const FALLBACK_PRINCIPALS: Principal[] = [
  {
    id: 'p1',
    name: 'প্রফেসর ড. মোঃ আশরাফুল আলম',
    designation: 'সভাপতি, স্কুল ম্যানেজিং কমিটি (SMC)',
    messageBn: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ক্যাম্পাস সংলগ্ন এই বিদ্যাপীঠটি শিক্ষার্থীদের নৈতিক চরিত্র গঠন ও মেধা বিকাশে এক অনন্য ভূমিকা পালন করছে। বিশ্ববিদ্যালয়ের সুদক্ষ পরিচালনা পর্ষদের অধীনে স্কুলটি আধুনিক শিক্ষাবান্ধব পরিবেশ বজায় রাখতে প্রতিশ্রুতিবদ্ধ।',
    photoUrl: '/chairman.png',
    type: 'CHAIRMAN',
  },
  {
    id: 'p2',
    name: 'প্রফেসর ড. মুহাম্মদ আলম',
    designation: 'প্রধান শিক্ষক, নতুন কুঁড়ি হাই স্কুল',
    messageBn: 'আমরা বিশ্বাস করি প্রতিটি শিশুই সুপ্ত প্রতিভার অধিকারী। আমাদের সুদক্ষ শিক্ষক মণ্ডলী এবং বিশ্ববিদ্যালয়ের উচ্চ মানের শিক্ষা সহায়তার মাধ্যমে শিক্ষার্থীদের বাস্তবমুখী জ্ঞান এবং মানবিক মূল্যবোধে বলীয়ান করতে আমরা নিরলস কাজ করে যাচ্ছি।',
    photoUrl: '/principal.png',
    type: 'PRINCIPAL',
  },
];

async function getSchoolInfo(): Promise<SchoolInfo | null> {
  try {
    const result = await api.get<SchoolInfo>('/public/school-info');
    if (!result || !result.nameEn) {
      return getFallbackInfo();
    }
    return result;
  } catch {
    return getFallbackInfo();
  }
}

function getFallbackInfo(): SchoolInfo {
  return {
    nameEn: 'Notun Kuri High School',
    nameBn: 'নতুন কুঁড়ি হাই স্কুল',
    eiin: '১২৮৫৪৩',
    emis: '৬০৯১২',
    historyBn: 'নোয়াখালী অঞ্চলের শিক্ষার্থীদের মাঝে মানসম্মত শিক্ষার আলো ছড়িয়ে দিতে এবং বিজ্ঞানমনস্ক নৈতিক মূল্যবোধসম্পন্ন প্রজন্ম গড়ে তোলার মহান ব্রত নিয়ে নতুন কুঁড়ি হাই স্কুল প্রতিষ্ঠিত হয়। অভিজ্ঞ ও দক্ষ শিক্ষক মণ্ডলী দ্বারা নিয়মিত পাঠদান কার্যক্রম পরিচালিত হয়ে আসছে। স্কুলটিতে রয়েছে আধুনিক মাল্টিমিডিয়া ক্লাসরুম, উন্নত বিজ্ঞানাগার ও সমৃদ্ধ লাইব্রেরি যা শিক্ষার্থীদের সুপ্ত প্রতিভার বিকাশে গুরুত্বপূর্ণ অবদান রাখছে।',
    visionBn: 'যুগোপযোগী মানসম্মত আধুনিক শিক্ষা নিশ্চিতকরণ, বিজ্ঞানমনস্ক দৃষ্টিভঙ্গির প্রসার এবং নৈতিক মূল্যবোধের সঠিক সংমিশ্রণে শিক্ষার্থীদের একজন আদর্শ দেশপ্রেমিক সুনাগরিক হিসেবে গড়ে তোলা।',
    missionBn: 'প্রযুক্তিনির্ভর সৃজনশীল পাঠদান কৌশলের মাধ্যমে শিক্ষার্থীদের মেধা বিকাশ, ব্যবহারিক বিজ্ঞান শিক্ষার অনুশীলন ত্বরান্বিত করা এবং সহ-শিক্ষা কার্যক্রমের মাধ্যমে শারীরিক ও মানসিক সুস্থতা নিশ্চিত করা।',
    address: 'সোনাপুর, নোয়াখালী-৩৮১৪',
    phone: '+৮৮০১৭১২-৩৪৫৬৭৮',
    email: 'info@school.edu.bd',
    principals: FALLBACK_PRINCIPALS,
  };
}

export default async function AboutPage() {
  const info = await getSchoolInfo();

  const schoolName = info?.nameBn || 'নতুন কুঁড়ি হাই স্কুল';
  const history = info?.historyBn || 'নতুন কুঁড়ি হাই স্কুল একটি ঐতিহ্যবাহী শিক্ষা প্রতিষ্ঠান।';
  const vision = info?.visionBn || 'মানসম্মত শিক্ষা ও সুনাগরিক গড়ে তোলা আমাদের লক্ষ্য।';
  const mission = info?.missionBn || 'নৈতিক ও বিজ্ঞানমনস্ক আধুনিক শিক্ষা প্রদান আমাদের উদ্দেশ্য।';
  const principals = info?.principals && info.principals.length > 0 ? info.principals : FALLBACK_PRINCIPALS;

  return (
    <div className={styles.page}>
      {/* Banner Section */}
      <div className={styles.headerBanner}>
        <div className="container">
          <span className={styles.bannerTag}>পরিচিতি ও ইতিহাস</span>
          <h1 className={styles.heading}>{schoolName}</h1>
          <p className={styles.bannerSub}>আমাদের লক্ষ্য, লক্ষ্যমাত্রা এবং সম্মানিত স্মারকদের বিবরণ</p>
        </div>
      </div>

      <div className="container">
        <section className={styles.gridSection}>
          <div className={styles.mainContent}>
            {/* History */}
            <Card className={styles.card}>
              <h2 className={styles.sectionTitle}>আমাদের সংক্ষিপ্ত ইতিহাস</h2>
              <p className={styles.paragraph}>{history}</p>
            </Card>

            {/* Vision & Mission */}
            <div className={styles.visionMission}>
              <Card className={styles.card}>
                <h2 className={styles.sectionTitle}>আমাদের লক্ষ্য (Vision)</h2>
                <p className={styles.paragraph}>{vision}</p>
              </Card>

              <Card className={styles.card}>
                <h2 className={styles.sectionTitle}>আমাদের উদ্দেশ্য (Mission)</h2>
                <p className={styles.paragraph}>{mission}</p>
              </Card>
            </div>
          </div>

          <aside className={styles.sidebar}>
            {/* Info Summary */}
            <Card className={styles.card}>
              <h3 className={styles.sidebarTitle}>তথ্য সংক্ষেপ</h3>
              <dl className={styles.statsList}>
                <dt>EIIN নম্বর:</dt>
                <dd>{info?.eiin || '১২৮৫৪৩'}</dd>
                <dt>EMIS কোড:</dt>
                <dd>{info?.emis || '৬০৯১২'}</dd>
                <dt>অবস্থান:</dt>
                <dd>{info?.address || 'সোনাপুর, নোয়াখালী'}</dd>
              </dl>
            </Card>

            {/* Principal & Chairman Messages */}
            {principals.map((p) => (
              <Card key={p.id} className={styles.principalCard}>
                <div className={styles.principalMeta}>
                  <div className={styles.avatarWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.photoUrl || '/avatar-placeholder.png'}
                      alt={p.name}
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.principalMetaInfo}>
                    <h3 className={styles.principalName}>{p.name}</h3>
                    <span className={styles.principalRole}>{p.designation}</span>
                  </div>
                </div>
                <blockquote className={styles.blockquote}>
                  &ldquo;{p.messageBn || p.messageEn || 'আমাদের বিদ্যালয়ে আপনাকে স্বাগতম।'}&rdquo;
                </blockquote>
              </Card>
            ))}
          </aside>
        </section>
      </div>
    </div>
  );
}
