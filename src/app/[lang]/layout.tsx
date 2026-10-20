import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, Cairo, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';
import { getDictionary, Locale, locales } from '@/i18n';
import {
  isArabicLocale,
  getLocaleDirection,
  getHtmlLang,
  getCountryCode,
  getBaseLanguage,
} from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import { getNavbarResourcesCard } from '@/lib/payload/resources';
import { DictionaryProvider } from '@/components/providers/DictionaryProvider';
import FramerMotionProvider from '@/components/shared/FramerMotionProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-heading',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-mono',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-cairo',
});

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
  const rawLang = resolvedParams?.lang;
  if (!rawLang || !(locales as readonly string[]).includes(rawLang)) {
    return {};
  }
  const isAr = isArabicLocale(rawLang);
  const country = getCountryCode(rawLang);
  const dict = await getDictionary(rawLang);

  const titleText = dict.hero?.headline
    ? `${dict.hero.headline} | PontLook`
    : isAr
    ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات'
    : 'PontLook: Corporate Training Matchmaking Platform';

  const descText = dict.hero?.subtitle
    ? dict.hero.subtitle
    : isAr
    ? 'منصة ربط مديري الموارد البشرية والشركات بأفضل مزودي التدريب المعتمدين في السعودية والإمارات. فرص معتمدة 100% بدون رسوم شهرية.'
    : 'Connect corporate buyers with verified training providers across Saudi Arabia and UAE. Qualified leads only with zero monthly retainers or cold outreach.';

  const ogLocale = isAr
    ? country === 'ae'
      ? 'ar_AE'
      : 'ar_SA'
    : country === 'ae'
    ? 'en_AE'
    : country === 'sa'
    ? 'en_SA'
    : 'en_US';

  return {
    metadataBase: new URL('https://pontlook.com'),
    title: {
      default: titleText,
      template: '%s | PontLook',
    },
    description: descText,
    alternates: constructAlternates(rawLang, ''),

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
      url: `https://pontlook.com/${rawLang}`,
      siteName: 'PontLook',
      images: [
        {
          url: 'https://pontlook.com/images/brand/og-main.png',
          secureUrl: 'https://pontlook.com/images/brand/og-main.png',
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: isAr
            ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات'
            : 'PontLook Corporate Training Matchmaking Logo',
        },
        {
          url: 'https://pontlook.com/og-image.png',
          secureUrl: 'https://pontlook.com/og-image.png',
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: isAr
            ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات'
            : 'PontLook Corporate Training Matchmaking Logo',
        },
      ],
      locale: ogLocale,
      type: 'website',
    },
    manifest: '/site.webmanifest',
    twitter: {
      card: 'summary_large_image',
      title: isAr
        ? 'PontLook: منصة التوفيق بين شركات التدريب والشركات'
        : 'PontLook: Corporate Training Matchmaking Platform',
      description: isAr
        ? 'منصة ربط مديري الموارد البشرية والشركات بأفضل مزودي التدريب المعتمدين في السعودية والإمارات. فرص معتمدة 100% بدون رسوم شهرية.'
        : 'Connect corporate buyers with verified training providers across Saudi Arabia and UAE. Qualified leads only with zero monthly retainers or cold outreach.',
      images: ['https://pontlook.com/images/brand/og-main.png'],
    },
  };
}

export function generateStaticParams() {
  return (locales as readonly string[]).map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const rawLang = resolvedParams.lang;
  if (!rawLang || !(locales as readonly string[]).includes(rawLang)) {
    notFound();
  }
  const lang = rawLang as Locale;
  const [dictionary, resourcesCard] = await Promise.all([
    getDictionary(lang),
    getNavbarResourcesCard(lang),
  ]);
  const baseLang = getBaseLanguage(lang);
  const isAr = baseLang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const htmlLang = getHtmlLang(lang);

  const fontVariables = isAr
    ? `${cairo.variable} ${jetbrainsMono.variable}`
    : `${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`;

  const htmlStyle = isAr
    ? ({
        '--font-sans': 'var(--font-cairo)',
        '--font-heading': 'var(--font-cairo)',
        '--font-arabic': 'var(--font-cairo)',
      } as React.CSSProperties)
    : undefined;

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
        "image": "https://pontlook.com/images/brand/og-main.png",
        "inLanguage": ["en", "ar", "en-SA", "ar-SA", "en-AE", "ar-AE"]
      },
      {
        "@type": "Organization",
        "@id": "https://pontlook.com/#organization",
        "name": "PontLook",
        "legalName": "Firstnestcare, LLC",
        "url": "https://pontlook.com",
        "image": "https://pontlook.com/images/brand/og-main.png",
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
          { "@type": "SiteNavigationElement", "position": 5, "name": dictionary.nav.resources, "url": `https://pontlook.com/${lang}/resources` }
        ]
      }
    ]
  };

  return (
    <html lang={htmlLang} dir={dir} className={fontVariables} style={htmlStyle}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph),
          }}
        />
      </head>
      <body className="bg-black text-neutral-300 font-sans antialiased selection:bg-[#FF5500]/20 selection:text-[#FF5500]">
        <DictionaryProvider dictionary={dictionary}>
          <FramerMotionProvider>
            <Navbar lang={lang} resourcesCard={resourcesCard} />
            <main className="min-h-screen">{children}</main>
            <Footer lang={lang} />
          </FramerMotionProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
