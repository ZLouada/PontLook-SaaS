'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Search, User, Globe } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Locale } from '@/i18n';

export default function Navbar({ lang }: { lang: Locale }) {
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
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const targetLang = lang === 'en' ? 'ar' : 'en';
  // safely replace current locale prefix to switch language
  const switchUrl = pathname.replace(new RegExp(`^\\/${lang}`), `/${targetLang}`) || `/${targetLang}`;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-white ${scrolled ? 'border-b border-border' : ''}`}>
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-3 sm:px-8" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <Link href={`/${lang}`} className="relative flex h-8 w-8 items-center md:h-9 md:w-9" aria-label="Pontlook home">
            <Image 
              src="/logo.png?v=3"
              alt="Pontlook Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors ${
                    pathname === l.href
                      ? 'text-foreground'
                      : 'text-foreground-muted hover:text-primary'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 text-foreground-muted">
            <div className="relative">
              <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder={dict.nav.search} className="h-9 w-40 rounded-full bg-slate-100 px-4 ps-9 text-[13px] outline-none transition-all focus:w-48 focus:ring-2 focus:ring-primary/20" />
            </div>
            
            <Link href={switchUrl} className="flex h-9 items-center justify-center rounded-full bg-slate-100 px-3 text-foreground-muted hover:bg-slate-200 transition-colors gap-2" aria-label="Switch Language" title={dict.nav.switch_lang}>
              <Globe size={16} />
              <span className="text-[11px] font-bold font-heading tracking-widest">{lang === 'en' ? 'AR' : 'EN'}</span>
            </Link>


            <Link href={`/${lang}/find-training`} className="btn bg-primary text-white hover:bg-primary-600 !h-9 !px-5 !py-0 !text-[13px]">
              {dict.nav.get_matched} <ArrowRight size={14} className="inline ms-1 rtl:-scale-x-100" />
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Link href={switchUrl} className="flex h-8 items-center justify-center rounded-full bg-slate-100 px-3 text-foreground-muted hover:bg-slate-200 transition-colors gap-2" aria-label="Switch Language">
              <Globe size={14} />
              <span className="text-[10px] font-bold font-heading tracking-widest">{lang === 'en' ? 'AR' : 'EN'}</span>
            </Link>
            <button
              className="rounded p-1 text-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="absolute inset-x-0 top-full border-b border-border bg-white p-5 lg:hidden shadow-sm">
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block text-[14px] font-medium ${
                      pathname === l.href ? 'text-primary' : 'text-foreground-muted hover:text-foreground'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href={`/${lang}/find-training`} className="flex items-center text-[14px] font-medium text-primary">
                  {dict.nav.get_matched} <ArrowRight size={14} className="ms-1 rtl:-scale-x-100" />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
