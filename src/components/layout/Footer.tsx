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
    <footer className="relative border-t border-slate-800 bg-slate-950 text-white overflow-hidden">
      <div className="absolute top-0 start-1/4 w-[550px] h-[350px] bg-gradient-to-r from-accent/10 via-accent-secondary/5 to-accent/10 blur-3xl pointer-events-none" />

      <div className="container-site relative z-10 grid gap-8 sm:gap-10 py-12 sm:py-20 md:grid-cols-4 px-4 sm:px-8 lg:px-12">
        <div className="md:col-span-2 space-y-5">
          <Link href={`/${lang}`} className="inline-block transition-opacity hover:opacity-90" aria-label="PontLook home">
            <Image src="/PontLook-Logo.png" alt="PontLook GCC Corporate Training Matchmaking Logo" width={52} height={52} className="object-contain" />
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-slate-400 font-sans">
            {dict.footer.about}
          </p>
          <div className="flex items-center gap-2.5 text-sm text-slate-300 font-medium">
            <MapPin size={16} className="text-accent-secondary shrink-0" />
            <span>{dict.footer.location}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
            <Link href={`/${lang}/privacy-policy`} className="hover:text-white transition-colors">
              {dict.footer.privacy_policy || 'Privacy Policy'}
            </Link>
            <span>•</span>
            <Link href={`/${lang}/terms-of-service`} className="hover:text-white transition-colors">
              {dict.footer.terms_of_service || 'Terms of Service'}
            </Link>
            <span>•</span>
            <Link href={`/${lang}/returns-faq`} className="hover:text-white transition-colors">
              {dict.footer.returns_faq || 'Returns & FAQ'}
            </Link>
          </div>
        </div>

        <nav aria-label="Footer: platform">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">{dict.footer.platform}</p>
          <ul className="mt-5 space-y-3 text-sm font-medium text-slate-400 font-sans">
            <li><Link href={`/${lang}/who-we-are`} className="hover:text-accent-secondary transition-colors">{dict.nav.who_we_are}</Link></li>
            <li><Link href={`/${lang}/for-providers`} className="hover:text-accent-secondary transition-colors">{dict.nav.for_providers}</Link></li>
            <li><Link href={`/${lang}/find-training`} className="hover:text-accent-secondary transition-colors">{dict.nav.find_training}</Link></li>
            <li><Link href={`/${lang}/contact`} className="hover:text-accent-secondary transition-colors">{dict.nav.contact}</Link></li>
            <li><Link href={`/${lang}/faq`} className="hover:text-accent-secondary transition-colors">{dict.nav.faq}</Link></li>
            <li><a href="https://blog.pontlook.com" className="hover:text-accent-secondary transition-colors inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">{dict.nav.blog}</a></li>
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">{dict.footer.get_in_touch}</p>
          <ul className="mt-5 space-y-3 text-sm font-medium text-slate-400 font-sans">
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-accent-secondary shrink-0" />
              <a href="mailto:contact@pontlook.com" className="hover:text-accent-secondary transition-colors">
                contact@pontlook.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Linkedin size={16} className="text-accent-secondary shrink-0" />
              <a href="https://www.linkedin.com/company/pontlook/" className="hover:text-accent-secondary transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-6 bg-slate-950/80 backdrop-blur-md">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 px-4 sm:px-8 lg:px-12">
          <p className="text-xs text-slate-400">
            {dict.footer.rights}
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={14} className="text-accent-secondary" />
            <span>{dict.footer.badge || 'GCC B2B Corporate Matchmaking Platform'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
