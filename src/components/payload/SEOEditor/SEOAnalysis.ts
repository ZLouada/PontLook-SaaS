/**
 * SEOAnalysis Facade
 * Provides high-level evaluation helpers for components.
 */

import type { SEOAnalysisResult, SEOData } from './types'
import { calculateSEOScore } from './SEOScorer'

export function analyzeArticleSEO(data: SEOData, locale: string = 'en'): SEOAnalysisResult {
  return calculateSEOScore(data, locale)
}

export * from './types'
export * from './SEOScorer'
export * from './ContentAnalyzer'
export * from './KeywordAnalyzer'
