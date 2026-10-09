'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  BadgeCheck,
  ShieldCheck,
  Clock,
  Target,
  Sparkles,
} from '@/components/icons';
import Spotlight from '@/components/shared/Spotlight';
import BorderBeam from '@/components/shared/BorderBeam';
import CardTilt3D from '@/components/shared/CardTilt3D';

interface SolutionsExtensionsProps {
  lang: string;
  isAr: boolean;
}

export default function SolutionsExtensions({ lang, isAr }: SolutionsExtensionsProps) {
  return (
    <section id="extensions" className="py-20 sm:py-28 lg:py-32 border-b border-white/10 bg-black relative">
      <div className="container-site max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
            {isAr ? 'المسارات التخصصية للمنظومة' : 'SPECIALIZED EXTENSION TRACKS'}
          </div>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
            {isAr
              ? 'محرك مطابقة واحد. مساران تخصصيان لتحقيق الأهداف.'
              : 'One Matchmaking Core. Two Purpose-Built Extensions.'}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            {isAr
              ? 'سواء كنت جهة عمل تسعى لتطوير كوادرها البشرية، أو أكاديمية تدريب تبحث عن عقود مؤسسية مؤكدة، تتفرع حلول PontLook إلى مسارين صُمم كل منهما بدقة لمراعاة طبيعة عملك.'
              : 'Whether you are an enterprise building workforce capability or an accredited academy seeking qualified corporate contracts, PontLook branches into two dedicated extensions tailored for each side of the transaction.'}
          </p>
        </div>

        {/* The Two Extension Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* ========================================================= */}
          {/* EXTENSION 01: Enterprise Track                           */}
          {/* ========================================================= */}
          <div
            id="enterprise-extension"
            className="group relative rounded-2xl border border-white/20 bg-[#0A0B0D] p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 hover:border-white/40 shadow-xl"
          >
            <BorderBeam size={260} duration={16} colorFrom="#FFFFFF" colorTo="#71717A" />

            <div>
              {/* Header Meta */}
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                      {isAr ? 'الامتداد الأول · للمؤسسات والشركات' : 'EXTENSION 01 · ENTERPRISE'}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                      {isAr ? 'مسار الشركات والموارد البشرية' : 'Enterprise Sourcing Track'}
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-white/10 text-white border border-white/20">
                  {isAr ? 'مجاني 100%' : '100% Free'}
                </span>
              </div>

              {/* Pitch */}
              <div className="mt-6 space-y-3">
                <h4 className="font-heading text-xl sm:text-2xl font-semibold text-white leading-snug">
                  {isAr
                    ? 'استقطاب تدريبي دقيق بدون كتالوجات عامة أو عروض مزعجة'
                    : 'Source Vetted Training Cohorts Without Catalog Fatigue'}
                </h4>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  {isAr
                    ? 'مخصص لمديري الموارد البشرية والتدريب (CHROs & L&D). اطرح التحدي المهاري لمنشأتك في 60 ثانية، واحصل على 3 عروض مخصصة من نخبة المزودين المعتمدين خلال 48 ساعة.'
                    : 'Built for Heads of Talent, CHROs, and L&D Directors. Submit your workforce challenge in 60 seconds and receive 3 bespoke, vetted proposals within 48 hours.'}
                </p>
              </div>

              {/* Value Points */}
              <div className="mt-8 space-y-3.5 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{isAr ? 'تشخيص احتياج دقيق (TNA):' : 'Precision TNA Diagnosis:'}</strong>{' '}
                    {isAr
                      ? 'مواءمة فورية مع مهارات الفريق وحجم الميزانية والجدول الزمني.'
                      : 'Structured skills gap intake aligned to team size, timeline, and goals.'}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{isAr ? 'صفر رسوم للشركات:' : 'Zero Platform Cost:'}</strong>{' '}
                    {isAr
                      ? 'خدمة مجانية بالكامل للمنشآت دون أي رسوم وساطة أو هوامش ربحية مضافة.'
                      : '100% free for buying organizations with zero agency markups or hidden fees.'}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{isAr ? 'خصوصية تامة وبدون إزعاج:' : 'Zero Spam & Total Privacy:'}</strong>{' '}
                    {isAr
                      ? 'بيانات منشأتك محمية؛ تتواصل فقط مع المزودين الذين تختارهم بنفسك.'
                      : 'Your team stays anonymous until you choose to connect with your top shortlist.'}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{isAr ? 'مواءمة المعايير الوطنية:' : 'National Framework Aligned:'}</strong>{' '}
                    {isAr
                      ? 'متوافق مع متطلبات التوطين، ونطاقات، والمؤسسة العامة للتدريب التقني والمهني (TVTC).'
                      : 'Directly aligned with Saudization, Nitaqat, Emiratization, and TVTC standards.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions for Extension 01 */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={`/${lang}/find-training`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-semibold text-xs sm:text-sm rounded-none border border-white hover:bg-black hover:text-white transition-all duration-200 flex-1 text-center"
              >
                <span>{isAr ? 'دخول مسار الشركات' : 'Explore Enterprise Track'}</span>
                <ArrowRight size={14} className="rtl:-scale-x-100" />
              </Link>

              <Link
                href={`/${lang}/find-training/request`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent text-white font-medium text-xs sm:text-sm rounded-none border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-200 text-center"
              >
                <span>{isAr ? 'طلب عروض مباشرة (60 ثانية)' : 'Request Proposals (60s)'}</span>
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* EXTENSION 02: Training Provider Track                     */}
          {/* ========================================================= */}
          <div
            id="provider-extension"
            className="group relative rounded-2xl border border-white/20 bg-[#0A0B0D] p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 hover:border-white/40 shadow-xl"
          >
            <BorderBeam size={260} duration={16} colorFrom="#FF5C00" colorTo="#FFFFFF" />

            <div>
              {/* Header Meta */}
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-[#FF5C00] text-white flex items-center justify-center shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block">
                      {isAr ? 'الامتداد الثاني · لمعاهد ومزودي التدريب' : 'EXTENSION 02 · PROVIDERS'}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                      {isAr ? 'مسار مزودي التدريب والأكاديميات' : 'Training Provider Track'}
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-[#FF5C00]/20 text-[#FF5C00] border border-[#FF5C00]/30 font-bold">
                  {isAr ? 'صفر اشتراك شهري' : 'Zero Retainer'}
                </span>
              </div>

              {/* Pitch */}
              <div className="mt-6 space-y-3">
                <h4 className="font-heading text-xl sm:text-2xl font-semibold text-white leading-snug">
                  {isAr
                    ? 'تعاقد مع كبرى الشركات بدون مكالمات باردة أو تكاليف تسويق ضائعة'
                    : 'Win Corporate Cohorts Without Cold Outreach or Broker Risk'}
                </h4>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  {isAr
                    ? 'مخصص للمراكز والأكاديميات وبيوت الخبرة المعتمدة. اربط قدراتك التدريبية مباشرة مع طلبات حقيقية وميزانيات معتمدة بنموذج الدفع فقط عند النتائج.'
                    : 'Built for certified training institutes, boutique consultancies, and executive trainers. Access pre-allocated enterprise budgets and pay only for verified meetings.'}
                </p>
              </div>

              {/* Value Points */}
              <div className="mt-8 space-y-3.5 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-[#FF5C00] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{isAr ? 'ميزانيات معتمدة ومؤكدة:' : 'Confirmed Corporate Budgets:'}</strong>{' '}
                    {isAr
                      ? 'كل فرصة تمر بتدقيق مالي مسبق وسلطة قرار تنفيذية واضحة.'
                      : 'Every lead carries confirmed executive budget authority (SAR 100k - 1M+).'}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-[#FF5C00] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{isAr ? 'بدون رسوم اشتراك شهرية:' : 'Zero Monthly Retainers:'}</strong>{' '}
                    {isAr
                      ? 'لا توجد أي رسوم إدراج أو اشتراكات شهرية؛ تدفع فقط مقابل العميل المهتم والمؤهل.'
                      : 'No monthly subscriptions or retainers. 100% pay-per-qualified-opportunity.'}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-[#FF5C00] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{isAr ? 'وصول مباشر لصناع القرار:' : 'Direct Access to CHROs:'}</strong>{' '}
                    {isAr
                      ? 'تخطى حواجز المبيعات التقليدية وتحدث مباشرة مع القيادات المسؤولة عن التدريب.'
                      : 'Bypass procurement gatekeepers and pitch directly to HR decision-makers.'}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-[#FF5C00] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{isAr ? 'ضمان استبدال الفرصة:' : 'Replacement Guarantee:'}</strong>{' '}
                    {isAr
                      ? 'في حال عدم تطابق أي فرصة مع معايير التأهيل، يتم استبدالها برصيد فوري دون نقاش.'
                      : 'If any lead fails agreed qualification metrics, get an immediate credit replacement.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions for Extension 02 */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={`/${lang}/for-providers`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF5C00] text-white font-semibold text-xs sm:text-sm rounded-none border border-[#FF5C00] hover:bg-black hover:text-white hover:border-white transition-all duration-200 flex-1 text-center"
              >
                <span>{isAr ? 'دخول مسار المزودين' : 'Explore Provider Track'}</span>
                <ArrowRight size={14} className="rtl:-scale-x-100" />
              </Link>

              <Link
                href={`/${lang}/for-providers/apply`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent text-white font-medium text-xs sm:text-sm rounded-none border border-white/30 hover:border-[#FF5C00] hover:bg-white/10 transition-all duration-200 text-center"
              >
                <span>{isAr ? 'تقديم طلب الانضمام' : 'Apply as Provider'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
