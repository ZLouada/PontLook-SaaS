'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFormFields, useLocale } from '@payloadcms/ui'
import type { SEOAnalysisResult, SEOData } from './types'
import { analyzeArticleSEO } from './SEOAnalysis'
import { SEOScore } from './SEOScore'
import { SEORecommendations } from './SEORecommendations'
import { GooglePreview } from './GooglePreview'
import { SocialPreview } from './SocialPreview'
import { SEOFields } from './SEOFields'
import styles from './SEOEditor.module.css'

export const SEOEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'score' | 'google' | 'social' | 'fields' | 'insights'>('score')
  const [resolvedMedia, setResolvedMedia] = useState<{ id: any; alt?: string; url?: string } | null>(null)
  const mediaCache = useRef<Map<string | number, any>>(new Map())

  // Detect current active admin locale
  const localeContext = useLocale()
  const currentLocale = typeof localeContext === 'string' ? localeContext : localeContext?.code || 'en'
  const isArabic = currentLocale === 'ar'

  // Subscribe in real-time to relevant form fields
  const formState = useFormFields(([fields]) => ({
    title: fields.title?.value as string | undefined,
    slug: fields.slug?.value as string | undefined,
    excerpt: fields.excerpt?.value as string | undefined,
    content: fields.content?.value,
    featuredImage: fields.featuredImage?.value,
    metaTitle: fields['meta.title']?.value as string | undefined,
    metaDescription: fields['meta.description']?.value as string | undefined,
    focusKeyword: fields['meta.focusKeyword']?.value as string | undefined,
    secondaryKeywords: fields['meta.secondaryKeywords']?.value as string | undefined,
    canonicalUrl: fields['meta.canonicalUrl']?.value as string | undefined,
    noIndex: fields['meta.noIndex']?.value as boolean | undefined,
    noFollow: fields['meta.noFollow']?.value as boolean | undefined,
    ogTitle: fields['meta.ogTitle']?.value as string | undefined,
    ogDescription: fields['meta.ogDescription']?.value as string | undefined,
    ogImage: fields['meta.ogImage']?.value,
  }))

  // Resolve featured image details if only an ID was provided
  const rawFeaturedImage = formState.featuredImage
  useEffect(() => {
    let isCancelled = false

    if (!rawFeaturedImage) {
      setResolvedMedia(null)
      return
    }

    const mediaObj = rawFeaturedImage as any
    if (typeof rawFeaturedImage === 'object') {
      const altVal =
        typeof mediaObj.alt === 'object'
          ? mediaObj.alt?.[currentLocale] || mediaObj.alt?.en
          : mediaObj.alt || ''
      const urlVal =
        mediaObj.url ||
        (mediaObj.filename ? `/payload-media/${mediaObj.filename}` : null)
      setResolvedMedia({
        id: mediaObj.id,
        alt: altVal,
        url: urlVal,
      })
      return
    }

    // If ID, fetch once from media API with caching
    const imageId = rawFeaturedImage as string | number
    if (mediaCache.current.has(imageId)) {
      setResolvedMedia(mediaCache.current.get(imageId))
      return
    }

    const fetchMedia = async () => {
      try {
        const res = await fetch(`/payload-api/media/${imageId}?locale=${currentLocale}&depth=0`)
        if (!res.ok) return
        const mediaDoc = await res.json()
        if (!isCancelled && mediaDoc) {
          const resolved = {
            id: mediaDoc.id,
            alt: mediaDoc.alt || '',
            url: mediaDoc.url || (mediaDoc.filename ? `/payload-media/${mediaDoc.filename}` : null),
          }
          mediaCache.current.set(imageId, resolved)
          setResolvedMedia(resolved)
        }
      } catch (err) {
        console.warn('[SEOEditor] Could not fetch media document:', err)
      }
    }

    fetchMedia()

    return () => {
      isCancelled = true
    }
  }, [rawFeaturedImage, currentLocale])

  // Build complete SEO data payload
  const seoData: SEOData = useMemo(() => {
    return {
      title: formState.title,
      slug: formState.slug,
      excerpt: formState.excerpt,
      content: formState.content,
      featuredImage: resolvedMedia || formState.featuredImage,
      metaTitle: formState.metaTitle,
      metaDescription: formState.metaDescription,
      focusKeyword: formState.focusKeyword,
      secondaryKeywords: formState.secondaryKeywords,
      canonicalUrl: formState.canonicalUrl,
      noIndex: formState.noIndex,
      noFollow: formState.noFollow,
      ogTitle: formState.ogTitle,
      ogDescription: formState.ogDescription,
      ogImage: formState.ogImage,
    }
  }, [formState, resolvedMedia])

  // Debounced real-time analysis
  const [analysis, setAnalysis] = useState<SEOAnalysisResult>(() =>
    analyzeArticleSEO(seoData, currentLocale),
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalysis(analyzeArticleSEO(seoData, currentLocale))
    }, 150)

    return () => clearTimeout(timer)
  }, [seoData, currentLocale])

  return (
    <div
      className={styles.container}
      dir={isArabic ? 'rtl' : 'ltr'}
      role="region"
      aria-label="SEO Content Editor"
    >
      {/* Header Bar */}
      <div className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <path d="M11 8v6M8 11h6" />
          </svg>
          <h3 className={styles.headerTitle}>
            {isArabic ? 'محرر ومحلل السيو (SEO Editor)' : 'SEO Content Editor'}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <span className={styles.localeBadge}>
            {isArabic ? '🇸🇦 العربية (AR)' : '🇬🇧 English (EN)'}
          </span>
          <span
            style={{
              padding: '0.25rem 0.625rem',
              borderRadius: '9999px',
              backgroundColor: analysis.score >= 80 ? 'rgba(16, 185, 129, 0.2)' : analysis.score >= 50 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: analysis.score >= 80 ? '#10B981' : analysis.score >= 50 ? '#F59E0B' : '#EF4444',
              fontSize: '0.75rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            {analysis.score} / 100
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.navTabs} role="tablist" aria-label="SEO Views">
        <button
          type="button"
          className={`${styles.navTabButton} ${activeTab === 'score' ? styles.navTabButtonActive : ''}`}
          onClick={() => setActiveTab('score')}
        >
          📊 {isArabic ? 'النقاط والتوصيات' : 'Score & Checklist'}
        </button>

        <button
          type="button"
          className={`${styles.navTabButton} ${activeTab === 'google' ? styles.navTabButtonActive : ''}`}
          onClick={() => setActiveTab('google')}
        >
          🔍 {isArabic ? 'معاينة Google' : 'Google Preview'}
        </button>

        <button
          type="button"
          className={`${styles.navTabButton} ${activeTab === 'social' ? styles.navTabButtonActive : ''}`}
          onClick={() => setActiveTab('social')}
        >
          📱 {isArabic ? 'معاينة التواصل' : 'Social Cards'}
        </button>

        <button
          type="button"
          className={`${styles.navTabButton} ${activeTab === 'fields' ? styles.navTabButtonActive : ''}`}
          onClick={() => setActiveTab('fields')}
        >
          📝 {isArabic ? 'تحرير حقول السيو' : 'Quick SEO Fields'}
        </button>

        <button
          type="button"
          className={`${styles.navTabButton} ${activeTab === 'insights' ? styles.navTabButtonActive : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          📑 {isArabic ? 'إحصاءات المحتوى' : 'Content Insights'}
        </button>
      </div>

      {/* Main View Area */}
      {activeTab === 'score' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <SEOScore analysis={analysis} isArabic={isArabic} />
          <SEORecommendations checks={analysis.checks} isArabic={isArabic} />
        </div>
      )}

      {activeTab === 'google' && (
        <GooglePreview data={seoData} locale={currentLocale} />
      )}

      {activeTab === 'social' && (
        <SocialPreview
          data={seoData}
          locale={currentLocale}
          resolvedImageUrl={resolvedMedia?.url}
        />
      )}

      {activeTab === 'fields' && (
        <SEOFields metrics={analysis.metrics} isArabic={isArabic} />
      )}

      {activeTab === 'insights' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            padding: '1.25rem',
            backgroundColor: 'var(--theme-elevation-100, #161616)',
            borderRadius: '10px',
            border: '1px solid var(--theme-elevation-150, #262626)',
          }}
        >
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--theme-elevation-50, #121212)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{isArabic ? 'عدد الكلمات' : 'Word Count'}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem' }}>{analysis.metrics.wordCount}</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--theme-elevation-50, #121212)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{isArabic ? 'وقت القراءة المقدر' : 'Reading Time'}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem' }}>{analysis.metrics.readingTimeMinutes} min</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--theme-elevation-50, #121212)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{isArabic ? 'عدد العناوين' : 'Headings'}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem' }}>{analysis.metrics.headingCount} (H2: {analysis.metrics.h2Count})</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--theme-elevation-50, #121212)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{isArabic ? 'عدد الفقرات' : 'Paragraphs'}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem' }}>{analysis.metrics.paragraphCount}</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--theme-elevation-50, #121212)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{isArabic ? 'الروابط الداخلية' : 'Internal Links'}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem' }}>{analysis.metrics.internalLinkCount}</div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--theme-elevation-50, #121212)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888' }}>{isArabic ? 'الروابط الخارجية' : 'External Links'}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem' }}>{analysis.metrics.externalLinkCount}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SEOEditor
