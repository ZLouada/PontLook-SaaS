'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';

interface EndOfPostCtaBannerProps {
  isAr?: boolean;
  lang: string;
}

export function EndOfPostCtaBanner({ isAr = false, lang }: EndOfPostCtaBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-[#070C18] border border-neutral-800 p-8 sm:p-12 text-center text-white my-12 shadow-xl">
      {/* Decorative top lime/emerald highlight bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 via-emerald-400 to-[#FF5C00]" />

      <div className="max-w-2xl mx-auto">
        {/* Main Headline */}
        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          {isAr ? (
            <>
              جاهز لتطوير وتأهيل <span className="text-[#a3e635]">فريق عملك؟</span>
            </>
          ) : (
            <>
              Ready to Upskill Your <span className="text-[#a3e635]">Enterprise Team?</span>
            </>
          )}
        </h3>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl mx-auto mb-8 font-light">
          {isAr
            ? 'انضم إلى أكثر من 200 جهة وشركة تثق في PontLook لتشخيص الاحتياج التدريبي والربط مع أفضل المدربين وبيوت الخبرة في 48 ساعة.'
            : 'Join 200+ organizations that trust PontLook for corporate training. Get matched with vetted expert trainers in 48 hours.'}
        </p>

        {/* Action Button */}
        <div>
          <Link
            href={`/${lang}/find-training`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#c6f03d] hover:bg-[#b2dc2b] text-neutral-950 font-bold text-xs sm:text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c6f03d]/20"
          >
            <span>
              {isAr ? 'احجز استشارة تدريبية مجانية' : 'Schedule a Free Training Consultation'}
            </span>
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
