/**
 * KeywordAnalyzer
 * Multi-language keyword extraction, normalization, and density analysis.
 * Fully supports English and Arabic (including diacritics stripping & character normalization).
 */

/**
 * Normalizes Arabic text by removing tashkeel / diacritics and normalizing character variants.
 */
export function normalizeArabic(text: string): string {
  if (!text) return ''
  return text
    // Remove diacritics / tashkeel (fathah, dammah, kasrah, sukoon, shaddah, tanween)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize Alef variants (أ, إ, آ -> ا)
    .replace(/[أإآ]/g, 'ا')
    // Normalize Taa Marbuta (ة -> ه)
    .replace(/ة/g, 'ه')
    // Normalize Yaa (ى -> ي)
    .replace(/ى/g, 'ي')
    // Remove tatweel (kashida)
    .replace(/\u0640/g, '')
}

/**
 * Normalizes text for keyword matching based on locale.
 */
export function normalizeText(text: string, isArabic: boolean): string {
  if (!text) return ''
  let cleaned = text.trim().toLowerCase()
  if (isArabic) {
    cleaned = normalizeArabic(cleaned)
  }
  return cleaned
}

/**
 * Counts words accurately for both English and Arabic.
 */
export function countWords(text: string, isArabic: boolean): number {
  if (!text) return 0
  const normalized = normalizeText(text, isArabic)
  // Split on whitespace and punctuation marks
  const tokens = normalized
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»،؛؟]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 0)
  return tokens.length
}

/**
 * Checks if a keyword is present in a given string.
 */
export function checkKeywordInText(text: string, keyword: string, isArabic: boolean): boolean {
  if (!text || !keyword) return false
  const normText = normalizeText(text, isArabic)
  const normKeyword = normalizeText(keyword, isArabic)
  if (!normKeyword) return false
  return normText.includes(normKeyword)
}

/**
 * Finds how many times a keyword appears in a text.
 */
export function findKeywordOccurrences(content: string, keyword: string, isArabic: boolean): number {
  if (!content || !keyword) return 0
  const normContent = normalizeText(content, isArabic)
  const normKeyword = normalizeText(keyword, isArabic)
  if (!normKeyword) return 0

  let count = 0
  let pos = 0
  while ((pos = normContent.indexOf(normKeyword, pos)) !== -1) {
    count++
    pos += normKeyword.length
  }
  return count
}

/**
 * Calculates keyword density as a percentage.
 */
export function calculateKeywordDensity(
  occurrences: number,
  keywordWordCount: number,
  totalWordCount: number,
): number {
  if (totalWordCount <= 0 || occurrences <= 0 || keywordWordCount <= 0) return 0
  const density = (occurrences * keywordWordCount * 100) / totalWordCount
  return Math.round(density * 100) / 100
}

/**
 * Parses a comma-separated string of secondary keywords into an array.
 */
export function parseSecondaryKeywords(keywordsStr?: string | null): string[] {
  if (!keywordsStr) return []
  return keywordsStr
    .split(/[,،]/) // supports English comma and Arabic comma
    .map((k) => k.trim())
    .filter((k) => k.length > 0)
}
