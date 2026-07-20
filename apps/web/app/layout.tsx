import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'),
  title: { default: 'NSTU Model School', template: '%s | NSTU Model School' },
  description: 'Official website of NSTU Model School — notices, results, teachers, and more.',
  openGraph: {
    siteName: 'NSTU Model School',
    type: 'website',
    locale: 'bn_BD',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
