'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import {
  Menu,
  ArrowRight,
  ArrowUpRight,
  Globe,
  ChevronDown,
  Building2,
  Briefcase,
  Users,
  Mail,
  BookOpen,
  Headphones,
  Download,
  Calendar,
  Folder,
} from '@/components/icons';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import {
  Locale,
  locales,
  isArabicLocale,
  getOppositeLanguageLocale,
  getCountryCode,
  getBaseLanguage,
} from '@/i18n/config';
import CountryFlag from '@/components/shared/CountryFlag';
import ScrollProgress from '@/components/shared/ScrollProgress';
import Magnetic from '@/components/shared/Magnetic';

const CommandMenu = dynamic(() => import('@/components/shared/CommandMenu'), {
  ssr: false,
});

const NavbarMobileDrawer = dynamic(() => import('./NavbarMobileDrawer'), {
  ssr: false,
});

type DropdownKey = 'solutions' | 'about' | 'resources' | null;

export interface NavbarResourcesCardData {
  enabled: boolean;
  badge: string;
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
}

interface NavbarProps {
  lang: Locale;
  resourcesCard?: NavbarResourcesCardData | null;
}

export default function Navbar({ lang, resourcesCard }: Readonly<NavbarProps>) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname() || `/${lang}`;
  const dict = useDictionary();
  const isForProviders = pathname?.includes('/for-providers') || pathname?.endsWith('/providers');
  const isRtl = isArabicLocale(lang);
  const currentCountry = getCountryCode(lang);
  const baseLang = getBaseLanguage(lang);
  const oppositeLang = getOppositeLanguageLocale(lang);

  const switchHref = (() => {
    if (!pathname) return `/${oppositeLang}`;
    if (pathname === `/${lang}` || pathname === `/${lang}/`) {
      return `/${oppositeLang}`;
    }
    if (pathname.startsWith(`/${lang}/`)) {
      return pathname.replace(`/${lang}/`, `/${oppositeLang}/`);
    }
    const segments = pathname.split('/').filter(Boolean);
    if ((locales as readonly string[]).includes(segments[0])) {
      segments[0] = oppositeLang;
      return `/${segments.join('/')}`;
    }
    return `/${oppositeLang}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  })();

  const getCountryHref = useCallback((targetCountry: 'gcc' | 'sa' | 'ae') => {
    const targetLocale: Locale =
      targetCountry === 'sa'
        ? `${baseLang}-sa`
        : targetCountry === 'ae'
        ? `${baseLang}-ae`
        : baseLang;

    if (!pathname) return `/${targetLocale}`;
    if (pathname === `/${lang}` || pathname === `/${lang}/`) {
      return `/${targetLocale}`;
    }
    if (pathname.startsWith(`/${lang}/`)) {
      return pathname.replace(`/${lang}/`, `/${targetLocale}/`);
    }
    const segments = pathname.split('/').filter(Boolean);
    if ((locales as readonly string[]).includes(segments[0])) {
      segments[0] = targetLocale;
      return `/${segments.join('/')}`;
    }
    return `/${targetLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  }, [baseLang, lang, pathname]);

  // Close dropdowns on route changes
  useEffect(() => {
    setActiveDropdown(null);
    setCountryOpen(false);
    setOpen(false);
  }, [pathname]);

  // Window scroll & light section intersection detection (zero forced reflow)
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const activeLightElements = new Set<Element>();

    const setupLightObserver = () => {
      if (observer) return;
      const lightElements = document.querySelectorAll(
        '[data-nav-light="true"], [data-nav-theme="light"]'
      );
      if (lightElements.length === 0) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeLightElements.add(entry.target);
            } else {
              activeLightElements.delete(entry.target);
            }
          });
          setIsLightSection(activeLightElements.size > 0);
        },
        {
          rootMargin: '-50px 0px -75% 0px',
          threshold: 0,
        }
      );
      observer = obs;
      lightElements.forEach((el) => obs.observe(el));
    };

    let prevScrolled = false;
    let scrollRaf: number | null = null;

    const onScroll = () => {
      setupLightObserver();
      if (scrollRaf !== null) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        const nextScrolled = scrollY > 20;
        if (nextScrolled !== prevScrolled) {
          prevScrolled = nextScrolled;
          setScrolled(nextScrolled);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    let idleTimer: any = null;
    if (window.scrollY > 0) {
      onScroll();
      setupLightObserver();
    } else {
      idleTimer = typeof window.requestIdleCallback !== 'undefined'
        ? window.requestIdleCallback(setupLightObserver, { timeout: 3000 })
        : setTimeout(setupLightObserver, 1500);
    }

    return () => {
      if (observer) observer.disconnect();
      if (scrollRaf !== null) cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', onScroll);
      if (idleTimer !== null) {
        if (typeof window.cancelIdleCallback !== 'undefined') {
          window.cancelIdleCallback(idleTimer);
        } else {
          clearTimeout(idleTimer);
        }
      }
    };
  }, [pathname]);

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
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
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
          {/* Brand Logo */}
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
              />
            </div>

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

          {/* Desktop Navigation Links */}
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

              {/* Solutions Popover Dropdown (Pure CSS Hardware-Accelerated Transition) */}
              <div
                className={`absolute top-full mt-2 start-0 w-[310px] rounded-2xl p-2 z-50 shadow-2xl transition-all duration-200 ease-out ${
                  activeDropdown === 'solutions'
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                    : 'opacity-0 translate-y-2 scale-95 pointer-events-none invisible'
                } ${
                  isLightSection
                    ? 'bg-white/95 backdrop-blur-xl border border-neutral-200 text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
                    : 'bg-[#121316]/95 backdrop-blur-xl border border-[#26282D] text-white shadow-[0_25px_50px_rgba(0,0,0,0.6)]'
                }`}
              >
                <div className="space-y-1">
                  {/* Looking for training */}
                  <Link
                    href={`/${lang}/find-training`}
                    prefetch={false}
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
                    prefetch={false}
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
              </div>
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
              <div
                className={`absolute top-full mt-2 start-0 w-[290px] rounded-2xl p-2 z-50 shadow-2xl transition-all duration-200 ease-out ${
                  activeDropdown === 'about'
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                    : 'opacity-0 translate-y-2 scale-95 pointer-events-none invisible'
                } ${
                  isLightSection
                    ? 'bg-white/95 backdrop-blur-xl border border-neutral-200 text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
                    : 'bg-[#121316]/95 backdrop-blur-xl border border-[#26282D] text-white shadow-[0_25px_50px_rgba(0,0,0,0.6)]'
                }`}
              >
                <div className="space-y-1">
                  {/* Who We Are */}
                  <Link
                    href={`/${lang}/who-we-are`}
                    prefetch={false}
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
                    prefetch={false}
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
              </div>
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

              {/* Resources Popover Dropdown */}
              {(() => {
                const showCard = resourcesCard ? resourcesCard.enabled : true;
                const card = resourcesCard || {
                  enabled: true,
                  badge: isRtl ? 'مؤتمر الرياض · ٢٠٢٦' : 'RIYADH · DEC 2026',
                  title: isRtl ? 'مؤتمر ATD السعودية | ٧ – ٨ ديسمبر' : 'ATD Saudi Arabia Conference | 7 – 8 Dec',
                  description: isRtl
                    ? 'الحدث السنوي الأبرز لتطوير المواهب والكفاءات المؤسسية في الرياض بمشاركة قادة التدريب'
                    : 'Premier annual talent development & executive conference in Riyadh',
                  image: '/executive_training_room.jpg',
                  link: `/${lang}/resources/events`,
                  linkText: isRtl ? 'تفاصيل المؤتمر' : 'Conference details',
                };
                const isExternal = card.link?.startsWith('http://') || card.link?.startsWith('https://');

                return (
                  <div
                    className={`absolute top-full mt-2.5 ltr:right-0 xl:ltr:end-[-60px] rtl:left-0 xl:rtl:start-[-60px] ${
                      showCard
                        ? 'w-[min(690px,calc(100vw-2.5rem))]'
                        : 'w-[min(480px,calc(100vw-2.5rem))]'
                    } rounded-3xl p-5 z-50 shadow-2xl transition-all duration-200 ease-out ${
                      activeDropdown === 'resources'
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible'
                        : 'opacity-0 translate-y-2 scale-95 pointer-events-none invisible'
                    } ${
                      isLightSection
                        ? 'bg-white border border-neutral-200 text-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.14)]'
                        : 'bg-[#000000] border border-white/15 text-white shadow-[0_30px_70px_rgba(0,0,0,0.95)]'
                    }`}
                  >
                    <div
                      className={
                        showCard
                          ? 'grid grid-cols-12 gap-5 items-stretch'
                          : 'grid grid-cols-2 gap-4 items-stretch'
                      }
                    >
                      {/* Column 1: Resources Hub Overview */}
                      <div
                        className={`${
                          showCard ? 'col-span-4' : 'col-span-1'
                        } ltr:border-r rtl:border-l border-neutral-200/70 dark:border-white/10 ltr:pr-4 rtl:pl-4 flex flex-col justify-between`}
                      >
                        <Link
                          href={`/${lang}/resources`}
                          prefetch={false}
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
                            <ArrowRight
                              size={13}
                              className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                            />
                          </div>
                        </Link>
                      </div>

                      {/* Column 2: Resources List */}
                      <div
                        className={`${
                          showCard ? 'col-span-4' : 'col-span-1'
                        } space-y-1 flex flex-col justify-center`}
                      >
                        <Link
                          href={`/${lang}/resources/blog`}
                          prefetch={false}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                            isLightSection
                              ? 'hover:bg-neutral-100 text-neutral-800 hover:text-black'
                              : 'hover:bg-white/[0.08] text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isLightSection
                                ? 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 group-hover:text-black'
                                : 'bg-white/[0.06] text-neutral-300 border border-white/10 group-hover:bg-white/[0.12] group-hover:text-white'
                            }`}
                          >
                            <BookOpen size={15} />
                          </div>
                          <span className="text-xs font-semibold">{dict.nav.blog}</span>
                        </Link>

                        <Link
                          href={`/${lang}/resources/events`}
                          prefetch={false}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                            isLightSection
                              ? 'hover:bg-neutral-100 text-neutral-800 hover:text-black'
                              : 'hover:bg-white/[0.08] text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isLightSection
                                ? 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 group-hover:text-black'
                                : 'bg-white/[0.06] text-neutral-300 border border-white/10 group-hover:bg-white/[0.12] group-hover:text-white'
                            }`}
                          >
                            <Calendar size={15} />
                          </div>
                          <span className="text-xs font-semibold">{dict.nav.events}</span>
                        </Link>

                        <Link
                          href={`/${lang}/resources/downloads`}
                          prefetch={false}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                            isLightSection
                              ? 'hover:bg-neutral-100 text-neutral-800 hover:text-black'
                              : 'hover:bg-white/[0.08] text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isLightSection
                                ? 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 group-hover:text-black'
                                : 'bg-white/[0.06] text-neutral-300 border border-white/10 group-hover:bg-white/[0.12] group-hover:text-white'
                            }`}
                          >
                            <Download size={15} />
                          </div>
                          <span className="text-xs font-semibold">{dict.nav.downloads}</span>
                        </Link>

                        <Link
                          href={`/${lang}/resources/podcasts`}
                          prefetch={false}
                          onClick={() => setActiveDropdown(null)}
                          className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                            isLightSection
                              ? 'hover:bg-neutral-100 text-neutral-800 hover:text-black'
                              : 'hover:bg-white/[0.08] text-neutral-300 hover:text-white'
                          }`}
                        >
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isLightSection
                                ? 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 group-hover:text-black'
                                : 'bg-white/[0.06] text-neutral-300 border border-white/10 group-hover:bg-white/[0.12] group-hover:text-white'
                            }`}
                          >
                            <Headphones size={15} />
                          </div>
                          <span className="text-xs font-semibold">{dict.nav.podcasts}</span>
                        </Link>
                      </div>

                      {/* Column 3: Featured Visual Card (Only rendered when enabled) */}
                      {showCard && (
                        <div className="col-span-4">
                          <Link
                            href={card.link || `/${lang}/resources/events`}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            prefetch={isExternal ? undefined : false}
                            onClick={() => setActiveDropdown(null)}
                            className={`group relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl ${
                              isLightSection
                                ? 'border border-neutral-200 hover:border-neutral-400 bg-neutral-900 text-white'
                                : 'border border-white/15 hover:border-white/30 bg-[#090A0D] text-white'
                            }`}
                          >
                            <div className="relative h-28 w-full bg-neutral-900 overflow-hidden">
                              <Image
                                src={card.image || '/executive_training_room.jpg'}
                                alt={card.title || ''}
                                fill
                                sizes="320px"
                                loading="lazy"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              {card.badge && (
                                <div className="absolute top-2.5 start-2.5">
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                                    {card.badge}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div
                              className={`p-3.5 flex-1 flex flex-col justify-between ${
                                isLightSection
                                  ? 'bg-neutral-900 text-white'
                                  : 'bg-[#090A0D] text-white'
                              }`}
                            >
                              <div>
                                <h5 className="text-xs font-bold text-white group-hover:text-[#FF5C00] transition-colors leading-snug">
                                  {card.title}
                                </h5>
                                {card.description && (
                                  <p className="text-[11px] text-neutral-300 line-clamp-2 mt-1 leading-normal font-normal">
                                    {card.description}
                                  </p>
                                )}
                              </div>
                              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#FF5C00] pt-2 border-t border-white/10">
                                <span>{card.linkText || (isRtl ? 'تفاصيل المؤتمر' : 'Conference details')}</span>
                                {isExternal ? (
                                  <ArrowUpRight
                                    size={12}
                                    className="rtl:-scale-x-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                  />
                                ) : (
                                  <ArrowRight
                                    size={12}
                                    className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                                  />
                                )}
                              </div>
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </li>
          </ul>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 shrink-0">
            {/* Country Selector Dropdown (Desktop) */}
            <div className="relative hidden lg:inline-flex shrink-0">
              <button
                type="button"
                onClick={() => setCountryOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-all duration-200 shrink-0 whitespace-nowrap cursor-pointer ${
                  isLightSection
                    ? 'border border-neutral-300/80 bg-white/70 text-neutral-800 hover:text-neutral-950 hover:bg-white hover:border-neutral-400 shadow-xs'
                    : 'border border-white/20 bg-white/[0.08] text-neutral-200 hover:text-white hover:border-white/40 shadow-xs'
                }`}
                aria-expanded={countryOpen}
                aria-label="Select Country Market"
              >
                {currentCountry === 'sa' ? (
                  <CountryFlag code="SA" className="w-4 h-3 rounded-xs" />
                ) : currentCountry === 'ae' ? (
                  <CountryFlag code="AE" className="w-4 h-3 rounded-xs" />
                ) : (
                  <Globe size={13} className={isLightSection ? 'text-neutral-700' : 'text-neutral-300'} />
                )}
                <span className="font-mono text-xs">
                  {currentCountry === 'sa'
                    ? isRtl ? 'السعودية' : 'KSA'
                    : currentCountry === 'ae'
                    ? isRtl ? 'الإمارات' : 'UAE'
                    : isRtl ? 'الخليج' : 'GCC'}
                </span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`} />
              </button>

              {countryOpen && (
                <div
                  className="absolute top-full mt-2 end-0 w-44 rounded-2xl border border-white/15 bg-[#0C0D11]/95 backdrop-blur-xl p-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <Link
                    href={getCountryHref('sa')}
                    onClick={() => setCountryOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      currentCountry === 'sa'
                        ? 'bg-[#FF5C00]/15 text-[#FF5C00] font-semibold'
                        : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <CountryFlag code="SA" className="w-4 h-3 rounded-xs" />
                    <span>{isRtl ? 'السعودية' : 'Saudi Arabia (KSA)'}</span>
                  </Link>

                  <Link
                    href={getCountryHref('ae')}
                    onClick={() => setCountryOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      currentCountry === 'ae'
                        ? 'bg-[#FF5C00]/15 text-[#FF5C00] font-semibold'
                        : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <CountryFlag code="AE" className="w-4 h-3 rounded-xs" />
                    <span>{isRtl ? 'الإمارات' : 'UAE'}</span>
                  </Link>

                  <Link
                    href={getCountryHref('gcc')}
                    onClick={() => setCountryOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      !currentCountry
                        ? 'bg-[#FF5C00]/15 text-[#FF5C00] font-semibold'
                        : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Globe size={13} className="text-neutral-400" />
                    <span>{isRtl ? 'الخليج (عام)' : 'GCC (Default)'}</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <Magnetic strength={0.16} activeDistance={25} className="hidden lg:inline-flex shrink-0">
              <Link
                href={switchHref}
                prefetch={false}
                className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition-all duration-200 shrink-0 whitespace-nowrap ${
                  isLightSection
                    ? 'border border-neutral-300/80 bg-white/70 text-neutral-800 hover:text-neutral-950 hover:bg-white hover:border-neutral-400 shadow-xs'
                    : 'border border-white/20 bg-white/[0.08] text-neutral-200 hover:text-white hover:border-white/40 shadow-xs'
                }`}
                aria-label={isRtl ? 'Switch to English' : 'التحويل إلى العربية'}
              >
                <Globe size={13} className={`shrink-0 ${isLightSection ? 'text-neutral-700' : 'text-neutral-300'}`} />
                <span
                  className={`whitespace-nowrap shrink-0 leading-none ${
                    !isRtl ? 'font-arabic [letter-spacing:0!important]' : ''
                  }`}
                  dir={isRtl ? 'ltr' : 'rtl'}
                >
                  {isRtl ? 'English' : 'العربية'}
                </span>
              </Link>
            </Magnetic>

            {/* Sleek CTA Button */}
            <Magnetic strength={0.18} activeDistance={30} className="hidden sm:inline-flex shrink-0">
              <Link
                href={isForProviders ? `/${lang}/for-providers/apply` : `/${lang}/contact`}
                prefetch={false}
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
                prefetch={false}
                className={`tap-target inline-flex items-center gap-1 xs:gap-1.5 px-2.5 xs:px-3 py-2 min-h-[44px] rounded-full text-xs font-medium active:scale-95 transition-all duration-200 touch-manipulation whitespace-nowrap shrink-0 ${
                  isLightSection
                    ? 'border border-neutral-300/80 bg-white/70 text-neutral-800 hover:text-neutral-950 hover:bg-white hover:border-neutral-400 shadow-xs'
                    : 'border border-[#26282D] bg-[#16171B] text-neutral-300 hover:text-white hover:border-white/30'
                }`}
                aria-label={isRtl ? 'Switch to English' : 'التحويل إلى العربية'}
              >
                <Globe size={13} className={`shrink-0 ${isLightSection ? 'text-neutral-700' : 'text-neutral-400'}`} />
                <span
                  className={`font-semibold text-[11px] xs:text-xs whitespace-nowrap shrink-0 leading-none ${
                    !isRtl ? 'font-arabic [letter-spacing:0!important]' : ''
                  }`}
                  dir={isRtl ? 'ltr' : 'rtl'}
                >
                  {isRtl ? 'EN' : 'عربي'}
                </span>
              </Link>

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

      {/* Dynamically Loaded Mobile Drawer (Lazy Loaded Only When User Taps Hamburger) */}
      {open && (
        <NavbarMobileDrawer
          open={open}
          setOpen={setOpen}
          lang={lang}
          dict={dict}
          isForProviders={isForProviders}
          switchHref={switchHref}
          resourcesCard={resourcesCard}
          currentCountry={currentCountry}
          getCountryHref={getCountryHref}
        />
      )}

      {commandOpen && (
        <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} lang={lang} />
      )}
    </>
  );
}
