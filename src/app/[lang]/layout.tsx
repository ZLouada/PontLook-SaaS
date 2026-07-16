import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Cairo } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';
import { getDictionary, Locale } from '@/i18n';
import { DictionaryProvider } from '@/components/providers/DictionaryProvider';
import FramerMotionProvider from '@/components/shared/FramerMotionProvider';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pontlook.com'),
  title: {
    default: 'PontLook',
    template: '%s | PontLook',
  },
  description:
    'PontLook bridges the gap between training providers, businesses, and professionals making it easier to discover, compare, and access the best learning opportunities.',
  keywords: [
    'corporate training GCC',
    'B2B training Saudi Arabia',
    'L&D opportunities Riyadh',
    'training providers Dubai',
    'employee upskilling Gulf',
    'qualified training leads',
    'corporate training matchmaker',
    'PontLook'
  ],
  openGraph: {
    type: 'website',
    siteName: 'PontLook',
    title: 'PontLook',
    description:
      'PontLook bridges the gap between training providers, businesses, and professionals making it easier to discover, compare, and access the best learning opportunities.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PontLook' }],
  },
  twitter: { card: 'summary_large_image' },
};

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  const isRtl = params.lang === 'ar';
  
  // Reuse --font-heading variable so it seamlessly applies to all font-heading classes
  const fontClass = isRtl 
    ? `${inter.variable} ${cairo.variable}` 
    : `${inter.variable} ${jakarta.variable}`;

  return (
    <html lang={params.lang} dir={isRtl ? 'rtl' : 'ltr'} className={fontClass}>
      <body>
        <DictionaryProvider dictionary={dictionary}>
          <FramerMotionProvider>
            <Navbar lang={params.lang} />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </FramerMotionProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
