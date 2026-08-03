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
  weight: ['400', '600', '700'],
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const isAr = resolvedParams?.lang === 'ar';

  return {
    metadataBase: new URL('https://pontlook.com'),
    title: {
      default: isAr
        ? 'PontLook: منصة الربط بين شركات التدريب والشركات في الخليج'
        : 'PontLook: GCC Corporate Training Matchmaking Platform',
      template: '%s | PontLook',
    },
    description: isAr
      ? 'ربط مديري HR والرؤساء التنفيذيين بشركات التدريب المعتمدة في السعودية والإمارات. فرص معتمدة بنسبة 100٪ بدون رسوم شهرية.'
      : 'Connect corporate buyers with verified training providers across Saudi Arabia and the UAE. Qualified opportunities only, zero retainers or cold outreach.',
    alternates: {
      canonical: `https://pontlook.com/${isAr ? 'ar' : 'en'}`,
      languages: {
        'en': 'https://pontlook.com/en',
        'ar': 'https://pontlook.com/ar',
      },
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
    openGraph: {
      title: isAr
        ? 'PontLook: منصة الربط بين شركات التدريب والشركات في الخليج'
        : 'PontLook: GCC Corporate Training Matchmaking Platform',
      description: isAr
        ? 'ربط مديري HR والرؤساء التنفيذيين بشركات التدريب المعتمدة في السعودية والإمارات. فرص معتمدة بنسبة 100٪ بدون رسوم شهرية.'
        : 'Connect corporate buyers with verified training providers across Saudi Arabia and the UAE.',
      url: `https://pontlook.com/${isAr ? 'ar' : 'en'}`,
      siteName: 'PontLook',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: isAr
            ? 'PontLook: منصة الربط بين شركات التدريب والشركات في الخليج'
            : 'PontLook GCC Corporate Training Matchmaking',
        },
      ],
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    manifest: '/site.webmanifest',
    twitter: { card: 'summary_large_image' },
  };
}

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

  const siteNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': [
      { '@type': 'SiteNavigationElement', 'position': 1, 'name': 'Who We Are', 'url': 'https://pontlook.com/en/who-we-are' },
      { '@type': 'SiteNavigationElement', 'position': 2, 'name': 'For Training Providers', 'url': 'https://pontlook.com/en/for-providers' },
      { '@type': 'SiteNavigationElement', 'position': 3, 'name': 'Find Training', 'url': 'https://pontlook.com/en/find-training' },
      { '@type': 'SiteNavigationElement', 'position': 4, 'name': 'Contact', 'url': 'https://pontlook.com/en/contact' },
      { '@type': 'SiteNavigationElement', 'position': 5, 'name': 'Blog', 'url': 'https://blog.pontlook.com' }
    ]
  };

  return (
    <html lang={lang} dir={dir} className={fontClass}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
      </head>
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
