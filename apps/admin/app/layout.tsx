import './globals.css';

export const metadata = {
  title: 'Notun Kuri High School - Admin Console',
  description: 'Manage school website content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
