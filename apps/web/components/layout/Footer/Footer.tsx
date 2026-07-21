import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Col 1: About school */}
        <div className={styles.section}>
          <div className={styles.brand}>
            <svg className={styles.brandIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              <path d="M22 10h-2v1.5h2V10zm-4-4.5L12 2 6 5.5v13L12 22l6-3.5v-13zM12 20l-4-2.33v-11.3L12 4.1l4 2.27v11.3L12 20z" />
            </svg>
            <h3 className={styles.heading}>নতুন কুঁড়ি হাই স্কুল</h3>
          </div>
          <p className={styles.text}>
            নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ক্যাম্পাস। প্রতিটি শিক্ষার্থীর সুপ্ত প্রতিভা বিকাশ এবং একটি উন্নত ও মানবিক মূল্যবোধসম্পন্ন ভবিষ্যৎ প্রজন্ম গড়ে তুলতে আমরা প্রতিশ্রুতিবদ্ধ।
          </p>
          <div className={styles.stats}>
            <span>EIIN: ১২৮৫৪৩</span>
            <span className={styles.divider}>|</span>
            <span>কোড: ৬০৯১</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className={styles.section}>
          <h4 className={styles.subheading}>প্রয়োজনীয় লিঙ্ক</h4>
          <nav aria-label="Footer navigation">
            <ul className={styles.list} role="list">
              {[
                { href: '/', label: 'হোম' },
                { href: '/about', label: 'পরিচিতি ও লক্ষ্য' },
                { href: '/notices', label: 'নোটিশ বোর্ড' },
                { href: '/teachers', label: 'শিক্ষক মণ্ডলী' },
                { href: '/results', label: 'ফলাফল অনুসন্ধান' },
                { href: '/gallery', label: 'ফটো গ্যালারি' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.link}>
                    <span className={styles.arrow} aria-hidden="true">&#8594;</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Col 3: Contact */}
        <div className={styles.section}>
          <h4 className={styles.subheading}>যোগাযোগ করুন</h4>
          <address className={styles.address}>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>সোনাপুর, নোয়াখালী-৩৮১৪</span>
            </div>
            
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+৮৮০১৭১২৩৪৫৬৭৮" className={styles.link}>+৮৮০ ১৭১২-৩৪৫৬৭৮</a>
            </div>

            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@school.edu.bd" className={styles.link}>info@school.edu.bd</a>
            </div>
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copyright}>
            &copy; {year} নতুন কুঁড়ি হাই স্কুল। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
