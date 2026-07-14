import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pontlook.com'),
  title: {
    default: 'Pontlook — Qualified Corporate Training Opportunities in GCC',
    template: '%s | Pontlook',
  },
  description:
    'We connect corporate training providers with GCC organizations experiencing verified workforce challenges. Get qualified B2B L&D opportunities in Saudi Arabia, UAE, and the wider Gulf region.',
  keywords: [
    'corporate training GCC',
    'B2B training Saudi Arabia',
    'L&D opportunities Riyadh',
    'training providers Dubai',
    'employee upskilling Gulf',
    'qualified training leads',
    'corporate training matchmaker',
    'Pontlook'
  ],
  openGraph: {
    type: 'website',
    siteName: 'Pontlook',
    title: 'Pontlook — Qualified B2B Corporate Training Opportunities',
    description:
      'Intelligence-driven matchmaking between corporate training providers and GCC companies with verified workforce challenges. No retainers — pay per qualified lead.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Pontlook' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
