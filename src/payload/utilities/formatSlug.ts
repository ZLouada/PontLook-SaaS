import type { FieldHook } from 'payload'

/**
 * Normalizes any text into a URL-friendly, lowercase, kebab-case slug.
 * Supports Unicode/Arabic, removes punctuation/apostrophes, collapses hyphens.
 */
export function slugify(text: string): string {
  if (!text || typeof text !== 'string') return ''
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Payload FieldHook for slugs.
 * If user entered/updated a slug, sanitizes it to kebab-case.
 * If user left slug empty, auto-generates clean slug from fallback field (e.g. 'title').
 */
export const formatSlug = (fallbackField: string): FieldHook => {
  return ({ value, originalDoc, data }) => {
    // 1. If a slug was explicitly provided or updated by user
    if (typeof value === 'string' && value.trim()) {
      return slugify(value)
    }

    // 2. Otherwise auto-generate from fallback field (e.g. 'title')
    const fallbackData = data?.[fallbackField] ?? originalDoc?.[fallbackField]
    if (fallbackData) {
      if (typeof fallbackData === 'string' && fallbackData.trim()) {
        return slugify(fallbackData)
      }
      if (typeof fallbackData === 'object' && fallbackData !== null) {
        // Handle localized fields: prefer 'en', then 'ar', then first string
        const localizedObj = fallbackData as Record<string, any>
        const text =
          localizedObj.en ||
          localizedObj.ar ||
          Object.values(localizedObj).find((v) => typeof v === 'string' && v.trim())
        if (typeof text === 'string' && text.trim()) {
          return slugify(text)
        }
      }
    }

    // 3. Fallback to existing value or empty string
    return typeof value === 'string' ? slugify(value) : (value ?? '')
  }
}
