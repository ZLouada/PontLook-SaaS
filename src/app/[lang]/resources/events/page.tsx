import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { getResourcesStore } from '@/lib/resources-store';
import { Calendar, MapPin, Clock, ArrowRight, ArrowUpRight } from '@/components/icons';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'الفعاليات والموائد المستديرة | منصة PontLook'
    : 'Executive Roundtables & Training Events | PontLook';
  const description = isAr
    ? 'فعاليات حصرية، ندوات رقمية، وموائد مستديرة تجمع مسؤولي التدريب في كبرى شركات السعودية والإمارات بنخبة المزودين المعتمدين.'
    : 'Curated executive roundtables, virtual briefings, and corporate training matchmaking summits across Riyadh and Dubai.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'resources/events'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/resources/events`,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://pontlook.com/images/brand/og-main.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const store = getResourcesStore();
  const dynamicEvents = Array.isArray(store.events)
    ? store.events.map((evt) => ({
        id: evt.id,
        title: (isAr ? evt.titleAr : evt.titleEn) || evt.titleEn || evt.titleAr,
        date: (isAr ? evt.dateAr : evt.dateEn) || evt.dateEn || evt.dateAr,
        time: evt.time,
        location: (isAr ? evt.locationAr : evt.locationEn) || evt.locationEn || evt.locationAr,
        type: (isAr ? evt.typeAr : evt.typeEn) || evt.typeEn || evt.typeAr,
        desc: (isAr ? evt.descAr : evt.descEn) || evt.descEn || evt.descAr,
        spotsLeft: (isAr ? evt.spotsLeftAr : evt.spotsLeftEn) || evt.spotsLeftEn || evt.spotsLeftAr,
      }))
    : [];

  return (
    <div
      data-nav-light="true"
      data-nav-theme="light"
      className="min-h-screen bg-white text-neutral-900 transition-colors duration-200"
    >
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-100/80 text-xs font-mono uppercase tracking-wider text-neutral-700 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C00]" />
              <Link href={`/${lang}/resources`} className="hover:text-black transition-colors">
                {isAr ? 'الموارد' : 'Resources'}
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-950 font-semibold">{isAr ? 'الفعاليات' : 'Events'}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-neutral-950 tracking-tight leading-tight mb-4">
              {isAr ? 'فعاليات وموائد مستديرة تجمع صُنّاع القرار' : 'Executive Events, Summits & Briefings'}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {isAr
                ? 'لقاءات حضورية وافتراضية هادفة تركز على تبادل التجارب الحقيقية والربط المباشر بين قادة التدريب في منشآت الخليج والخبراء المعتمدين.'
                : 'Curated peer discussions and direct matchmaking sessions designed to connect corporate training buyers with verified specialists.'}
            </p>
          </Reveal>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {dynamicEvents.length > 0 ? (
            dynamicEvents.map((evt, idx) => (
              <Reveal key={evt.id} delay={0.1 * (idx + 1)}>
                <div className="p-8 rounded-3xl bg-white hover:bg-neutral-50/80 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm hover:shadow-md">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-500 mb-3">
                      {evt.type && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/20 text-[#FF5C00] font-medium">
                          {evt.type}
                        </span>
                      )}
                      {evt.spotsLeft && (
                        <>
                          <span className="text-neutral-400">•</span>
                          <span className="font-mono text-neutral-800 font-semibold">{evt.spotsLeft}</span>
                        </>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-neutral-950 mb-3">
                      {evt.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 mb-4">
                      {evt.date && (
                        <div className="flex items-center gap-1.5 font-mono text-neutral-800">
                          <Calendar size={13} className="text-[#FF5C00]" />
                          <span>{evt.date}</span>
                        </div>
                      )}
                      {evt.time && (
                        <div className="flex items-center gap-1.5 font-mono">
                          <Clock size={13} />
                          <span>{evt.time}</span>
                        </div>
                      )}
                      {evt.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          <span>{evt.location}</span>
                        </div>
                      )}
                    </div>

                    {evt.desc && (
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                        {evt.desc}
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-auto shrink-0">
                    <Link
                      href={`/${lang}/contact?event=${encodeURIComponent(evt.id)}`}
                      className="w-full lg:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-neutral-950 hover:bg-black text-white font-semibold text-xs transition-all active:scale-95 shadow-sm"
                    >
                      <span>{isAr ? 'حجز مقعد / استفسار' : 'Request Invitation'}</span>
                      <ArrowRight size={14} className="rtl:-scale-x-100" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))
          ) : (
            <div className="p-12 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 text-center">
              <p className="text-base text-neutral-600 font-medium">
                {isAr ? 'لا توجد فعاليات مجدولة حالياً. يرجى المتابعة لاحقاً.' : 'No upcoming events scheduled at this moment. Please check back soon.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
