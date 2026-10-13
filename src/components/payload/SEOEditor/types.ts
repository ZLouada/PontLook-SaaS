export type SEOCheckStatus = 'pass' | 'warning' | 'error' | 'optional'

export type SEOCheckCategory = 'technical' | 'content' | 'keyword' | 'image' | 'social'

export interface SEOCheck {
  id: string
  name: string
  category: SEOCheckCategory
  status: SEOCheckStatus
  message: string
  detail?: string
  pointsAwarded: number
  maxPoints: number
}

export interface SEOCategoryScore {
  category: SEOCheckCategory
  label: string
  score: number
  maxScore: number
  passedCount: number
  warningCount: number
  errorCount: number
}

export interface SEOMetrics {
  titleLength: number
  metaTitleLength: number
  effectiveTitleLength: number
  metaDescriptionLength: number
  effectiveDescriptionLength: number
  slugLength: number
  isSlugValid: boolean
  wordCount: number
  readingTimeMinutes: number
  paragraphCount: number
  headingCount: number
  h2Count: number
  hasH1InBody: boolean
  internalLinkCount: number
  externalLinkCount: number
  inlineImageCount: number
  inlineImagesMissingAlt: number
  featuredImageExists: boolean
  featuredImageAltExists: boolean
  featuredImageAlt: string
  focusKeyword: string
  focusKeywordDensity: number
  focusKeywordOccurrences: number
  focusKeywordInTitle: boolean
  focusKeywordInMetaDesc: boolean
  focusKeywordInSlug: boolean
  focusKeywordInFirstParagraph: boolean
  focusKeywordInHeadings: boolean
  secondaryKeywordsList: string[]
  secondaryKeywordsFound: string[]
  isArabic: boolean
}

export interface SEOAnalysisResult {
  score: number
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor'
  statusLabel: string
  categories: Record<SEOCheckCategory, SEOCategoryScore>
  checks: SEOCheck[]
  metrics: SEOMetrics
}

export interface SEOData {
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  content?: any
  featuredImage?: any
  metaTitle?: string | null
  metaDescription?: string | null
  focusKeyword?: string | null
  secondaryKeywords?: string | null
  canonicalUrl?: string | null
  noIndex?: boolean | null
  noFollow?: boolean | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: any
}
