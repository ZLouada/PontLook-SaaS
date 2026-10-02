'use client';

import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useParams } from 'next/navigation';
import Signal from '@/components/shared/Signal';
import Spotlight from '@/components/shared/Spotlight';
import Marquee from '@/components/shared/Marquee';
import CardTilt3D from '@/components/shared/CardTilt3D';
import BorderGlow from '@/components/shared/BorderGlow';
import { useFinePointer } from '@/lib/useDevice';

export default function TrustBar() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';
  const isDesktop = useFinePointer();

  const values = [
    {
      title: dict.trust_bar?.needs?.title || 'Verified Needs',
      desc: dict.trust_bar?.needs?.desc || 'Enterprise L&D requests verified directly with HR leaders',
      badge: isAr ? 'طلب موثق' : 'Verified Demand',
    },
    {
      title: dict.trust_bar?.access?.title || 'Direct Access',
      desc: dict.trust_bar?.access?.desc || 'No intermediaries, connect straight to talent and procurement heads',
      badge: isAr ? 'تواصل مباشر' : 'Direct Link',
    },
    {
      title: dict.trust_bar?.insights?.title || 'Actionable L&D guides & insights',
      desc: dict.trust_bar?.insights?.desc || 'Benchmarking and curated market intelligence',
      badge: isAr ? 'أبحاث حصرية' : 'Market Intel',
    },
    {
      title: dict.trust_bar?.gcc?.title || 'Regional Focus',
      desc: dict.trust_bar?.gcc?.desc || 'Saudi Arabia, UAE and GCC focused enterprise landscape',
      badge: isAr ? 'السعودية والإمارات' : 'KSA & UAE',
    },
  ];

  // On mobile: render lightweight cards without 3-layer animation wrappers
  // On desktop: full CardTilt3D + Spotlight + BorderGlow experience
  const cards = values.map((v, i) => {
    const inner = (
      <div className="relative z-10 min-w-0">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="block truncate text-sm font-medium tracking-[-0.02em] text-white sm:text-base">
            {v.title}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-neutral-300 transition-colors group-hover:border-white/35 group-hover:text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <Signal size={12} speed={1 - i * 0.1} />
            <span>{v.badge}</span>
          </span>
        </div>
        <span className="block text-[0.8125rem] font-normal leading-snug text-neutral-400 line-clamp-2 sm:text-sm">
          {v.desc}
        </span>
      </div>
    );

    const cardClass =
      'group relative h-full w-[264px] sm:w-[320px] md:w-[380px] rounded-2xl border border-white/10 bg-[#0F1013]/90 p-4 sm:p-5 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.4)]';

    if (!isDesktop) {
      // Mobile: plain card — no CardTilt3D, no Spotlight, no BorderGlow
      return (
        <div key={v.title} className={cardClass}>
          {inner}
        </div>
      );
    }

    // Desktop: full animated experience
    return (
      <CardTilt3D
        key={v.title}
        maxTilt={5}
        glareOpacity={0.12}
        className="h-full w-[264px] sm:w-[320px] md:w-[380px]"
      >
        <Spotlight
          radius={280}
          className={`${cardClass} transition-all duration-300 hover:border-white/30 hover:bg-[#16171B]/90 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_10px_25px_-5px_rgba(0,0,0,0.7)] overflow-hidden`}
        >
          <BorderGlow glowColor="rgba(255, 255, 255, 0.20)" size={220} opacity={0.6} />
          {inner}
        </Spotlight>
      </CardTilt3D>
    );
  });

  return (
    <section
      data-nav-dark="true"
      className="relative overflow-hidden bg-black py-6 text-white sm:py-12"
    >
      {/* edge fades so items dissolve rather than clip */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 w-16 bg-gradient-to-r from-black via-black/80 to-transparent rtl:bg-gradient-to-l sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-20 w-16 bg-gradient-to-l from-black via-black/80 to-transparent rtl:bg-gradient-to-r sm:w-32" />

      <Marquee items={cards} duration={38} reverse={isAr} gap={24} className="py-2" />
    </section>
  );
}
