'use client'

import React, { useState } from 'react'
import type { SEOData } from './types'
import styles from './SEOEditor.module.css'

interface SocialPreviewProps {
  data: SEOData
  locale: string
  resolvedImageUrl?: string | null
}

export const SocialPreview: React.FC<SocialPreviewProps> = ({
  data,
  locale,
  resolvedImageUrl,
}) => {
  const [network, setNetwork] = useState<'linkedin' | 'twitter'>('linkedin')
  const isArabic = locale === 'ar'

  const safeData = data || {}
  const title = (
    safeData.ogTitle ||
    safeData.metaTitle ||
    safeData.title ||
    (isArabic ? 'عنوان المقال للمشاركة الاجتماعية' : 'Article Social Share Title')
  ).trim()

  const description = (
    safeData.ogDescription ||
    safeData.metaDescription ||
    safeData.excerpt ||
    (isArabic
      ? 'ملخص مقال تدريب وتطوير الكوادر القيادية على منصة PontLook.'
      : 'Executive corporate training benchmark summary on the PontLook platform.')
  ).trim()

  // Resolve preview image URL
  let imageUrl = resolvedImageUrl || null
  if (!imageUrl && safeData.featuredImage) {
    if (typeof safeData.featuredImage === 'string') {
      imageUrl = safeData.featuredImage
    } else if (typeof safeData.featuredImage === 'object') {
      imageUrl =
        safeData.featuredImage.url ||
        (safeData.featuredImage.filename ? `/payload-media/${safeData.featuredImage.filename}` : null)
    }
  }

  return (
    <div className={styles.previewBox}>
      <div className={styles.previewHeader}>
        <div className={styles.previewTitle}>
          {isArabic ? 'معاينة بطاقات التواصل الاجتماعي (Social Preview)' : 'Social Open Graph Preview'}
        </div>

        <div className={styles.previewToggles} role="group" aria-label="Social Network Toggle">
          <button
            type="button"
            className={`${styles.toggleBtn} ${network === 'linkedin' ? styles.toggleBtnActive : ''}`}
            onClick={() => setNetwork('linkedin')}
          >
            💼 LinkedIn / Facebook
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${network === 'twitter' ? styles.toggleBtnActive : ''}`}
            onClick={() => setNetwork('twitter')}
          >
            🐦 Twitter / X
          </button>
        </div>
      </div>

      <div className={styles.socialCard} dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Image Area */}
        <div className={styles.socialImageContainer}>
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={title}
              className={styles.socialImage}
              onError={(e) => {
                // Graceful fallback on broken local image path
                ;(e.target as HTMLElement).style.display = 'none'
              }}
            />
          ) : (
            <div className={styles.socialPlaceholder}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>{isArabic ? 'لا توجد صورة مشاركة' : 'No preview image available'}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className={styles.socialContent}>
          <div className={styles.socialDomain}>PONTLOOK.COM</div>
          <h4 className={styles.socialTitle} title={title}>
            {title}
          </h4>
          <p className={styles.socialDescription} title={description}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
