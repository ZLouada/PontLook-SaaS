'use client';

import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import {
  Search,
  Building2,
  BadgeCheck,
  SlidersHorizontal,
  BookOpen,
  Headphones,
  Download,
  Calendar,
  Mail,
  MapPin,
  Cpu,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  X,
  type LucideIcon,
} from '@/components/icons';

interface CommandItem {
  id: string;
  category: 'actions' | 'navigation' | 'legal';
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  badgeEn?: string;
  badgeAr?: string;
  href: string;
  external?: boolean;
  icon: LucideIcon;
  keywords: string[];
}

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang?: string;
}

export default function CommandMenu({ open, onOpenChange, lang = 'en' }: CommandMenuProps) {
  const router = useRouter();
  const isAr = lang === 'ar';
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items: CommandItem[] = useMemo(
    () => [
      // 1. Actions
      {
        id: 'action-request',
        category: 'actions',
        titleEn: 'Request Training Proposals',
        titleAr: 'طلب عروض تدريبية مؤسسية',
        descEn: 'Submit corporate RFP and get 2-3 vetted proposals in 48h',
        descAr: 'اطرح متطلبات التدريب واستلم 3 عروض مؤهلة خلال 48 ساعة',
        badgeEn: 'Free for Buyers',
        badgeAr: 'مجاني للشركات',
        href: `/${lang}/find-training/request`,
        icon: Building2,
        keywords: ['rfp', 'proposal', 'quote', 'طلب', 'عروض', 'تدريب', 'أسعار'],
      },
      {
        id: 'action-provider',
        category: 'actions',
        titleEn: 'Apply as Training Academy',
        titleAr: 'انضمام كمركز تدريب معتمد',
        descEn: 'Receive pre-qualified enterprise demand on performance model',
        descAr: 'استقبل طلبات تدريب مؤهلة من كبرى الشركات بنموذج دفع عند النتائج',
        badgeEn: '$0 Retainer',
        badgeAr: 'بدون رسوم شهرية',
        href: `/${lang}/for-providers/apply`,
        icon: BadgeCheck,
        keywords: ['partner', 'academy', 'provider', 'مركز', 'أكاديمية', 'مزود', 'شراكة'],
      },
      {
        id: 'action-contact',
        category: 'actions',
        titleEn: 'Contact Enterprise Advisory',
        titleAr: 'تواصل مع فريق الاستشارات',
        descEn: 'Direct line to PontLook enterprise matchmaking specialists',
        descAr: 'تواصل مباشر مع مستشاري التوفيق وتطوير الكفاءات',
        href: `/${lang}/contact`,
        icon: Mail,
        keywords: ['contact', 'support', 'advisory', 'تواصل', 'استشارة', 'دعم'],
      },
      {
        id: 'action-blog',
        category: 'actions',
        titleEn: 'GCC L&D Benchmark Guides & Research',
        titleAr: 'أدلة ومعايير التدريب في الخليج',
        descEn: 'Deep-dive frameworks, budget guides, and executive whitepapers',
        descAr: 'أبحاث ودراسات وأدلة ميزانيات التدريب للقيادات التنفيذية',
        href: `/${lang}/resources/blog`,
        external: false,
        icon: BookOpen,
        keywords: ['blog', 'research', 'guides', 'مدونة', 'أبحاث', 'مقالات', 'معايير'],
      },

      // 2. Navigation
      {
        id: 'nav-home',
        category: 'navigation',
        titleEn: 'Home',
        titleAr: 'الرئيسية',
        descEn: 'Corporate training matchmaking platform overview',
        descAr: 'نظرة عامة على منصة مطابقة التدريب المؤسسي',
        href: `/${lang}`,
        icon: Building2,
        keywords: ['home', 'main', 'start', 'رئيسية', 'البداية'],
      },
      {
        id: 'nav-who-we-are',
        category: 'navigation',
        titleEn: 'Who We Are',
        titleAr: 'من نحن',
        descEn: 'Our mission, bilateral architecture & matching model',
        descAr: 'رسالتنا وهيكلية النموذج والمقارنة مع الحلول التقليدية',
        href: `/${lang}/who-we-are`,
        icon: SlidersHorizontal,
        keywords: ['about', 'mission', 'who we are', 'من نحن', 'عن بونت لوك'],
      },
      {
        id: 'nav-solutions',
        category: 'navigation',
        titleEn: 'Solutions & Matchmaking Platform',
        titleAr: 'الحلول ومنظومة المطابقة',
        descEn: 'Full bilateral architecture and specialized extension tracks',
        descAr: 'الهيكلية الكاملة للمطابقة الثنائية والمسارات التخصصية',
        badgeEn: 'Platform',
        badgeAr: 'المنظومة',
        href: `/${lang}/solutions`,
        icon: Cpu,
        keywords: ['solution', 'solutions', 'platform', 'architecture', 'tracks', 'حلول', 'المنظومة', 'المسارات'],
      },
      {
        id: 'nav-find-training',
        category: 'navigation',
        titleEn: 'Looking for Corporate Training',
        titleAr: 'ابحث عن تدريب لشركتك',
        descEn: 'Diagnose skill gaps and hire accredited training providers',
        descAr: 'تشخيص الفجوات المهارية وتعيين أفضل مزودي التدريب',
        badgeEn: 'Enterprises',
        badgeAr: 'للشركات',
        href: `/${lang}/find-training`,
        icon: GraduationCap,
        keywords: ['buyer', 'hr', 'chro', 'تدريب', 'شركات', 'موارد بشرية'],
      },
      {
        id: 'nav-for-providers',
        category: 'navigation',
        titleEn: 'For Training Providers',
        titleAr: 'لمزودي التدريب',
        descEn: 'Performance-based enterprise client acquisition with zero retainers',
        descAr: 'اكتساب عملاء مؤسسيين مؤهلين بدون رسوم اشتراك شهرية',
        badgeEn: 'Providers',
        badgeAr: 'للمزودين',
        href: `/${lang}/for-providers`,
        icon: TrendingUp,
        keywords: ['providers', 'academies', 'institutes', 'مزودين', 'معاهد', 'مراكز'],
      },
      {
        id: 'nav-faq',
        category: 'navigation',
        titleEn: 'Frequently Asked Questions',
        titleAr: 'الأسئلة الشائعة',
        descEn: 'Answers regarding matching, qualification criteria, and pricing',
        descAr: 'إجابات حول آلية المطابقة، معايير التأهيل، والأسعار',
        href: `/${lang}/faq`,
        icon: BookOpen,
        keywords: ['faq', 'questions', 'help', 'أسئلة', 'شائعة', 'مساعدة'],
      },
      {
        id: 'nav-resources',
        category: 'navigation',
        titleEn: 'Resources Hub',
        titleAr: 'مركز الموارد والمعرفة',
        descEn: 'All-in-one resource center for enterprise L&D deciders',
        descAr: 'دليل متكامل للأدلة والبودكاست والتحميلات والفعاليات',
        href: `/${lang}/resources`,
        icon: BookOpen,
        keywords: ['resources', 'hub', 'موارد', 'مركز'],
      },
      {
        id: 'nav-podcasts',
        category: 'navigation',
        titleEn: 'Podcasts',
        titleAr: 'البودكاست',
        descEn: 'Executive audio series with regional L&D leadership',
        descAr: 'حوارات صوتية تنفيذية مع قادة التدريب والموارد البشرية',
        href: `/${lang}/resources/podcasts`,
        icon: Headphones,
        keywords: ['podcast', 'audio', 'بودكاست', 'حوارات'],
      },
      {
        id: 'nav-downloads',
        category: 'navigation',
        titleEn: 'Downloads & Toolkits',
        titleAr: 'التحميلات والنماذج',
        descEn: 'Free diagnostic spreadsheets, TNA matrices & ROI models',
        descAr: 'نماذج تشخيص مجانية ومصفوفات تقييم الاحتياجات التدريبية',
        href: `/${lang}/resources/downloads`,
        icon: Download,
        keywords: ['downloads', 'templates', 'tna', 'نماذج', 'تحميلات', 'قوالب'],
      },
      {
        id: 'nav-events',
        category: 'navigation',
        titleEn: 'Events & Roundtables',
        titleAr: 'الفعاليات والموائد المستديرة',
        descEn: 'Executive roundtables, briefings & matchmaking summits',
        descAr: 'موائد مستديرة تنفيذية، ندوات وقمم المطابقة التدريبية',
        href: `/${lang}/resources/events`,
        icon: Calendar,
        keywords: ['events', 'webinars', 'roundtables', 'فعاليات', 'ندوات'],
      },

      // 3. Legal & Trust
      {
        id: 'legal-returns',
        category: 'legal',
        titleEn: 'Returns & Quality Guarantee',
        titleAr: 'سياسة الاسترجاع والضمان',
        descEn: 'Lead replacement guarantee and resolution terms',
        descAr: 'ضمان استبدال العملاء المحتملين وشروط الفواتير',
        href: `/${lang}/returns-faq`,
        icon: ShieldCheck,
        keywords: ['guarantee', 'returns', 'refund', 'ضمان', 'استرجاع', 'سياسة'],
      },
      {
        id: 'legal-terms',
        category: 'legal',
        titleEn: 'Terms of Service',
        titleAr: 'شروط الخدمة',
        descEn: 'Platform agreements, matchmaking eligibility & governing law',
        descAr: 'اتفاقية الاستخدام، أهلية المطابقة، والضوابط القانونية',
        href: `/${lang}/terms-of-service`,
        icon: ShieldCheck,
        keywords: ['terms', 'legal', 'tos', 'شروط', 'خدمة', 'قانون'],
      },
      {
        id: 'legal-privacy',
        category: 'legal',
        titleEn: 'Privacy Policy',
        titleAr: 'سياسة الخصوصية',
        descEn: 'Enterprise data protection, PDPL, and GDPR compliance',
        descAr: 'حماية البيانات المؤسسية والامتثال لأنظمة الخصوصية',
        href: `/${lang}/privacy-policy`,
        icon: ShieldCheck,
        keywords: ['privacy', 'data', 'gdpr', 'خصوصية', 'بيانات'],
      },
    ],
    [lang]
  );

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((item) => {
      const matchEn = item.titleEn.toLowerCase().includes(q) || item.descEn.toLowerCase().includes(q);
      const matchAr = item.titleAr.toLowerCase().includes(q) || item.descAr.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      return matchEn || matchAr || matchKeywords;
    });
  }, [items, query]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle item activation
  const handleSelect = useCallback(
    (item: CommandItem) => {
      onOpenChange(false);
      setQuery('');
      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(item.href);
      }
    },
    [onOpenChange, router]
  );

  // Global Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      } else if (open) {
        if (e.key === 'Escape') {
          e.preventDefault();
          onOpenChange(false);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) =>
            filteredItems.length === 0 ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length
          );
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleSelect(filteredItems[selectedIndex]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange, filteredItems, selectedIndex, handleSelect]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-8 sm:pt-24 px-3 sm:px-4" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <m.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-[#26282D] bg-[#0F1013] shadow-2xl shadow-black/80 overflow-hidden z-10 flex flex-col max-h-[85dvh]"
          >
            {/* Top Search Input Bar */}
            <div className="flex items-center gap-2.5 xs:gap-3 px-3.5 sm:px-6 py-3 sm:py-4 border-b border-[#26282D] bg-[#16171B]/50">
              <Search size={18} className="text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isAr ? 'ابحث عن الصفحات، الإجراءات، أو الخدمات...' : 'Search pages, actions, or services...'}
                className="w-full bg-transparent text-xs xs:text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10"
                >
                  <X size={15} />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-neutral-400 border border-white/10">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div ref={listRef} className="overflow-y-auto p-2 sm:p-3 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 text-sm">
                  {isAr ? 'لم يتم العثور على نتائج مطابقة' : 'No matching results found'}
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl text-start transition-all ${
                        isSelected
                          ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                          : 'text-neutral-300 hover:bg-white/[0.03] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg border shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                              : 'bg-[#16171B] border-[#26282D] text-neutral-400'
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold truncate">
                              {isAr ? item.titleAr : item.titleEn}
                            </span>
                            {(item.badgeEn || item.badgeAr) && (
                              <span className="shrink-0 px-2 py-0.5 rounded-full bg-white/[0.06] text-[10px] font-mono text-neutral-400">
                                {isAr ? item.badgeAr : item.badgeEn}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 truncate mt-0.5">
                            {isAr ? item.descAr : item.descEn}
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        size={14}
                        className={`shrink-0 rtl:-scale-x-100 transition-transform ${
                          isSelected ? 'translate-x-0.5 rtl:-translate-x-0.5 text-white opacity-100' : 'opacity-0'
                        }`}
                      />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer keycap hints */}
            <div className="px-4 sm:px-6 py-2.5 border-t border-[#26282D] bg-[#16171B]/30 flex items-center justify-between text-[11px] text-neutral-500">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 font-mono text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 font-mono text-[10px]">↓</kbd>
                  <span>{isAr ? 'للتنقل' : 'Navigate'}</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 font-mono text-[10px]">↵</kbd>
                  <span>{isAr ? 'للاختيار' : 'Select'}</span>
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">
                PontLook Command Engine
              </span>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
