'use client';

import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useParams } from 'next/navigation';
import Signal from '@/components/shared/Signal';
import Spotlight from '@/components/shared/Spotlight';
import Marquee from '@/components/shared/Marquee';

export default function TrustBar() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

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

  const cards = values.map((v, i) => (
    <Spotlight
      key={v.title}
      radius={280}
      className="group h-full w-[240px] sm:w-[320px] md:w-[380px] rounded-2xl border border-white/10 bg-white/[0.015] p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.04] shadow-sm"
    >
      <div className="relative min-w-0">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="block truncate text-xs font-medium tracking-[-0.02em] text-white sm:text-base">
            {v.title}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-[#16171B] px-2.5 py-0.5 text-[9px] font-medium text-neutral-300 transition-colors group-hover:border-white/30 group-hover:text-white sm:text-[10px]">
            <Signal size={12} speed={1 - i * 0.1} />
            <span>{v.badge}</span>
          </span>
        </div>
        <span className="block text-[11px] font-normal leading-snug text-neutral-400 line-clamp-2 sm:text-sm">
          {v.desc}
        </span>
      </div>
    </Spotlight>
  ));

  return (
    <section
      data-nav-dark="true"
      className="relative overflow-hidden bg-[#08090A] py-6 text-white sm:py-12"
    >
      {/* edge fades so items dissolve rather than clip */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 w-16 bg-gradient-to-r from-[#08090A] via-[#08090A]/80 to-transparent rtl:bg-gradient-to-l sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-20 w-16 bg-gradient-to-l from-[#08090A] via-[#08090A]/80 to-transparent rtl:bg-gradient-to-r sm:w-32" />

      <Marquee items={cards} duration={38} reverse={isAr} gap={24} className="py-2" />
    </section>
  );
}
