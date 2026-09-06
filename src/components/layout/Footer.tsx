'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';

export default function Footer() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.split('/')[1] || 'en';
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer data-nav-dark="true" className="relative border-t border-slate-800 bg-slate-950 text-white overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 start-1/4 w-[600px] h-[350px] bg-accent/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="container-site relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 py-12 sm:py-20 px-4 sm:px-8 lg:px-12">
        {/* Column 1: Brand & Delaware Office */}
        <div className="space-y-4">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 min-h-[44px]" aria-label="PontLook home">
            <Image src="/PontLook-Logo-White.png" alt="PontLook GCC Corporate Training Matchmaking Logo" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold tracking-tight text-white font-heading">PontLook</span>
          </Link>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
            {dict.footer.about}
          </p>
          <div className="pt-2 flex items-start gap-2.5 text-xs text-slate-300 font-medium leading-snug">
            <MapPin size={15} className="text-accent shrink-0 mt-0.5" />
            <span>{dict.footer.location}</span>
          </div>
        </div>

        {/* Column 2: Platform Links */}
        <nav aria-label="Footer: platform" className="space-y-3 sm:space-y-4">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">{dict.footer.platform}</p>
          <ul className="space-y-1 text-sm font-medium text-slate-400">
            <li><Link href={`/${lang}/who-we-are`} className="hover:text-white transition-colors py-1.5 inline-block">{dict.nav.who_we_are}</Link></li>
            <li><Link href={`/${lang}/for-providers`} className="hover:text-white transition-colors py-1.5 inline-block">{dict.nav.for_providers}</Link></li>
            <li><Link href={`/${lang}/find-training`} className="hover:text-white transition-colors py-1.5 inline-block">{dict.nav.find_training}</Link></li>
            <li><Link href={`/${lang}/faq`} className="hover:text-white transition-colors py-1.5 inline-block">{dict.nav.faq}</Link></li>
            <li><a href="https://blog.pontlook.com" className="hover:text-white transition-colors py-1.5 inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">{dict.nav.blog}</a></li>
          </ul>
        </nav>

        {/* Column 3: Legal & Compliance */}
        <div className="space-y-3 sm:space-y-4">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
            {lang === 'ar' ? 'الامتثال والشروط' : 'Legal & Compliance'}
          </p>
          <ul className="space-y-1 text-sm font-medium text-slate-400">
            <li>
              <Link href={`/${lang}/privacy-policy`} className="hover:text-white transition-colors py-1.5 inline-block">
                {dict.footer.privacy_policy || 'Privacy Policy'}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/terms-of-service`} className="hover:text-white transition-colors py-1.5 inline-block">
                {dict.footer.terms_of_service || 'Terms of Service'}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/returns-faq`} className="hover:text-white transition-colors py-1.5 inline-block">
                {dict.footer.returns_faq || 'Returns & FAQ'}
              </Link>
            </li>
            <li className="pt-2 text-xs text-slate-500 font-mono">
              Firstnestcare, LLC · Delaware DE
            </li>
          </ul>
        </div>

        {/* Column 4: Get In Touch */}
        <div className="space-y-3 sm:space-y-4">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">{dict.footer.get_in_touch}</p>
          <ul className="space-y-2 text-sm font-medium text-slate-400">
            <li>
              <a href="mailto:contact@pontlook.com" className="flex items-center gap-2.5 hover:text-white transition-colors py-1.5 inline-flex">
                <Mail size={15} className="text-accent shrink-0" />
                <span>contact@pontlook.com</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/pontlook/" className="flex items-center gap-2.5 hover:text-white transition-colors py-1.5 inline-flex" target="_blank" rel="noopener noreferrer">
                <Linkedin size={15} className="text-accent shrink-0" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li className="pt-2 text-xs text-slate-500">
              {lang === 'ar' ? 'الرياض · دبي · نيوارك ديلاوير' : 'Riyadh · Dubai · Newark DE'}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-6 bg-slate-950/90 backdrop-blur-md">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 px-4 sm:px-8 lg:px-12 text-center sm:text-start">
          <p className="text-xs text-slate-400">
            {dict.footer.rights}
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <ShieldCheck size={14} className="text-accent" />
            <span>{dict.footer.badge || 'GCC B2B Corporate Matchmaking Platform'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
