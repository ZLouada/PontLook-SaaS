'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Search,
  ChevronDown,
  Building2,
  Briefcase,
  Users,
  Mail,
  ExternalLink,
  BookOpen,
  Headphones,
  Download,
  Calendar,
  Folder,
  RefreshCw,
} from '@/components/icons';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Locale } from '@/i18n';
import Button from '@/components/shared/Button';
import Signal from '@/components/shared/Signal';
import ScrollProgress from '@/components/shared/ScrollProgress';
import CommandMenu from '@/components/shared/CommandMenu';
import Magnetic from '@/components/shared/Magnetic';
import { staggerContainer, staggerItemMobile } from '@/lib/motion';

type DropdownKey = 'solutions' | 'about' | 'resources' | null;

export default function Navbar({ lang }: Readonly<{ lang: Locale }>) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname() || `/${lang}`;
  const dict = useDictionary();
  const isForProviders = pathname?.includes('/for-providers') || pathname?.endsWith('/providers');
  const isRtl = lang === 'ar';

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

  // Close dropdowns on route changes
  useEffect(() => {
    setActiveDropdown(null);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Window scroll & light section intersection detection
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

  // Desktop viewport check
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  // Click outside and escape key handling for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDropdownEnter = useCallback((key: DropdownKey) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(key);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  }, []);

  const isSolutionsActive =
    pathname.includes('/find-training') ||
    pathname.includes('/for-providers');

  const isAboutActive =
    pathname.includes('/who-we-are') ||
    pathname.includes('/contact');

  const isResourcesActive =
    pathname.includes('/resources') ||
    pathname.includes('/blog');

  const slideInitial = isRtl ? { x: '-100%' } : { x: '100%' };
  const slideExit = isRtl ? { x: '-100%' } : { x: '100%' };

  return (
    <>
      <ScrollProgress />
      <header
        ref={headerRef}
        className={`fixed inset-x-0 mx-auto z-50 liquid-glass-morph-header transition-all duration-300 ${
          scrolled
            ? `top-2 xs:top-3 w-[94%] sm:w-[92%] max-w-5xl rounded-full py-2 sm:py-2.5 px-3.5 xs:px-4 sm:px-6 ${
                isLightSection ? 'liquid-glass-capsule-light' : 'liquid-glass-capsule-dark'
              }`
            : isLightSection
            ? 'top-0 w-full max-w-full rounded-none px-3.5 xs:px-4 sm:px-6 lg:px-8 xl:px-12 pb-3.5 sm:py-4 pt-[max(1.25rem,calc(env(safe-area-inset-top,0px)+0.875rem))] liquid-glass-top-light'
            : 'top-0 w-full max-w-full rounded-none px-3.5 xs:px-4 sm:px-6 lg:px-8 xl:px-12 pb-3.5 sm:py-4 pt-[max(1.25rem,calc(env(safe-area-inset-top,0px)+0.875rem))] liquid-glass-top-dark'
        }`}
      >
        <nav
          className="container-site !px-0 flex items-center justify-between w-full min-w-0"
          aria-label="Main navigation"
        >
          {/* Brand Logo: Orange on 'I'm provider', Black on white background, White on black background */}
          <Link
            href={`/${lang}`}
            onClick={() => {
              setActiveDropdown(null);
              setOpen(false);
            }}
            className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02] active:scale-95 shrink-0"
            aria-label="PontLook home"
          >
            <div className="relative h-7 w-7 xs:h-8 xs:w-8 shrink-0 flex items-center justify-center">
              <Image
                src={
                  isLightSection
                    ? '/images/brand/pontlook-icon-black.png'
                    : isForProviders
                    ? '/images/brand/pontlook-icon-orange.png'
                    : '/images/brand/pontlook-icon-white.png'
                }
                alt="PontLook"
                width={32}
                height={32}
                className="h-full w-full object-contain"
                priority
                unoptimized
              />
            </div>

            {/* "PontLook" brand title */}
            <span
              className={`font-heading font-extrabold tracking-tight text-lg xs:text-xl whitespace-nowrap overflow-hidden select-none transition-colors duration-300 ${
                isLightSection
                  ? 'text-neutral-950'
                  : isForProviders
                  ? 'text-[#FF5C00]'
                  : 'text-white'
              }`}
            >
              PontLook
            </span>
          </Link>

          {/* Desktop Navigation Links with Solutions & About Dropdowns (No "Home" link) */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-1.5 relative px-1 xl:px-2 shrink-0">
            {/* Solutions Dropdown Menu */}
            <li
              className="relative"
              onMouseEnter={() => handleDropdownEnter('solutions')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown((prev) => (prev === 'solutions' ? null : 'solutions'))
                }
                className={`relative z-10 inline-flex items-center gap-1 px-3 xl:px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                  isLightSection
                    ? isSolutionsActive || activeDropdown === 'solutions'
                      ? 'text-neutral-950 font-bold bg-black/[0.05]'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/[0.04]'
                    : isSolutionsActive || activeDropdown === 'solutions'
                    ? 'text-white font-semibold bg-white/[0.12] border border-white/20'
                    : 'text-neutral-200 hover:text-white hover:bg-white/[0.06]'
                }`}
                aria-expanded={activeDropdown === 'solutions'}
              >
                <span>{dict.nav.solutions}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    activeDropdown === 'solutions' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Solutions Popover Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <m.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={`absolute top-full mt-2 start-0 w-[310px] rounded-2xl p-2 z-50 shadow-2xl transition-colors ${
                      isLightSection
                        ? 'bg-white/95 backdrop-blur-xl border border-neutral-200 text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
                        : 'bg-[#121316]/95 backdrop-blur-xl border border-[#26282D] text-white shadow-[0_25px_50px_rgba(0,0,0,0.6)]'
                    }`}
                  >
                    <div className="space-y-1">
                      {/* Looking for training */}
                      <Link
                        href={`/${lang}/find-training`}
                        onClick={() => setActiveDropdown(null)}
                        className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                          isLightSection
                            ? 'hover:bg-neutral-100/80 active:bg-neutral-200/70'
                            : 'hover:bg-white/[0.06] active:bg-white/[0.1]'
                        }`}
                      >
                        <div
                          className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all ${
                            isLightSection
                              ? 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950'
                              : 'bg-white/10 text-white border border-white/20 group-hover:bg-white group-hover:text-black group-hover:border-white'
                          }`}
                        >
                          <Building2 size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-semibold transition-colors ${
                                isLightSection
                                  ? 'text-neutral-900 group-hover:text-black'
                                  : 'text-white group-hover:text-white'
                              }`}
                            >
                              {dict.nav.enterprise_opt}
                            </span>
                            <ArrowRight
                              size={12}
                              className={`transition-all transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100 ${
                                isLightSection
                                  ? 'text-neutral-400 group-hover:text-black'
                                  : 'text-neutral-400 group-hover:text-white'
                              }`}
                            />
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5 leading-normal">
                            {dict.nav.enterprise_opt_desc}
                          </p>
                        </div>
                      </Link>

                      {/* Training provider */}
                      <Link
                        href={`/${lang}/for-providers`}
                        onClick={() => setActiveDropdown(null)}
                        className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                          isLightSection
                            ? 'hover:bg-neutral-100/80 active:bg-neutral-200/70'
                            : 'hover:bg-white/[0.06] active:bg-white/[0.1]'
                        }`}
                      >
                        <div
                          className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all ${
                            isLightSection
                              ? 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950'
                              : 'bg-white/10 text-white border border-white/20 group-hover:bg-white group-hover:text-black group-hover:border-white'
                          }`}
                        >
                          <Briefcase size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-semibold transition-colors ${
                                isLightSection
                                  ? 'text-neutral-900 group-hover:text-black'
                                  : 'text-white group-hover:text-white'
                              }`}
                            >
                              {dict.nav.provider_opt}
                            </span>
                            <ArrowRight
                              size={12}
                              className={`transition-all transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100 ${
                                isLightSection
                                  ? 'text-neutral-400 group-hover:text-black'
                                  : 'text-neutral-400 group-hover:text-white'
                              }`}
                            />
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5 leading-normal">
                            {dict.nav.provider_opt_desc}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </li>

            {/* About Dropdown Menu */}
            <li
              className="relative"
              onMouseEnter={() => handleDropdownEnter('about')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown((prev) => (prev === 'about' ? null : 'about'))
                }
                className={`relative z-10 inline-flex items-center gap-1 px-3 xl:px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                  isLightSection
                    ? isAboutActive || activeDropdown === 'about'
                      ? 'text-neutral-950 font-bold bg-black/[0.05]'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/[0.04]'
                    : isAboutActive || activeDropdown === 'about'
                    ? 'text-white font-semibold bg-white/[0.12] border border-white/20'
                    : 'text-neutral-200 hover:text-white hover:bg-white/[0.06]'
                }`}
                aria-expanded={activeDropdown === 'about'}
              >
                <span>{dict.nav.about}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    activeDropdown === 'about' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* About Popover Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'about' && (
                  <m.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={`absolute top-full mt-2 start-0 w-[290px] rounded-2xl p-2 z-50 shadow-2xl transition-colors ${
                      isLightSection
                        ? 'bg-white/95 backdrop-blur-xl border border-neutral-200 text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
                        : 'bg-[#121316]/95 backdrop-blur-xl border border-[#26282D] text-white shadow-[0_25px_50px_rgba(0,0,0,0.6)]'
                    }`}
                  >
                    <div className="space-y-1">
                      {/* Who We Are */}
                      <Link
                        href={`/${lang}/who-we-are`}
                        onClick={() => setActiveDropdown(null)}
                        className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                          isLightSection
                            ? 'hover:bg-neutral-100/80 active:bg-neutral-200/70'
                            : 'hover:bg-white/[0.06] active:bg-white/[0.1]'
                        }`}
                      >
                        <div
                          className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all ${
                            isLightSection
                              ? 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950'
                              : 'bg-white/10 text-white border border-white/20 group-hover:bg-white group-hover:text-black group-hover:border-white'
                          }`}
                        >
                          <Users size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-semibold transition-colors ${
                                isLightSection
                                  ? 'text-neutral-900 group-hover:text-black'
                                  : 'text-white group-hover:text-white'
                              }`}
                            >
                              {dict.nav.who_we_are}
                            </span>
                            <ArrowRight
                              size={12}
                              className={`transition-all transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100 ${
                                isLightSection
                                  ? 'text-neutral-400 group-hover:text-black'
                                  : 'text-neutral-400 group-hover:text-white'
                              }`}
                            />
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5 leading-normal">
                            {dict.nav.who_we_are_desc}
                          </p>
                        </div>
                      </Link>

                      {/* Contact */}
                      <Link
                        href={`/${lang}/contact`}
                        onClick={() => setActiveDropdown(null)}
                        className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                          isLightSection
                            ? 'hover:bg-neutral-100/80 active:bg-neutral-200/70'
                            : 'hover:bg-white/[0.06] active:bg-white/[0.1]'
                        }`}
                      >
                        <div
                          className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all ${
                            isLightSection
                              ? 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950'
                              : 'bg-white/10 text-white border border-white/20 group-hover:bg-white group-hover:text-black group-hover:border-white'
                          }`}
                        >
                          <Mail size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-semibold transition-colors ${
                                isLightSection
                                  ? 'text-neutral-900 group-hover:text-black'
                                  : 'text-white group-hover:text-white'
                              }`}
                            >
                              {dict.nav.contact}
                            </span>
                            <ArrowRight
                              size={12}
                              className={`transition-all transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100 ${
                                isLightSection
                                  ? 'text-neutral-400 group-hover:text-black'
                                  : 'text-neutral-400 group-hover:text-white'
                              }`}
                            />
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5 leading-normal">
                            {dict.nav.contact_desc}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </li>

            {/* Resources Dropdown Menu */}
            <li
              className="relative"
              onMouseEnter={() => handleDropdownEnter('resources')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown((prev) => (prev === 'resources' ? null : 'resources'))
                }
                className={`relative z-10 inline-flex items-center gap-1 px-3 xl:px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                  isLightSection
                    ? isResourcesActive || activeDropdown === 'resources'
                      ? 'text-neutral-950 font-bold bg-black/[0.05]'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/[0.04]'
                    : isResourcesActive || activeDropdown === 'resources'
                    ? 'text-white font-semibold bg-white/[0.12] border border-white/20'
                    : 'text-neutral-200 hover:text-white hover:bg-white/[0.06]'
                }`}
                aria-expanded={activeDropdown === 'resources'}
              >
                <span>{dict.nav.resources}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    activeDropdown === 'resources' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Resources Popover Dropdown (Inspired by GoodHabitz 3-column mega-menu with solid dark background) */}
              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <m.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={`absolute top-full mt-2.5 ltr:right-0 xl:ltr:end-[-60px] rtl:left-0 xl:rtl:start-[-60px] w-[min(690px,calc(100vw-2.5rem))] rounded-3xl p-5 z-50 shadow-2xl transition-colors ${
                      isLightSection
                        ? 'bg-white border border-neutral-200 text-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.14)]'
                        : 'bg-[#000000] border border-white/15 text-white shadow-[0_30px_70px_rgba(0,0,0,0.95)]'
                    }`}
                  >
                    <div className="grid grid-cols-12 gap-5 items-stretch">
                      {/* Column 1: Resources Hub Overview (Folder Icon + Title + Caption) */}
                      <div className="col-span-4 ltr:border-r rtl:border-l border-neutral-200/70 dark:border-white/10 ltr:pr-4 rtl:pl-4 flex flex-col justify-between">
                        <Link
                          href={`/${lang}/resources`}
                          onClick={() => setActiveDropdown(null)}
                          className={`group p-4 rounded-2xl transition-all duration-200 h-full flex flex-col justify-between ${
                            isLightSection
                              ? 'bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80'
                              : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10'
                          }`}
                        >
                          <div>
                            <div
                              className={`h-10 w-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${
                                isLightSection
                                  ? 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                                  : 'bg-white/10 text-white border border-white/20'
                              }`}
                            >
                              <Folder size={20} />
                            </div>
                            <h4
                              className={`text-sm font-bold font-heading transition-colors ${
                                isLightSection ? 'text-neutral-950' : 'text-white'
                              }`}
                            >
                              {dict.nav.resources}
                            </h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed font-normal">
                              {isRtl
                                ? 'تصفح كافة مواردنا لتطوير استراتيجيات التدريب وبناء الكفاءات المؤسسية.'
                                : 'Browse all our resources to boost your L&D strategy.'}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-neutral-200/50 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                            <span>{isRtl ? 'استعراض الكل' : 'Explore all'}</span>
                            <ArrowRight size={13} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      </div>

                      {/* Column 2: Resources List (Blog, Events, Downloads, Case Studies, Podcasts) */}
                      <div className="col-span-4 space-y-1 flex flex-col justify-center">
                        {/* Blog */}
                        <Link
                          href={`/${lang}/resources/blog`}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                            isLightSection
                              ? 'hover:bg-neutral-100 text-neutral-800 hover:text-black'
                              : 'hover:bg-white/[0.08] text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isLightSection
                              ? 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 group-hover:text-black'
                              : 'bg-white/[0.06] text-neutral-300 border border-white/10 group-hover:bg-white/[0.12] group-hover:text-white'
                          }`}>
                            <BookOpen size={15} />
                          </div>
                          <span className="text-xs font-semibold">{dict.nav.blog}</span>
                        </Link>

                        {/* Events */}
                        <Link
                          href={`/${lang}/resources/events`}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                            isLightSection
                              ? 'hover:bg-neutral-100 text-neutral-800 hover:text-black'
                              : 'hover:bg-white/[0.08] text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isLightSection
                              ? 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 group-hover:text-black'
                              : 'bg-white/[0.06] text-neutral-300 border border-white/10 group-hover:bg-white/[0.12] group-hover:text-white'
                          }`}>
                            <Calendar size={15} />
                          </div>
                          <span className="text-xs font-semibold">{dict.nav.events}</span>
                        </Link>

                        {/* Downloads */}
                        <Link
                          href={`/${lang}/resources/downloads`}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                            isLightSection
                              ? 'hover:bg-neutral-100 text-neutral-800 hover:text-black'
                              : 'hover:bg-white/[0.08] text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isLightSection
                              ? 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 group-hover:text-black'
                              : 'bg-white/[0.06] text-neutral-300 border border-white/10 group-hover:bg-white/[0.12] group-hover:text-white'
                          }`}>
                            <Download size={15} />
                          </div>
                          <span className="text-xs font-semibold">{dict.nav.downloads}</span>
                        </Link>



                        {/* Podcasts */}
                        <Link
                          href={`/${lang}/resources/podcasts`}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                            isLightSection
                              ? 'hover:bg-neutral-100 text-neutral-800 hover:text-black'
                              : 'hover:bg-white/[0.08] text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isLightSection
                              ? 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 group-hover:text-black'
                              : 'bg-white/[0.06] text-neutral-300 border border-white/10 group-hover:bg-white/[0.12] group-hover:text-white'
                          }`}>
                            <Headphones size={15} />
                          </div>
                          <span className="text-xs font-semibold">{dict.nav.podcasts}</span>
                        </Link>
                      </div>

                      {/* Column 3: Featured Visual Card */}
                      <div className="col-span-4">
                        <Link
                          href={`/${lang}/resources/events`}
                          onClick={() => setActiveDropdown(null)}
                          className={`group relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl ${
                            isLightSection
                              ? 'border border-neutral-200 hover:border-neutral-400 bg-neutral-900 text-white'
                              : 'border border-white/15 hover:border-white/30 bg-[#090A0D] text-white'
                          }`}
                        >
                          {/* Image banner with overlay badge */}
                          <div className="relative h-28 w-full bg-neutral-900 overflow-hidden">
                            <Image
                              src="/executive_training_room.jpg"
                              alt="Human Skills Fest"
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute top-2.5 start-2.5">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                                {isRtl ? "قمة المهارات '٢٦" : "Skills Fest '26"}
                              </span>
                            </div>
                          </div>

                          {/* Solid Dark container matching screenshot theme */}
                          <div className={`p-3.5 flex-1 flex flex-col justify-between ${
                            isLightSection
                              ? 'bg-neutral-900 text-white'
                              : 'bg-[#090A0D] text-white'
                          }`}>
                            <div>
                              <h5 className="text-xs font-bold text-white group-hover:text-[#FF5C00] transition-colors leading-snug">
                                {isRtl ? 'قمة مهارات المستقبل | ٧ – ٩ أكتوبر' : 'Human Skills Fest | 7 – 9 Oct'}
                              </h5>
                              <p className="text-[11px] text-neutral-300 line-clamp-2 mt-1 leading-normal font-normal">
                                {isRtl
                                  ? 'انضم إلى قادة الموارد البشرية والتدريب في هذا الحدث الافتراضي لمدة ٣ أيام'
                                  : 'Join HR and L&D professionals for this 3-day virtual event'}
                              </p>
                            </div>

                            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-neutral-300 group-hover:text-white">
                              <span>{isRtl ? 'سجل حضورك الآن' : 'Reserve your spot'}</span>
                              <ArrowRight size={12} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Right actions: Language Switcher, and Sleek "Let's talk ↗" CTA */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <Magnetic strength={0.16} activeDistance={25} className="hidden lg:inline-flex shrink-0">
              <Link
                href={switchHref}
                className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-all duration-200 shrink-0 whitespace-nowrap ${
                  isLightSection
                    ? 'border border-neutral-300/80 bg-white/70 text-neutral-800 hover:text-neutral-950 hover:bg-white hover:border-neutral-400 shadow-xs'
                    : 'border border-white/20 bg-white/[0.08] text-neutral-200 hover:text-white hover:border-white/40 shadow-xs'
                }`}
                aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <Globe size={13} className={`shrink-0 ${isLightSection ? 'text-neutral-700' : 'text-neutral-300'}`} />
                <span
                  className={`whitespace-nowrap shrink-0 leading-none ${
                    lang === 'en' ? 'font-arabic [letter-spacing:0!important]' : ''
                  }`}
                  dir={lang === 'en' ? 'rtl' : 'ltr'}
                >
                  {lang === 'en' ? 'العربية' : 'English'}
                </span>
              </Link>
            </Magnetic>

            {/* Sleek CTA Button: Black when background is white, White when background is black */}
            <Magnetic strength={0.18} activeDistance={30} className="hidden sm:inline-flex shrink-0">
              <Link
                href={isForProviders ? `/${lang}/for-providers/apply` : `/${lang}/contact`}
                className={`inline-flex items-center gap-1.5 px-3 xl:px-4 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all shrink-0 whitespace-nowrap ${
                  isLightSection
                    ? 'bg-neutral-950 hover:bg-black text-white shadow-xs hover:shadow-md hover:shadow-black/20'
                    : 'bg-white hover:bg-neutral-200 text-black shadow-xs hover:shadow-md hover:shadow-white/20'
                }`}
              >
                <span className="shrink-0 whitespace-nowrap">{dict.nav.lets_talk}</span>
                <ArrowUpRight size={13} className="rtl:-scale-x-100 shrink-0" />
              </Link>
            </Magnetic>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1.5 xs:gap-2 lg:hidden">
              <Link
                href={switchHref}
                className={`tap-target inline-flex items-center gap-1 xs:gap-1.5 px-2.5 xs:px-3 py-2 min-h-[44px] rounded-full text-xs font-medium active:scale-95 transition-all duration-200 touch-manipulation whitespace-nowrap shrink-0 ${
                  isLightSection
                    ? 'border border-neutral-300/80 bg-white/70 text-neutral-800 hover:text-neutral-950 hover:bg-white hover:border-neutral-400 shadow-xs'
                    : 'border border-[#26282D] bg-[#16171B] text-neutral-300 hover:text-white hover:border-white/30'
                }`}
                aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <Globe size={13} className={`shrink-0 ${isLightSection ? 'text-neutral-700' : 'text-neutral-400'}`} />
                <span
                  className={`font-semibold text-[11px] xs:text-xs whitespace-nowrap shrink-0 leading-none ${
                    lang === 'en' ? 'font-arabic [letter-spacing:0!important]' : ''
                  }`}
                  dir={lang === 'en' ? 'rtl' : 'ltr'}
                >
                  {lang === 'en' ? 'العربية' : 'EN'}
                </span>
              </Link>

              {/* `tap-target` grows the tappable box to 44px without growing the
                  capsule the control sits inside. */}
              <button
                type="button"
                className={`tap-target flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-all active:scale-90 touch-manipulation ${
                  isLightSection
                    ? 'text-neutral-800 bg-white/80 border border-neutral-300/80 hover:bg-white hover:text-black shadow-xs'
                    : 'text-white bg-white/[0.08] border border-white/20 hover:bg-white/[0.15] hover:text-white shadow-xs'
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

      {/* Mobile Floating Island Menu Panel rendered via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[9999] lg:hidden flex items-start justify-center p-3 xs:p-4 pt-3 xs:pt-4" aria-modal="true" role="dialog">
                {/* Full-screen frosted glass backdrop */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
                  aria-hidden="true"
                />

                {/* Floating Island Menu Panel */}
                <m.div
                  initial={{ opacity: 0, scale: 0.95, y: -16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -16 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                  className="relative z-[9999] w-full max-w-md max-h-[calc(100dvh-2rem)] flex flex-col justify-between rounded-3xl border border-white/15 bg-[#0C0D11]/95 backdrop-blur-2xl px-5 sm:px-6 py-5 pb-safe shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-y-auto overscroll-contain"
                  role="document"
                  aria-label="Mobile navigation"
                >
                  {/* Rows cascade in behind the panel so the menu arrives as a
                      sequence rather than one flat block. */}
                  <m.div
                    variants={staggerContainer(0.045, 0.12)}
                    initial="hidden"
                    animate="show"
                  >
                    {/* Floating Panel Header: Logo + "pontlook" redirects home and closes menu */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                      <Link
                        href={`/${lang}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2"
                        aria-label="PontLook home"
                      >
                        <div className="relative h-7 w-7 flex items-center justify-center">
                          <Image
                            src={
                              isForProviders
                                ? '/images/brand/pontlook-icon-orange.png'
                                : '/images/brand/pontlook-icon-white.png'
                            }
                            alt="PontLook Logo"
                            width={28}
                            height={28}
                            className="h-7 w-auto object-contain"
                            loading="lazy"
                            unoptimized
                          />
                        </div>
                        <span
                          className={`font-heading font-extrabold tracking-tight text-xl transition-colors duration-200 ${
                            isForProviders ? 'text-[#FF5C00]' : 'text-white'
                          }`}
                        >
                          PontLook
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="tap-target flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors active:scale-90 border border-white/15"
                        aria-label="Close menu"
                      >
                        <X size={17} />
                      </button>
                    </div>

                    {/* Live Network Status in Mobile Panel */}
                    <m.div
                      variants={staggerItemMobile}
                      className="mt-3.5 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/[0.04] text-neutral-300 w-fit"
                    >
                      <Signal />
                      <span className="text-xs text-neutral-300">
                        {lang === 'ar' ? 'المطابقة المباشرة نشطة' : 'Live Matchmaking Active'}
                      </span>
                    </m.div>

                    {/* Grouped Mobile Navigation */}
                    <div className="mt-4 space-y-3.5">
                      {/* Solutions Section */}
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2 px-1">
                          {dict.nav.solutions}
                        </span>
                        <div className="space-y-1.5">
                          {/* Enterprise Extension */}
                          <m.div variants={staggerItemMobile}>
                            <Link
                              href={`/${lang}/find-training`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                            >
                              <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                                <Building2 size={17} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">{dict.nav.enterprise_opt}</div>
                                <div className="text-[11px] text-neutral-400 truncate">{dict.nav.enterprise_opt_desc}</div>
                              </div>
                            </Link>
                          </m.div>

                          <m.div variants={staggerItemMobile}>
                            <Link
                              href={`/${lang}/for-providers`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                            >
                              <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                                <Briefcase size={17} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">{dict.nav.provider_opt}</div>
                                <div className="text-[11px] text-neutral-400 truncate">{dict.nav.provider_opt_desc}</div>
                              </div>
                            </Link>
                          </m.div>
                        </div>
                      </div>

                      {/* About Section */}
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2 px-1">
                          {dict.nav.about}
                        </span>
                        <div className="space-y-1.5">
                          <m.div variants={staggerItemMobile}>
                            <Link
                              href={`/${lang}/who-we-are`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                            >
                              <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                                <Users size={17} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">{dict.nav.who_we_are}</div>
                                <div className="text-[11px] text-neutral-400 truncate">{dict.nav.who_we_are_desc}</div>
                              </div>
                            </Link>
                          </m.div>

                          <m.div variants={staggerItemMobile}>
                            <Link
                              href={`/${lang}/contact`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                            >
                              <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                                <Mail size={17} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">{dict.nav.contact}</div>
                                <div className="text-[11px] text-neutral-400 truncate">{dict.nav.contact_desc}</div>
                              </div>
                            </Link>
                          </m.div>
                        </div>
                      </div>

                      {/* Resources Section */}
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2 px-1">
                          {dict.nav.resources}
                        </span>
                        <div className="space-y-1.5">
                          {/* All Resources Hub */}
                          <m.div variants={staggerItemMobile}>
                            <Link
                              href={`/${lang}/resources`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                            >
                              <div className="h-9 w-9 rounded-xl bg-white text-black border border-white flex items-center justify-center shrink-0">
                                <Folder size={17} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">
                                  {dict.nav.resources}
                                </div>
                                <div className="text-[11px] text-neutral-300 truncate">
                                  {isRtl ? 'استعراض كافة الموارد والأدلة' : 'Browse all L&D resources & guides'}
                                </div>
                              </div>
                            </Link>
                          </m.div>

                          {/* Blog */}
                          <m.div variants={staggerItemMobile}>
                            <Link
                              href={`/${lang}/resources/blog`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                            >
                              <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                                <BookOpen size={17} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">{dict.nav.blog}</div>
                                <div className="text-[11px] text-neutral-400 truncate">{dict.nav.blog_desc}</div>
                              </div>
                            </Link>
                          </m.div>

                          {/* Podcasts */}
                          <m.div variants={staggerItemMobile}>
                            <Link
                              href={`/${lang}/resources/podcasts`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                            >
                              <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                                <Headphones size={17} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">{dict.nav.podcasts}</div>
                                <div className="text-[11px] text-neutral-400 truncate">{dict.nav.podcasts_desc}</div>
                              </div>
                            </Link>
                          </m.div>

                          {/* Downloads */}
                          <m.div variants={staggerItemMobile}>
                            <Link
                              href={`/${lang}/resources/downloads`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                            >
                              <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                                <Download size={17} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">{dict.nav.downloads}</div>
                                <div className="text-[11px] text-neutral-400 truncate">{dict.nav.downloads_desc}</div>
                              </div>
                            </Link>
                          </m.div>

                          {/* Events */}
                          <m.div variants={staggerItemMobile}>
                            <Link
                              href={`/${lang}/resources/events`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                            >
                              <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                                <Calendar size={17} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white">{dict.nav.events}</div>
                                <div className="text-[11px] text-neutral-400 truncate">{dict.nav.events_desc}</div>
                              </div>
                            </Link>
                          </m.div>
                        </div>
                      </div>
                    </div>
                  </m.div>

                  {/* Floating Menu Footer Actions */}
                  <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
                    <Link
                      href={isForProviders ? `/${lang}/for-providers/apply` : `/${lang}/contact`}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm w-full shadow-lg active:scale-95 transition-all min-h-[48px] touch-manipulation"
                    >
                      <span>{dict.nav.lets_talk}</span>
                      <ArrowUpRight size={16} className="rtl:-scale-x-100" />
                    </Link>

                    <div className="flex items-center justify-between pt-1 px-1">
                      <span className="text-xs font-medium text-neutral-400">
                        {lang === 'ar' ? 'اللغة / Language:' : 'Language / اللغة:'}
                      </span>
                      <Link
                        href={switchHref}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium text-xs text-neutral-300 bg-white/[0.05] hover:bg-white/10 hover:text-white border border-white/10 transition-all active:scale-95 min-h-[44px] touch-manipulation"
                      >
                        <Globe size={13} className="text-neutral-400" />
                        <span className={lang === 'en' ? 'font-arabic [letter-spacing:0!important]' : ''} dir={lang === 'en' ? 'rtl' : 'ltr'}>
                          {lang === 'en' ? 'العربية' : 'English'}
                        </span>
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
