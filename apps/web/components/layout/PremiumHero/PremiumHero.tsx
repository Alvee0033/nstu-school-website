'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './PremiumHero.module.css';

const SLIDES = [
  {
    img: '/hero-banner.png',
    tag: 'ভর্তি চলছে ২০২৬',
    titleWords: [
      { text: 'নতুন', highlight: false },
      { text: 'কুঁড়ি', highlight: true },
      { text: 'হাই স্কুল', highlight: false },
    ],
    sub: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় ক্যাম্পাস। শিক্ষার্থীদের সুপ্ত প্রতিভা বিকাশ ও একটি উন্নত ভবিষ্যৎ প্রজন্ম গঠনে প্রতিশ্রুতিবদ্ধ।',
  },
  {
    img: '/gallery_classroom.png',
    tag: 'স্মার্ট ক্যাম্পাস',
    titleWords: [
      { text: 'আধুনিক', highlight: false },
      { text: 'শ্রেণীকক্ষ', highlight: true },
      { text: 'ও পরিবেশ', highlight: false },
    ],
    sub: 'আধুনিক প্রযুক্তিসম্পন্ন মাল্টিমিডিয়া শ্রেণীকক্ষ ও অভিজ্ঞ শিক্ষক মণ্ডলীর তত্ত্বাবধানে মানসম্মত শিক্ষাদান নিশ্চিতকরণ।',
  },
  {
    img: '/gallery_lab.png',
    tag: 'আইসিটি ও বিজ্ঞান',
    titleWords: [
      { text: 'বিজ্ঞান', highlight: false },
      { text: 'ও কম্পিউটার', highlight: true },
      { text: 'ল্যাব', highlight: false },
    ],
    sub: 'হাতে-কলমে বিজ্ঞানচর্চা ও কম্পিউটার শিক্ষার জন্য প্রয়োজনীয় সকল যন্ত্রপাতি সমৃদ্ধ আধুনিক ল্যাবরেটরি সুবিধা।',
  },
  {
    img: '/gallery_sports.png',
    tag: 'সহশিক্ষা কার্যক্রম',
    titleWords: [
      { text: 'ক্রীড়া', highlight: true },
      { text: 'ও সাংস্কৃতিক', highlight: false },
      { text: 'উৎসব', highlight: true },
    ],
    sub: 'নিয়মিত খেলাধুলা, বিতর্ক প্রতিযোগিতা ও সাংস্কৃতিক অনুষ্ঠানের মাধ্যমে শিক্ষার্থীদের মানসিক ও শারীরিক বিকাশ সাধন।',
  },
];

export function PremiumHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Background Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slideContainer} ${index === active ? styles.slideActive : ''}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.img} className={styles.bgImage} alt="Banner background" />
          <div className={styles.darkOverlay} />
          <div className={styles.gradientOverlay} />
        </div>
      ))}

      {/* Hero Content Grid */}
      <div className={styles.contentContainer}>
        <div className={styles.heroContentInner}>
          {/* Tagline Badge */}
          <div className={styles.badgeRow}>
            <span className={styles.pulseDot} />
            <span className={styles.badgeText}>{SLIDES[active].tag}</span>
          </div>

          {/* Heading */}
          <h1 className={styles.title}>
            {SLIDES[active].titleWords.map((word, wIdx) => (
              <span
                key={wIdx}
                className={word.highlight ? styles.highlightWord : styles.normalWord}
              >
                {word.text}{' '}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className={styles.sub}>{SLIDES[active].sub}</p>

          {/* CTAs */}
          <div className={styles.ctaRow}>
            <Link href="/results" className={styles.btnPrimary}>
              ফলাফল অনুসন্ধান
              <svg className={styles.btnIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/notices" className={styles.btnSecondary}>
              <svg className={styles.playIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              নোটিশ বোর্ড
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar overlay containing indicators & quick info */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarInner}>
          {/* Progress Indicators */}
          <div className={styles.indicators}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`${styles.indicatorItem} ${i === active ? styles.indicatorItemActive : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={styles.indicatorNum}>0{i + 1}</span>
                <span className={styles.indicatorLine} />
              </button>
            ))}
          </div>

          {/* Stats / Info tags */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>১২৮৫৪৩</span>
              <span className={styles.statLabel}>EIIN নম্বর</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>৬০৯১</span>
              <span className={styles.statLabel}>স্কুল কোড</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>২০২৬</span>
              <span className={styles.statLabel}>ভর্তি বছর</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
