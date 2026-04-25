import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Discover Tomorrow',
  description: 'A standalone Next.js proposal deployed at /proposals/discover-tomorrow.',
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
