'use client'

import React, { useState } from 'react'
import type { SEOData } from './types'
import styles from './SEOEditor.module.css'

interface GooglePreviewProps {
  data: SEOData
  locale: string
}

export const GooglePreview: React.FC<GooglePreviewProps> = ({ data, locale }) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const isArabic = locale === 'ar'

  const title = (data.metaTitle || data.title || (isArabic ? 'عنوان المقال التجريبي' : 'Untitled Article')).trim()
  const description = (
    data.metaDescription ||
    data.excerpt ||
    (isArabic
      ? 'استكشف أهم الاستراتيجيات والرؤى الإدارية في تدريب وتطوير الكوادر المؤسسية عبر منصة PontLook.'
      : 'Explore comprehensive corporate learning insights and talent benchmark strategies on PontLook.')
  ).trim()
  const slug = (data.slug || 'sample-article-slug').trim()

  const fullUrl = `https://pontlook.com/${locale}/resources/blog/${slug}`
  const breadcrumb = `pontlook.com › ${locale} › resources › blog › ${slug}`

  return (
    <div className={styles.previewBox}>
      <div className={styles.previewHeader}>
        <div className={styles.previewTitle}>
          {isArabic ? 'معاينة نتائج بحث Google (Search Preview)' : 'Google Search Result Preview'}
        </div>

        <div className={styles.previewToggles} role="group" aria-label="Device Preview Toggle">
          <button
            type="button"
            className={`${styles.toggleBtn} ${device === 'desktop' ? styles.toggleBtnActive : ''}`}
            onClick={() => setDevice('desktop')}
          >
            🖥️ {isArabic ? 'سطح المكتب' : 'Desktop'}
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${device === 'mobile' ? styles.toggleBtnActive : ''}`}
            onClick={() => setDevice('mobile')}
          >
            📱 {isArabic ? 'الهاتف' : 'Mobile'}
          </button>
        </div>
      </div>

      <div
        className={styles.googleCard}
        dir={isArabic ? 'rtl' : 'ltr'}
        style={{
          maxWidth: device === 'mobile' ? '390px' : '650px',
          border: device === 'mobile' ? '1px solid #e0e0e0' : 'none',
        }}
      >
        {/* Breadcrumbs */}
        <div className={styles.googleBreadcrumb}>
          <div className={styles.googleFavicon} />
          <span title={fullUrl}>{breadcrumb}</span>
        </div>

        {/* Title */}
        <div className={styles.googleTitle} title={title}>
          {title} | PontLook
        </div>

        {/* Snippet */}
        <div className={styles.googleSnippet} title={description}>
          {description}
        </div>
      </div>
    </div>
  )
}
