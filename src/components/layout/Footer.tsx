'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Mail, MapPin, ShieldCheck, ArrowRight } from '@/components/icons';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { m } from 'framer-motion';
import IconFrame from '@/components/shared/IconFrame';
import BorderBeam from '@/components/shared/BorderBeam';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

export default function Footer() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.split('/')[1] === 'ar' ? 'ar' : 'en';
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer data-nav-dark="true" className="relative bg-black text-neutral-400 overflow-hidden">
      {/* 1. HORIZON BRAND LOCKUP (PRE-FOOTER ELEMENT) */}
      <div className="relative pt-0 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-black">
        {/* Ambient glowing radial backlight */}
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-b from-orange-500/[0.04] to-transparent blur-[140px] pointer-events-none rounded-full transform-gpu" />

        {/* Top shadow gradient overlay blending into the horizon line */}
        <div className="absolute top-0 inset-x-0 h-6 sm:h-10 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-10" />

        {/* Horizon Wordmark Lockup (subtle negative margin clipping so it emerges beneath horizon border) */}
        <div className="relative -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 overflow-hidden select-none pointer-events-none transform-gpu flex items-center justify-center">
          <div className="flex items-center justify-center px-4">
            {/* Giant Metallic Gradient Wordmark */}
            <span className="text-4xl xs:text-5xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-bold tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/30 to-white/0 leading-none font-sans">
              PontLook
            </span>
          </div>
        </div>

        {/* Centered Floating Consultation Card Over Horizon */}
        <div className="container-site relative z-20 px-3.5 xs:px-4 sm:px-8 lg:px-12 mx-auto">
          <CardTilt3D maxTilt={4} glareOpacity={0.12} className="max-w-2xl mx-auto -mt-10">
            <div className="relative z-10 w-full rounded-2xl sm:rounded-3xl border border-[#26282D] hover:border-white/30 bg-[#0F1013]/95 backdrop-blur-2xl p-4 xs:p-6 sm:p-8 md:p-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_50px_-10px_rgba(0,0,0,0.8)] text-center flex flex-col items-center gap-4 xs:gap-5 sm:gap-6 transform-gpu transition-all duration-300 overflow-hidden">
              <BorderBeam size={260} duration={14} colorFrom="#FF5C00" colorTo="#4D7CFF" />
              {/* Subtle top inner sheen */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-2.5 sm:space-y-3 max-w-xl">
                <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight font-heading">
                  {dict.final_cta?.card_title || 'Ready to discuss your training objectives?'}
                </h3>
                <p className="text-xs xs:text-sm sm:text-base text-neutral-400 font-normal leading-relaxed font-sans">
                  {dict.final_cta?.card_subtitle ||
                    'Connect directly with our enterprise advisory team to explore verified provider matching or discuss partnership opportunities across the region.'}
                </p>
              </div>

              <Magnetic strength={0.25} activeDistance={45} className="w-full sm:w-auto">
                <Link
                  href={`/${lang}/contact`}
                  className="relative z-10 inline-flex items-center justify-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 hover:border-white/30 font-medium px-5 xs:px-8 py-3 sm:py-3.5 rounded-xl text-xs xs:text-sm sm:text-base min-h-[46px] xs:min-h-[48px] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:scale-[1.02] active:scale-[0.98] transition-all group w-full sm:w-auto"
                >
                  <span>{dict.final_cta?.btn_call || (lang === 'ar' ? 'احجز استشارة' : 'Book a consultation')}</span>
                  <ArrowRight size={17} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </Magnetic>
            </div>
          </CardTilt3D>
        </div>
      </div>

      {/* 2. UNIVERSAL 4-COLUMN FOOTER LAYOUT */}
      <div className="bg-black text-neutral-400 pt-12 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-12">
        <m.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="container-site relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mx-auto"
        >
          {/* Column 1: Mission & Registered Entity */}
          <m.div variants={staggerItem} className="space-y-4">
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-400 font-normal">
              {dict.footer?.about ||
                'We identify enterprise organizations experiencing verified workforce challenges and connect them with the right corporate training providers. Qualified opportunities only, no retainers, no cold outreach.'}
            </p>
            <div className="pt-2 flex items-start gap-2.5 text-xs text-neutral-300 font-medium leading-snug">
              <IconFrame variant="blue" size="xs">
                <MapPin size={13} />
              </IconFrame>
              <span className="pt-1">31 Continental Dr, Newark, Delaware 19713, US</span>
            </div>
          </m.div>

          {/* Column 2: Platform */}
          <m.nav variants={staggerItem} aria-label="Footer: platform" className="space-y-3 sm:space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-200">PLATFORM</p>
            <ul className="space-y-1 text-sm font-medium text-neutral-400">
              <li>
                <Link href={`/${lang}/who-we-are`} className="hover:text-white transition-colors py-1.5 inline-block">
                  {dict.nav?.who_we_are || 'Who we are'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/for-providers`} className="hover:text-white transition-colors py-1.5 inline-block">
                  {dict.nav?.for_providers || "I'm a training provider"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/find-training`} className="hover:text-white transition-colors py-1.5 inline-block">
                  {dict.nav?.find_training || "I'm looking for training"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="hover:text-white transition-colors py-1.5 inline-block">
                  {dict.nav?.faq || 'FAQ'}
                </Link>
              </li>
              <li>
                <a href="https://blog.pontlook.com/" className="hover:text-white transition-colors py-1.5 inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                  {dict.nav?.blog || 'Blog'}
                </a>
              </li>
            </ul>
          </m.nav>

          {/* Column 3: Legal & Compliance */}
          <m.div variants={staggerItem} className="space-y-3 sm:space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-200">
              LEGAL &amp; COMPLIANCE
            </p>
            <ul className="space-y-1 text-sm font-medium text-neutral-400">
              <li>
                <Link href={`/${lang}/privacy-policy`} className="hover:text-white transition-colors py-1.5 inline-block">
                  {dict.footer?.privacy_policy || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms-of-service`} className="hover:text-white transition-colors py-1.5 inline-block">
                  {dict.footer?.terms_of_service || 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/returns-faq`} className="hover:text-white transition-colors py-1.5 inline-block">
                  {dict.footer?.returns_faq || 'Returns & FAQ'}
                </Link>
              </li>
              <li className="pt-2 text-xs text-neutral-400 font-medium">
                Firstnestcare, LLC · Delaware DE
              </li>
            </ul>
          </m.div>

          {/* Column 4: Get In Touch */}
          <m.div variants={staggerItem} className="space-y-3 sm:space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-200">GET IN TOUCH</p>
            <ul className="space-y-2 text-sm font-medium text-neutral-400">
              <li>
                <a href="mailto:contact@pontlook.com" className="flex items-center gap-2.5 hover:text-white transition-colors py-1 inline-flex group">
                  <IconFrame variant="brand" size="xs">
                    <Mail size={13} />
                  </IconFrame>
                  <span>contact@pontlook.com</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/pontlook" className="flex items-center gap-2.5 hover:text-white transition-colors py-1 inline-flex group" target="_blank" rel="noopener noreferrer">
                  <IconFrame variant="brand" size="xs">
                    <Linkedin size={13} />
                  </IconFrame>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li className="pt-2 text-xs text-neutral-400">
                {lang === 'ar' ? 'الرياض · دبي · نيوارك ديلاوير' : 'Riyadh · Dubai · Newark DE'}
              </li>
            </ul>
          </m.div>
        </m.div>

        {/* Bottom Copyright Line */}
        <div className="container-site border-t border-[#26282D] mt-12 pt-8 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-400 text-center sm:text-start">
          <p>
            &copy; {year} PontLook, operating under Firstnestcare, LLC. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 text-neutral-400">
            <ShieldCheck size={14} className="text-[#FF5C00]" />
            <span>{dict.footer?.badge || 'B2B Corporate Matchmaking Platform'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
