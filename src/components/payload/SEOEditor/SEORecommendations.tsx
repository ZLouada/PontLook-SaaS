'use client'

import React, { useState } from 'react'
import type { SEOCheck, SEOCheckStatus } from './types'
import styles from './SEOEditor.module.css'

interface SEORecommendationsProps {
  checks: SEOCheck[]
  isArabic: boolean
}

export const SEORecommendations: React.FC<SEORecommendationsProps> = ({ checks, isArabic }) => {
  const [filter, setFilter] = useState<'all' | 'error' | 'warning' | 'pass'>('all')
  const safeChecks = checks || []

  const errorChecks = safeChecks.filter((c) => c.status === 'error')
  const warningChecks = safeChecks.filter((c) => c.status === 'warning')
  const passChecks = safeChecks.filter((c) => c.status === 'pass')

  const filteredChecks = safeChecks.filter((c) => {
    if (filter === 'all') return true
    return c.status === filter
  })

  const renderStatusIcon = (status: SEOCheckStatus) => {
    switch (status) {
      case 'pass':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )
      case 'warning':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )
      case 'error':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        )
      case 'optional':
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        )
    }
  }

  return (
    <div className={styles.recommendationsSection}>
      {/* Filter Tabs */}
      <div className={styles.filterTabs} role="tablist" aria-label={isArabic ? 'فلترة التوصيات' : 'Filter Recommendations'}>
        <button
          type="button"
          className={`${styles.filterPill} ${filter === 'all' ? styles.filterPillActive : ''}`}
          onClick={() => setFilter('all')}
        >
          {isArabic ? `الكل (${checks.length})` : `All (${checks.length})`}
        </button>

        <button
          type="button"
          className={`${styles.filterPill} ${filter === 'error' ? styles.filterPillActive : ''}`}
          onClick={() => setFilter('error')}
        >
          <span style={{ color: '#EF4444' }}>✕</span>
          {isArabic ? `أخطاء (${errorChecks.length})` : `Errors (${errorChecks.length})`}
        </button>

        <button
          type="button"
          className={`${styles.filterPill} ${filter === 'warning' ? styles.filterPillActive : ''}`}
          onClick={() => setFilter('warning')}
        >
          <span style={{ color: '#F59E0B' }}>⚠</span>
          {isArabic ? `تنبيهات (${warningChecks.length})` : `Warnings (${warningChecks.length})`}
        </button>

        <button
          type="button"
          className={`${styles.filterPill} ${filter === 'pass' ? styles.filterPillActive : ''}`}
          onClick={() => setFilter('pass')}
        >
          <span style={{ color: '#10B981' }}>✓</span>
          {isArabic ? `ناجحة (${passChecks.length})` : `Passed (${passChecks.length})`}
        </button>
      </div>

      {/* Checklist items */}
      <div className={styles.checkList}>
        {filteredChecks.length === 0 ? (
          <div
            style={{
              padding: '1.5rem',
              textAlign: 'center',
              color: 'var(--theme-elevation-500, #777777)',
              fontSize: '0.875rem',
            }}
          >
            {isArabic ? 'لا توجد عناصر في هذا الفلتر' : 'No recommendations matching this filter.'}
          </div>
        ) : (
          filteredChecks.map((check) => (
            <div key={check.id} className={styles.checkItem}>
              <div className={styles.checkIconWrapper}>
                {renderStatusIcon(check.status)}
              </div>

              <div className={styles.checkContent}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span className={styles.checkName}>{check.name}</span>
                  <span className={styles.checkPointsBadge}>
                    {check.pointsAwarded} / {check.maxPoints} pts
                  </span>
                </div>

                <div className={styles.checkMessage}>{check.message}</div>

                {check.detail && (
                  <div className={styles.checkDetail}>{check.detail}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
