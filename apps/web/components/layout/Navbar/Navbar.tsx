'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/',           label: 'হোম' },
  { href: '/about',      label: 'পরিচিতি' },
  { href: '/notices',    label: 'নোটিশ বোর্ড' },
  { href: '/teachers',   label: 'শিক্ষকবৃন্দ' },
  { href: '/students',   label: 'শিক্ষার্থী' },
  { href: '/results',    label: 'ফলাফল' },
  { href: '/gallery',    label: 'গ্যালারি' },
  { href: '/contact',    label: 'যোগাযোগ' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>Skip to content</a>

      {/* Top Bar for EIIN, Helpline, etc. */}
      <div className={`${styles.topBar} ${scrolled ? styles.topBarHidden : ''}`}>
        <div className={`container ${styles.topInner}`}>
          <div className={styles.topInfo}>
            <span className={styles.infoItem}>
              <svg className={styles.infoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              EIIN: ১২৮৫৪৩
            </span>
            <span className={styles.divider}>|</span>
            <span className={styles.infoItem}>
              <svg className={styles.infoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              কোড: ৬০৯১
            </span>
            <span className={styles.divider}>|</span>
            <span className={styles.infoItem}>
              <svg className={styles.infoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              হেল্পলাইন: +৮৮০১৭১২-৩৪৫৬৭৮
            </span>
          </div>
          <div className={styles.topActions}>
            <a href="https://nstu.edu.bd" target="_blank" rel="noopener noreferrer" className={styles.topLink}>
              নোবিপ্রবি ওয়েবসাইট
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`} aria-label="Main navigation">
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo} aria-label="Notun Kuri High School home">
            <div className={styles.logoMark}>
              <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {/* Outer Shield */}
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                {/* Book symbol inside shield */}
                <path d="M12 11h3.5a1.5 1.5 0 0 1 1.5 1.5v3.5a1.5 1.5 0 0 1-1.5 1.5H12" />
                <path d="M12 11H8.5A1.5 1.5 0 0 0 7 12.5v3.5A1.5 1.5 0 0 0 8.5 19H12" />
                <path d="M12 11v8" />
                {/* Tiny academic star */}
                <path d="M12 5l1 2h2.5l-2 1.5.5 2.5-2-1.5-2 1.5.5-2.5-2-1.5H11l1-2z" fill="var(--color-warning)" stroke="none" />
              </svg>
            </div>
            <div className={styles.logoInfo}>
              <span className={styles.logoTitle}>নতুন কুঁড়ি হাই স্কুল</span>
              <span className={styles.logoSubTitle}>Notun Kuri High School</span>
            </div>
          </Link>

          <ul className={styles.navLinks} role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={styles.navLink}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className={`${styles.hamburger} ${open ? styles.hamburgerActive : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div id="mobile-menu" className={styles.drawer} data-open={open} aria-hidden={!open}>
        <ul role="list" className={styles.drawerLinks}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={styles.drawerLink}
                aria-current={pathname === href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Drawer footer info (EIIN, Code, Hotline) */}
        <div className={styles.drawerFooter}>
          <div className={styles.drawerInfoRow}>
            <span>EIIN: ১২৮৫৪৩</span>
            <span>কোড: ৬০৯১</span>
          </div>
          <a href="tel:+8801712345678" className={styles.drawerPhone}>
            হেল্পলাইন: +৮৮০১৭১২-৩৪৫৬৭৮
          </a>
          <a
            href="https://nstu.edu.bd"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.drawerNstuLink}
          >
            নোবিপ্রবি ওয়েবসাইট
          </a>
        </div>
      </div>

      {open && (
        <div className={styles.overlay} aria-hidden onClick={() => setOpen(false)} />
      )}
    </>
  );
}
