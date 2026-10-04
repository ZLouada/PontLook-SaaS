'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, GraduationCap } from 'lucide-react';
import type { Locale } from '@/i18n/config';

interface CtaBandProps {
  lang?: Locale;
}

export default function CtaBand({ lang = 'en' }: CtaBandProps) {
  const isAr = lang === 'ar';

  return (
    <section
      data-nav-light="true"
      className="bg-white py-16 sm:py-24 border-t border-slate-100"
    >
      <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#0B0F14] via-[#14171C] to-[#1E293B] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl text-center">
          {/* Subtle Ambient Radial Backlight */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-80 h-80 bg-[#3D7BFF]/20 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#2451BF]/20 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-neutral-300 text-xs font-semibold tracking-wider uppercase mb-4">
              {isAr ? 'ابدأ الآن' : 'CROSS THE BRIDGE TODAY'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 font-heading">
              {isAr ? 'هل أنت مستعد لعبور الجسر؟' : 'Ready to cross the bridge?'}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {isAr
                ? 'سواء كنت تبحث عن شركاء تدريب لتطوير فريقك أو كنت مزود تدريب معتمد يبحث عن فرص موثوقة، بونت لوك هنا لخدمتك.'
                : 'Whether you are seeking vetted partners to close capability gaps or an accredited training firm ready to deliver results, Pontlook is your bridge.'}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href={`/${lang}/for-providers`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 font-medium text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-[0.98] group"
            >
              <GraduationCap size={16} className="me-2 text-[#7FB8FF]" />
              <span>{isAr ? 'أنا مزود تدريب' : "I'm a Training Provider"}</span>
            </Link>

            <Link
              href={`/${lang}/find-training`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#2451BF] hover:bg-[#1D4ED8] text-white font-medium text-xs sm:text-sm shadow-lg shadow-[#2451BF]/30 transition-all duration-200 active:scale-[0.98] group"
            >
              <Building2 size={16} className="me-2 text-white" />
              <span>
                {isAr ? 'ابحث عن تدريب مؤسسي' : "I'm Looking for Corporate Training"}
              </span>
              <ArrowRight
                size={14}
                className={`ms-2 transition-transform duration-200 group-hover:translate-x-1 ${
                  isAr ? 'rotate-180 group-hover:-translate-x-1' : ''
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
