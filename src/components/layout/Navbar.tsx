'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/for-providers', label: 'For Training Providers' },
  { href: '/find-training', label: 'Find Training' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`container-site glass rounded-2xl transition-all duration-300 ${
          scrolled ? 'py-2.5 shadow-glass' : 'py-3.5'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="relative flex items-center h-10 w-10 md:h-11 md:w-11" aria-label="Pontlook home">
            <Image 
              src="/logo.png"
              alt="Pontlook Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    pathname === l.href
                      ? 'bg-primary-50 text-primary'
                      : 'text-body hover:bg-primary-50/60 hover:text-primary'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link href="/find-training" className="btn-primary !px-5 !py-2.5">
              Get Matched <ArrowRight size={16} />
            </Link>
          </div>

          <button
            className="rounded-xl p-2 text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="mt-3 border-t border-primary-100 pt-3 lg:hidden">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                      pathname === l.href ? 'bg-primary-50 text-primary' : 'text-body'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/find-training" className="btn-primary w-full">
                  Get Matched <ArrowRight size={16} />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
