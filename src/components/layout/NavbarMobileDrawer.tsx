'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  ArrowUpRight,
  ArrowRight,
  Globe,
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
import Signal from '@/components/shared/Signal';
import type { Locale } from '@/i18n/config';
import { isArabicLocale } from '@/i18n/config';
import type { NavbarResourcesCardData } from './Navbar';

interface NavbarMobileDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  lang: Locale;
  dict: any;
  isForProviders: boolean;
  switchHref: string;
  resourcesCard?: NavbarResourcesCardData | null;
}

export default function NavbarMobileDrawer({
  open,
  setOpen,
  lang,
  dict,
  isForProviders,
  switchHref,
  resourcesCard,
}: NavbarMobileDrawerProps) {
  if (!open || typeof document === 'undefined') return null;

  const isRtl = isArabicLocale(lang);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Dark Blurred Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Floating Centered Interactive Capsule Container */}
      <div
        className="relative z-[9999] w-full max-w-md max-h-[calc(100dvh-2rem)] flex flex-col justify-between rounded-3xl border border-white/15 bg-[#0C0D11]/95 backdrop-blur-2xl px-5 sm:px-6 py-5 pb-safe shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-y-auto overscroll-contain animate-in zoom-in-95 duration-200"
        role="document"
        aria-label="Mobile navigation"
      >
        <div>
          {/* Floating Panel Header */}
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
              className="tap-target flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors active:scale-90 border border-white/15 cursor-pointer"
              aria-label="Close menu"
            >
              <X size={17} />
            </button>
          </div>

          {/* Live Network Status in Mobile Panel */}
          <div className="mt-3.5 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/[0.04] text-neutral-300 w-fit">
            <Signal />
            <span className="text-xs text-neutral-300">
              {lang === 'ar' ? 'المطابقة المباشرة نشطة' : 'Live Matchmaking Active'}
            </span>
          </div>

          {/* Grouped Mobile Navigation */}
          <div className="mt-4 space-y-3.5">
            {/* Solutions Section */}
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block mb-2 px-1">
                {dict.nav.solutions}
              </span>
              <div className="space-y-1.5">
                <Link
                  href={`/${lang}/find-training`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                    <Building2 size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-heading font-semibold tracking-tight text-white">{dict.nav.enterprise_opt}</div>
                    <div className="text-[11px] font-sans text-neutral-400 truncate">{dict.nav.enterprise_opt_desc}</div>
                  </div>
                </Link>

                <Link
                  href={`/${lang}/for-providers`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                    <Briefcase size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-heading font-semibold tracking-tight text-white">{dict.nav.provider_opt}</div>
                    <div className="text-[11px] font-sans text-neutral-400 truncate">{dict.nav.provider_opt_desc}</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* About Section */}
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block mb-2 px-1">
                {dict.nav.about}
              </span>
              <div className="space-y-1.5">
                <Link
                  href={`/${lang}/who-we-are`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                    <Users size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-heading font-semibold tracking-tight text-white">{dict.nav.who_we_are}</div>
                    <div className="text-[11px] font-sans text-neutral-400 truncate">{dict.nav.who_we_are_desc}</div>
                  </div>
                </Link>

                <Link
                  href={`/${lang}/contact`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                    <Mail size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-heading font-semibold tracking-tight text-white">{dict.nav.contact}</div>
                    <div className="text-[11px] font-sans text-neutral-400 truncate">{dict.nav.contact_desc}</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Resources Section */}
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block mb-2 px-1">
                {dict.nav.resources}
              </span>
              <div className="space-y-1.5">
                <Link
                  href={`/${lang}/resources`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                >
                  <div className="h-9 w-9 rounded-xl bg-white text-black border border-white flex items-center justify-center shrink-0">
                    <Folder size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-heading font-semibold tracking-tight text-white">
                      {dict.nav.resources}
                    </div>
                    <div className="text-[11px] font-sans text-neutral-300 truncate">
                      {isRtl ? 'استعراض كافة الموارد والأدلة' : 'Browse all L&D resources & guides'}
                    </div>
                  </div>
                </Link>

                <Link
                  href={`/${lang}/resources/blog`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                    <BookOpen size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-heading font-semibold tracking-tight text-white">{dict.nav.blog}</div>
                    <div className="text-[11px] font-sans text-neutral-400 truncate">{dict.nav.blog_desc}</div>
                  </div>
                </Link>

                <Link
                  href={`/${lang}/resources/podcasts`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                    <Headphones size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-heading font-semibold tracking-tight text-white">{dict.nav.podcasts}</div>
                    <div className="text-[11px] font-sans text-neutral-400 truncate">{dict.nav.podcasts_desc}</div>
                  </div>
                </Link>

                <Link
                  href={`/${lang}/resources/downloads`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                    <Download size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-heading font-semibold tracking-tight text-white">{dict.nav.downloads}</div>
                    <div className="text-[11px] font-sans text-neutral-400 truncate">{dict.nav.downloads_desc}</div>
                  </div>
                </Link>

                <Link
                  href={`/${lang}/resources/events`}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0">
                    <Calendar size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-heading font-semibold tracking-tight text-white">{dict.nav.events}</div>
                    <div className="text-[11px] font-sans text-neutral-400 truncate">{dict.nav.events_desc}</div>
                  </div>
                </Link>

                {/* Dynamic featured card from Payload CMS */}
                {resourcesCard && resourcesCard.enabled !== false && (
                  <Link
                    href={resourcesCard.link || `/${lang}/resources/events`}
                    target={resourcesCard.link?.startsWith('http') ? '_blank' : undefined}
                    rel={resourcesCard.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    prefetch={resourcesCard.link?.startsWith('http') ? undefined : false}
                    onClick={() => setOpen(false)}
                    className="group relative mt-2 flex flex-col rounded-2xl overflow-hidden border border-white/15 bg-[#090A0D] text-white transition-all active:scale-[0.98]"
                  >
                    <div className="relative h-24 w-full bg-neutral-900 overflow-hidden">
                      <Image
                        src={resourcesCard.image || '/executive_training_room.jpg'}
                        alt={resourcesCard.title || ''}
                        fill
                        sizes="320px"
                        loading="lazy"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      {resourcesCard.badge && (
                        <div className="absolute top-2 start-2">
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                            {resourcesCard.badge}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-[#090A0D]">
                      <h5 className="font-heading text-xs font-semibold tracking-tight text-white line-clamp-1 group-hover:text-[#FF5C00] transition-colors">
                        {resourcesCard.title}
                      </h5>
                      {resourcesCard.description && (
                        <p className="font-sans text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                          {resourcesCard.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between font-sans text-[11px] font-semibold text-[#FF5C00] pt-1.5 border-t border-white/10">
                        <span>{resourcesCard.linkText || (isRtl ? 'تفاصيل المؤتمر' : 'Conference details')}</span>
                        {resourcesCard.link?.startsWith('http') ? (
                          <ArrowUpRight size={11} className="rtl:-scale-x-100" />
                        ) : (
                          <ArrowRight size={11} className="rtl:-scale-x-100" />
                        )}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Menu Footer Actions */}
        <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
          <Link
            href={isForProviders ? `/${lang}/for-providers/apply` : `/${lang}/contact`}
            prefetch={false}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white hover:bg-neutral-200 text-black font-sans font-semibold tracking-tight text-sm w-full shadow-lg active:scale-95 transition-all min-h-[48px] touch-manipulation"
          >
            <span>{dict.nav.lets_talk}</span>
            <ArrowUpRight size={16} className="rtl:-scale-x-100" />
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center justify-between pt-1 px-1">
            <span className="font-sans text-xs font-medium text-neutral-400">
              {isRtl ? 'اللغة / Language:' : 'Language / اللغة:'}
            </span>
            <Link
              href={switchHref}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-sans font-medium text-xs text-neutral-300 bg-white/[0.05] hover:bg-white/10 hover:text-white border border-white/10 transition-all active:scale-95 min-h-[44px] touch-manipulation"
            >
              <Globe size={13} className="text-neutral-400" />
              <span className={!isRtl ? 'font-arabic [letter-spacing:0!important]' : ''} dir={isRtl ? 'ltr' : 'rtl'}>
                {isRtl ? 'English' : 'العربية'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
