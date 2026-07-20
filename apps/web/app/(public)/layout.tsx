import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import styles from './layout.module.css';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
