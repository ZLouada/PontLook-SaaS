'use client';

import { useState } from 'react';
import { ShieldCheck, Building2, BookOpen, TrendingUp } from 'lucide-react';
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
      icon: ShieldCheck,
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
      icon: BookOpen,
      title: dict.trust_bar?.insights?.title || 'Actionable L&D guides & insights',
      desc: dict.trust_bar?.insights?.desc || 'Benchmarking and curated market intelligence',
      badge: isAr ? 'أبحاث حصرية' : 'Market Intel',
    },
    {
      icon: TrendingUp,
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
      className="relative bg-[#000000] text-white pt-10 pb-10 sm:py-12 border-b border-[#1A1A1A] overflow-hidden"
    >
      {/* Smooth sliding transition from white to black (sliding from color to color) */}
      <div className="absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-white/10 via-[#070D1E]/40 to-transparent pointer-events-none" />
      
      {/* Subtle top/bottom ambient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0052FF]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF5C00]/20 to-transparent pointer-events-none" />

      {/* Edge gradient mask for smooth fade in/out */}
      <div className="absolute inset-y-0 start-0 w-16 sm:w-32 bg-gradient-to-r rtl:bg-gradient-to-l from-[#000000] via-[#000000]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 end-0 w-16 sm:w-32 bg-gradient-to-l rtl:bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent z-20 pointer-events-none" />

      <div
        className="w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
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
                className="w-[320px] sm:w-[380px] md:w-[440px] shrink-0 mx-3 sm:mx-4"
              >
                <div className="group relative flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#0052FF]/50 hover:bg-white/[0.08] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                  {/* Subtle hover gradient on card */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0052FF]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Icon container */}
                  <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-[#121212] text-[#0052FF] group-hover:text-white group-hover:bg-[#0052FF] border border-[#262626] group-hover:border-[#0052FF] transition-all duration-300 shadow-inner">
                    <Icon size={22} className="sm:hidden" />
                    <Icon size={26} className="hidden sm:block" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-sm sm:text-base text-white tracking-tight truncate block group-hover:text-white transition-colors">
                        {v.title}
                      </span>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#1A1A1A] text-neutral-400 border border-[#2B2B2B] group-hover:border-[#0052FF]/30 group-hover:text-blue-400 transition-colors">
                        {v.badge}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-400 block font-normal leading-snug line-clamp-2">
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

