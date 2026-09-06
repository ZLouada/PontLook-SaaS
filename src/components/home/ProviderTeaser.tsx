'use client';

import { m } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { usePathname } from 'next/navigation';
import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import SectionHeading from '@/components/shared/SectionHeading';

export default function ProviderTeaser() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';
  const isRtl = lang === 'ar';

  const cards = [
    {
      step: lang === 'ar' ? 'المرحلة 01' : 'Step 1',
      tierBadge: lang === 'ar' ? 'طلب عاجل · تطابق 95%' : 'Hot · 95% Match',
      title: lang === 'ar'
        ? 'فرص تدريبية ذات طلب عاجل وميزانية معتمدة'
        : 'High-intent enterprise demand with confirmed budget',
      desc:
        dict.provider_teaser?.tiers?.hot?.desc ||
        'Verified decision-maker, confirmed budget, starts within 30 days.',
      canvasBg: 'bg-[#F2EFE9]', // warm sandstone from Odysser
      progressColor: 'bg-[#0052FF]',
      matchPct: '95%',
      targetOrg: lang === 'ar' ? 'منشأة كبرى بالرياض · مشروع #01' : 'Riyadh Enterprise · Project #01',
      criteria: [
        { label: lang === 'ar' ? 'صاحب القرار معتمد (CHRO)' : 'Verified Decision-Maker (CHRO)', done: true },
        { label: lang === 'ar' ? 'الميزانية معتمدة (+300 ألف ريال)' : 'Confirmed Budget (SAR 300k+)', done: true },
        { label: lang === 'ar' ? 'نافذة البدء: خلال 30 يوماً' : 'Immediate 30-Day Window', done: true },
      ],
      stickyTop: 'top-24 sm:top-28',
      zIndex: 10,
    },
    {
      step: lang === 'ar' ? 'المرحلة 02' : 'Step 2',
      tierBadge: lang === 'ar' ? 'طلب متوسط · تطابق 80%' : 'Warm · 80% Match',
      title: lang === 'ar'
        ? 'احتياج مؤسسي حقيقي قيد إعداد الميزانية'
        : 'Confirmed workforce pain; budget & timeline forming',
      desc:
        dict.provider_teaser?.tiers?.warm?.desc ||
        'Confirmed pain and authority; budget or timeline still forming. We stay engaged to pass the lead when ready.',
      canvasBg: 'bg-[#EAEFF5]', // soft blue-gray light tone
      progressColor: 'bg-amber-500',
      matchPct: '80%',
      targetOrg: lang === 'ar' ? 'منشأة كبرى بدبي · مشروع #02' : 'Dubai Enterprise · Project #02',
      criteria: [
        { label: lang === 'ar' ? 'التحقق من الإدارة التنفيذية' : 'Executive Authority Validated', done: true },
        { label: lang === 'ar' ? 'حجم المنشأة: +500 موظف' : '500+ Enterprise Workforce', done: true },
        { label: lang === 'ar' ? 'الميزانية مجدولة للربع القادم' : 'Budget Staged for Q3', done: false },
      ],
      stickyTop: 'top-28 sm:top-36',
      zIndex: 20,
    },
    {
      step: lang === 'ar' ? 'المرحلة 03' : 'Step 3',
      tierBadge: lang === 'ar' ? 'طلب مبكر · تطابق 60%' : 'Qualified · 60% Match',
      title: lang === 'ar'
        ? 'فرص تدريبية متوسطة المدى تتيح التمركز المبكر'
        : 'Genuine need verified; earlier in the buying journey',
      desc:
        dict.provider_teaser?.tiers?.qualified?.desc ||
        'Genuine need verified; earlier in the buying journey.',
      canvasBg: 'bg-[#F0F2ED]', // soft sage-sand light tone
      progressColor: 'bg-blue-500',
      matchPct: '60%',
      targetOrg: lang === 'ar' ? 'منشأة بالدوحة · مشروع #03' : 'Doha Enterprise · Project #03',
      criteria: [
        { label: lang === 'ar' ? 'توجه تدريبي استراتيجي محدد' : 'Strategic Training Need Identified', done: true },
        { label: lang === 'ar' ? 'قطاع البنوك والخدمات المالية' : 'Banking & Financial Sector', done: true },
        { label: lang === 'ar' ? 'نافذة تمركز وتسويق مبكر' : 'Early Positioning Window', done: false },
      ],
      stickyTop: 'top-32 sm:top-44',
      zIndex: 30,
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/60 to-white py-20 sm:py-28 lg:py-36 overflow-hidden border-y border-slate-200/60">
      {/* Subtle ambient light glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-accent/[0.04] via-accent-secondary/[0.03] to-accent/[0.04] blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12 mx-auto">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center max-w-[820px] mx-auto">
          <SectionHeading
            eyebrow={dict.provider_teaser?.badge || 'For Training Providers'}
            title={dict.provider_teaser?.headline || 'A predictable pipeline of enterprise opportunities'}
            subtitle={dict.provider_teaser?.subtitle || 'Every lead is scored on decision-maker verification, company size, budget, timeline, and depth of need.'}
          />
        </div>

        {/* Odysser Stacking Cards Container */}
        <div className="relative space-y-6 sm:space-y-8 lg:space-y-12 max-w-5xl mx-auto pb-12">
          {cards.map((card, i) => (
            <div
              key={card.step}
              style={{ zIndex: card.zIndex }}
              className={`relative lg:sticky ${card.stickyTop} transform-gpu will-change-transform transition-all duration-300`}
            >
              <div className="rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] border border-slate-200/80 bg-white shadow-apple hover:shadow-xl p-5 sm:p-8 lg:p-12 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Typography & Action */}
                  <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#0052FF] text-white text-xs font-semibold shadow-2xs">
                        {card.step}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/70">
                        {card.tierBadge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md">
                      {card.desc}
                    </p>

                    <div className="pt-2 sm:pt-3">
                      <Button
                        href={`/${lang}/for-providers`}
                        variant="primary"
                        size="md"
                        className="w-full sm:w-auto justify-center rounded-full shadow-sm hover:scale-[1.02] text-sm min-h-[44px]"
                        rightIcon={<ArrowRight size={15} className="rtl:-scale-x-100" />}
                      >
                        {dict.provider_teaser?.btn || 'Explore the partnership'}
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Light Odysser Visual Showcase Canvas */}
                  <div className="lg:col-span-6 w-full">
                    <div
                      className={`w-full rounded-2xl sm:rounded-3xl border border-slate-200/80 ${card.canvasBg} p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[230px] sm:min-h-[280px] shadow-inner`}
                    >
                      {/* Subtle micro dot texture overlay */}
                      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />

                      {/* Pure White Floating Glass Card */}
                      <m.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative z-10 w-full max-w-xs rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md p-5 sm:p-6 space-y-4"
                      >
                        <div className="pb-2 border-b border-slate-100">
                          <span className="text-xs font-semibold text-slate-800">
                            {card.targetOrg}
                          </span>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                            <span>{lang === 'ar' ? 'دقة التطابق' : 'Match Accuracy'}</span>
                            <span className="font-mono font-semibold text-slate-800">{card.matchPct}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <m.div
                              initial={{ width: 0 }}
                              whileInView={{ width: card.matchPct }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
                              className={`h-full ${card.progressColor} rounded-full`}
                            />
                          </div>
                        </div>

                        {/* Scored Criteria Checklist */}
                        <div className="space-y-2 pt-1">
                          {card.criteria.map((c) => (
                            <div key={c.label} className="flex items-center gap-2 text-xs text-slate-600">
                              {c.done ? (
                                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                              ) : (
                                <Clock size={14} className="text-slate-400 shrink-0" />
                              )}
                              <span className="truncate">{c.label}</span>
                            </div>
                          ))}
                        </div>
                      </m.div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
