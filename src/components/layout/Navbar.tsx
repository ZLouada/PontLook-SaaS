'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Locale } from '@/i18n';
import Button from '@/components/shared/Button';

export default function Navbar({ lang }: Readonly<{ lang: Locale }>) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;
  const dict = useDictionary();

  const otherLang = lang === 'en' ? 'ar' : 'en';
  const switchHref = (() => {
    if (!pathname) return `/${otherLang}`;
    if (pathname === `/${lang}` || pathname === `/${lang}/`) {
      return `/${otherLang}`;
    }
    if (pathname.startsWith(`/${lang}/`)) {
      return pathname.replace(`/${lang}/`, `/${otherLang}/`);
    }
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'ar') {
      segments[0] = otherLang;
      return `/${segments.join('/')}`;
    }
    return `/${otherLang}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  })();

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
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav
        className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 sm:px-10"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-10">
          <Link
            href={`/${lang}`}
            className="relative flex h-9 w-9 items-center md:h-10 md:w-10 transition-transform duration-300 hover:scale-105"
            aria-label="PontLook home"
          >
            <Image
              src="/PontLook-Logo.png"
              alt="PontLook GCC Corporate Training Matchmaking Logo"
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
                    className={`text-sm font-semibold transition-all duration-200 relative py-1.5 ${
                      isActive ? 'text-accent' : 'text-slate-700 hover:text-accent'
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <m.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={switchHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200/90 bg-white/90 text-slate-700 hover:text-accent hover:border-accent shadow-xs active:scale-95 transition-all"
              aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe size={13} className="text-accent" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </Link>

            <Button
              href={`/${lang}/find-training`}
              variant="primary"
              size="sm"
              leftIcon={<ShieldCheck size={16} className="text-white/90" />}
              rightIcon={
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100"
                />
              }
            >
              {dict.nav.get_matched}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={switchHref}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold border border-slate-200/90 bg-white/95 text-slate-700 hover:text-accent shadow-xs active:scale-95 transition-all"
              aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe size={13} className="text-accent" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </Link>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 bg-white/95 backdrop-blur-md shadow-xs border border-slate-200/90 transition-all active:scale-90 hover:bg-slate-50"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full border-b border-slate-200/70 bg-white/95 backdrop-blur-2xl p-5 sm:p-6 lg:hidden shadow-md transform-gpu"
            >
              <ul className="flex flex-col gap-2">
                {links.map((l) => {
                  const isActive = pathname === l.href;
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className={`flex items-center justify-between text-base font-semibold tracking-wide transition-colors py-3 px-4 rounded-2xl ${
                          isActive
                            ? 'text-accent bg-accent/5 font-bold'
                            : 'text-slate-700 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <span>{l.label}</span>
                        {isActive && <span className="h-2 w-2 rounded-full bg-accent" />}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-4 border-t border-slate-100 mt-2 space-y-3">
                  <Button
                    href={`/${lang}/find-training`}
                    variant="primary"
                    size="md"
                    className="w-full justify-center shadow-md py-4 text-base font-bold"
                    leftIcon={<ShieldCheck size={18} className="text-white/90" />}
                    rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
                  >
                    {dict.nav.get_matched}
                  </Button>

                  <div className="flex items-center justify-between pt-2 px-1 text-xs text-slate-500">
                    <span>Language / اللغة:</span>
                    <Link
                      href={switchHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <Globe size={13} className="text-accent" />
                      <span>{lang === 'en' ? 'العربية' : 'English'}</span>
                    </Link>
                  </div>
                </li>
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}