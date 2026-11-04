'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Download, FileText, SlidersHorizontal, ArrowRight, CheckCircle2 } from '@/components/icons';
import type { AdaptedDownload } from '@/lib/payload/resources';

interface DownloadsLibraryClientProps {
  initialToolkits: AdaptedDownload[];
  isAr?: boolean;
  lang: string;
}

const TOPICS = [
  { value: 'all', labelEn: 'All Topics', labelAr: 'جميع المواضيع' },
  { value: 'leadership', labelEn: 'Leadership', labelAr: 'القيادة الإدارية' },
  { value: 'learning-and-development', labelEn: 'Learning & Development', labelAr: 'التعلم والتطوير' },
  { value: 'workforce-development', labelEn: 'Workforce Development', labelAr: 'تطوير القوى العاملة' },
  { value: 'ai-and-digital-skills', labelEn: 'AI & Digital Skills', labelAr: 'الذكاء الاصطناعي والمهارات الرقمية' },
  { value: 'onboarding-and-retention', labelEn: 'Onboarding & Retention', labelAr: 'تأهيل واستبقاء الكفاءات' },
  { value: 'nationalization', labelEn: 'Nationalization', labelAr: 'توطين الوظائف' },
  { value: 'training-roi', labelEn: 'Training ROI', labelAr: 'العائد على التدريب' },
  { value: 'corporate-culture', labelEn: 'Corporate Culture', labelAr: 'الثقافة المؤسسية' },
];

const CONTENT_TYPES = [
  { value: 'all', labelEn: 'All Content Types', labelAr: 'جميع أنواع المحتوى' },
  { value: 'ebook', labelEn: 'Ebook', labelAr: 'كتاب إلكتروني' },
  { value: 'guide', labelEn: 'Guide', labelAr: 'دليل تنفيذي' },
  { value: 'kit', labelEn: 'Kit', labelAr: 'حقيبة أدوات' },
  { value: 'partner-contribution', labelEn: 'Partner Contribution', labelAr: 'مساهمة الشركاء' },
  { value: 'quiz-game', labelEn: 'Quiz / Game', labelAr: 'اختبار / لعبة' },
  { value: 'template', labelEn: 'Template', labelAr: 'نموذج عمل' },
  { value: 'tool', labelEn: 'Tool', labelAr: 'أداة تشخيص' },
  { value: 'webinar', labelEn: 'Webinar', labelAr: 'ورشة رقمية' },
];

const FORMATS = [
  { value: 'all', labelEn: 'All Formats', labelAr: 'جميع الصيغ' },
  { value: 'pdf', labelEn: 'PDF', labelAr: 'PDF' },
  { value: 'excel', labelEn: 'Excel', labelAr: 'Excel' },
  { value: 'google sheets', labelEn: 'Google Sheets', labelAr: 'Google Sheets' },
  { value: 'word', labelEn: 'Word', labelAr: 'Word' },
  { value: 'powerpoint', labelEn: 'Powerpoint', labelAr: 'Powerpoint' },
  { value: 'google docs', labelEn: 'Google Docs', labelAr: 'Google Docs' },
  { value: 'google slides', labelEn: 'Google Slides', labelAr: 'Google Slides' },
];

export function DownloadsLibraryClient({
  initialToolkits,
  isAr = false,
  lang,
}: DownloadsLibraryClientProps) {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredToolkits = useMemo(() => {
    return initialToolkits.filter((toolkit) => {
      // 1. Topic filter
      if (selectedTopic !== 'all' && toolkit.categorySlug !== selectedTopic) {
        return false;
      }

      // 2. Content Type filter
      if (selectedType !== 'all') {
        const typeSlug = (toolkit.contentTypeSlug || toolkit.contentType || '').toLowerCase();
        if (!typeSlug.includes(selectedType.toLowerCase())) {
          return false;
        }
      }

      // 3. Format filter
      if (selectedFormat !== 'all') {
        const formatStr = (toolkit.format || '').toLowerCase();
        if (!formatStr.includes(selectedFormat.toLowerCase())) {
          return false;
        }
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = toolkit.title.toLowerCase().includes(q);
        const descMatch = toolkit.desc.toLowerCase().includes(q);
        const catMatch = toolkit.category.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !catMatch) {
          return false;
        }
      }

      return true;
    });
  }, [initialToolkits, selectedTopic, selectedType, selectedFormat, searchQuery]);

  const resetFilters = () => {
    setSelectedTopic('all');
    setSelectedType('all');
    setSelectedFormat('all');
    setSearchQuery('');
  };

  return (
    <div>
      {/* HubSpot Style Filter Bar */}
      <div className="bg-neutral-50/90 border border-neutral-200/90 rounded-3xl p-5 sm:p-6 mb-10 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Topic Select */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider font-mono mb-1.5">
              {isAr ? 'الموضوع / التصنيف' : 'All Topics'}
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00] transition-colors"
            >
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>
                  {isAr ? t.labelAr : t.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Content Type Select */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider font-mono mb-1.5">
              {isAr ? 'نوع المحتوى' : 'All Content Types'}
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00] transition-colors"
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {isAr ? t.labelAr : t.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Format Select */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider font-mono mb-1.5">
              {isAr ? 'الصيغة' : 'All Formats'}
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00] transition-colors"
            >
              {FORMATS.map((t) => (
                <option key={t.value} value={t.value}>
                  {isAr ? t.labelAr : t.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-600 uppercase tracking-wider font-mono mb-1.5">
              {isAr ? 'بحث في الموارد' : 'Search All Resources'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث بالاسم أو الموضوع...' : 'Search by title or topic...'}
                className="w-full pl-9 pr-3.5 rtl:pr-9 rtl:pl-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00] transition-colors"
              />
              <Search
                size={14}
                className="absolute left-3 rtl:left-auto rtl:right-3 top-3 text-neutral-400"
              />
            </div>
          </div>
        </div>

        {/* Results Count & Reset */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-200/60 text-xs text-neutral-500 font-mono">
          <span>
            {isAr
              ? `عرض ${filteredToolkits.length} من أصل ${initialToolkits.length} أداة ونموذج`
              : `Showing ${filteredToolkits.length} of ${initialToolkits.length} toolkits`}
          </span>

          {(selectedTopic !== 'all' || selectedType !== 'all' || selectedFormat !== 'all' || searchQuery.trim()) && (
            <button
              onClick={resetFilters}
              className="text-[#FF5C00] hover:underline font-semibold cursor-pointer"
            >
              {isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
            </button>
          )}
        </div>
      </div>

      {/* Grid of Toolkits */}
      {filteredToolkits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredToolkits.map((tool) => {
            const downloadUrl = tool.fileUrl
              ? `/api/download?url=${encodeURIComponent(tool.fileUrl)}&filename=${encodeURIComponent(`${tool.slug || 'pontlook-toolkit'}.${tool.format.toLowerCase()}`)}`
              : `/${lang}/contact?interest=${encodeURIComponent(tool.slug || tool.id)}`;

            return (
              <div
                key={tool.id}
                className="group h-full flex flex-col justify-between rounded-3xl bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
              >
                <div>
                  {/* Thumbnail / Visual Header */}
                  <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-neutral-100 to-neutral-200 border-b border-neutral-200 overflow-hidden">
                    {tool.image ? (
                      <Image
                        src={tool.image}
                        alt={tool.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-neutral-400 group-hover:scale-105 transition-transform duration-500">
                        <FileText size={36} className="text-[#FF5C00]/70 mb-2" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                          {tool.contentType}
                        </span>
                      </div>
                    )}

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-neutral-900 font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs border border-neutral-200/80">
                        {tool.contentType}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-950/80 backdrop-blur-xs text-white font-mono text-[10px] font-semibold">
                        {tool.format}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 mb-2">
                      <span className="font-semibold text-neutral-700">
                        {tool.category}
                      </span>
                      <span>•</span>
                      <span className="tabular-nums">{tool.fileSize}</span>
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-neutral-950 leading-snug mb-2 group-hover:text-[#FF5C00] transition-colors">
                      {tool.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-5 line-clamp-3">
                      {tool.desc}
                    </p>

                    {tool.features && tool.features.length > 0 && (
                      <div className="space-y-1.5 pt-4 border-t border-neutral-100 mb-6">
                        {tool.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                            <CheckCircle2 size={13} className="text-[#FF5C00] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={downloadUrl}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-neutral-950 hover:bg-[#FF5C00] text-white hover:text-black font-bold text-xs transition-all active:scale-95 shadow-sm"
                    {...(tool.fileUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Download size={14} />
                    <span>{isAr ? 'تحميل مجاني' : 'Access for Free'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 text-center">
          <p className="text-base text-neutral-800 font-semibold mb-2">
            {isAr ? 'لا توجد موارد تطابق معايير البحث الحالية.' : 'No resources match your filter criteria.'}
          </p>
          <p className="text-xs text-neutral-500 mb-6">
            {isAr ? 'جرب تغيير التصنيف، الصيغة، أو مسح نص البحث.' : 'Try adjusting your topic, format, or search term.'}
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-black text-white text-xs font-semibold"
          >
            {isAr ? 'إعادة ضبط كل الفلاتر' : 'Reset All Filters'}
          </button>
        </div>
      )}
    </div>
  );
}
