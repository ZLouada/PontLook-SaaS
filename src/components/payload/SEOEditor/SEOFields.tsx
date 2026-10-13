'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import type { SEOMetrics } from './types'
import { getEmptySEOMetrics } from './SEOScorer'
import styles from './SEOEditor.module.css'

interface SEOFieldsProps {
  metrics: SEOMetrics
  isArabic: boolean
}

export const SEOFields: React.FC<SEOFieldsProps> = ({ metrics, isArabic }) => {
  const safeMetrics = metrics || getEmptySEOMetrics(isArabic)

  // Bind directly to Payload form fields
  const metaTitleField = useField<string>({ path: 'meta.title' })
  const metaDescField = useField<string>({ path: 'meta.description' })
  const focusKeywordField = useField<string>({ path: 'meta.focusKeyword' })
  const secondaryKeywordsField = useField<string>({ path: 'meta.secondaryKeywords' })
  const canonicalUrlField = useField<string>({ path: 'meta.canonicalUrl' })
  const noIndexField = useField<boolean>({ path: 'meta.noIndex' })
  const noFollowField = useField<boolean>({ path: 'meta.noFollow' })

  const metaTitleVal = (metaTitleField?.value as string) || ''
  const metaDescVal = (metaDescField?.value as string) || ''
  const focusKeywordVal = (focusKeywordField?.value as string) || ''
  const secondaryKeywordsVal = (secondaryKeywordsField?.value as string) || ''
  const canonicalUrlVal = (canonicalUrlField?.value as string) || ''
  const noIndexVal = Boolean(noIndexField?.value)
  const noFollowVal = Boolean(noFollowField?.value)

  // Title meter
  const titleCount = metaTitleVal.length
  let titleBarColor = '#EF4444'
  if (titleCount >= 40 && titleCount <= 60) titleBarColor = '#10B981'
  else if ((titleCount >= 25 && titleCount < 40) || (titleCount > 60 && titleCount <= 70)) titleBarColor = '#F59E0B'
  const titlePercent = Math.min(100, Math.round((titleCount / 60) * 100))

  // Description meter
  const descCount = metaDescVal.length
  let descBarColor = '#EF4444'
  if (descCount >= 120 && descCount <= 160) descBarColor = '#10B981'
  else if ((descCount >= 80 && descCount < 120) || (descCount > 160 && descCount <= 180)) descBarColor = '#F59E0B'
  const descPercent = Math.min(100, Math.round((descCount / 160) * 100))

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    borderRadius: '6px',
    border: '1px solid var(--theme-elevation-200, #333333)',
    backgroundColor: 'var(--theme-elevation-100, #181818)',
    color: 'var(--theme-text, #ffffff)',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8125rem',
    fontWeight: 700,
    marginBottom: '0.375rem',
    color: 'var(--theme-text, #ffffff)',
  }

  const groupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    marginBottom: '1.25rem',
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1.25rem',
        backgroundColor: 'var(--theme-elevation-100, #161616)',
        borderRadius: '10px',
        border: '1px solid var(--theme-elevation-150, #262626)',
      }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* SEO Title Input */}
      <div style={groupStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={labelStyle}>
            {isArabic ? 'عنوان SEO المخصص (SEO Title)' : 'SEO Title'}
          </label>
          <span style={{ fontSize: '0.75rem', color: titleBarColor, fontWeight: 700 }}>
            {titleCount} / 60 {isArabic ? 'حرف' : 'chars'}
          </span>
        </div>

        <input
          type="text"
          value={metaTitleVal}
          onChange={(e) => metaTitleField?.setValue?.(e.target.value)}
          placeholder={isArabic ? 'اتركه فارغاً لاستخدام عنوان المقال الأصلي' : 'Leave empty to use article title'}
          style={inputStyle}
          aria-label={isArabic ? 'عنوان SEO' : 'SEO Title'}
        />

        <div className={styles.fieldMeterRow}>
          <div className={styles.fieldMeterBar} style={{ margin: 0 }}>
            <div
              className={styles.fieldMeterFill}
              style={{
                width: `${titlePercent}%`,
                backgroundColor: titleBarColor,
              }}
            />
          </div>
        </div>
      </div>

      {/* Meta Description Input */}
      <div style={groupStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={labelStyle}>
            {isArabic ? 'الوصف التعريفي لمحركات البحث (Meta Description)' : 'Meta Description'}
          </label>
          <span style={{ fontSize: '0.75rem', color: descBarColor, fontWeight: 700 }}>
            {descCount} / 160 {isArabic ? 'حرف' : 'chars'}
          </span>
        </div>

        <textarea
          rows={3}
          value={metaDescVal}
          onChange={(e) => metaDescField?.setValue?.(e.target.value)}
          placeholder={isArabic ? 'اتركه فارغاً لاستخدام مقتطف المقال الأصلي' : 'Leave empty to use article excerpt'}
          style={{ ...inputStyle, resize: 'vertical' }}
          aria-label={isArabic ? 'الوصف التعريفي' : 'Meta Description'}
        />

        <div className={styles.fieldMeterRow}>
          <div className={styles.fieldMeterBar} style={{ margin: 0 }}>
            <div
              className={styles.fieldMeterFill}
              style={{
                width: `${descPercent}%`,
                backgroundColor: descBarColor,
              }}
            />
          </div>
        </div>
      </div>

      {/* Focus Keyword Input & Live Checklist */}
      <div style={groupStyle}>
        <label style={labelStyle}>
          {isArabic ? 'الكلمة المفتاحية المستهدفة (Focus Keyword)' : 'Focus Keyword'}
        </label>
        <input
          type="text"
          value={focusKeywordVal}
          onChange={(e) => focusKeywordField?.setValue?.(e.target.value)}
          placeholder={isArabic ? 'مثال: تدريب الشركات في السعودية' : 'e.g. corporate training GCC'}
          style={inputStyle}
          aria-label={isArabic ? 'الكلمة المفتاحية المستهدفة' : 'Focus Keyword'}
        />

        {focusKeywordVal.trim().length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginTop: '0.5rem',
              fontSize: '0.75rem',
            }}
          >
            <span
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                backgroundColor: safeMetrics.focusKeywordInTitle ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: safeMetrics.focusKeywordInTitle ? '#10B981' : '#EF4444',
                fontWeight: 600,
              }}
            >
              {safeMetrics.focusKeywordInTitle ? '✓' : '✕'} {isArabic ? 'العنوان' : 'In Title'}
            </span>
            <span
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                backgroundColor: safeMetrics.focusKeywordInMetaDesc ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: safeMetrics.focusKeywordInMetaDesc ? '#10B981' : '#EF4444',
                fontWeight: 600,
              }}
            >
              {safeMetrics.focusKeywordInMetaDesc ? '✓' : '✕'} {isArabic ? 'الوصف' : 'In Description'}
            </span>
            <span
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                backgroundColor: safeMetrics.focusKeywordInSlug ? 'rgba(16, 185, 129, 0.15)' : 'rgba(14, 165, 233, 0.15)',
                color: safeMetrics.focusKeywordInSlug ? '#10B981' : '#0EA5E9',
                fontWeight: 600,
              }}
            >
              {safeMetrics.focusKeywordInSlug ? '✓' : '○'} {isArabic ? 'الرابط' : 'In Slug'}
            </span>
            <span
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                backgroundColor: safeMetrics.focusKeywordInFirstParagraph ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                color: safeMetrics.focusKeywordInFirstParagraph ? '#10B981' : '#F59E0B',
                fontWeight: 600,
              }}
            >
              {safeMetrics.focusKeywordInFirstParagraph ? '✓' : '⚠'} {isArabic ? 'المقدمة' : 'First Paragraph'}
            </span>
            <span
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                backgroundColor: safeMetrics.focusKeywordInHeadings ? 'rgba(16, 185, 129, 0.15)' : 'rgba(14, 165, 233, 0.15)',
                color: safeMetrics.focusKeywordInHeadings ? '#10B981' : '#0EA5E9',
                fontWeight: 600,
              }}
            >
              {safeMetrics.focusKeywordInHeadings ? '✓' : '○'} {isArabic ? 'العناوين الفرعية' : 'Headings'}
            </span>
            <span
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                backgroundColor: 'var(--theme-elevation-200, #2a2a2a)',
                color: 'var(--theme-text, #ffffff)',
                fontWeight: 600,
              }}
            >
              {isArabic ? 'الكثافة:' : 'Density:'} {safeMetrics.focusKeywordDensity}% ({safeMetrics.focusKeywordOccurrences}x)
            </span>
          </div>
        )}
      </div>

      {/* Secondary Keywords Input */}
      <div style={groupStyle}>
        <label style={labelStyle}>
          {isArabic ? 'كلمات مفتاحية ثانوية (Secondary Keywords)' : 'Secondary Keywords'}
        </label>
        <input
          type="text"
          value={secondaryKeywordsVal}
          onChange={(e) => secondaryKeywordsField?.setValue?.(e.target.value)}
          placeholder={isArabic ? 'افصل بين الكلمات بفواصل، مثال: قيادة الموارد البشرية، رؤية 2030' : 'Separate with commas, e.g. HR leadership, talent development, GCC'}
          style={inputStyle}
          aria-label={isArabic ? 'كلمات مفتاحية ثانوية' : 'Secondary Keywords'}
        />
      </div>

      {/* Advanced SEO Toggle Box */}
      <div
        style={{
          marginTop: '0.5rem',
          padding: '1rem',
          backgroundColor: 'var(--theme-elevation-50, #141414)',
          borderRadius: '8px',
          border: '1px solid var(--theme-elevation-150, #222222)',
        }}
      >
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.75rem', color: '#FF5C00' }}>
          ⚙️ {isArabic ? 'خيارات الفهرسة المتقدمة (Advanced Robots)' : 'Advanced Indexing & Robots'}
        </div>

        {/* Canonical URL */}
        <div style={{ marginBottom: '0.875rem' }}>
          <label style={{ ...labelStyle, fontSize: '0.75rem' }}>
            {isArabic ? 'رابط الأصل (Canonical URL Override)' : 'Canonical URL Override'}
          </label>
          <input
            type="url"
            value={canonicalUrlVal}
            onChange={(e) => canonicalUrlField?.setValue?.(e.target.value)}
            placeholder="https://pontlook.com/en/resources/blog/original-post"
            style={{ ...inputStyle, fontSize: '0.8125rem' }}
          />
        </div>

        {/* Robots Checkboxes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.8125rem' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={noIndexVal}
              onChange={(e) => noIndexField?.setValue?.(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span>
              {isArabic ? 'منع الفهرسة (noindex)' : 'Disallow Indexing (noindex)'}
            </span>
          </label>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={noFollowVal}
              onChange={(e) => noFollowField?.setValue?.(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span>
              {isArabic ? 'عدم تتبع الروابط (nofollow)' : 'Disallow Link Following (nofollow)'}
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
