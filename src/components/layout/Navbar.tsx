'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  const isRtl = lang === 'ar';
  const slideInitial = isRtl ? { x: '-100%' } : { x: '100%' };
  const slideExit = isRtl ? { x: '-100%' } : { x: '100%' };

  return (
    <>
      <header
        className={`fixed inset-x-0 mx-auto z-50 transition-all duration-300 ${
          scrolled
            ? 'top-2 sm:top-3 w-[92%] sm:w-[90%] max-w-5xl rounded-full bg-white/94 backdrop-blur-xl border border-slate-200/80 shadow-apple py-2 sm:py-2.5 px-3.5 sm:px-6'
            : 'top-0 w-full max-w-full rounded-none bg-white/98 backdrop-blur-xl border-b border-slate-200/80 py-3 sm:py-4 px-4 sm:px-8 lg:px-12'
        }`}
      >
        <nav
          onMouseLeave={() => setHoveredIndex(null)}
          className="container-site !px-0 flex items-center justify-between w-full"
          aria-label="Main navigation"
        >
          {/* Brand Logo & Name */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 sm:gap-2.5 transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            aria-label="PontLook home"
          >
            <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center">
              <Image
                src="/PontLook-Logo-nav.webp"
                alt="PontLook GCC Corporate Training Matchmaking Logo"
                width={32}
                height={32}
                className="object-contain h-7 w-7 sm:h-8 sm:w-8"
                priority
              />
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
              PontLook
            </span>
          </Link>

          {/* Center Navigation Links with Odysser Gliding Indicator Pill */}
          <ul className="hidden lg:flex items-center gap-1 relative px-2">
            {links.map((l, index) => {
              const isActive = pathname === l.href;
              const isHovered = hoveredIndex === index;

              return (
                <li key={l.href} className="relative">
                  <Link
                    href={l.href}
                    onMouseEnter={() => setHoveredIndex(index)}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`relative z-10 block px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'text-[#0052FF]'
                        : isHovered
                        ? 'text-slate-900'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {l.label}
                  </Link>

                  {/* Kinetic Morphing Pill Indicator */}
                  {isHovered && (
                    <m.div
                      layoutId="nav-pill"
                      className="absolute inset-0 z-0 rounded-full bg-slate-100/90"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Active Subtle Bottom Dot if not currently hovered */}
                  {isActive && !isHovered && (
                    <m.div
                      layoutId="nav-active-indicator"
                      className="absolute bottom-0 inset-x-3 h-0.5 rounded-full bg-[#0052FF]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right Actions: Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={switchHref}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200/80 bg-white/70 text-slate-700 hover:text-[#0052FF] hover:border-[#0052FF]/40 shadow-2xs active:scale-95 transition-all duration-200"
              aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe size={13} className="text-[#0052FF]" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </Link>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              <button
                type="button"
                className="flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-full text-slate-800 bg-white/90 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-90 shadow-2xs"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-label="Open navigation menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-Over Drawer Sheet rendered via Portal directly into document.body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[9999] lg:hidden" aria-modal="true" role="dialog">
                {/* Full-screen frosted glass backdrop */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[9998]"
                  aria-hidden="true"
                />

                {/* Slide-over Drawer Sheet spanning full 100dvh */}
                <m.div
                  initial={slideInitial}
                  animate={{ x: 0 }}
                  exit={slideExit}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed inset-y-0 end-0 z-[9999] flex h-full h-[100dvh] w-[85vw] max-w-[340px] flex-col justify-between border-s border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xl overflow-y-auto"
                  role="document"
                  aria-label="Mobile navigation"
                >
                  <div>
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                      <Link
                        href={`/${lang}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5"
                        aria-label="PontLook home"
                      >
                        <div className="relative flex h-8 w-8 shrink-0 items-center">
                          <Image
                            src="/PontLook-Logo-nav.webp"
                            alt="PontLook Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <span className="font-heading font-bold text-xl text-slate-900 tracking-tight">
                          PontLook
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="flex h-10 w-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors active:scale-90"
                        aria-label="Close menu"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Navigation Links List */}
                    <ul className="mt-6 flex flex-col gap-1.5">
                      {links.map((l) => {
                        const isActive = pathname === l.href;
                        return (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={() => setOpen(false)}
                              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              className={`flex min-h-[48px] items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold tracking-wide transition-all active:scale-[0.98] ${
                                isActive
                                  ? 'text-[#0052FF] bg-[#0052FF]/10 font-bold border border-[#0052FF]/20'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              <span>{l.label}</span>
                              {isActive && (
                                <span className="text-[11px] font-mono font-bold text-[#0052FF] bg-white px-2 py-0.5 rounded-md shadow-2xs">
                                  {lang === 'ar' ? 'الحالي' : 'Active'}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="mt-8 pt-6 border-t border-slate-100 space-y-4 pb-8">
                    <Button
                      href={`/${lang}/find-training`}
                      onClick={() => setOpen(false)}
                      variant="primary"
                      size="md"
                      className="w-full justify-center shadow-md py-3.5 text-base font-bold min-h-[50px] rounded-2xl"
                      leftIcon={<ShieldCheck size={18} className="text-white/90" />}
                      rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
                    >
                      {dict.nav.get_matched}
                    </Button>

                    <div className="flex items-center justify-between pt-2 px-1">
                      <span className="text-xs font-semibold text-slate-500">
                        {lang === 'ar' ? 'اللغة / Language:' : 'Language / اللغة:'}
                      </span>
                      <Link
                        href={switchHref}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all active:scale-95 min-h-[40px]"
                      >
                        <Globe size={14} className="text-[#0052FF]" />
                        <span>{lang === 'en' ? 'العربية' : 'English'}</span>
                      </Link>
                    </div>
                  </div>
                </m.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}