'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Locale } from '@/i18n';

export default function Navbar({ lang }: Readonly<{ lang: Locale }>) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;
  const dict = useDictionary();

  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/#who-we-are`, label: dict.nav.who_we_are },
    { href: `/${lang}/for-providers`, label: dict.nav.for_providers },
    { href: `/${lang}/find-training`, label: dict.nav.find_training },
    { href: `/${lang}/research`, label: dict.nav.research },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const targetLang = lang === 'en' ? 'ar' : 'en';
  const switchUrl = pathname.replace(new RegExp(String.raw`^\/${lang}`), `/${targetLang}`) || `/${targetLang}`;

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_2px_20px_rgb(0,0,0,0.03)] py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 sm:px-10" aria-label="Main navigation">
        <div className="flex items-center gap-10">
          <Link href={`/${lang}`} className="relative flex h-9 w-9 items-center md:h-10 md:w-10 transition-transform duration-300 hover:scale-105" aria-label="Pontlook home">
            <Image 
              src="/PontLook-Logo.png"
              alt="PontLook Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-slate-700 no-underline hover:text-blue-600 transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-5 text-slate-500">

            {/* Minimal Language Switcher */}
            <Link 
              href={switchUrl} 
              className="flex h-10 items-center justify-center rounded-full border border-slate-200/60 bg-white/50 px-4 text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all duration-300 gap-2" 
              aria-label="Switch Language" 
              title={dict.nav.switch_lang}
            >
              <Globe size={16} />
              <span className="text-[11px] font-bold font-heading tracking-widest">{lang === 'en' ? 'AR' : 'EN'}</span>
            </Link>

            {/* Premium CTA Button */}
            <Link href={`/${lang}/find-training`} className="group relative flex h-10 items-center justify-center overflow-hidden rounded-full bg-slate-900 px-6 text-[13px] font-semibold text-white shadow-md transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5">
              <span className="relative z-10 flex items-center gap-1.5">
                {dict.nav.get_matched} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100" />
              </span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link 
              href={switchUrl} 
              className="flex h-9 items-center justify-center rounded-full border border-slate-200/60 bg-white/50 px-3 text-slate-500 hover:bg-white shadow-sm transition-colors gap-2" 
              aria-label="Switch Language"
            >
              <Globe size={14} />
              <span className="text-[10px] font-bold font-heading tracking-widest">{lang === 'en' ? 'AR' : 'EN'}</span>
            </Link>
            <button
              type="button"
              className="rounded-full p-2 text-slate-700 bg-white shadow-sm border border-slate-100 transition-transform active:scale-95"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Premium Mobile Menu */}
        <AnimatePresence>
          {open && (
            <m.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full border-b border-slate-200/50 bg-white/95 backdrop-blur-2xl p-6 lg:hidden shadow-[0_10px_40px_rgb(0,0,0,0.05)]"
            >
              <ul className="flex flex-col gap-5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`block text-[15px] font-semibold tracking-wide transition-colors ${
                        pathname === l.href ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t border-slate-100 mt-2">
                  <Link href={`/${lang}/find-training`} className="flex w-full items-center justify-center rounded-full bg-slate-900 py-3 text-[14px] font-semibold text-white shadow-md active:scale-[0.98] transition-transform">
                    {dict.nav.get_matched} <ArrowRight size={16} className="ms-2 rtl:-scale-x-100" />
                  </Link>
                </li>
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}