'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight, CheckCircle2, Target, Sparkles } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const trustCheckmarks = isAr
    ? [
        'مدربون معتمدون 100%',
        'عروض مخصصة خلال 48 ساعة',
        'بدون أي رسوم مسبقة للشركات',
      ]
    : [
        '100% verified instructors',
        '48 hour tailored proposals',
        'Zero upfront platform cost for enterprises',
      ];

  const trustedCategories = isAr
    ? ['القيادة', 'الذكاء الاصطناعي والتقنية', 'المبيعات', 'الامتثال والتوطين']
    : ['Leadership', 'Tech & AI', 'Sales', 'Compliance & Localization'];

  return (
    <section className="relative overflow-hidden bg-white min-h-[calc(100vh-4rem)] sm:min-h-screen flex flex-col justify-center pt-24 pb-14 sm:pt-28 sm:pb-20">
      {/* Background Gradients & Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-700"
          style={{
            backgroundImage: "url('/skyline-bg.webp')",
          }}
        />
        <div
          className="absolute inset-0 bg-white/80"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 45%, white 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 45%, white 100%)',
          }}
        />
        <div className="absolute top-1/4 start-1/4 w-[600px] h-[450px] bg-gradient-to-r from-accent/15 via-accent-secondary/10 to-accent/15 blur-3xl -z-10 rounded-full" />
        <div className="absolute bottom-10 end-1/4 w-[500px] h-[400px] bg-accent/10 blur-3xl -z-10 rounded-full" />
      </div>

      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs">
                <Sparkles size={13} className="text-primary" />
                <span>
                  {isAr
                    ? 'منصة الربط التدريبي المؤسسي الأولى بالخليج'
                    : 'GCC Corporate Training Matchmaking'}
                </span>
              </span>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-semibold tracking-[-0.03em] leading-[1.12] sm:leading-[1.08] text-slate-900">
                {dict.hero.headline}
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                {dict.hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                {/* Primary Button: Join the networks with electric orange hover effect */}
                <Link
                  href={`/${lang}/for-providers/apply`}
                  className="inline-flex items-center justify-center gap-2 py-4 px-7 rounded-full bg-primary hover:bg-[#FF5C00] text-white font-semibold text-base shadow-lg shadow-primary/20 hover:shadow-orange-500/30 hover:border-[#FF5C00] active:scale-[0.98] transition-all duration-300 group"
                >
                  <span>{isAr ? 'انضم إلى شبكتنا' : 'Join the networks'}</span>
                  <ArrowRight
                    size={17}
                    className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                  />
                </Link>

                {/* Secondary Button: I'm looking for training */}
                <Link
                  href={`/${lang}/find-training/request`}
                  className="inline-flex items-center justify-center gap-2 py-4 px-7 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-base border border-slate-200 shadow-sm active:scale-[0.98] transition-all duration-200"
                >
                  <Target size={17} className="text-primary" />
                  <span>{dict.hero.btn_buyer}</span>
                </Link>
              </div>

              {/* 3 Trust Points */}
              <div className="mt-7 pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                {trustCheckmarks.map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span className="text-xs font-medium text-slate-700 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Hero Image with Blurred Faces and Overlay Card */}
          <div className="lg:col-span-6 relative">
            <Reveal delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-100 group">
                <div className="aspect-[16/10] sm:aspect-[16/10] w-full relative">
                  <Image
                    src="/executive_training_room.jpg"
                    alt={
                      isAr
                        ? 'ورشة عمل تدريبية تنفيذية للشركات'
                        : 'Executive corporate training workshop'
                    }
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Gradient vignette for card contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Floating Overlay Badge Card at Bottom */}
                <div className="absolute bottom-4 inset-x-4 sm:bottom-5 sm:inset-x-5 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-xl">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {isAr
                      ? 'موثوق من قادة الموارد البشرية والتدريب في'
                      : 'TRUSTED BY HR AND TALENT LEADERS IN'}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {trustedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
