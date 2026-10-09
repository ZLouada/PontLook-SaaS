import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { Calendar, MapPin, Clock, ArrowRight, ArrowUpRight } from '@/components/icons';

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

  const upcomingEvents = [
    {
      id: 'event-riyadh-roundtable',
      title: isAr
        ? 'طاولة مستديرة تنفيذية: استراتيجيات سد فجوات المهارات في الرياض'
        : 'Executive Roundtable: Closing Critical Skill Gaps in Riyadh Enterprise',
      date: isAr ? '28 أكتوبر 2026' : 'October 28, 2026',
      time: '10:00 AM - 12:30 PM (AST)',
      location: isAr ? 'الرياض، المملكة العربية السعودية (حضور شخصي)' : 'Riyadh, Saudi Arabia (In-Person)',
      type: isAr ? 'مائدة مستديرة مغلقة' : 'Chatham House Roundtable',
      desc: isAr
        ? 'جلسة حوارية خاصة تجمع 18 من مديري التعلم والتطوير في القطاع المصرفي والصناعي لمناقشة التحديات التدريبية ومعايير الاعتماد.'
        : 'An intimate, invitation-only briefing for 18 enterprise HR deciders discussing provider qualification, retention, and 2027 skill targets.',
      spotsLeft: isAr ? 'باقي 4 مقاعد' : '4 Seats Remaining',
    },
    {
      id: 'event-dubai-webinar',
      title: isAr
        ? 'ندوة افتراضية: كيف تصيغ كراسة شروط (RFP) تحقق نتائج تدريبية حقيقية؟'
        : 'Virtual Masterclass: Writing Bulletproof RFPs for Corporate Training',
      date: isAr ? '12 نوفمبر 2026' : 'November 12, 2026',
      time: '02:00 PM - 03:15 PM (GST)',
      location: isAr ? 'عبر الإنترنت (جلسة تفاعلية)' : 'Live Interactive Webinar',
      type: isAr ? 'ندوة افتراضية' : 'Digital Briefing',
      desc: isAr
        ? 'خطوات عملية لتحويل المتطلبات التدريبية الغامضة إلى نطاق عمل محدد وواضح يقضي على عروض البيع العشوائية.'
        : 'Frameworks to translate vague department requests into clear, scoped briefs that attract top-tier verified providers.',
      spotsLeft: isAr ? 'التسجيل متاح' : 'Open Registration',
    },
    {
      id: 'event-summit-2027',
      title: isAr
        ? 'قمة التوفيق بين مزودي التدريب والشركات الخليجية 2027'
        : 'GCC Corporate Training Matchmaking Summit 2027',
      date: isAr ? '15-16 ديسمبر 2026' : 'December 15-16, 2026',
      time: 'Full Day Summit',
      location: isAr ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates',
      type: isAr ? 'قمة سنوية' : 'Annual Summit',
      desc: isAr
        ? 'الحدث الإقليمي الأكبر الذي يربط أكثر من 120 مشتري تدريب مؤسسي بأكثر من 40 جهة تدريبية معتمدة عبر اجتماعات عمل مباشرة وموجهة.'
        : 'Pre-scheduled 1-on-1 matchmaking meetings between enterprise HR executives and accredited specialist training academies.',
      spotsLeft: isAr ? 'الحجز المبكر متاح' : 'Early Registration Open',
    },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-neutral-300 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C00]" />
            <Link href={`/${lang}/resources`} className="hover:text-white transition-colors">
              {isAr ? 'الموارد' : 'Resources'}
            </Link>
            <span className="text-neutral-500">/</span>
            <span className="text-white">{isAr ? 'الفعاليات' : 'Events'}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight mb-4">
            {isAr ? 'فعاليات وموائد مستديرة تجمع صُنّاع القرار' : 'Executive Events, Summits & Briefings'}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'لقاءات حضورية وافتراضية هادفة تركز على تبادل التجارب الحقيقية والربط المباشر بين قادة التدريب في منشآت الخليج والخبراء المعتمدين.'
              : 'Curated peer discussions and direct matchmaking sessions designed to connect corporate training buyers with verified specialists.'}
          </p>
        </Reveal>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {upcomingEvents.map((evt, idx) => (
          <Reveal key={evt.id} delay={0.1 * (idx + 1)}>
            <div className="p-8 rounded-3xl bg-[#121316]/80 hover:bg-[#16171B] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/20 text-[#FF5C00] font-medium">
                    {evt.type}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="font-mono text-neutral-300 font-semibold">{evt.spotsLeft}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3">
                  {evt.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mb-4">
                  <div className="flex items-center gap-1.5 font-mono text-neutral-300">
                    <Calendar size={13} className="text-[#FF5C00]" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <Clock size={13} />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl">
                  {evt.desc}
                </p>
              </div>

              <div className="w-full lg:w-auto shrink-0">
                <Link
                  href={`/${lang}/contact?event=${encodeURIComponent(evt.id)}`}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all active:scale-95 shadow-md"
                >
                  <span>{isAr ? 'حجز مقعد / استفسار' : 'Request Invitation'}</span>
                  <ArrowRight size={14} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
