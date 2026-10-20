import Link from 'next/link';
import { Linkedin, Mail, MapPin, ShieldCheck } from '@/components/icons';
import IconFrame from '@/components/shared/IconFrame';
import FooterCtaCard from './FooterCtaCard';
import { getDictionary, Locale } from '@/i18n';

interface FooterProps {
  lang?: Locale;
}

export default async function Footer({ lang = 'en' }: FooterProps) {
  const dict = await getDictionary(lang);
  const year = new Date().getFullYear();

  return (
    <footer data-nav-dark="true" className="relative bg-black text-neutral-400 overflow-hidden">
      {/* 1. HORIZON BRAND LOCKUP (PRE-FOOTER ELEMENT) */}
      <div className="relative pt-0 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-black">
        {/* Ambient glowing radial backlight */}
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-b from-orange-500/[0.04] to-transparent blur-[140px] pointer-events-none rounded-full transform-gpu" />

        {/* Top shadow gradient overlay blending into the horizon line */}
        <div className="absolute top-0 inset-x-0 h-6 sm:h-10 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-10" />

        {/* Horizon Wordmark Lockup */}
        <div className="relative -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 overflow-hidden select-none pointer-events-none transform-gpu flex items-center justify-center">
          <div className="flex items-center justify-center px-4">
            <span className="text-[3rem] 2xs:text-[3.5rem] xs:text-[4.25rem] sm:text-8xl md:text-9xl lg:text-[10.5rem] font-heading font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/30 to-white/0 leading-none">
              PontLook
            </span>
          </div>
        </div>

        {/* Centered Floating Consultation Card Over Horizon */}
        <div className="container-site relative z-20 px-3.5 xs:px-4 sm:px-8 lg:px-12 mx-auto">
          <FooterCtaCard
            lang={lang}
            cardTitle={dict.final_cta?.card_title || 'Ready to discuss your training objectives?'}
            cardSubtitle={
              dict.final_cta?.card_subtitle ||
              'Connect directly with our enterprise advisory team to explore verified provider matching or discuss partnership opportunities across the region.'
            }
            btnCall={dict.final_cta?.btn_call || (lang === 'ar' ? 'احجز استشارة' : 'Book a consultation')}
          />
        </div>
      </div>

      {/* 2. UNIVERSAL 4-COLUMN FOOTER LAYOUT */}
      <div className="bg-black text-neutral-400 pt-12 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-12">
        <div className="container-site relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mx-auto">
          {/* Column 1: Mission & Registered Entity */}
          <div className="space-y-4">
            <p className="text-[0.8125rem] sm:text-sm leading-relaxed text-neutral-400 font-sans font-normal">
              {dict.footer?.about ||
                'We identify enterprise organizations experiencing verified workforce challenges and connect them with the right corporate training providers. Qualified opportunities only, no retainers, no cold outreach.'}
            </p>
            <div className="pt-2 flex items-start gap-2.5 text-[0.8125rem] text-neutral-300 font-sans font-medium leading-snug">
              <IconFrame variant="blue" size="xs">
                <MapPin size={13} />
              </IconFrame>
              <span className="pt-1">31 Continental Dr, Newark, Delaware 19713, US</span>
            </div>
          </div>

          {/* Column 2: Platform */}
          <nav aria-label="Footer: platform" className="space-y-3 sm:space-y-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-200">PLATFORM</p>
            <ul className="space-y-1 font-sans text-sm font-medium text-neutral-400">
              <li>
                <Link href={`/${lang}/who-we-are`} className="inline-flex min-h-[44px] items-center hover:text-white transition-colors sm:min-h-0 sm:py-1.5">
                  {dict.nav?.who_we_are || 'Who we are'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/for-providers`} className="inline-flex min-h-[44px] items-center hover:text-white transition-colors sm:min-h-0 sm:py-1.5">
                  {dict.nav?.for_providers || "I'm a training provider"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/find-training`} className="inline-flex min-h-[44px] items-center hover:text-white transition-colors sm:min-h-0 sm:py-1.5">
                  {dict.nav?.find_training || "I'm looking for training"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="inline-flex min-h-[44px] items-center hover:text-white transition-colors sm:min-h-0 sm:py-1.5">
                  {dict.nav?.faq || 'FAQ'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/resources`} className="inline-flex min-h-[44px] items-center gap-1 hover:text-white transition-colors sm:min-h-0 sm:py-1.5">
                  {dict.nav?.resources || 'Resources'}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: Legal & Compliance */}
          <div className="space-y-3 sm:space-y-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-200">
              LEGAL &amp; COMPLIANCE
            </p>
            <ul className="space-y-1 font-sans text-sm font-medium text-neutral-400">
              <li>
                <Link href={`/${lang}/privacy-policy`} className="inline-flex min-h-[44px] items-center hover:text-white transition-colors sm:min-h-0 sm:py-1.5">
                  {dict.footer?.privacy_policy || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms-of-service`} className="inline-flex min-h-[44px] items-center hover:text-white transition-colors sm:min-h-0 sm:py-1.5">
                  {dict.footer?.terms_of_service || 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/returns-faq`} className="inline-flex min-h-[44px] items-center hover:text-white transition-colors sm:min-h-0 sm:py-1.5">
                  {dict.footer?.returns_faq || 'Returns & FAQ'}
                </Link>
              </li>
              <li className="pt-2 font-mono text-xs text-neutral-400 font-medium">
                Firstnestcare, LLC · Delaware DE
              </li>
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="space-y-3 sm:space-y-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-200">GET IN TOUCH</p>
            <ul className="space-y-2 font-sans text-sm font-medium text-neutral-400">
              <li>
                <a href="mailto:contact@pontlook.com" className="group inline-flex min-h-[44px] items-center gap-2.5 hover:text-white transition-colors sm:min-h-0 sm:py-1">
                  <IconFrame variant="brand" size="xs">
                    <Mail size={13} />
                  </IconFrame>
                  <span>contact@pontlook.com</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/pontlook" className="group inline-flex min-h-[44px] items-center gap-2.5 hover:text-white transition-colors sm:min-h-0 sm:py-1" target="_blank" rel="noopener noreferrer">
                  <IconFrame variant="brand" size="xs">
                    <Linkedin size={13} />
                  </IconFrame>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li className="pt-2 text-[0.8125rem] text-neutral-400">
                {lang === 'ar' ? 'الرياض · دبي · نيوارك ديلاوير' : 'Riyadh · Dubai · Newark DE'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="container-site border-t border-[#26282D] mt-12 pt-8 pb-safe mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.8125rem] font-medium text-neutral-400 text-center sm:text-start">
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
