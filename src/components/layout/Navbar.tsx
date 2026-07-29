'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
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
    { href: `/${lang}/who-we-are`, label: dict.nav.who_we_are },
    { href: `/${lang}/for-providers`, label: dict.nav.for_providers },
    { href: `/${lang}/find-training`, label: dict.nav.find_training },
    { href: `/${lang}/contact`, label: dict.nav.contact },
    { href: 'https://blog.pontlook.com', label: dict.nav.blog, external: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 transform-gpu will-change-transform ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-[0_4px_25px_rgb(0,0,0,0.04)] py-2.5' 
          : 'bg-transparent py-4.5'
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
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-slate-700 hover:text-primary'
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <m.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 inset-x-0 h-0.5 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-5">
            {/* Premium CTA Button */}
            <Link 
              href={`/${lang}/find-training`} 
              className="group relative flex h-10 items-center justify-center overflow-hidden rounded-full bg-slate-900 px-6 text-[13px] font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transform-gpu"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShieldCheck size={15} className="text-blue-400 group-hover:text-white transition-colors" />
                {dict.nav.get_matched}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              type="button"
              className="rounded-full p-2.5 text-slate-700 bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/80 transition-transform active:scale-95"
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
              className="absolute inset-x-0 top-full border-b border-slate-200/80 bg-white/95 backdrop-blur-2xl p-6 lg:hidden shadow-[0_20px_40px_rgb(0,0,0,0.08)] transform-gpu"
            >
              <ul className="flex flex-col gap-4">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`block text-[15px] font-semibold tracking-wide transition-colors py-2 px-3 rounded-xl ${
                        pathname === l.href ? 'text-primary bg-primary/5' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t border-slate-100 mt-2">
                  <Link href={`/${lang}/find-training`} className="flex w-full items-center justify-center rounded-full bg-slate-900 py-3 text-[14px] font-semibold text-white shadow-md active:scale-[0.98] transition-transform">
                    <ShieldCheck size={16} className="me-2 text-blue-400" />
                    {dict.nav.get_matched}
                    <ArrowRight size={16} className="ms-2 rtl:-scale-x-100" />
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