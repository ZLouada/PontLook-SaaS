'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import type { Locale } from '@/i18n/config';

interface StorySectionProps {
  lang?: Locale;
}

export default function StorySection({ lang = 'en' }: StorySectionProps) {
  const isAr = lang === 'ar';

  return (
    <section
      id="our-story"
      data-nav-light="true"
      className="relative bg-white text-[#0F172A] py-24 sm:py-32 border-b border-slate-100 overflow-hidden"
    >
      <div className="container-site max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2451BF] mb-2 block font-heading">
            {isAr ? 'قصتنا' : 'OUR STORY'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191D42] font-heading">
            {isAr ? 'لماذا اسمنا بونت لوك (Pontlook)' : "Why we're called Pontlook"}
          </h2>
        </div>

        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle Bridge Brand Radial */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 h-80 bg-[#3D7BFF]/[0.04] rounded-full blur-3xl pointer-events-none"
          />

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans mb-8">
            {isAr ? (
              <>
                <strong className="text-[#191D42]">&quot;بونت&quot; (Pont) تعني جسر.</strong> في دول مجلس التعاون الخليجي، نادراً ما يلتقي مزودو التدريب المتميزون بالشركات التي تواجه تحديات ملحة في رأس المال البشري، وذلك بسبب صخب رسائل البريد البارد، وعدم استقرار التوصيات، وضعف جودة الفرص. أنشأنا بونت لوك لنكون الجسر: ننظر في السوق، نكتشف المؤسسات التي تواجه تحديات حقيقية، ونربطها بشركاء التدريب القادرين على معالجتها بدقة.
              </>
            ) : (
              <>
                <strong className="text-[#191D42]">&quot;Pont&quot; means bridge.</strong> In the GCC, great training providers and companies with urgent workforce challenges often never meet, because outreach is noisy, referrals are unpredictable, and leads are weak. We built Pontlook to be the bridge: we look across the market, find organisations experiencing real workforce challenges, and connect them with the training partners who can solve them.
              </>
            )}
          </p>

          {/* Pull-quote Card */}
          <div className="border-s-4 border-[#2451BF] ps-6 py-2 bg-white/70 rounded-e-2xl">
            <div className="flex items-start gap-3">
              <Quote size={20} className="text-[#2451BF] shrink-0 mt-1" />
              <blockquote className="text-lg sm:text-xl font-semibold text-[#191D42] italic font-heading">
                {isAr
                  ? 'توقف عن ملاحقة الشركات. وابدأ الحديث مع شركات تحتاج التدريب بالفعل.'
                  : 'Stop chasing companies. Start talking to companies that already need training.'}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
