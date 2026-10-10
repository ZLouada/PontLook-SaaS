import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { getResourcesStore } from '@/lib/resources-store';
import { Headphones, ArrowRight, Calendar, Clock, Globe } from '@/components/icons';

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
    ? 'بودكاست التدريب المؤسسي | منصة PontLook'
    : 'Corporate Learning & Leadership Podcasts | PontLook';
  const description = isAr
    ? 'حوارات صوتية حصرية مع قادة الموارد البشرية ومسؤولي التطوير والتدريب في كبرى شركات السعودية والإمارات والخليج.'
    : 'Exclusive audio interviews with Chief People Officers, VP Talent, and corporate training executives across the GCC.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'resources/podcasts'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/resources/podcasts`,
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

export default async function PodcastsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const store = getResourcesStore();
  const dynamicEpisodes = Array.isArray(store.podcasts)
    ? store.podcasts
        .filter((ep) => ep.status !== 'draft')
        .map((ep) => ({
          id: ep.id,
          title: (isAr ? ep.titleAr || ep.title_ar : ep.titleEn || ep.title_en) || ep.titleEn || ep.title_en || (isAr ? 'بودكاست' : 'Podcast'),
          guest: (isAr ? ep.guestAr || ep.guest_ar : ep.guestEn || ep.guest_en) || '',
          duration: ep.duration || ep.dur || '',
          date: (isAr ? ep.dateAr || ep.date_ar : ep.dateEn || ep.date_en) || '',
          desc: (isAr ? ep.descAr || ep.desc_ar : ep.descEn || ep.desc_en) || '',
          tag: (isAr ? ep.tagAr || ep.topic_ar : ep.tagEn || ep.topic_en) || ep.topic_en || ep.topic_ar || '',
          audioUrl: ep.audioUrl || ep.audio || '',
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
              <Link href={`/${lang}/resources`} className="hover:text-black transition-colors font-medium">
                {isAr ? 'الموارد' : 'Resources'}
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-900 font-semibold">{isAr ? 'البودكاست' : 'Podcasts'}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-neutral-950 tracking-tight leading-tight mb-4">
              {isAr ? 'بودكاست حوارات التدريب المؤسسي' : 'The Corporate L&D Leadership Podcast'}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {isAr
                ? 'حوارات صريحة وغير مكررة مع صُنّاع القرار في كبرى المنشآت والجهات التدريبية حول أحدث توجهات تطوير الكوادر.'
                : 'Direct conversations with enterprise talent deciders and vetted training directors navigating workforce transformation across the GCC.'}
            </p>
          </Reveal>
        </div>

        {/* Episodes list */}
        <div className="space-y-6">
          {dynamicEpisodes.length > 0 ? (
            dynamicEpisodes.map((ep, idx) => (
              <Reveal key={ep.id} delay={0.1 * (idx + 1)}>
                <div className="p-8 rounded-3xl bg-white hover:bg-neutral-50/80 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-14 w-14 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 text-[#FF5C00] flex items-center justify-center shrink-0">
                      <Headphones size={24} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-500 mb-2">
                        {ep.tag && (
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-medium">
                            {ep.tag}
                          </span>
                        )}
                        {ep.duration && (
                          <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-500">
                            <Clock size={11} />
                            {ep.duration}
                          </span>
                        )}
                        {ep.date && (
                          <>
                            <span className="text-neutral-300">•</span>
                            <span className="font-mono text-[11px] text-neutral-500">{ep.date}</span>
                          </>
                        )}
                      </div>

                      <h2 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 mb-1.5">
                        {ep.title}
                      </h2>

                      {ep.guest && (
                        <p className="text-xs text-[#FF5C00] font-medium mb-2">
                          {ep.guest}
                        </p>
                      )}

                      {ep.desc && (
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
                          {ep.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-auto shrink-0 flex items-center gap-3">
                    {ep.audioUrl ? (
                      <a
                        href={ep.audioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-black text-white font-semibold text-xs transition-all shadow-sm active:scale-95"
                      >
                        <Headphones size={14} />
                        <span>{isAr ? 'استمع للحلقة' : 'Listen Episode'}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-black text-white font-semibold text-xs transition-all shadow-sm active:scale-95"
                      >
                        <Headphones size={14} />
                        <span>{isAr ? 'استمع للحلقة' : 'Listen Episode'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            ))
          ) : (
            <div className="p-12 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 text-center">
              <p className="text-base text-neutral-600 font-medium">
                {isAr ? 'لا توجد حلقات بودكاست منشورة حالياً.' : 'No podcast episodes published at this moment. Please check back soon.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
