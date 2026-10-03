import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';
import { getDictionary, Locale } from '@/i18n';
import { DictionaryProvider } from '@/components/providers/DictionaryProvider';
import FramerMotionProvider from '@/components/shared/FramerMotionProvider';
import GlobalSpotlight from '@/components/shared/GlobalSpotlight';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
  viewportFit: 'cover',
};

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
        ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات'
        : 'PontLook: Corporate Training Matchmaking Platform',
      template: '%s | PontLook',
    },
    description: isAr
      ? 'منصة ربط مديري الموارد البشرية والشركات بأفضل مزودي التدريب المعتمدين في السعودية والإمارات. فرص معتمدة 100% بدون رسوم شهرية.'
      : 'Connect corporate buyers with verified training providers across Saudi Arabia and UAE. Qualified leads only with zero monthly retainers or cold outreach.',

    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      title: isAr
        ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات'
        : 'PontLook: Corporate Training Matchmaking Platform',
      description: isAr
        ? 'منصة ربط مديري الموارد البشرية والشركات بأفضل مزودي التدريب المعتمدين في السعودية والإمارات. فرص معتمدة 100% بدون رسوم شهرية.'
        : 'Connect corporate buyers with verified training providers across Saudi Arabia and UAE. Qualified leads only with zero monthly retainers or cold outreach.',
      url: `https://pontlook.com/${isAr ? 'ar' : 'en'}`,
      siteName: 'PontLook',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: isAr
            ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات'
            : 'PontLook Corporate Training Matchmaking Logo',
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
  return [{ lang: 'en' }, { lang: 'ar' }];
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

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://pontlook.com/#website",
        "url": "https://pontlook.com",
        "name": "PontLook",
        "alternateName": ["Pont Look", "pontlook", "PontLook SaaS"],
        "description": "B2B Corporate Training Matchmaking Platform & Pay-Per-Lead Engine",
        "inLanguage": ["en", "ar"]
      },
      {
        "@type": "Organization",
        "@id": "https://pontlook.com/#organization",
        "name": "PontLook",
        "legalName": "Firstnestcare, LLC",
        "url": "https://pontlook.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pontlook.com/images/brand/pontlook-logo-orange.png",
          "width": 400,
          "height": 100
        },
        "description": "B2B Corporate Training Matchmaking Platform connecting enterprise buyers with verified training providers across Saudi Arabia and the UAE.",
        "email": "contact@pontlook.com",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "contact@pontlook.com",
          "availableLanguage": ["English", "Arabic"]
        },
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
          { "@type": "SiteNavigationElement", "position": 1, "name": dictionary.nav.who_we_are, "url": `https://pontlook.com/${lang}/who-we-are` },
          { "@type": "SiteNavigationElement", "position": 2, "name": dictionary.nav.find_training, "url": `https://pontlook.com/${lang}/find-training` },
          { "@type": "SiteNavigationElement", "position": 3, "name": dictionary.nav.for_providers, "url": `https://pontlook.com/${lang}/for-providers` },
          { "@type": "SiteNavigationElement", "position": 4, "name": dictionary.nav.contact, "url": `https://pontlook.com/${lang}/contact` },
          { "@type": "SiteNavigationElement", "position": 5, "name": dictionary.nav.blog, "url": "https://blog.pontlook.com" }
        ]
      }
    ]
  };

  return (
    <html lang={lang} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph),
          }}
        />
      </head>
      <body className={`bg-black text-neutral-300 antialiased selection:bg-white/20 selection:text-white ${lang === 'ar' ? 'font-arabic' : ''}`}>
        <DictionaryProvider dictionary={dictionary}>
          <FramerMotionProvider>
            <GlobalSpotlight />
            <Navbar lang={lang} />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </FramerMotionProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
