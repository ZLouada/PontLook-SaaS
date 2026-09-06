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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
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
    <m.header
      initial={false}
      animate={
        isDesktop
          ? {
              y: scrolled ? 12 : 0,
              width: scrolled ? '90%' : '100%',
              maxWidth: scrolled ? 1060 : 1920,
              borderRadius: scrolled ? 9999 : 0,
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.98)',
              boxShadow: scrolled
                ? '0 16px 36px -8px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)'
                : '0 1px 0px 0px rgba(226, 232, 240, 0.8)',
            }
          : {
              y: 0,
              width: '100%',
              maxWidth: '100%',
              borderRadius: 0,
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.98)',
              boxShadow: scrolled
                ? '0 4px 20px -4px rgba(0, 0, 0, 0.08)'
                : '0 1px 0px 0px rgba(226, 232, 240, 0.8)',
            }
      }
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
        mass: 0.85,
      }}
      className={`fixed top-0 inset-x-0 mx-auto z-50 backdrop-blur-xl border-b border-slate-200/80 transition-all duration-300 transform-gpu will-change-transform ${
        isDesktop && scrolled ? 'lg:border lg:py-2.5 lg:px-5' : 'py-3 sm:py-3.5 px-4 sm:px-8 lg:px-12'
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
          className="flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02] active:scale-95"
          aria-label="PontLook home"
        >
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center">
            <Image
              src="/PontLook-Logo.png"
              alt="PontLook GCC Corporate Training Matchmaking Logo"
              fill
              className="object-contain"
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

        {/* Right Actions: Language Switcher & Magnetic Get Matched Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={switchHref}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200/80 bg-white/70 text-slate-700 hover:text-[#0052FF] hover:border-[#0052FF]/40 shadow-2xs active:scale-95 transition-all duration-200"
            aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          >
            <Globe size={13} className="text-[#0052FF]" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </Link>

          <Link
            href={`/${lang}/find-training`}
            className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white rounded-full px-5 py-2 text-xs font-semibold shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all transform-gpu hover:scale-105 active:scale-95 group"
          >
            <ShieldCheck size={14} className="text-white/90" />
            <span>{dict.nav.get_matched}</span>
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100" />
          </Link>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={switchHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200/80 bg-white/90 text-slate-700 hover:text-[#0052FF] hover:border-[#0052FF]/30 shadow-2xs active:scale-95 transition-all min-h-[38px]"
              aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe size={13} className="text-[#0052FF]" />
              <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-xl text-slate-800 bg-white/90 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-90 shadow-2xs"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Over Drawer Sheet */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Frosted glass backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Slide-over Drawer Sheet */}
            <m.div
              initial={slideInitial}
              animate={{ x: 0 }}
              exit={slideExit}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 end-0 z-50 flex h-full w-[88vw] max-w-[370px] flex-col justify-between border-s border-slate-200/80 bg-white/95 backdrop-blur-2xl p-6 shadow-2xl overflow-y-auto transform-gpu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <Link
                    href={`/${lang}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5"
                    aria-label="PontLook home"
                  >
                    <div className="relative flex h-8 w-8 shrink-0 items-center">
                      <Image
                        src="/PontLook-Logo.png"
                        alt="PontLook Logo"
                        fill
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

                <ul className="mt-6 flex flex-col gap-2">
                  {links.map((l) => {
                    const isActive = pathname === l.href;
                    return (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className={`flex min-h-[50px] items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold tracking-wide transition-all active:scale-[0.98] ${
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

              <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-4 pb-8">
                <Button
                  href={`/${lang}/find-training`}
                  onClick={() => setOpen(false)}
                  variant="primary"
                  size="md"
                  className="w-full justify-center shadow-md py-4 text-base font-bold min-h-[52px] rounded-2xl"
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all active:scale-95 min-h-[42px]"
                  >
                    <Globe size={14} className="text-[#0052FF]" />
                    <span>{lang === 'en' ? 'العربية' : 'English'}</span>
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </m.header>
  );
}