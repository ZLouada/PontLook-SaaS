import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';
import { getDictionary, Locale } from '@/i18n';
import { DictionaryProvider } from '@/components/providers/DictionaryProvider';
import FramerMotionProvider from '@/components/shared/FramerMotionProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0052FF',
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
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
        ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات في الخليج'
        : 'PontLook: GCC Corporate Training Matchmaking Platform',
      template: '%s | PontLook',
    },
    description: isAr
      ? 'منصة ربط مديري الموارد البشرية والشركات بأفضل مزودي التدريب المعتمدين في السعودية والإمارات. فرص معتمدة 100% بدون رسوم شهرية.'
      : 'Connect corporate buyers with verified training providers across Saudi Arabia and UAE. Qualified leads only—zero monthly retainers or cold outreach.',
    alternates: {
      canonical: isAr ? 'https://pontlook.com/ar' : 'https://pontlook.com/en',
      languages: {
        'en': 'https://pontlook.com/en',
        'en-SA': 'https://pontlook.com/en',
        'en-AE': 'https://pontlook.com/en',
        'ar': 'https://pontlook.com/ar',
        'ar-SA': 'https://pontlook.com/ar',
        'ar-AE': 'https://pontlook.com/ar',
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
        ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات في الخليج'
        : 'PontLook: GCC Corporate Training Matchmaking Platform',
      description: isAr
        ? 'منصة ربط مديري الموارد البشرية والشركات بأفضل مزودي التدريب المعتمدين في السعودية والإمارات. فرص معتمدة 100% بدون رسوم شهرية.'
        : 'Connect corporate buyers with verified training providers across Saudi Arabia and UAE. Qualified leads only—zero monthly retainers or cold outreach.',
      url: `https://pontlook.com/${isAr ? 'ar' : 'en'}`,
      siteName: 'PontLook',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: isAr
            ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات في الخليج'
            : 'PontLook GCC Corporate Training Matchmaking Logo',
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

  const fontClass = `${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable}`;

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://pontlook.com/#website",
        "url": "https://pontlook.com",
        "name": "PontLook",
        "alternateName": ["Pont Look", "pontlook", "PontLook SaaS"],
        "description": "GCC Corporate Training Matchmaking Platform & Pay-Per-Lead Engine",
        "inLanguage": ["en", "ar"]
      },
      {
        "@type": "Organization",
        "@id": "https://pontlook.com/#organization",
        "name": "PontLook",
        "url": "https://pontlook.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pontlook.com/PontlookIcon.png",
          "width": 512,
          "height": 512
        },
        "email": "contact@pontlook.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "31 Continental Dr",
          "addressLocality": "Newark",
          "addressRegion": "Delaware",
          "postalCode": "19713",
          "addressCountry": "US"
        },
        "areaServed": ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Oman"],
        "sameAs": [
          "https://www.linkedin.com/company/pontlook",
          "https://x.com/pontlook"
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://pontlook.com/#navigation",
        "name": "Main Navigation",
        "itemListElement": [
          { "@type": "SiteNavigationElement", "position": 1, "name": "Who We Are", "url": "https://pontlook.com/en/who-we-are" },
          { "@type": "SiteNavigationElement", "position": 2, "name": "Find Training", "url": "https://pontlook.com/en/find-training" },
          { "@type": "SiteNavigationElement", "position": 3, "name": "For Training Providers", "url": "https://pontlook.com/en/for-providers" },
          { "@type": "SiteNavigationElement", "position": 4, "name": "Contact", "url": "https://pontlook.com/en/contact" },
          { "@type": "SiteNavigationElement", "position": 5, "name": "Blog", "url": "https://blog.pontlook.com" }
        ]
      }
    ]
  };

  return (
    <html lang={lang} dir={dir} className={fontClass}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph),
          }}
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
