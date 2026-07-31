import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Poppins, Calistoga, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';
import { getDictionary, Locale } from '@/i18n';
import { DictionaryProvider } from '@/components/providers/DictionaryProvider';
import FramerMotionProvider from '@/components/shared/FramerMotionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});
const calistoga = Calistoga({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-calistoga',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pontlook.com'),
  alternates: {
    canonical: 'https://pontlook.com/en',
    languages: {
      'en': 'https://pontlook.com/en',
      'ar': 'https://pontlook.com/ar',
    },
  },
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/PontlookIcon.png', type: 'image/png', sizes: '192x192' },
      { url: '/PontlookIcon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/PontlookIcon.png',
  },
  manifest: '/site.webmanifest',
  twitter: { card: 'summary_large_image' },
};

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const rawLang = resolvedParams.lang || 'en';
  const lang = (rawLang as Locale) || 'en';
  const dictionary = await getDictionary(lang);
  const dir = rawLang === 'ar' ? 'rtl' : 'ltr';

  const fontClass = `${inter.variable} ${jakarta.variable} ${poppins.variable} ${calistoga.variable} ${jetbrainsMono.variable}`;

  return (
    <html lang={lang} dir={dir} className={fontClass}>
      <body>
        <DictionaryProvider dictionary={dictionary}>
          <FramerMotionProvider>
            <Navbar lang={lang} />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </FramerMotionProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
