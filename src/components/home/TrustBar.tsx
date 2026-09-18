'use client';

import { useState } from 'react';
import { BadgeCheck, Building2, Compass, Globe } from 'lucide-react';
import { m } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useParams } from 'next/navigation';

export default function TrustBar() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';
  const [isPaused, setIsPaused] = useState(false);

  const values = [
    {
      icon: BadgeCheck,
      title: dict.trust_bar?.needs?.title || 'Verified Needs',
      desc: dict.trust_bar?.needs?.desc || 'Enterprise L&D requests verified directly with HR leaders',
      badge: isAr ? 'طلب موثق' : 'Verified Demand',
    },
    {
      icon: Building2,
      title: dict.trust_bar?.access?.title || 'Direct Access',
      desc: dict.trust_bar?.access?.desc || 'No intermediaries, connect straight to talent and procurement heads',
      badge: isAr ? 'تواصل مباشر' : 'Direct Link',
    },
    {
      icon: Compass,
      title: dict.trust_bar?.insights?.title || 'Actionable L&D guides & insights',
      desc: dict.trust_bar?.insights?.desc || 'Benchmarking and curated market intelligence',
      badge: isAr ? 'أبحاث حصرية' : 'Market Intel',
    },
    {
      icon: Globe,
      title: dict.trust_bar?.gcc?.title || 'Regional Focus',
      desc: dict.trust_bar?.gcc?.desc || 'Saudi Arabia, UAE and GCC focused enterprise landscape',
      badge: isAr ? 'السعودية والإمارات' : 'KSA & UAE',
    },
  ];

  // Duplicate items for seamless continuous infinite marquee loop
  const marqueeItems = [...values, ...values, ...values];

  return (
    <section
      data-nav-dark="true"
      className="relative bg-[#08090A] text-white pt-10 pb-10 sm:py-12 overflow-hidden"
    >
      {/* Edge gradient mask for smooth fade in/out */}
      <div className="absolute inset-y-0 start-0 w-16 sm:w-32 bg-gradient-to-r rtl:bg-gradient-to-l from-[#08090A] via-[#08090A]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 end-0 w-16 sm:w-32 bg-gradient-to-l rtl:bg-gradient-to-r from-[#08090A] via-[#08090A]/80 to-transparent z-20 pointer-events-none" />

      <div
        className="w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <m.div
          className="flex w-max items-center py-2"
          animate={{
            x: isAr ? ['0%', '33.333%'] : ['0%', '-33.333%'],
          }}
          transition={{
            ease: 'linear',
            duration: 32,
            repeat: Infinity,
          }}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {marqueeItems.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={`${v.title}-${i}`}
                className="w-[260px] sm:w-[360px] md:w-[440px] shrink-0 mx-2 sm:mx-4"
              >
                <div className="group relative flex items-center gap-3.5 sm:gap-5 p-3.5 sm:p-5 rounded-2xl bg-transparent border border-white/10 hover:border-white/25 hover:bg-white/[0.02] transition-all duration-300">
                  {/* Subtle hover gradient on card */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Icon container */}
                  <div className="relative flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-white border border-white/10 group-hover:border-white/25 shadow-sm transition-all duration-300">
                    <Icon size={19} strokeWidth={1.75} className="sm:hidden" />
                    <Icon size={24} strokeWidth={1.75} className="hidden sm:block" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="font-medium text-xs sm:text-base text-white tracking-[-0.02em] truncate block group-hover:text-white transition-colors">
                        {v.title}
                      </span>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium bg-transparent text-neutral-400 border border-white/10 group-hover:border-white/25 group-hover:text-neutral-200 transition-colors">
                        {v.badge}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-sm text-neutral-400 block font-normal leading-snug line-clamp-2">
                      {v.desc}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}

