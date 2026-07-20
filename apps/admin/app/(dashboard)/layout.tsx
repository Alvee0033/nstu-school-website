import React from 'react';
import Link from 'next/link';
import { logoutAction } from '../actions';
import styles from './layout.module.css';
import {
  DashboardIcon,
  NoticeIcon,
  AcademicsIcon,
  TeacherIcon,
  StudentIcon,
  StaffIcon,
  ResultIcon,
  GalleryIcon,
  ProfileIcon,
  LogoutIcon
} from '@/components/icons';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandTitle}>Admin Console</div>
          <div className={styles.brandSubtitle}>NSTU Model School</div>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navItem}>
            <DashboardIcon size={18} /> Dashboard
          </Link>
          <Link href="/notices" className={styles.navItem}>
            <NoticeIcon size={18} /> Notices
          </Link>
          <Link href="/academics" className={styles.navItem}>
            <AcademicsIcon size={18} /> Academics
          </Link>
          <Link href="/teachers" className={styles.navItem}>
            <TeacherIcon size={18} /> Teachers
          </Link>
          <Link href="/students" className={styles.navItem}>
            <StudentIcon size={18} /> Students
          </Link>
          <Link href="/staff" className={styles.navItem}>
            <StaffIcon size={18} /> Staff Directory
          </Link>
          <Link href="/results" className={styles.navItem}>
            <ResultIcon size={18} /> Exams & Results
          </Link>
          <Link href="/gallery" className={styles.navItem}>
            <GalleryIcon size={18} /> Gallery Albums
          </Link>
          <Link href="/school-info" className={styles.navItem}>
            <ProfileIcon size={18} /> School Profile
          </Link>
        </nav>
      </aside>

      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <div className={styles.headerBrand}>
            <span className={styles.headerBrandMobile}>NSTU Model School Admin</span>
            <span className={styles.headerBrandDesktop}>Management Portal</span>
          </div>
          <div className={styles.headerActions}>
            <form action={logoutAction}>
              <button type="submit" className={styles.headerLogoutBtn}>
                <LogoutIcon size={14} />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </header>

        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
