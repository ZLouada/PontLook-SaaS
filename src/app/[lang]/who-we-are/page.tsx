import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { 
  TrendingUp, 
  Target, 
  Briefcase, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  Users, 
  Clock, 
  DollarSign, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

import { Locale, i18n } from '@/i18n/config';

export const metadata: Metadata = {
  title: {
    absolute: 'Who We Are: The GCC Matchmaking Platform | PontLook',
  },
  description:
    'Learn how PontLook connects GCC corporate buyers with verified training providers across Saudi Arabia, UAE, and the Gulf with zero retainers.',
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

const featureCardsEn = [
  {
    icon: TrendingUp,
    title: 'Stop relying on unpredictable referrals.',
    description: 'Eliminate feast-or-famine cycles by replacing word-of-mouth with a consistent, structured outbound growth engine.',
  },
  {
    icon: Clock,
    title: 'Keep your pipeline active during delivery.',
    description: 'Maintain steady sales outreach and lead generation even when your facilitators are 100% focused on client workshops.',
  },
  {
    icon: Briefcase,
    title: 'Use an outsourced growth engine.',
    description: 'Scale your enterprise business development without hiring, training, or managing expensive internal sales teams.',
  },
  {
    icon: MessageSquare,
    title: 'Start relevant conversations faster.',
    description: 'Engage HR, L&D, and C-level decision-makers right when they are actively seeking solutions for workforce challenges.',
  },
  {
    icon: Award,
    title: 'Focus on what your team does best.',
    description: 'Spend your time closing deals and delivering world-class training while we handle prospect discovery and qualification.',
  },
];

const featureCardsAr = [
  {
    icon: TrendingUp,
    title: 'التوقف عن الاعتماد على التوصيات غير المستقرة',
    description: 'تخلص من تذبذب الإيرادات عبر استبدال التوصيات العشوائية بمحرك نمو خارجي منظم ومستمر.',
  },
  {
    icon: Clock,
    title: 'استمرارية تدفق الفرص أثناء تقديم الدورات',
    description: 'حافظ على استمرارية المبيعات حتى عندما يكون خبراؤك منشغلين بالكامل في تقديم البرامج وورش العمل.',
  },
  {
    icon: Briefcase,
    title: 'محرك نمو خارجي متكامل ومخصص',
    description: 'وسّع نطاق مبيعاتك المؤسسية دون الحاجة إلى تكاليف توظيف وتدريب فرق مبيعات داخلية باهظة.',
  },
  {
    icon: MessageSquare,
    title: 'بدء محادثات هادفة وسريعة مع العملاء',
    description: 'تواصل مع مدراء الموارد البشرية والتدريب في اللحظة الدقيقة التي يبحثون فيها عن حلول لتطوير فرقهم.',
  },
  {
    icon: Award,
    title: 'التركيز التام على ما تبدعون فيه',
    description: 'كرّس وقتك لإغلاق العقود وتقديم تدريب رفيع المستوى، بينما نتولى نحن استكشاف وتأهيل الفرص.',
  },
];

const benefitPointsEn = [
  {
    icon: ShieldCheck,
    title: 'Zero Retainer Risk',
    desc: 'Pay strictly per qualified lead ($50–$200) delivered, ensuring 100% alignment with your revenue pipeline.',
  },
  {
    icon: Users,
    title: 'Verified GCC Decision-Makers',
    desc: 'Direct connections with HR Directors, CHROs, and L&D heads navigating Saudization and Emiratization compliance mandates.',
  },
  {
    icon: Target,
    title: 'Context-Rich Intelligence',
    desc: 'Every lead comes with company background, specific workforce pain points, and buyer context.',
  },
  {
    icon: Clock,
    title: 'Time & Cost Efficiency',
    desc: 'Save hundreds of hours of manual research with an average 14-day turnaround from request intake to warm introduction.',
  },
  {
    icon: BarChart3,
    title: 'Consistent Pipeline Growth',
    desc: 'Maintain a predictable stream of enterprise opportunities throughout the year, even in delivery seasons.',
  },
  {
    icon: DollarSign,
    title: 'Maximum ROI & Higher Close Rates',
    desc: 'Engage prospects with pre-identified training needs, leading to shorter sales cycles and higher win rates.',
  },
];

const benefitPointsAr = [
  {
    icon: ShieldCheck,
    title: 'انعدام مخاطر الرسوم الشهرية',
    desc: 'ادفع حصراً لكل فرصة مؤهلة ($50–$200) يتم تسليمها، لضمان مواءمة تامة مع نمو إيراداتك.',
  },
  {
    icon: Users,
    title: 'صناع قرار معتمدون في الخليج',
    desc: 'ربط مباشر مع مدراء الموارد البشرية والتطوير الساعين لتحقيق مستهدفات التوطين والتحول الرقمي.',
  },
  {
    icon: Target,
    title: 'سياق وبيانات متكاملة لكل فرصة',
    desc: 'تصلك كل فرصة مصحوبة ببيانات تفصيلية عن الشركة، وحجم الاحتياج، ونقاط الألم المحددة بدقة.',
  },
  {
    icon: Clock,
    title: 'كفاءة قصوى في الوقت والموارد',
    desc: 'وفر مئات الساعات من البحث اليدوي بمتوسط 14 يوماً من استلام الطلب حتى التقديم المباشر.',
  },
  {
    icon: BarChart3,
    title: 'نمو مستدام ومستقر للأعمال',
    desc: 'حافظ على تدفق منتظم لفرص الشركات طوال العام، بما في ذلك مواسم الذروة التدريبية.',
  },
  {
    icon: DollarSign,
    title: 'أعلى عائد على الاستثمار وسرعة إغلاق',
    desc: 'تواصل مع عملاء لديهم احتياج تدريبي محدد مسبقاً، مما يقلص دورة المبيعات ويرفع نسب الفوز.',
  },
];

export default async function WhoWeArePage({ params }: { params: Promise<{ lang: Locale }> | { lang: Locale } }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  const featureCards = isAr ? featureCardsAr : featureCardsEn;
  const benefitPoints = isAr ? benefitPointsAr : benefitPointsEn;

  return (
    <>
      <section className="bg-hero-gradient pt-36 pb-24 relative overflow-hidden">
        <div className="container-site max-w-5xl relative z-10 text-center mx-auto px-6">
          <Reveal>
            <span className="chip mx-auto">{isAr ? 'من نحن' : 'Who We Are'}</span>
            <h1 className="mt-6 text-4xl font-semibold sm:text-5xl lg:text-6xl text-slate-800 leading-[1.15] font-heading">
              {isAr ? (
                <>
                  من نحن: منصة التوفيق والربط الرائدة لتدريب الشركات في <span className="text-primary">الخليج العربي</span>
                </>
              ) : (
                <>
                  Who We Are: The GCC Corporate Training <span className="text-primary">Matchmaking Platform</span>
                </>
              )}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto font-normal">
              {isAr
                ? 'نربط شركات ومزودي التدريب بصناع القرار في الشركات والمؤسسات الخليجية الذين لديهم احتياجات وتحديات حقيقية يسعون لحلها.'
                : 'We connect corporate training companies with GCC decision-makers who already have a real workforce challenge to solve.'}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 border-t border-slate-100">
        <div className="container-site mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                {isAr ? 'مخصص لشركات ومراكز التدريب' : 'Built for Training Companies'}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-800 font-heading">
                {isAr ? 'محرك متوقع وموثوق لنمو مبيعات الشركات' : 'A Predictable Engine for Enterprise Growth'}
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                {isAr
                  ? 'مصمم خصيصاً لمزودي التدريب المؤسسي الساعين لاكتساب عملاء بعوائد مستدامة وهوامش ربحية عالية في الخليج.'
                  : 'Designed specifically for corporate training providers seeking sustainable, high-margin client acquisition across the GCC.'}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {featureCards.map((card, index) => {
              const Icon = card.icon;
              const isLarge = index === 0 || index === 3;
              const isFull = index === 4;
              const spanClass = isFull
                ? 'md:col-span-2 lg:col-span-3 rounded-3xl border border-blue-200/80 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50'
                : isLarge
                ? 'md:col-span-2 lg:col-span-2 rounded-3xl border border-slate-200/90 bg-white shadow-sm'
                : 'md:col-span-1 lg:col-span-1 rounded-3xl border border-slate-200/80 bg-slate-50/80';

              return (
                <Reveal key={index} delay={index * 0.08} className={spanClass}>
                  <div className="h-full p-8 md:p-10 transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-0.5 group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-13 h-13 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 p-3">
                          <Icon size={26} />
                        </div>
                        {isLarge && (
                          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                            {isAr ? 'محرك مبيعات مؤسسي' : 'Enterprise Engine'}
                          </span>
                        )}
                        {isFull && (
                          <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                            {isAr ? 'نموذج خالٍ تماماً من المخاطر' : '100% Risk-Free Model'}
                          </span>
                        )}
                      </div>
                      <h3 className={`font-semibold text-slate-800 mb-3 font-heading leading-snug ${isLarge ? 'text-2xl' : 'text-xl'}`}>
                        {card.title}
                      </h3>
                      <p className={`text-slate-600 leading-relaxed ${isLarge ? 'text-base max-w-2xl' : 'text-sm'}`}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80" />
        <div className="container-site max-w-5xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-6 border border-primary/30">
                <ShieldCheck size={14} />
                <span>{isAr ? 'ما نقوم به' : 'What We Do'}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-semibold text-white font-heading leading-tight mb-6">
                {isAr ? (
                  <>
                    ادفع فقط مقابل <span className="text-primary-400">الفرص المؤهلة</span>
                  </>
                ) : (
                  <>
                    Pay Only for <span className="text-primary-400">Qualified Leads</span>
                  </>
                )}
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8">
                {isAr
                  ? 'نعمل بنموذج الدفع لكل فرصة خالي من الاشتراكات الشهرية، مصمم لإلغاء المخاطر عن مزودي التدريب. بدون رسوم تأسيسية أو وعود عشوائية. تدفع فقط عندما نسلمك صانع قرار تم التحقق من هويته واحتياجه التدريبي الفعلي.'
                  : 'We operate on a zero-retainer, pay-per-lead model designed to eliminate risk for training providers. No monthly setup fees, no promises of arbitrary outreach volume. You pay strictly when we deliver a verified decision-maker who has a confirmed corporate training need.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-primary-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-base">
                      {isAr ? 'بدون اشتراكات ثابتة' : 'Zero Retainers'}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {isAr ? 'لا توجد رسوم إدارة أو اشتراك دوري.' : 'No ongoing management or setup fees.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-primary-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-base">
                      {isAr ? 'صناع قرار مؤكدون' : 'Verified Buyers'}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {isAr ? 'قادة الموارد البشرية والتدريب في كبرى الشركات.' : 'Vetted HR & L&D leaders in the GCC.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-primary-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-base">
                      {isAr ? 'ضمان الاستبدال' : 'Replacement Guarantee'}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {isAr ? 'استبدال فوري للفرصة في حال عدم مطابقة المعايير.' : 'Full replacement if criteria are not met.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-site mx-auto px-6 max-w-6xl">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                {isAr ? 'مزايا مثبتة' : 'Proven Advantages'}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-800 font-heading">
                {isAr ? 'لماذا يختار شركاؤنا العمل معنا' : 'Why Our Clients Choose Us'}
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                {isAr
                  ? 'إليك الأسباب التي تجعل قادة تدريب الشركات يتعاونون مع بونت لوك لتسريع نمو أعمالهم.'
                  : 'Here is why corporate training leaders partner with PontLook to accelerate their growth.'}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefitPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Reveal key={index} delay={index * 0.08}>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2 font-heading">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-50 to-primary-50/40 py-24 border-t border-slate-200/60">
        <div className="container-site max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="bg-white border border-primary-100 p-10 md:p-16 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-6">
                {isAr ? 'ضماننا' : 'Our Guarantee'}
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-800 font-heading leading-tight mb-6">
                {isAr ? 'وعدنا لك' : 'Our Promise'}
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
                {isAr ? (
                  <>
                    نسلمك صناع قرار موثوقين في الخليج مع احتياج تدريبي مؤسسي مؤكد...{' '}
                    <span className="text-primary font-semibold">بدون اشتراك شهري. وبدون أي مخاطرة.</span>
                  </>
                ) : (
                  <>
                    We deliver verified GCC decision-makers with a confirmed corporate-training need...{' '}
                    <span className="text-primary font-semibold">No retainer. No risk.</span>
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href={`/${lang}/for-providers`} 
                  className="btn-primary flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  {isAr ? 'ابدأ باستقبال الفرص المؤهلة' : 'Start Receiving Qualified Leads'}
                  <ArrowRight size={18} className="ms-2 rtl:-scale-x-100" />
                </Link>
                
                <Link 
                  href={`/${lang}/contact`} 
                  className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full border border-slate-200 transition-all"
                >
                  {isAr ? 'احجز جلسة استكشافية' : 'Book a Discovery Call'}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
