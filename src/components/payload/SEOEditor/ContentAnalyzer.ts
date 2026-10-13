/**
 * ContentAnalyzer
 * Extracts semantic structures, word counts, headings, links, and media from Lexical editor JSON.
 * Operates purely in-memory with zero DOM manipulation and robust error handling.
 */

import { countWords } from './KeywordAnalyzer'

export interface ExtractedHeading {
  tag: string
  text: string
}

export interface ExtractedLink {
  url: string
  isInternal: boolean
  text: string
}

export interface ExtractedImage {
  id?: string | number
  alt?: string
}

export interface ExtractedContent {
  plainText: string
  wordCount: number
  readingTimeMinutes: number
  paragraphs: string[]
  firstParagraph: string
  headings: ExtractedHeading[]
  h2Count: number
  hasH1InBody: boolean
  links: ExtractedLink[]
  internalLinksCount: number
  externalLinksCount: number
  inlineImages: ExtractedImage[]
  inlineImagesMissingAltCount: number
  hasLongParagraphs: boolean
}

/**
 * Recursively extracts plain text from a Lexical node and its children.
 */
function extractNodeText(node: any): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text

  if (Array.isArray(node.children)) {
    return node.children.map(extractNodeText).join('')
  }

  return ''
}

/**
 * Checks whether a URL is an internal link for PontLook.
 */
function isInternalUrl(url: string): boolean {
  if (!url) return false
  const trimmed = url.trim()
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return true
  if (trimmed.includes('pontlook.com')) return true
  return false
}

/**
 * Analyzes Lexical editor state client-side.
 */
export function analyzeLexicalContent(lexicalData: any, isArabic: boolean): ExtractedContent {
  const fallback: ExtractedContent = {
    plainText: '',
    wordCount: 0,
    readingTimeMinutes: 0,
    paragraphs: [],
    firstParagraph: '',
    headings: [],
    h2Count: 0,
    hasH1InBody: false,
    links: [],
    internalLinksCount: 0,
    externalLinksCount: 0,
    inlineImages: [],
    inlineImagesMissingAltCount: 0,
    hasLongParagraphs: false,
  }

  if (!lexicalData) return fallback

  let parsedData = lexicalData

  // Handle potential JSON string serialized state
  if (typeof lexicalData === 'string') {
    const trimmed = lexicalData.trim()
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        parsedData = JSON.parse(trimmed)
      } catch {
        // Plain text fallback
        const wordCount = countWords(lexicalData, isArabic)
        return {
          ...fallback,
          plainText: lexicalData,
          wordCount,
          readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
          paragraphs: [lexicalData],
          firstParagraph: lexicalData,
        }
      }
    } else {
      const wordCount = countWords(lexicalData, isArabic)
      return {
        ...fallback,
        plainText: lexicalData,
        wordCount,
        readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
        paragraphs: [lexicalData],
        firstParagraph: lexicalData,
      }
    }
  }

  if (!parsedData || typeof parsedData !== 'object' || !parsedData.root) {
    return fallback
  }

  try {
    const textPieces: string[] = []
    const paragraphs: string[] = []
    const headings: ExtractedHeading[] = []
    const links: ExtractedLink[] = []
    const inlineImages: ExtractedImage[] = []
    let inlineImagesMissingAltCount = 0

    const walk = (node: any) => {
      if (!node) return

      // Handle Headings
      if (node.type === 'heading') {
        const headingText = extractNodeText(node).trim()
        const tag = (node.tag || 'h2').toLowerCase()
        if (headingText) {
          headings.push({ tag, text: headingText })
          textPieces.push(headingText)
        }
      }

      // Handle Paragraphs
      else if (node.type === 'paragraph') {
        const paragraphText = extractNodeText(node).trim()
        if (paragraphText) {
          paragraphs.push(paragraphText)
          textPieces.push(paragraphText)
        }
      }

      // Handle Links
      if (node.type === 'link') {
        const linkUrl = node.fields?.url || node.url || ''
        const linkText = extractNodeText(node).trim()
        if (linkUrl) {
          links.push({
            url: linkUrl,
            isInternal: isInternalUrl(linkUrl),
            text: linkText,
          })
        }
      }

      // Handle Inline Uploads / Images
      if (node.type === 'upload') {
        const imageId = node.value?.id || node.value
        const alt = node.value?.alt || node.fields?.alt || ''
        inlineImages.push({ id: imageId, alt })
        if (!alt || !alt.trim()) {
          inlineImagesMissingAltCount++
        }
      }

      // Traverse children if not already processed as heading/paragraph container
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          walk(child)
        }
      }
    }

    if (Array.isArray(parsedData.root.children)) {
      for (const child of parsedData.root.children) {
        walk(child)
      }
    }

    const plainText = textPieces.join('\n\n')
    const wordCount = countWords(plainText, isArabic)
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))
    const firstParagraph = paragraphs[0] || ''

    const h2Count = headings.filter((h) => h.tag === 'h2').length
    const hasH1InBody = headings.some((h) => h.tag === 'h1')

    const internalLinksCount = links.filter((l) => l.isInternal).length
    const externalLinksCount = links.filter((l) => !l.isInternal).length

    const hasLongParagraphs = paragraphs.some((p) => countWords(p, isArabic) > 150)

    return {
      plainText,
      wordCount,
      readingTimeMinutes,
      paragraphs,
      firstParagraph,
      headings,
      h2Count,
      hasH1InBody,
      links,
      internalLinksCount,
      externalLinksCount,
      inlineImages,
      inlineImagesMissingAltCount,
      hasLongParagraphs,
    }
  } catch (err) {
    console.warn('[SEO ContentAnalyzer] Failed to analyze lexical content:', err)
    return fallback
  }
}
