import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://notunkuri.jantrasoft.online';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'নতুন কুঁড়ি হাই স্কুল | Notun Kuri High School',
    template: '%s | নতুন কুঁড়ি হাই স্কুল',
  },
  description:
    'নতুন কুঁড়ি হাই স্কুল (Notun Kuri High School) — অফিসিয়াল ডিজিটাল পোর্টাল। ডিজিটাল নোটিশ বোর্ড, পরীক্ষার ফলাফল অনুসন্ধান, শিক্ষক ডিরেক্টরি ও ভর্তি তথ্য।',
  keywords: [
    'নতুন কুঁড়ি হাই স্কুল',
    'Notun Kuri High School',
    'High School Noakhali',
    'School Result Portal',
    'School Notice Board',
    'স্কুল ভর্তি ২০২৬',
  ],
  authors: [{ name: 'Notun Kuri High School Authority' }],
  creator: 'Notun Kuri High School',
  publisher: 'Notun Kuri High School',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'নতুন কুঁড়ি হাই স্কুল | Notun Kuri High School',
    description:
      'নতুন কুঁড়ি হাই স্কুল (Notun Kuri High School) — অফিসিয়াল ডিজিটাল পোর্টাল। নোটিশ বোর্ড, ফলাফল অনুসন্ধান, শিক্ষক ডিরেক্টরি ও শিক্ষা কার্যক্রম।',
    url: siteUrl,
    siteName: 'Notun Kuri High School',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/hero-banner.png`,
        width: 1200,
        height: 630,
        alt: 'Notun Kuri High School Campus & Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'নতুন কুঁড়ি হাই স্কুল | Notun Kuri High School',
    description:
      'নতুন কুঁড়ি হাই স্কুল (Notun Kuri High School) — অফিসিয়াল ডিজিটাল পোর্টাল। নোটিশ বোর্ড, ফলাফল অনুসন্ধান ও শিক্ষা কার্যক্রম।',
    images: [`${siteUrl}/hero-banner.png`],
  },
  other: {
    'whatsapp:card': 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
