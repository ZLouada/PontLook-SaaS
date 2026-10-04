'use client';

import React from 'react';
import { m } from 'framer-motion';
import type { Locale } from '@/i18n/config';

interface StatsStripProps {
  lang?: Locale;
}

// TODO: replace with verified figures once officially certified in production
const STATS = [
  { value: '6', label: 'GCC Markets Covered', labelAr: 'أسواق خليجية مغطاة' },
  { value: '12+', label: 'Industries Served', labelAr: 'قطاعات حيوية مخدومة' },
  { value: '15+', label: 'Challenge Categories Tracked', labelAr: 'فئة كفاءات مشخصة' },
  { value: '3', label: 'Lead Quality Tiers (A/B/C)', labelAr: 'مستويات لتأهيل الفرص (A/B/C)' },
];

export default function StatsStrip({ lang = 'en' }: StatsStripProps) {
  const isAr = lang === 'ar';

  return (
    <section
      data-nav-light="true"
      className="relative bg-white text-[#0F172A] py-20 sm:py-24 border-b border-slate-100 overflow-hidden"
    >
      <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 text-center shadow-xs"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2451BF] tracking-tight mb-2 font-heading">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600 font-sans">
                {isAr ? stat.labelAr : stat.label}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
