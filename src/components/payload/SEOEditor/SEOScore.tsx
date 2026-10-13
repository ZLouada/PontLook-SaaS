'use client'

import React from 'react'
import type { SEOAnalysisResult, SEOCheckCategory } from './types'
import styles from './SEOEditor.module.css'

interface SEOScoreProps {
  analysis: SEOAnalysisResult
  isArabic: boolean
}

export const SEOScore: React.FC<SEOScoreProps> = ({ analysis, isArabic }) => {
  const { score = 0, status = 'poor', statusLabel = '', categories = {} as any } = analysis || {}

  // Determine status color theme
  let statusClass = styles.statusPoor
  let strokeColor = '#EF4444'

  if (status === 'excellent') {
    statusClass = styles.statusExcellent
    strokeColor = '#10B981'
  } else if (status === 'good') {
    statusClass = styles.statusGood
    strokeColor = '#0EA5E9'
  } else if (status === 'needs-improvement') {
    statusClass = styles.statusNeedsImprovement
    strokeColor = '#F59E0B'
  }

  // Circular gauge calculations
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const categoryKeys: SEOCheckCategory[] = ['technical', 'content', 'keyword', 'image', 'social']

  return (
    <div
      className={styles.scorecard}
      role="region"
      aria-label={isArabic ? 'لوحة نقاط سيو المقال' : 'Article SEO Scorecard'}
    >
      {/* Gauge and Overall Rating */}
      <div className={styles.scoreGauge}>
        <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="var(--theme-elevation-200, #2a2a2a)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out, stroke 0.3s ease' }}
          />
          <text
            x="50"
            y="54"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--theme-text, #ffffff)"
            fontSize="26"
            fontWeight="800"
            fontFamily="var(--font-mono, monospace)"
          >
            {score}
          </text>
        </svg>

        <div className={styles.scoreTotal}>/ 100</div>

        <div className={`${styles.statusPill} ${statusClass}`} role="status">
          <span>{statusLabel}</span>
        </div>
      </div>

      {/* 5 Categories Breakdown */}
      <div className={styles.categoryGrid}>
        {categoryKeys.map((catKey) => {
          const cat = categories[catKey]
          if (!cat) return null

          const percent = Math.round((cat.score / cat.maxScore) * 100)
          let barColor = '#10B981'
          if (percent < 50) barColor = '#EF4444'
          else if (percent < 75) barColor = '#F59E0B'
          else if (percent < 90) barColor = '#0EA5E9'

          return (
            <div key={catKey} className={styles.categoryCard}>
              <div>
                <div className={styles.categoryTitle}>{cat.label}</div>
                <div className={styles.categoryPoints}>
                  {cat.score} <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>/ {cat.maxScore}</span>
                </div>
              </div>

              <div>
                <div
                  className={styles.progressBarTrack}
                  role="progressbar"
                  aria-valuenow={cat.score}
                  aria-valuemin={0}
                  aria-valuemax={cat.maxScore}
                  aria-label={`${cat.label} progress`}
                >
                  <div
                    className={styles.progressBarFill}
                    style={{
                      width: `${percent}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.375rem',
                    fontSize: '0.6875rem',
                    color: 'var(--theme-elevation-500, #777777)',
                  }}
                >
                  <span>✓ {cat.passedCount}</span>
                  {cat.warningCount > 0 && <span>⚠ {cat.warningCount}</span>}
                  {cat.errorCount > 0 && <span style={{ color: '#EF4444' }}>✕ {cat.errorCount}</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
