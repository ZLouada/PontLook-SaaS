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
  category: 'actions' | 'countries' | 'verticals';
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
        id: 'action-matrix',
        category: 'actions',
        titleEn: 'Interactive Capability Diagnostic Matrix',
        titleAr: 'مصفوفة تشخيص الاحتياج المؤسسي',
        descEn: 'Inspect diagnostic deliverables, vetting scorecards & ROI benchmarks',
        descAr: 'استكشف أطر الفرز وبطاقات التقييم ومعايير قياس العائد التدريبي',
        href: `/${lang}/who-we-are`,
        icon: SlidersHorizontal,
        keywords: ['matrix', 'diagnostic', 'journey', 'تشخيص', 'من نحن', 'رحلة التدريب'],
      },
      {
        id: 'action-blog',
        category: 'actions',
        titleEn: 'GCC L&D Benchmark Guides & Research',
        titleAr: 'أدلة ومعايير التدريب في الخليج',
        descEn: 'Deep-dive frameworks, budget guides, and executive whitepapers',
        descAr: 'أبحاث ودراسات وأدلة ميزانيات التدريب للقيادات التنفيذية',
        href: 'https://blog.pontlook.com',
        external: false,
        icon: BookOpen,
        keywords: ['blog', 'research', 'guides', 'مدونة', 'أبحاث', 'مقالات', 'معايير'],
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

      // 2. GCC Countries
      {
        id: 'country-sa',
        category: 'countries',
        titleEn: 'Saudi Arabia Enterprise Training',
        titleAr: 'التدريب المؤسسي في المملكة العربية السعودية',
        descEn: 'Riyadh, Jeddah, Dammam • TVTC & HRDF Aligned',
        descAr: 'الرياض، جدة، الشرقية • معتمد من المؤسسة العامة للتدريب وهدف',
        badgeEn: 'SAR',
        badgeAr: 'ريال سعودي',
        href: `/${lang}/sa`,
        icon: MapPin,
        keywords: ['saudi', 'ksa', 'riyadh', 'jeddah', 'dammam', 'سعودية', 'الرياض', 'جدة'],
      },
      {
        id: 'country-ae',
        category: 'countries',
        titleEn: 'United Arab Emirates Enterprise Training',
        titleAr: 'التدريب المؤسسي في الإمارات العربية المتحدة',
        descEn: 'Dubai, Abu Dhabi • KHDA & ACTVET Aligned',
        descAr: 'دبي، أبوظبي • معتمد من هيئة المعرفة ومركز أبوظبي للتدريب',
        badgeEn: 'AED',
        badgeAr: 'درهم إماراتي',
        href: `/${lang}/ae`,
        icon: MapPin,
        keywords: ['uae', 'dubai', 'abu dhabi', 'إمارات', 'دبي', 'أبوظبي'],
      },
      {
        id: 'country-qa',
        category: 'countries',
        titleEn: 'Qatar Corporate Training',
        titleAr: 'التدريب المؤسسي في دولة قطر',
        descEn: 'Doha • National Vision 2030 Human Development',
        descAr: 'الدوحة • ركيزة التنمية البشرية لرؤية قطر 2030',
        badgeEn: 'QAR',
        badgeAr: 'ريال قطري',
        href: `/${lang}/qa`,
        icon: MapPin,
        keywords: ['qatar', 'doha', 'قطر', 'الدوحة'],
      },
      {
        id: 'country-kw',
        category: 'countries',
        titleEn: 'Kuwait Corporate Training',
        titleAr: 'التدريب المؤسسي في دولة الكويت',
        descEn: 'Kuwait City • Executive & Leadership Academies',
        descAr: 'مدينة الكويت • أكاديميات تطوير القيادات التنفيذية',
        badgeEn: 'KWD',
        badgeAr: 'دينار كويتي',
        href: `/${lang}/kw`,
        icon: MapPin,
        keywords: ['kuwait', 'كويت'],
      },
      {
        id: 'country-bh',
        category: 'countries',
        titleEn: 'Bahrain Corporate Training',
        titleAr: 'التدريب المؤسسي في مملكة البحرين',
        descEn: 'Manama • Tamkeen Aligned Capability Building',
        descAr: 'المنامة • برامج معتمدة ومتوافقة مع تمكين',
        badgeEn: 'BHD',
        badgeAr: 'دينار بحريني',
        href: `/${lang}/bh`,
        icon: MapPin,
        keywords: ['bahrain', 'بحرين', 'المنامة'],
      },
      {
        id: 'country-om',
        category: 'countries',
        titleEn: 'Oman Corporate Training',
        titleAr: 'التدريب المؤسسي في سلطنة عمان',
        descEn: 'Muscat • Oman Vision 2040 Workforce Empowerment',
        descAr: 'مسقط • تأهيل الكوادر الوطنية لرؤية عمان 2040',
        badgeEn: 'OMR',
        badgeAr: 'ريال عماني',
        href: `/${lang}/om`,
        icon: MapPin,
        keywords: ['oman', 'muscat', 'عمان', 'مسقط'],
      },

      // 3. Verticals
      {
        id: 'vertical-ai',
        category: 'verticals',
        titleEn: 'AI & Digital Transformation',
        titleAr: 'التحول الرقمي والذكاء الاصطناعي',
        descEn: 'Executive AI strategy, machine learning, and automation cohorts',
        descAr: 'استراتيجيات الذكاء الاصطناعي التنفيذي وتحليل البيانات المتقدم',
        href: `/${lang}/solutions/executive-leadership-training`,
        icon: Cpu,
        keywords: ['ai', 'digital', 'tech', 'ذكاء', 'اصطناعي', 'تحول', 'رقمي'],
      },
      {
        id: 'vertical-leadership',
        category: 'verticals',
        titleEn: 'Executive Leadership & Strategy',
        titleAr: 'القيادة التنفيذية والتخطيط الاستراتيجي',
        descEn: 'C-Suite alignment, strategic negotiation, and organizational design',
        descAr: 'تأهيل القيادات العليا والإدارة الاستراتيجية وفرق العمل',
        href: `/${lang}/solutions/executive-leadership-training`,
        icon: GraduationCap,
        keywords: ['leadership', 'executive', 'قيادة', 'تنفيذية', 'استراتيجية'],
      },
      {
        id: 'vertical-sales',
        category: 'verticals',
        titleEn: 'Strategic B2B Sales & Negotiation',
        titleAr: 'المبيعات والتفاوض التجاري المتقدم',
        descEn: 'Complex enterprise sales, key account management & pipeline closing',
        descAr: 'إدارة الصفقات الكبرى والمبيعات المؤسسية وفنون التفاوض',
        href: `/${lang}/solutions/executive-leadership-training`,
        icon: TrendingUp,
        keywords: ['sales', 'b2b', 'negotiation', 'مبيعات', 'تفاوض'],
      },
      {
        id: 'vertical-cyber',
        category: 'verticals',
        titleEn: 'Cybersecurity, Risk & Compliance',
        titleAr: 'الأمن السيبراني والمخاطر والالتزام',
        descEn: 'GRC frameworks, ISO/NCA compliance, and resilient tech governance',
        descAr: 'حوكمة المخاطر، الالتزام بمعايير الهيئات الوطنية، والأمن السيبراني',
        href: `/${lang}/solutions/executive-leadership-training`,
        icon: ShieldCheck,
        keywords: ['cyber', 'security', 'grc', 'compliance', 'أمن', 'سيبراني', 'حوكمة'],
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
                placeholder={isAr ? 'ابحث عن بلد، تخصص تدريبي، أو إجراء...' : 'Type to search countries, verticals, or actions...'}
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
