import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/i18n';
import { Locale, i18n } from '@/i18n/config';
import LeadTiers from '@/components/providers/LeadTiers';
import ProviderBenefitsCards from '@/components/providers/ProviderBenefitsCards';
import ProviderConnectionFlow from '@/components/providers/ProviderConnectionFlow';
import Reveal from '@/components/shared/Reveal';
import NeuralGridBackground from '@/components/shared/NeuralGridBackground';
import Magnetic from '@/components/shared/Magnetic';
import { ArrowRight } from '@/components/icons';
import { constructAlternates, providerIcons } from '@/lib/seo/metadata';
import { buildProviderNetworkSchema } from '@/lib/seo/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'فرص وعملاء تدريب معتمدين للشركات | PontLook'
    : 'Corporate Training Leads & Matchmaking | PontLook';
  const description = isAr
    ? 'احصل على فرص تعاقد وتدريب معتمدة مع كبرى الشركات في السعودية والإمارات. بدون اشتراكات شهرية أو رسوم احتجاز، ادفع فقط مقابل كل عميل مهتم ومؤهل.'
    : 'Acquire vetted enterprise corporate training leads in Saudi Arabia and the UAE. No retainers or monthly fees — pay strictly per qualified decision maker.';

  return {
    title: {
      absolute: title,
    },
    description,
    icons: providerIcons,
    alternates: constructAlternates(lang, 'for-providers'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/for-providers`,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/brand/og-providers.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/brand/og-providers.png'],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function ForProvidersPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';
  let dict: any = {};

  try {
    dict = await getDictionary(lang);
  } catch (err) {
    console.error('Error loading dictionary:', err);
  }

  const providerSchema = buildProviderNetworkSchema({
    lang,
    canonicalUrl: `https://pontlook.com/${lang}/for-providers`,
  });

  return (
    <>
      {/* Search Engine & Rich Snippets Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(providerSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-black pt-24 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 px-3.5 xs:px-4 sm:px-6 lg:px-8">
        {/* Ambient Depth Glows */}
        <div className="pointer-events-none absolute top-1/4 start-0 w-[550px] h-[450px] bg-orange-500/[0.05] blur-[160px] -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-1/3 end-0 w-[500px] h-[500px] bg-orange-500/[0.02] blur-[160px] -z-10 rounded-full" />
        <NeuralGridBackground className="z-0 opacity-40" gridSize={36} interactiveRadius={160} activeColor="rgba(255, 92, 0, 0.6)" />

        <div className="container-site max-w-6xl mx-auto relative z-10 w-full">
          {/* Left-Aligned Header Block */}
          <div className="max-w-3xl text-start">
            <Reveal>
              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-semibold text-white leading-[1.12] sm:leading-[1.05] font-heading tracking-tight text-start">
                {isAr ? (
                  <>
                    فرص تدريبية للشركات{' '}
                    <span className="text-[#FF5C00]">حسب الطلب.</span>
                  </>
                ) : (
                  <>
                    Enterprise Training Leads{' '}
                    <span className="text-[#FF5C00]">On Demand.</span>
                  </>
                )}
              </h1>

              <p className="mt-3.5 sm:mt-5 text-sm xs:text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal font-sans text-start">
                {isAr
                  ? 'تواصل مباشرة مع صناع القرار في كبرى المنشآت والشركات التي تبحث بنشاط عن حلول تدريبية. بدون رسوم شهرية ثابتة، الدفع فقط لكل فرصة مؤكدة ومؤهلة.'
                  : 'Connect directly with verified corporate decision makers actively seeking training solutions. Zero retainers, 100% pay per lead.'}
              </p>

              {/* Hero Action Buttons */}
              <div className="mt-6 xs:mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 w-full sm:w-auto">
                <Magnetic strength={0.22} activeDistance={35} className="w-full sm:w-auto">
                  <Link
                    href={`/${lang}/for-providers/apply`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 xs:py-3.5 px-6 sm:px-8 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-semibold text-xs xs:text-sm sm:text-base shadow-lg shadow-orange-500/25 active:scale-95 transition-all duration-200 font-sans focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:outline-none min-h-[48px]"
                  >
                    <span>{isAr ? 'انضم كشريك تدريب' : 'Become a Partner'}</span>
                    <ArrowRight size={16} className="rtl:-scale-x-100" />
                  </Link>
                </Magnetic>

                <Magnetic strength={0.22} activeDistance={35} className="w-full sm:w-auto">
                  <a
                    href="#connection-bridge"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 sm:px-7 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm sm:text-base shadow-sm active:scale-95 transition-all duration-200 font-sans focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none min-h-[48px]"
                  >
                    <span>{isAr ? 'اعرف المزيد' : 'Learn more'}</span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. WHY PARTNER / DIRECT VALUE PROPOSITION */}
      <section id="why-partner" className="bg-black py-16 sm:py-24 scroll-mt-16">
        <div className="container-site max-w-6xl mx-auto px-4 sm:px-6">
          <ProviderBenefitsCards lang={lang} />
        </div>
      </section>

      {/* 3. WHAT HE WOULD EXPECT / OPPORTUNITY TIERS */}
      <div id="tiers" className="scroll-mt-24 border-t border-[#202227]">
        <LeadTiers mode="providers" dict={dict} lang={lang} />
      </div>

      {/* 4. THE CONNECTION BRIDGE & ACTION ENGINE */}
      <ProviderConnectionFlow lang={lang} />
    </>
  );
}
