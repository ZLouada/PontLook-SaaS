'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Building2, Briefcase, Sparkles } from '@/components/icons';
import BorderBeam from '@/components/shared/BorderBeam';

interface SolutionsCtaProps {
  lang: string;
  isAr: boolean;
}

export default function SolutionsCta({ lang, isAr }: SolutionsCtaProps) {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-black relative">
      <div className="container-site max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
            {isAr ? 'ابدأ الآن' : 'SELECT YOUR TRACK'}
          </div>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
            {isAr
              ? 'اختر مسارك وانضم إلى منظومة المطابقة'
              : 'Choose Your Track to Step Into the Ecosystem'}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            {isAr
              ? 'سواء كنت بحاجة لتدريب فريقك فوراً أو ترغب في توسيع قاعدة عملائك من كبرى المنشآت، نحن نوفر لك المسار الأمثل.'
              : 'Whether you require urgent workforce capability building or wish to scale your enterprise client roster, select the pathway designed for you.'}
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Track 1: Enterprise */}
          <div className="rounded-2xl border border-white/20 bg-[#0A0B0D] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <BorderBeam size={220} duration={14} colorFrom="#FFFFFF" colorTo="#71717A" />

            <div>
              <div className="h-12 w-12 rounded-xl bg-white text-black flex items-center justify-center mb-6">
                <Building2 size={24} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                {isAr ? 'للشركات والمؤسسات' : 'FOR ENTERPRISES & HR'}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
                {isAr ? 'ابحث عن مزودي تدريب معتمدين' : 'Find Vetted Training Partners'}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {isAr
                  ? 'اطرح متطلبات تدريب فريقك في 60 ثانية، واحصل على 3 عروض أسعار تفصيلية من نخبة المزودين المعتمدين خلال 48 ساعة. مجاني 100% للشركات.'
                  : 'Submit your requirements in 60 seconds and receive 3 bespoke, vetted proposals tailored to your budget and GCC goals within 48 hours. 100% free for buyers.'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch gap-3">
              <Link
                href={`/${lang}/find-training/request`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-semibold text-xs sm:text-sm border border-white hover:bg-black hover:text-white transition-all text-center flex-1"
              >
                <span>{isAr ? 'طلب عروض تدريب (مجاناً)' : 'Request Proposals (Free)'}</span>
                <ArrowRight size={14} className="rtl:-scale-x-100" />
              </Link>
              <Link
                href={`/${lang}/find-training`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent text-white font-medium text-xs sm:text-sm border border-white/30 hover:border-white transition-all text-center"
              >
                <span>{isAr ? 'تفاصيل المسار' : 'Track Details'}</span>
              </Link>
            </div>
          </div>

          {/* Track 2: Provider */}
          <div className="rounded-2xl border border-white/20 bg-[#0A0B0D] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <BorderBeam size={220} duration={14} colorFrom="#FF5C00" colorTo="#FFFFFF" />

            <div>
              <div className="h-12 w-12 rounded-xl bg-[#FF5C00] text-white flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                {isAr ? 'لمعاهد ومزودي التدريب' : 'FOR TRAINING ACADEMIES'}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
                {isAr ? 'انضم إلى شبكة المزودين المعتمدين' : 'Join Our Verified Provider Network'}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {isAr
                  ? 'احصل على فرص تعاقد وتدريب مع كبرى المنشآت الخليجية بميزانيات معتمدة وسلطة قرار واضحة. بدون رسوم اشتراك شهرية أو احتجاز مالي.'
                  : 'Receive direct introductions to enterprise decision-makers with confirmed L&D budgets. Pay strictly per qualified meeting with zero upfront retainers.'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch gap-3">
              <Link
                href={`/${lang}/for-providers/apply`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF5C00] text-white font-semibold text-xs sm:text-sm border border-[#FF5C00] hover:bg-black hover:text-white hover:border-white transition-all text-center flex-1"
              >
                <span>{isAr ? 'تقديم طلب الانضمام' : 'Apply as Provider'}</span>
                <ArrowRight size={14} className="rtl:-scale-x-100" />
              </Link>
              <Link
                href={`/${lang}/for-providers`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent text-white font-medium text-xs sm:text-sm border border-white/30 hover:border-[#FF5C00] transition-all text-center"
              >
                <span>{isAr ? 'تفاصيل المسار' : 'Track Details'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
