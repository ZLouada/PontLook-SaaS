'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck, Globe, Search } from '@/components/icons';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Locale } from '@/i18n';
import Button from '@/components/shared/Button';
import Signal from '@/components/shared/Signal';
import ScrollProgress from '@/components/shared/ScrollProgress';
import CommandMenu from '@/components/shared/CommandMenu';
import Magnetic from '@/components/shared/Magnetic';

export default function Navbar({ lang }: Readonly<{ lang: Locale }>) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname() || `/${lang}`;
  const dict = useDictionary();
  const isForProviders = pathname?.includes('/for-providers') || pathname?.endsWith('/providers');

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
    let rafId: number | null = null;

    const checkNavTheme = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled((prev) => (prev ? scrollY > 8 : scrollY > 24));

      const navEl = headerRef.current;
      const navRect = navEl?.getBoundingClientRect();
      const checkY = navRect ? navRect.top + navRect.height / 2 : 40;

      const lightElements = document.querySelectorAll(
        '[data-nav-light="true"], [data-nav-theme="light"]'
      );

      let foundLight = false;
      for (let i = 0; i < lightElements.length; i++) {
        const el = lightElements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= checkY && rect.bottom >= checkY) {
          foundLight = true;
          break;
        }
      }

      setIsLightSection(foundLight);
    };

    const onScrollOrResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkNavTheme);
    };

    checkNavTheme();
    const timer = setTimeout(checkNavTheme, 150);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [pathname]);

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
      <ScrollProgress />
      <header
        ref={headerRef}
        className={`fixed inset-x-0 mx-auto z-50 liquid-glass-morph-header ${
          scrolled
            ? `top-0 w-full rounded-none px-4 pb-3 pt-[max(1.125rem,calc(env(safe-area-inset-top,0px)+0.75rem))] ${
                isLightSection ? 'liquid-glass-mobile-light' : 'liquid-glass-mobile-scrolled'
              } ${
                isDesktop
                  ? isLightSection
                    ? 'sm:top-3 sm:w-[90%] sm:max-w-5xl sm:rounded-full sm:py-2.5 sm:px-6 liquid-glass-capsule-light'
                    : 'sm:top-3 sm:w-[90%] sm:max-w-5xl sm:rounded-full sm:py-2.5 sm:px-6 liquid-glass-capsule-dark'
                  : ''
              }`
            : isLightSection
            ? 'top-0 w-full max-w-full rounded-none px-4 sm:px-8 lg:px-12 pb-3.5 sm:py-4 pt-[max(1.25rem,calc(env(safe-area-inset-top,0px)+0.875rem))] liquid-glass-top-light'
            : 'top-0 w-full max-w-full rounded-none px-4 sm:px-8 lg:px-12 pb-3.5 sm:py-4 pt-[max(1.25rem,calc(env(safe-area-inset-top,0px)+0.875rem))] liquid-glass-top-dark'
        }`}
      >
        <nav
          onMouseLeave={() => setHoveredIndex(null)}
          className="container-site !px-0 flex items-center justify-between w-full"
          aria-label="Main navigation"
        >
          {/* Brand Logo - Orange on light sections, White on dark/AMOLED sections */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 sm:gap-2.5 transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            aria-label="PontLook home"
          >
            <div className="relative flex items-center h-7 sm:h-8 w-[125px] sm:w-[140px]">
              {/* Orange Logo - shown on white/light sections */}
              <Image
                src="/images/brand/pontlook-logo-orange.png"
                alt="PontLook Logo"
                width={140}
                height={35}
                className={`absolute inset-y-0 start-0 h-7 sm:h-8 w-auto object-contain transition-opacity duration-300 ${
                  isLightSection ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                priority
              />
              {/* White Logo - shown on dark/AMOLED sections */}
              <Image
                src="/images/brand/pontlook-logo-white.png"
                alt="PontLook Logo"
                width={140}
                height={35}
                className={`absolute inset-y-0 start-0 h-7 sm:h-8 w-auto object-contain transition-opacity duration-300 ${
                  isLightSection ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                priority
              />
            </div>
          </Link>

          {/* navigation links */}
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
                    className={`relative z-10 block px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                      isLightSection
                        ? isActive
                          ? 'text-neutral-950 font-bold'
                          : isHovered
                          ? 'text-neutral-950'
                          : 'text-neutral-700 hover:text-neutral-950'
                        : isActive
                        ? 'text-white font-semibold'
                        : isHovered
                        ? 'text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </Link>

                  {/* hover pill */}
                  {isHovered && (
                    <m.div
                      layoutId="nav-pill"
                      className={`absolute inset-0 z-0 rounded-full backdrop-blur-md ${
                        isLightSection
                          ? 'bg-black/[0.06] border border-black/10'
                          : 'bg-white/[0.08] border border-[#26282D]'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Active indicator dot */}
                  {isActive && !isHovered && (
                    <m.div
                      layoutId="nav-active-indicator"
                      className={`absolute bottom-0 inset-x-3 h-0.5 rounded-full ${
                        isForProviders
                          ? 'bg-[#FF5C00] shadow-[0_0_8px_rgba(255,92,0,0.7)]'
                          : isLightSection
                          ? 'bg-[#FF5C00] shadow-[0_0_8px_rgba(255,92,0,0.4)]'
                          : 'bg-[#0052FF] shadow-[0_0_8px_rgba(0,82,255,0.7)]'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* language switcher and actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Command Palette Trigger (Cmd+K) */}
            <Magnetic strength={0.16} activeDistance={25}>
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-all duration-200 ${
                  isLightSection
                    ? 'border border-neutral-300/80 bg-white/70 text-neutral-700 hover:text-neutral-950 hover:bg-white hover:border-neutral-400 shadow-xs'
                    : 'border border-[#26282D] bg-[#16171B] text-neutral-400 hover:text-white hover:border-white/30'
                }`}
                aria-label={lang === 'ar' ? 'البحث السريع (⌘K)' : 'Quick search (⌘K)'}
              >
                <Search size={13} className={isLightSection ? 'text-neutral-700' : 'text-neutral-400'} />
                <span className="hidden md:inline">{lang === 'ar' ? 'بحث...' : 'Search...'}</span>
                <kbd
                  className={`hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono border ${
                    isLightSection
                      ? 'bg-neutral-100 text-neutral-700 border-neutral-300'
                      : 'bg-white/[0.08] text-neutral-300 border-white/10'
                  }`}
                >
                  ⌘K
                </kbd>
              </button>
            </Magnetic>

            <Magnetic strength={0.16} activeDistance={25} className="hidden lg:inline-flex">
              <Link
                href={switchHref}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-all duration-200 ${
                  isLightSection
                    ? 'border border-neutral-300/80 bg-white/70 text-neutral-800 hover:text-neutral-950 hover:bg-white hover:border-neutral-400 shadow-xs'
                    : 'border border-[#26282D] bg-[#16171B] text-neutral-300 hover:text-white hover:border-white/30'
                }`}
                aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <Globe size={13} className={isLightSection ? 'text-neutral-700' : 'text-neutral-400'} />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </Link>
            </Magnetic>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href={switchHref}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-all duration-200 ${
                  isLightSection
                    ? 'border border-neutral-300/80 bg-white/70 text-neutral-800 hover:text-neutral-950 hover:bg-white hover:border-neutral-400 shadow-xs'
                    : 'border border-[#26282D] bg-[#16171B] text-neutral-300 hover:text-white hover:border-white/30'
                }`}
                aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <Globe size={13} className={isLightSection ? 'text-neutral-700' : 'text-neutral-400'} />
                <span className="font-semibold">{lang === 'en' ? 'العربية' : 'EN'}</span>
              </Link>

              <button
                type="button"
                className={`flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-full transition-all active:scale-90 ${
                  isLightSection
                    ? 'text-neutral-800 bg-white/80 border border-neutral-300/80 hover:bg-white hover:text-black shadow-xs'
                    : 'text-neutral-300 bg-[#16171B] border border-[#26282D] hover:bg-white/10 hover:text-white'
                }`}
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
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
                  aria-hidden="true"
                />

                {/* Slide-over Drawer Sheet spanning full 100dvh */}
                <m.div
                  initial={slideInitial}
                  animate={{ x: 0 }}
                  exit={slideExit}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed inset-y-0 end-0 z-[9999] flex h-full h-[100dvh] w-[85vw] max-w-[340px] flex-col justify-between border-s border-[#26282D] bg-[#0F1013] px-5 sm:px-6 pt-[max(1.25rem,calc(env(safe-area-inset-top,0px)+1rem))] pb-[max(1.5rem,calc(env(safe-area-inset-bottom,0px)+1rem))] shadow-2xl overflow-y-auto"
                  role="document"
                  aria-label="Mobile navigation"
                >
                  <div>
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between pb-5 border-b border-[#26282D]">
                      <Link
                        href={`/${lang}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5"
                        aria-label="PontLook home"
                      >
                        <div className="relative flex items-center">
                          <Image
                            src="/images/brand/pontlook-logo-white.png"
                            alt="PontLook Logo"
                            width={140}
                            height={35}
                            className="h-7 w-auto object-contain"
                            priority
                          />
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="flex h-10 w-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-xl bg-[#16171B] hover:bg-white/10 text-neutral-300 hover:text-white transition-colors active:scale-90 border border-[#26282D]"
                        aria-label="Close menu"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Live Network Status in Mobile Drawer */}
                    <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[#26282D] bg-[#16171B] text-neutral-300 w-fit">
                      <Signal />
                      <span className="text-[11px] text-neutral-300">
                        {lang === 'ar' ? 'المطابقة المباشرة نشطة' : 'Live Matchmaking Active'}
                      </span>
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
                              className={`flex min-h-[48px] items-center justify-between px-4 py-3 rounded-2xl text-base font-medium tracking-wide transition-all active:scale-[0.98] ${
                                isActive
                                  ? 'text-white bg-[#16171B] border border-[#26282D]'
                                  : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
                              }`}
                            >
                              <span>{l.label}</span>
                              {isActive && (
                                <span className="text-[11px] font-medium text-white bg-[#26282D] px-2 py-0.5 rounded-md">
                                  {lang === 'ar' ? 'الحالي' : 'Active'}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Regional Directory Shortcuts */}
                    <div className="mt-5 pt-4 border-t border-[#26282D]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2 px-1">
                        {lang === 'ar' ? 'المراكز الإقليمية · الخليج' : 'Regional Hubs · GCC'}
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/${lang}/sa`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-[#16171B] hover:text-white hover:bg-white/[0.04] border border-[#26282D] transition-colors min-h-[40px]"
                        >
                          <span className="text-sm">🇸🇦</span>
                          <span className="truncate">{lang === 'ar' ? 'السعودية' : 'Saudi Arabia'}</span>
                        </Link>
                        <Link
                          href={`/${lang}/ae`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-[#16171B] hover:text-white hover:bg-white/[0.04] border border-[#26282D] transition-colors min-h-[40px]"
                        >
                          <span className="text-sm">🇦🇪</span>
                          <span className="truncate">{lang === 'ar' ? 'الإمارات' : 'UAE'}</span>
                        </Link>
                        <Link
                          href={`/${lang}/qa`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-[#16171B] hover:text-white hover:bg-white/[0.04] border border-[#26282D] transition-colors min-h-[40px]"
                        >
                          <span className="text-sm">🇶🇦</span>
                          <span className="truncate">{lang === 'ar' ? 'قطر' : 'Qatar'}</span>
                        </Link>
                        <Link
                          href={`/${lang}/kw`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-[#16171B] hover:text-white hover:bg-white/[0.04] border border-[#26282D] transition-colors min-h-[40px]"
                        >
                          <span className="text-sm">🇰🇼</span>
                          <span className="truncate">{lang === 'ar' ? 'الكويت' : 'Kuwait'}</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="mt-8 pt-6 border-t border-[#26282D] space-y-4 pb-8">
                    {isForProviders ? (
                      <Link
                        href={`/${lang}/for-providers/apply`}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-semibold text-sm w-full shadow-lg shadow-orange-500/25 active:scale-95 transition-all min-h-[48px]"
                      >
                        <ShieldCheck size={18} />
                        <span>{lang === 'ar' ? 'انضم كشريك تدريب' : 'Apply as Provider'}</span>
                        <ArrowRight size={17} className="rtl:-scale-x-100" />
                      </Link>
                    ) : (
                      <Button
                        href={`/${lang}/find-training`}
                        onClick={() => setOpen(false)}
                        variant="primary"
                        size="md"
                        className="w-full justify-center min-h-[48px]"
                        leftIcon={<ShieldCheck size={18} />}
                        rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
                      >
                        {dict.nav.get_matched}
                      </Button>
                    )}

                    <div className="flex items-center justify-between pt-2 px-1">
                      <span className="text-xs font-medium text-neutral-400">
                        {lang === 'ar' ? 'اللغة / Language:' : 'Language / اللغة:'}
                      </span>
                      <Link
                        href={switchHref}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium text-xs text-neutral-300 bg-[#16171B] hover:bg-white/[0.08] hover:text-white border border-[#26282D] transition-all active:scale-95 min-h-[40px]"
                      >
                        <Globe size={14} className="text-neutral-400" />
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

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} lang={lang} />
    </>
  );
}