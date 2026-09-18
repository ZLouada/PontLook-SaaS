'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Search,
  Check,
  Users,
  Cpu,
  ShieldCheck,
  Lightbulb,
  X,
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import {
  TRAINING_CATEGORIES,
  type TrainingCategory,
  type SubDomain,
  step1DomainSchema,
  type Step1Data,
  type WizardData,
} from '../schemas';
import { StepNavigation } from '../fields';

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Cpu,
  ShieldCheck,
  Lightbulb,
};

const SUGGESTED_OTHER_TOPICS = [
  'Supply Chain & Procurement',
  'HR Analytics & Strategic Workforce Planning',
  'Cybersecurity & ISO 27001',
  'Customer Experience (CX) Transformation',
  'Design Thinking & Product Innovation',
  'Healthcare Quality & JCI Accreditation',
];

type Step1Props = {
  data: WizardData;
  onNext: (values: Step1Data, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => void;
  isSubmitting?: boolean;
};

export default function Step1Domain({ data, onNext, isSubmitting }: Step1Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const { initialCategories, initialSubDomains } = useMemo(() => {
    const cats = new Set<string>();
    const subs = new Set<string>();

    if (data.selectedDomains) {
      if (Array.isArray(data.selectedDomains)) {
        for (const item of data.selectedDomains) {
          if (TRAINING_CATEGORIES.some((c) => c.id === item)) {
            cats.add(item);
          } else {
            subs.add(item);
          }
        }
      } else if (typeof data.selectedDomains === 'object') {
        data.selectedDomains.categories?.forEach((c) => cats.add(c));
        data.selectedDomains.subDomains?.forEach((s) => subs.add(s));
      }
    } else if (data.domains && data.domains.length > 0) {
      for (const item of data.domains) {
        if (TRAINING_CATEGORIES.some((c) => c.id === item)) {
          cats.add(item);
        } else if (item === 'executive_leadership') {
          cats.add('soft-skills');
          subs.add('leadership-management');
        } else if (item === 'b2b_sales') {
          cats.add('soft-skills');
          subs.add('sales-customer-service');
        } else if (item === 'ai_data_tech') {
          cats.add('hard-skills');
          subs.add('technology-digital');
        } else if (item === 'grc_compliance') {
          cats.add('qhse');
          subs.add('quality-management');
        } else if (item === 'pm_agile') {
          cats.add('hard-skills');
          subs.add('business-management');
        } else {
          subs.add(item);
        }
      }
    }

    return {
      initialCategories: Array.from(cats),
      initialSubDomains: Array.from(subs),
    };
  }, [data.selectedDomains, data.domains]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [selectedSubDomains, setSelectedSubDomains] = useState<string[]>(initialSubDomains);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    initialCategories.length > 0 ? initialCategories : ['soft-skills']
  );
  const [isOtherOpen, setIsOtherOpen] = useState<boolean>(
    Boolean(data.otherDomainText || (data.domains && data.domains.includes('other')))
  );

  const initialCombinedDomains = useMemo(() => {
    return Array.from(new Set([...initialCategories, ...initialSubDomains]));
  }, [initialCategories, initialSubDomains]);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1DomainSchema),
    defaultValues: {
      domains: initialCombinedDomains,
      selectedDomains: {
        categories: initialCategories,
        subDomains: initialSubDomains,
      },
      otherDomainText: data.otherDomainText || data.challenges?.[0] || '',
    },
  });

  useEffect(() => {
    const combined = Array.from(new Set([...selectedCategories, ...selectedSubDomains]));
    if (isOtherOpen) {
      combined.push('other');
    }

    const selectedDomainsPayload = Object.assign([...combined], {
      categories: selectedCategories,
      subDomains: selectedSubDomains,
      join(separator?: string) {
        return combined.join(separator ?? ', ');
      },
    });

    setValue('domains', combined, { shouldValidate: true });
    setValue('selectedDomains', selectedDomainsPayload as any, { shouldValidate: true });
  }, [selectedCategories, selectedSubDomains, isOtherOpen, setValue]);

  useEffect(() => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase().trim();

    const matchedIds = TRAINING_CATEGORIES.filter((cat) => {
      if (
        cat.title.toLowerCase().includes(q) ||
        cat.shortDescription.toLowerCase().includes(q) ||
        cat.targetBuyers.toLowerCase().includes(q)
      ) {
        return true;
      }
      return cat.subDomains.some(
        (sub) =>
          sub.title.toLowerCase().includes(q) ||
          sub.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }).map((c) => c.id);

    if (matchedIds.length > 0) {
      setExpandedCategories((prev) => Array.from(new Set([...prev, ...matchedIds])));
    }
  }, [searchQuery]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(categoryId);
      if (isSelected) {
        return prev.filter((id) => id !== categoryId);
      } else {
        setExpandedCategories((exp) =>
          exp.includes(categoryId) ? exp : [...exp, categoryId]
        );
        return [...prev, categoryId];
      }
    });
  };

  const toggleAccordion = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSubDomain = (subDomainId: string, parentCategoryId: string) => {
    setSelectedSubDomains((prev) => {
      const isSelected = prev.includes(subDomainId);
      const next = isSelected
        ? prev.filter((id) => id !== subDomainId)
        : [...prev, subDomainId];

      if (!isSelected && !selectedCategories.includes(parentCategoryId)) {
        setSelectedCategories((cats) => [...cats, parentCategoryId]);
      }
      return next;
    });
  };

  const toggleTag = (tag: string, parentCategoryId: string) => {
    setSelectedSubDomains((prev) => {
      const isSelected = prev.includes(tag);
      const next = isSelected ? prev.filter((t) => t !== tag) : [...prev, tag];

      if (!isSelected && !selectedCategories.includes(parentCategoryId)) {
        setSelectedCategories((cats) => [...cats, parentCategoryId]);
      }
      return next;
    });
  };

  const toggleAllSubDomainsForCategory = (category: TrainingCategory) => {
    const subIds = category.subDomains.map((s) => s.id);
    const allSelected = subIds.every((id) => selectedSubDomains.includes(id));

    if (allSelected) {
      setSelectedSubDomains((prev) => prev.filter((id) => !subIds.includes(id)));
    } else {
      setSelectedSubDomains((prev) => Array.from(new Set([...prev, ...subIds])));
      if (!selectedCategories.includes(category.id)) {
        setSelectedCategories((prev) => [...prev, category.id]);
      }
    }
  };

  const areAllSubDomainsSelected = (category: TrainingCategory) => {
    const subIds = category.subDomains.map((s) => s.id);
    return subIds.length > 0 && subIds.every((id) => selectedSubDomains.includes(id));
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return TRAINING_CATEGORIES;
    const q = searchQuery.toLowerCase().trim();

    return TRAINING_CATEGORIES.filter((cat) => {
      const matchesTitle = cat.title.toLowerCase().includes(q);
      const matchesDesc = cat.shortDescription.toLowerCase().includes(q);
      const matchesBadge = cat.badge.toLowerCase().includes(q);
      const matchesBuyers = cat.targetBuyers.toLowerCase().includes(q);

      const matchesSubDomains = cat.subDomains.some(
        (sub) =>
          sub.title.toLowerCase().includes(q) ||
          sub.tags.some((tag) => tag.toLowerCase().includes(q))
      );

      return matchesTitle || matchesDesc || matchesBadge || matchesBuyers || matchesSubDomains;
    });
  }, [searchQuery]);

  const selectedCount = useMemo(() => {
    const uniqueItems = new Set([...selectedCategories, ...selectedSubDomains]);
    return uniqueItems.size;
  }, [selectedCategories, selectedSubDomains]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit((values) => onNext(values, e))(e);
      }}
      noValidate
      className="space-y-6"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-heading text-xl font-semibold tracking-normal text-white sm:text-2xl">
            What training domains do you need?
          </h2>
          {selectedCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-white">
              <Layers size={13} />
              {selectedCount} {selectedCount === 1 ? 'domain' : 'domains'} selected
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-neutral-400">
          Select all target capabilities for your enterprise cohort. We’ll match specialized providers with proven ROI.
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-neutral-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search topics, capabilities, or certifications e.g. "PMP", "Vision 2030", "Generative AI", "NEBOSH", "ISO", "Leadership"...'
          className="w-full rounded-xl border border-[#26282D] bg-[#16171B] px-4 py-3.5 ps-11 pe-10 text-base sm:text-sm text-white placeholder:text-neutral-500 focus:border-white/40 focus:bg-[#16171B] focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSearchQuery('');
            }}
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400 hover:text-white"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCategories.map((category) => {
            const isCategorySelected = selectedCategories.includes(category.id);
            const isExpanded = expandedCategories.includes(category.id);
            const IconComponent = ICON_MAP[category.icon] || Layers;

                  const hasSubSelected = category.subDomains.some(
              (s) => selectedSubDomains.includes(s.id) || s.tags.some((t) => selectedSubDomains.includes(t))
            );

            const isCardActive = isCategorySelected || hasSubSelected;

            return (
              <div
                key={category.id}
                className={`relative flex flex-col rounded-2xl transition-all duration-200 overflow-hidden ${
                  isCardActive
                    ? 'border border-white/40 bg-white/[0.04] shadow-md ring-1 ring-white/20'
                    : 'border border-[#26282D] bg-[#0F1013] hover:border-white/20 hover:shadow-sm'
                }`}
              >
                          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div
                    onClick={() => toggleCategory(category.id)}
                    className="cursor-pointer select-none"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleCategory(category.id);
                      }
                    }}
                  >
                                  <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16171B] border border-[#26282D] text-white shrink-0">
                          <IconComponent size={22} />
                        </div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#16171B] text-neutral-300 border border-[#26282D]">
                          {category.badge}
                        </span>
                      </div>

                                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleCategory(category.id);
                        }}
                        aria-label={`Toggle ${category.title}`}
                        className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                          isCardActive
                            ? 'border-white bg-white text-black shadow-sm'
                            : 'border-[#26282D] bg-[#16171B] hover:border-white/40'
                        }`}
                      >
                        {isCardActive ? (
                          <Check size={14} strokeWidth={3} />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-transparent" />
                        )}
                      </button>
                    </div>

                                  <div className="mt-3.5">
                      <h3 className="font-heading text-base font-semibold text-white">
                        {category.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                        {category.shortDescription}
                      </p>
                    </div>

                                  <div className="mt-3">
                      <p className="text-[11px] text-neutral-500 font-medium italic">
                        Target Buyers: {category.targetBuyers}
                      </p>
                    </div>
                  </div>

                  {/* Category card bottom action bar */}
                  <div className="mt-4 pt-3 border-t border-[#26282D] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleCategory(category.id);
                      }}
                      className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors py-2 px-1 min-h-[40px] inline-flex items-center touch-manipulation"
                    >
                      {isCategorySelected ? '✓ Category selected' : '+ Select category'}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleAccordion(category.id);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-white hover:underline"
                    >
                      <span>
                        {isExpanded
                          ? 'Hide capabilities'
                          : `View capabilities (${category.subDomains.length})`}
                      </span>
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  </div>
                </div>

                          {isExpanded && (
                  <div className="border-t border-[#26282D] bg-[#16171B] p-4 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span>Specific subdomains & capability tags:</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleAllSubDomainsForCategory(category);
                        }}
                        className="font-semibold text-white hover:underline"
                      >
                        {areAllSubDomainsSelected(category) ? 'Deselect all' : 'Select all'}
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {category.subDomains.map((subDomain: SubDomain) => {
                        const isSubSelected = selectedSubDomains.includes(subDomain.id);
                        const isQueryMatched =
                          searchQuery &&
                          (subDomain.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                            subDomain.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase().trim())));

                        return (
                          <div
                            key={subDomain.id}
                            className={`rounded-xl border p-3 transition-all ${
                              isSubSelected
                                ? 'border-white/40 bg-white/[0.06] shadow-2xs'
                                : isQueryMatched
                                ? 'border-white/20 bg-[#0F1013]'
                                : 'border-[#26282D] bg-[#0F1013]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleSubDomain(subDomain.id, category.id);
                                }}
                                className="flex items-center gap-2.5 text-start group/sub flex-1 min-h-[40px] py-1 touch-manipulation"
                              >
                                <div
                                  className={`flex h-4 w-4 items-center justify-center rounded border transition-all shrink-0 ${
                                    isSubSelected
                                      ? 'border-white bg-white text-black'
                                      : 'border-[#26282D] bg-[#16171B] group-hover/sub:border-white/40'
                                  }`}
                                >
                                  {isSubSelected && <Check size={11} strokeWidth={3} />}
                                </div>
                                <span className="text-xs font-bold text-neutral-300 group-hover/sub:text-white">
                                  {subDomain.title}
                                </span>
                              </button>
                            </div>

                            <div className="mt-2.5 flex flex-wrap gap-2">
                              {subDomain.tags.map((tag) => {
                                const isTagSelected = selectedSubDomains.includes(tag);
                                const isTagSearchMatch =
                                  searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase().trim());

                                return (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      toggleTag(tag, category.id);
                                    }}
                                    className={`rounded-lg px-3.5 py-2 min-h-[38px] inline-flex items-center text-xs font-medium transition-all active:scale-95 touch-manipulation ${
                                      isTagSelected
                                        ? 'bg-white text-black font-semibold shadow-xs'
                                        : isTagSearchMatch
                                        ? 'border border-white/40 bg-white/[0.08] text-white'
                                        : 'bg-[#16171B] border border-[#26282D] text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

          {filteredCategories.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#26282D] bg-[#16171B] p-8 text-center">
            <p className="text-sm font-semibold text-neutral-300">
              No standard catalog match for &quot;{searchQuery}&quot;
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              You can enter custom workforce requirements or add this topic directly below.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOtherOpen(true);
                  setValue('otherDomainText', searchQuery, { shouldValidate: true });
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white border border-[#26282D] hover:border-white/30 px-4 py-2.5 text-xs font-bold shadow-xs active:scale-95 touch-manipulation"
              >
                <Sliders size={14} />
                <span>Add &quot;{searchQuery}&quot; as Specialized Topic</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#26282D] bg-[#0F1013] px-4 py-2.5 text-xs font-medium text-neutral-300 hover:bg-white/[0.05] active:scale-95 touch-manipulation"
              >
                <span>Clear search</span>
              </button>
            </div>
          </div>
        )}

        {errors.domains && (
          <p className="text-xs font-medium text-red-600" role="alert">
            {errors.domains.message}
          </p>
        )}
      </div>

      <div className="pt-1">
        {!isOtherOpen ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOtherOpen(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white"
          >
            <Sliders size={14} />
            <span>Need a custom framework, niche certification, or specialized skill not listed above?</span>
          </button>
        ) : (
          <div className="rounded-2xl border border-[#26282D] bg-[#16171B] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-white" />
                <h4 className="font-heading text-sm font-semibold text-white">
                  Specify Custom Training Topic or Industry Certification
                </h4>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOtherOpen(false);
                  setValue('otherDomainText', '', { shouldValidate: true });
                }}
                className="text-neutral-400 hover:text-white"
                aria-label="Close specialized input"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              Provide the exact framework, technical skill, or business objective you need covered:
            </p>

            <div className="mt-3">
              <input
                type="text"
                placeholder="e.g., ESG Reporting Frameworks, Supply Chain Optimization, Lean Six Sigma..."
                className="w-full rounded-xl border border-[#26282D] bg-[#0F1013] px-4 py-3.5 sm:py-3 text-base sm:text-sm text-white placeholder:text-neutral-500 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
                {...register('otherDomainText')}
              />
              {errors.otherDomainText && (
                <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                  {errors.otherDomainText.message}
                </p>
              )}
            </div>

                  <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-neutral-400">Suggestions:</span>
              {SUGGESTED_OTHER_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setValue('otherDomainText', topic, { shouldValidate: true });
                  }}
                  className="rounded-lg border border-[#26282D] bg-[#0F1013] px-3 py-1.5 text-xs font-medium text-neutral-300 hover:border-white/20 hover:bg-white/[0.05] active:scale-95 touch-manipulation"
                >
                  + {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <StepNavigation
        nextLabel="Continue to Delivery & Region"
        isSubmitting={isSubmitting}
        trustMessage="Verified providers · 100% Free for hiring enterprises"
      />
    </form>
  );
}
