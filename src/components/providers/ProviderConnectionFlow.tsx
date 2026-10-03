'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m, useReducedMotion } from 'framer-motion';
import {
  Building2,
  Zap,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from '@/components/icons';
import Magnetic from '@/components/shared/Magnetic';

interface ProviderConnectionFlowProps {
  lang: string;
}

export default function ProviderConnectionFlow({ lang }: ProviderConnectionFlowProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();

  const nodes = [
    {
      id: 'provider',
      type: 'supply',
      icon: Building2,
      badge: isAr ? 'مزود التدريب' : 'TRAINING FIRM',
      title: isAr ? 'مركزك التدريبي' : 'Your Training Firm',
      desc: isAr ? 'خبرات تدريبية متخصصة' : 'Specialized GCC Expertise',
      meta: isAr ? 'طاقة استيعابية جاهزة' : 'Delivery Ready',
      color: '#FF5C00',
    },
    {
      id: 'pontlock',
      type: 'hub',
      isLogo: true,
      badge: isAr ? 'محرك الربط' : 'CONNECTION ENGINE',
      title: isAr ? 'محرك بونت لوك' : 'Pontlock Platform',
      desc: isAr ? 'مطابقة آلية وتأهيل فوري' : 'Verified BANT Audit & Match',
      meta: isAr ? 'صفر اشتراكات · ضمان 100%' : 'Zero Retainer · 100% SLA',
      color: '#FF5C00',
    },
    {
      id: 'channel',
      type: 'route',
      icon: Zap,
      badge: isAr ? 'قناة التعاقد' : 'DIRECT PIPELINE',
      title: isAr ? 'تعاقد مباشر' : 'Direct Engagement',
      desc: isAr ? 'بدون وساطة أو مناقصات باردة' : 'Zero Cold Bidding Cycles',
      meta: isAr ? 'كراسة شروط معتمدة' : 'Pre-Scoped Mandates',
      color: '#FFFFFF',
    },
    {
      id: 'enterprise',
      type: 'demand',
      icon: Briefcase,
      badge: isAr ? 'المنشأة المتعاقدة' : 'CORPORATE BUYER',
      title: isAr ? 'عملاء مؤسسيون' : 'Enterprise Client',
      desc: isAr ? 'ميزانية معتمدة 120-250 ألف ر.س' : 'SAR 120k–250k+ Budget',
      meta: isAr ? 'الرياض · دبي · الدوحة' : 'Riyadh · Dubai · Doha',
      color: '#3B82F6',
    },
  ];

  return (
    <section id="connection-bridge" className="relative py-16 sm:py-24 px-3.5 xs:px-4 sm:px-6 lg:px-8 bg-black overflow-hidden scroll-mt-16">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF5C00]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Main Ecomflow-Style Card Container */}
        <div className="rounded-3xl border border-white/10 bg-[#0B0B0C]/90 backdrop-blur-xl p-5 xs:p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Top Bar: Headline & Cycle Time Counter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              {/* Pontlock Network Icon Miniature */}
              <div className="w-10 h-10 rounded-xl bg-[#FF5C00]/10 border border-[#FF5C00]/30 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 rounded-full bg-[#FF5C00] shadow-[0_0_12px_#FF5C00]" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#FF5C00] font-semibold font-mono block">
                  {isAr ? 'نموذج الربط المباشر' : 'DIRECT CONNECTION ARCHITECTURE'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading mt-0.5">
                  {isAr ? 'كيف تربط بونت لوك بين خبرتك والطلب المؤسسي' : 'Connecting Training Expertise with Confirmed Demand'}
                </h3>
              </div>
            </div>

            {/* Time metric badge */}
            <div className="flex items-baseline gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl shrink-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#FF5C00] font-mono">
                {isAr ? '٢–٥ أيام*' : '2–5 Days*'}
              </span>
              <span className="text-xs text-neutral-400 leading-tight">
                {isAr ? 'من المطابقة إلى التوقيع' : 'Match to Signed Contract'}
              </span>
            </div>
          </div>

          {/* Interactive Horizontal 4-Node Flow */}
          <div className="py-10 sm:py-12 relative">
            {/* Visual connector line behind nodes (Desktop) */}
            <div className="hidden lg:block absolute top-[44%] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#FF5C00]/30 via-[#FF5C00] to-[#3B82F6]/50 z-0">
              {/* Animated Light Pulse traveling across the line */}
              {!reduce && (
                <m.div
                  className="w-16 h-[3px] bg-white rounded-full shadow-[0_0_12px_#ffffff] -translate-y-[0.5px]"
                  animate={{ x: isAr ? ['600%', '0%'] : ['0%', '600%'] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
              {nodes.map((node, index) => {
                const IconComponent = node.icon;
                return (
                  <m.div
                    key={node.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 }}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 relative group ${
                      node.isLogo
                        ? 'bg-gradient-to-b from-[#1A120B] to-[#0D0B0A] border-[#FF5C00]/40 shadow-[0_0_30px_rgba(255,92,0,0.15)] ring-1 ring-[#FF5C00]/30'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      {/* Node Header Pill */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono">
                          {node.badge}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500">0{index + 1}</span>
                      </div>

                      {/* Icon / Central Logo */}
                      <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center relative">
                        {node.isLogo ? (
                          /* Pontlock Central Logo Container */
                          <div className="w-14 h-14 rounded-2xl bg-[#FF5C00] p-2.5 flex items-center justify-center shadow-[0_0_25px_rgba(255,92,0,0.5)] relative">
                            <Image
                              src="/images/brand/pontlook-icon-white.png"
                              alt="PontLook"
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-105"
                            style={{
                              borderColor: `${node.color}40`,
                              backgroundColor: `${node.color}15`,
                            }}
                          >
                            {IconComponent && <IconComponent size={22} style={{ color: node.color }} />}
                          </div>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div className="text-center">
                        <h4 className="text-base font-bold text-white mb-1 font-heading">
                          {node.title}
                        </h4>
                        <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                          {node.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Status Chip */}
                    <div className="mt-4 pt-3 border-t border-white/5 text-center">
                      <span className="text-[11px] font-medium text-neutral-300">
                        {node.meta}
                      </span>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Footnote & Risk-Relief SLAs */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-300 font-sans">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={15} />
                <span>{isAr ? 'صفر اشتراكات شهرية أو رسوم مقدماً' : 'Zero monthly retainers or upfront fees'}</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={15} />
                <span>{isAr ? 'ميزانيات معتمدة بحد أدنى 120 ألف ر.س' : 'SAR 120k+ Confirmed minimum budget'}</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck size={15} />
                <span>{isAr ? 'ضمان استبدال الفرصة 100% خلال 48 ساعة' : '100% Lead replacement SLA within 48h'}</span>
              </span>
            </div>
          </div>

          {/* High-Conscience Conversion Trigger Block */}
          <div className="mt-8 sm:mt-10 p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-[#141416] via-[#101012] to-[#141416] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-start">
              <h4 className="text-lg sm:text-xl font-bold text-white mb-1 font-heading">
                {isAr ? 'جاهز لملء جدول تدريبك بطلبات مؤكدة؟' : 'Ready to fill your delivery schedule with qualified clients?'}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-xl">
                {isAr
                  ? 'أكمل نموذج التأهيل المبدئي خلال 4 دقائق وسيتواصل معك فريق الشراكات خلال 48 ساعة.'
                  : 'Complete our 4-minute qualification form. Our team will activate your profile within 48 hours.'}
              </p>
              <div className="mt-2 text-[11px] text-neutral-500 font-sans">
                {isAr
                  ? '🔒 انضمام مجاني · استكمال الطلب في 4 دقائق · احتفظ بكامل أتعاب تنفيذ التدريب بنسبة 100%.'
                  : '🔒 Free to join · 4-minute application · Keep 100% of your training delivery fees.'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <Magnetic strength={0.22} activeDistance={35} className="w-full sm:w-auto">
                <Link
                  href={`/${lang}/for-providers/apply`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#FF5C00] hover:bg-[#FF6A1A] transition-all shadow-lg shadow-orange-500/25 text-sm min-h-[48px] active:scale-95"
                >
                  <span>{isAr ? 'تقديم طلب الانضمام كشريك تدريب' : 'Apply as Verified Provider'}</span>
                  <ArrowRight size={16} className="rtl:-scale-x-100" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.22} activeDistance={35} className="w-full sm:w-auto">
                <a
                  href="#why-partner"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all text-sm min-h-[48px] active:scale-95"
                >
                  <span>{isAr ? 'مزايا ونموذج الشراكة' : 'Partnership Model & SLAs'}</span>
                </a>
              </Magnetic>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
