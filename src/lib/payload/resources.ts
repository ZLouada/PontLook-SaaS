import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Locale } from '@/i18n/config'
import {
  PontLookCategorySlug,
  normalizeCategorySlug,
  getCategoryLabel,
} from '@/constants/categories'

export type PayloadLocale = 'en' | 'ar';
export function toPayloadLocale(locale?: string | null): PayloadLocale {
  return locale?.startsWith('ar') ? 'ar' : 'en';
}

// Helper: Extract image URL from Payload Media relation or string
export function getMediaUrl(media: any): string | null {
  if (!media) return null

  // If already a string
  if (typeof media === 'string') {
    let trimmed = media.trim()
    if (!trimmed) return null

    // Strip localhost, 127.0.0.1, pontlook.com, www.pontlook.com
    trimmed = trimmed.replace(/^https?:\/\/(?:localhost(?::\d+)?|127\.0\.0\.1(?::\d+)?|(?:www\.)?pontlook\.com)/i, '')

    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed
    }
    if (trimmed.startsWith('/payload-api/media/file/')) {
      return `/payload-media/${trimmed.slice('/payload-api/media/file/'.length)}`
    }
    if (trimmed.startsWith('/media/')) {
      return `/payload-media/${trimmed.slice('/media/'.length)}`
    }
    if (trimmed.startsWith('/payload-media/')) {
      return trimmed
    }
    if (trimmed.startsWith('/')) {
      return trimmed
    }
    return `/payload-media/${trimmed}`
  }

  // If Media document object
  if (typeof media === 'object') {
    if (media.filename && typeof media.filename === 'string') {
      return `/payload-media/${media.filename}`
    }
    if (media.url && typeof media.url === 'string') {
      let u = media.url.trim()
      u = u.replace(/^https?:\/\/(?:localhost(?::\d+)?|127\.0\.0\.1(?::\d+)?|(?:www\.)?pontlook\.com)/i, '')
      if (u.startsWith('http://') || u.startsWith('https://')) {
        return u
      }
      if (u.startsWith('/payload-api/media/file/')) {
        return `/payload-media/${u.slice('/payload-api/media/file/'.length)}`
      }
      if (u.startsWith('/media/')) {
        return `/payload-media/${u.slice('/media/'.length)}`
      }
      return u
    }
    // Fallback to generated sizes if original filename missing
    if (media.sizes && typeof media.sizes === 'object') {
      const sizeObj = media.sizes.feature || media.sizes.card || media.sizes.thumbnail
      if (sizeObj?.filename && typeof sizeObj.filename === 'string') {
        return `/payload-media/${sizeObj.filename}`
      }
      if (sizeObj?.url && typeof sizeObj.url === 'string') {
        let su = sizeObj.url.trim()
        su = su.replace(/^https?:\/\/(?:localhost(?::\d+)?|127\.0\.0\.1(?::\d+)?|(?:www\.)?pontlook\.com)/i, '')
        if (su.startsWith('http://') || su.startsWith('https://')) {
          return su
        }
        if (su.startsWith('/payload-api/media/file/')) {
          return `/payload-media/${su.slice('/payload-api/media/file/'.length)}`
        }
        if (su.startsWith('/media/')) {
          return `/payload-media/${su.slice('/media/'.length)}`
        }
        return su
      }
    }
  }

  return null
}

// Helper: Extract text from Lexical RichText
export function extractTextFromLexical(lexical: any): string {
  if (!lexical) return ''
  if (typeof lexical === 'string') return lexical
  if (lexical.root && Array.isArray(lexical.root.children)) {
    return lexical.root.children
      .map((child: any) => {
        if (child.children && Array.isArray(child.children)) {
          return child.children.map((c: any) => c.text || '').join('')
        }
        return child.text || ''
      })
      .filter(Boolean)
      .join('\n\n')
  }
  return ''
}

// Helper: Format date for localized display
export function formatDisplayDate(dateStr?: string | null, locale: Locale = 'en'): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

// Cached Payload instance retrieval
export const getPayloadClient = cache(async () => {
  return await getPayload({ config: configPromise })
})

// Types for component compatibility
export interface AdaptedArticle {
  id: string
  slug: string
  title: string
  category: string
  categorySlug: PontLookCategorySlug
  readTime: string
  date: string
  publishedAt: string | null
  updatedAt?: string | null
  excerpt: string
  content: any
  plainContent?: string
  image: string | null
  imageAlt?: string | null
  status: string
  author: {
    name: string
    image: string | null
    bio: string | null
  }
  seo?: {
    title?: string
    description?: string
    focusKeyword?: string
    canonicalUrl?: string
    noIndex?: boolean
    noFollow?: boolean
    ogTitle?: string
    ogDescription?: string
    ogImage?: string | null
  }
}

export interface AdaptedDownload {
  id: string
  slug: string
  title: string
  category: string
  categorySlug: PontLookCategorySlug
  format: string
  fileSize: string
  desc: string
  features: string[]
  fileUrl: string
}

export interface AdaptedEvent {
  id: string
  slug: string
  title: string
  date: string
  time: string
  location: string
  type: string
  desc: string
  spotsLeft: string
  link: string
}

export interface AdaptedPodcast {
  id: string
  slug: string
  title: string
  guest: string
  duration: string
  date: string
  desc: string
  tag: string
  audioUrl: string
}

export interface AdaptedHero {
  title: string
  subtitle: string
  eyebrow?: string
}

export interface AdaptedSpotlight {
  badge: string
  category: string
  readTime: string
  date: string
  title: string
  excerpt: string
  cta: string
  image: string | null
  link: string
}

export interface AdaptedFeaturedItem {
  badge: string
  date?: string
  title: string
  desc?: string
  cta: string
  link: string
  isExternal?: boolean
  badgeColor?: string
}

export interface AdaptedFeatured {
  spotlight: AdaptedSpotlight | null
  editorPickToolkit?: AdaptedFeaturedItem | null
  editorPickPodcast?: AdaptedFeaturedItem | null
  editorPickEvent?: AdaptedFeaturedItem | null
}

export interface AdaptedNavbarResourcesCard {
  enabled: boolean
  badge: string
  title: string
  description: string
  image: string
  link: string
  linkText: string
}

// Helper: Resolve Media document if stored as unpopulated ID
async function resolveMediaDoc(payload: any, media: any, locale?: Locale): Promise<any> {
  if (typeof media === 'number' || (typeof media === 'string' && /^\d+$/.test(media))) {
    try {
      const mediaDoc = await payload.findByID({
        collection: 'media',
        id: Number(media),
        depth: 0,
        locale: toPayloadLocale(locale),
      })
      if (mediaDoc) {
        return mediaDoc
      }
    } catch (err) {
      console.warn(`[Payload Data Layer] Could not populate media ID ${media}:`, err)
    }
  }
  return media
}

// 1. Get Published Articles
export const getArticles = cache(async (locale: Locale = 'en'): Promise<AdaptedArticle[]> => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'articles',
      where: {
        status: {
          equals: 'published',
        },
      },
      locale: toPayloadLocale(locale),
      depth: 1,
      sort: '-publishedAt',
      limit: 100,
      overrideAccess: false,
    })

    return await Promise.all(
      result.docs.map(async (art: any) => {
        const resolvedImage = await resolveMediaDoc(payload, art.featuredImage, locale)
        const imageUrl = getMediaUrl(resolvedImage)
        const imageAlt =
          typeof resolvedImage === 'object' && resolvedImage?.alt
            ? typeof resolvedImage.alt === 'string'
              ? resolvedImage.alt.trim()
              : resolvedImage.alt?.[toPayloadLocale(locale)] || null
            : null
        const displayDate = formatDisplayDate(art.publishedAt, locale)
        const contentText = extractTextFromLexical(art.content)
        const categorySlug = normalizeCategorySlug(art.category)
        const categoryLabel = getCategoryLabel(art.category, locale)

        return {
          id: String(art.id),
          slug: art.slug,
          title: art.title || '',
          category: categoryLabel,
          categorySlug,
          readTime: art.readTime || '6 min read',
          date: displayDate,
          publishedAt: art.publishedAt || null,
          updatedAt: art.updatedAt || null,
          excerpt: art.excerpt || '',
          content: art.content || contentText,
          plainContent: contentText,
          image: imageUrl,
          imageAlt: imageAlt || null,
          status: art.status || 'published',
          author: {
            name: 'PontLook Research',
            image: null,
            bio: null,
          },
          seo: {
            title: art.meta?.title || undefined,
            description: art.meta?.description || undefined,
            focusKeyword: art.meta?.focusKeyword || undefined,
            canonicalUrl: art.meta?.canonicalUrl || undefined,
            noIndex: art.meta?.noIndex || undefined,
            noFollow: art.meta?.noFollow || undefined,
            ogTitle: art.meta?.ogTitle || undefined,
            ogDescription: art.meta?.ogDescription || undefined,
            ogImage: art.meta?.ogImage ? getMediaUrl(await resolveMediaDoc(payload, art.meta.ogImage, locale)) : undefined,
          },
        }
      })
    )
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get articles:', error)
    return []
  }
})

// 2. Get Single Article by Slug
export const getArticleBySlug = cache(async (slug: string, locale: Locale = 'en'): Promise<AdaptedArticle | null> => {
  try {
    const payload = await getPayloadClient()
    const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase()

    const result = await payload.find({
      collection: 'articles',
      where: {
        and: [
          {
            slug: {
              equals: normalizedSlug,
            },
          },
          {
            status: {
              equals: 'published',
            },
          },
        ],
      },
      locale: toPayloadLocale(locale),
      depth: 1,
      limit: 1,
      overrideAccess: false,
    })

    if (!result.docs || result.docs.length === 0) {
      return null
    }

    const art: any = result.docs[0]
    const featuredImage = await resolveMediaDoc(payload, art.featuredImage, locale)
    const imageUrl = getMediaUrl(featuredImage)
    const imageAlt =
      typeof featuredImage === 'object' && featuredImage?.alt
        ? typeof featuredImage.alt === 'string'
          ? featuredImage.alt.trim()
          : featuredImage.alt?.[locale] || null
        : null
    const displayDate = formatDisplayDate(art.publishedAt, locale)
    const contentText = extractTextFromLexical(art.content)
    const categorySlug = normalizeCategorySlug(art.category)
    const categoryLabel = getCategoryLabel(art.category, locale)

    return {
      id: String(art.id),
      slug: art.slug,
      title: art.title || '',
      category: categoryLabel,
      categorySlug,
      readTime: art.readTime || '6 min read',
      date: displayDate,
      publishedAt: art.publishedAt || null,
      updatedAt: art.updatedAt || null,
      excerpt: art.excerpt || '',
      content: art.content || contentText,
      plainContent: contentText,
      image: imageUrl,
      imageAlt: imageAlt || null,
      status: art.status || 'published',
      author: {
        name: 'PontLook Research',
        image: null,
        bio: null,
      },
      seo: {
        title: art.meta?.title || undefined,
        description: art.meta?.description || undefined,
        focusKeyword: art.meta?.focusKeyword || undefined,
        canonicalUrl: art.meta?.canonicalUrl || undefined,
        noIndex: art.meta?.noIndex || undefined,
        noFollow: art.meta?.noFollow || undefined,
        ogTitle: art.meta?.ogTitle || undefined,
        ogDescription: art.meta?.ogDescription || undefined,
        ogImage: art.meta?.ogImage ? getMediaUrl(await resolveMediaDoc(payload, art.meta.ogImage, locale)) : undefined,
      },
    }
  } catch (error) {
    console.error(`[Payload Data Layer] Failed to get article by slug "${slug}":`, error)
    return null
  }
})

export interface SitemapArticleEntry {
  slug: string
  updatedAt?: string | null
  publishedAt?: string | null
  hasEn: boolean
  hasAr: boolean
}

// Helper: Get Published Articles for Dynamic Sitemap
export const getSitemapArticles = cache(async (): Promise<SitemapArticleEntry[]> => {
  try {
    const payload = await getPayloadClient()
    const [enResult, arResult] = await Promise.all([
      payload.find({
        collection: 'articles',
        where: {
          status: {
            equals: 'published',
          },
        },
        locale: 'en',
        fallbackLocale: false,
        depth: 0,
        limit: 500,
        select: {
          slug: true,
          title: true,
          updatedAt: true,
          publishedAt: true,
          meta: true,
        },
        overrideAccess: false,
      }),
      payload.find({
        collection: 'articles',
        where: {
          status: {
            equals: 'published',
          },
        },
        locale: 'ar',
        fallbackLocale: false,
        depth: 0,
        limit: 500,
        select: {
          slug: true,
          title: true,
          updatedAt: true,
          publishedAt: true,
          meta: true,
        },
        overrideAccess: false,
      }),
    ])

    const arMap = new Map<string, any>()
    for (const doc of arResult.docs) {
      if (doc.slug) {
        arMap.set(doc.slug, doc)
      }
    }

    const processedSlugs = new Set<string>()
    const entries: SitemapArticleEntry[] = []

    for (const enDoc of enResult.docs) {
      if (!enDoc.slug) continue
      processedSlugs.add(enDoc.slug)
      const arDoc = arMap.get(enDoc.slug)

      const hasEn = Boolean(enDoc.title && String(enDoc.title).trim()) && !enDoc.meta?.noIndex
      const hasAr = Boolean(arDoc?.title && String(arDoc.title).trim()) && !arDoc?.meta?.noIndex

      if (hasEn || hasAr) {
        entries.push({
          slug: enDoc.slug,
          updatedAt: enDoc.updatedAt || arDoc?.updatedAt || null,
          publishedAt: enDoc.publishedAt || arDoc?.publishedAt || null,
          hasEn,
          hasAr,
        })
      }
    }

    for (const arDoc of arResult.docs) {
      if (!arDoc.slug || processedSlugs.has(arDoc.slug)) continue
      const hasAr = Boolean(arDoc.title && String(arDoc.title).trim()) && !arDoc.meta?.noIndex
      if (hasAr) {
        entries.push({
          slug: arDoc.slug,
          updatedAt: arDoc.updatedAt || null,
          publishedAt: arDoc.publishedAt || null,
          hasEn: false,
          hasAr: true,
        })
      }
    }

    return entries
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get sitemap articles:', error)
    return []
  }
})

// 3. Get All Published Article Slugs (for generateStaticParams)
export const getAllArticleSlugs = cache(async (): Promise<string[]> => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'articles',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 100,
      select: {
        slug: true,
      },
      overrideAccess: false,
    })

    return result.docs.map((d: any) => d.slug).filter(Boolean)
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get all article slugs:', error)
    return []
  }
})

// 4. Get Published Downloads
export const getDownloads = cache(async (locale: Locale = 'en'): Promise<AdaptedDownload[]> => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'downloads',
      where: {
        status: {
          equals: 'published',
        },
      },
      locale: toPayloadLocale(locale),
      depth: 1,
      limit: 100,
      overrideAccess: false,
    })

    return result.docs.map((dl: any) => {
      const fileUrl = getMediaUrl(dl.file) || ''
      const features = Array.isArray(dl.features)
        ? dl.features.map((f: any) => (typeof f === 'string' ? f : f.item || '')).filter(Boolean)
        : []
      const categorySlug = normalizeCategorySlug(dl.category)
      const categoryLabel = getCategoryLabel(dl.category, locale)

      return {
        id: String(dl.id),
        slug: dl.slug,
        title: dl.title || '',
        category: categoryLabel,
        categorySlug,
        format: dl.format || 'PDF',
        fileSize: dl.fileSize || '1.8 MB',
        desc: dl.description || '',
        features,
        fileUrl,
      }
    })
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get downloads:', error)
    return []
  }
})

// 5. Get Published Events (Payload collection only - no hardcoded fallbacks)
export const getEvents = cache(async (locale: Locale = 'en'): Promise<AdaptedEvent[]> => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'events',
      where: {
        status: {
          equals: 'published',
        },
      },
      locale: toPayloadLocale(locale),
      depth: 1,
      sort: 'date',
      limit: 100,
      overrideAccess: false,
    })

    return result.docs.map((ev: any) => {
      const displayDate = formatDisplayDate(ev.date, locale)
      const seatsStr = ev.spotsLeft
        ? locale.startsWith('ar')
          ? `باقي ${ev.spotsLeft} مقاعد`
          : `${ev.spotsLeft} Seats Remaining`
        : ''

      return {
        id: String(ev.id),
        slug: ev.slug,
        title: ev.title || '',
        date: displayDate,
        time: ev.time || '',
        location: ev.location || '',
        type: ev.type || (locale.startsWith('ar') ? 'فعالية' : 'Event'),
        desc: ev.description || '',
        spotsLeft: seatsStr,
        link: ev.rsvpLink || '',
      }
    })
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get events from database:', error)
    return []
  }
})

// 6. Get Published Podcasts
export const getPodcasts = cache(async (locale: Locale = 'en'): Promise<AdaptedPodcast[]> => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'podcasts',
      where: {
        status: {
          equals: 'published',
        },
      },
      locale: toPayloadLocale(locale),
      depth: 1,
      sort: '-date',
      limit: 100,
      overrideAccess: false,
    })

    return result.docs.map((pod: any) => {
      const displayDate = formatDisplayDate(pod.date, locale)

      return {
        id: String(pod.id),
        slug: pod.slug,
        title: pod.title || '',
        guest: pod.guest || '',
        duration: pod.duration || '',
        date: displayDate,
        desc: pod.description || '',
        tag: pod.tag || '',
        audioUrl: pod.audioUrl || '',
      }
    })
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get podcasts:', error)
    return []
  }
})

// 7. Get Resources Hero Global
export const getResourcesHero = cache(async (locale: Locale = 'en'): Promise<AdaptedHero> => {
  const isAr = locale.startsWith('ar');
  try {
    const payload = await getPayloadClient()
    const hero = await payload.findGlobal({
      slug: 'resources-hero',
      locale: toPayloadLocale(locale),
      overrideAccess: false,
    })

    return {
      title: hero?.title || (isAr ? 'مركز موارد التدريب والتطوير في PontLook' : 'The PontLook L&D resource hub'),
      subtitle:
        hero?.description ||
        (isAr
          ? 'رؤى واستراتيجيات وموارد لمساعدة المنشآت على بناء كوادر أقوى من خلال قرارات تدريبية أفضل.'
          : 'Insights, strategies, and resources to help organisations build stronger workforces through better training decisions.'),
      eyebrow: hero?.eyebrow || undefined,
    }
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get resources hero:', error)
    return {
      title: isAr ? 'مركز موارد التدريب والتطوير في PontLook' : 'The PontLook L&D resource hub',
      subtitle:
        isAr
          ? 'رؤى واستراتيجيات وموارد لمساعدة المنشآت على بناء كوادر أقوى من خلال قرارات تدريبية أفضل.'
          : 'Insights, strategies, and resources to help organisations build stronger workforces through better training decisions.',
    }
  }
})

// 8. Get Resources Featured Global (with resolved relationships)
export const getResourcesFeatured = cache(async (locale: Locale = 'en'): Promise<AdaptedFeatured> => {
  const isAr = locale.startsWith('ar')

  try {
    const payload = await getPayloadClient()
    const featured = await payload.findGlobal({
      slug: 'resources-featured',
      locale: toPayloadLocale(locale),
      depth: 2,
      overrideAccess: false,
    })

    let spotlight: AdaptedSpotlight | null = null
    let editorPickToolkit: AdaptedFeaturedItem | null = null
    let editorPickPodcast: AdaptedFeaturedItem | null = null
    let editorPickEvent: AdaptedFeaturedItem | null = null

    // 1. Resolve Spotlight Article relation
    let spotlightArt: any = null
    if (featured?.spotlightArticle && typeof featured.spotlightArticle === 'object') {
      spotlightArt = featured.spotlightArticle
    } else {
      // If not explicitly set in global, check if any published article exists in Payload
      const artRes = await payload.find({
        collection: 'articles',
        where: {
          status: {
            equals: 'published',
          },
        },
        locale: toPayloadLocale(locale),
        depth: 1,
        sort: '-publishedAt',
        limit: 1,
        overrideAccess: false,
      })
      if (artRes.docs.length > 0) {
        spotlightArt = artRes.docs[0]
      }
    }

    if (spotlightArt) {
      const featuredImage = await resolveMediaDoc(payload, spotlightArt.featuredImage, toPayloadLocale(locale))
      const imageUrl = getMediaUrl(featuredImage)
      const displayDate = formatDisplayDate(spotlightArt.publishedAt, locale)

      spotlight = {
        badge: isAr ? 'محتوى مميز' : 'FEATURED',
        category: getCategoryLabel(spotlightArt.category, locale),
        readTime: spotlightArt.readTime || (isAr ? '٥ دقائق قراءة' : '5 min read'),
        date: displayDate || '',
        title: spotlightArt.title || '',
        excerpt: spotlightArt.excerpt || extractTextFromLexical(spotlightArt.content).slice(0, 180),
        cta: isAr ? 'قراءة المقال بالكامل' : 'Read Full Article',
        image: imageUrl,
        link: `/${locale}/resources/blog/${spotlightArt.slug}`,
      }
    }

    // 2. Resolve Featured Download (Toolkit)
    let downloadDoc: any = null
    if (featured?.featuredDownload && typeof featured.featuredDownload === 'object') {
      downloadDoc = featured.featuredDownload
    } else {
      const dlRes = await payload.find({
        collection: 'downloads',
        where: {
          status: {
            equals: 'published',
          },
        },
        locale: toPayloadLocale(locale),
        depth: 0,
        sort: '-createdAt',
        limit: 1,
        overrideAccess: false,
      })
      if (dlRes.docs.length > 0) {
        downloadDoc = dlRes.docs[0]
      }
    }

    if (downloadDoc) {
      editorPickToolkit = {
        badge: downloadDoc.format || (isAr ? 'أدوات ونماذج' : 'TOOLKIT'),
        date: downloadDoc.fileSize || (isAr ? 'تحميل مباشر' : 'Instant Download'),
        title: downloadDoc.title || '',
        desc: downloadDoc.description || '',
        cta: isAr ? 'استعراض النماذج' : 'Explore Toolkits',
        link: `/${locale}/resources/downloads`,
        isExternal: false,
        badgeColor: 'bg-[#FF5C00]/10 text-[#FF5C00] border-[#FF5C00]/25 font-bold',
      }
    }

    // 3. Resolve Featured Podcast
    let podcastDoc: any = null
    if (featured?.featuredPodcast && typeof featured.featuredPodcast === 'object') {
      podcastDoc = featured.featuredPodcast
    } else {
      const podRes = await payload.find({
        collection: 'podcasts',
        where: {
          status: {
            equals: 'published',
          },
        },
        locale: toPayloadLocale(locale),
        depth: 0,
        sort: '-createdAt',
        limit: 1,
        overrideAccess: false,
      })
      if (podRes.docs.length > 0) {
        podcastDoc = podRes.docs[0]
      }
    }

    if (podcastDoc) {
      editorPickPodcast = {
        badge: podcastDoc.tag || (isAr ? 'بودكاست' : 'EXECUTIVE PODCAST'),
        date: podcastDoc.duration || (isAr ? 'حلقة صوتية' : 'Audio Briefing'),
        title: podcastDoc.title || '',
        desc: podcastDoc.description || (podcastDoc.guest ? `${isAr ? 'ضيف الحلقة: ' : 'Guest: '}${podcastDoc.guest}` : ''),
        cta: isAr ? 'الاستماع للحلقات' : 'Listen to Episode',
        link: podcastDoc.audioUrl || `/${locale}/resources/podcasts`,
        isExternal: Boolean(podcastDoc.audioUrl && podcastDoc.audioUrl.startsWith('http')),
        badgeColor: 'bg-neutral-200 text-neutral-800 border-neutral-300',
      }
    }

    // 4. Resolve Featured Event (Optional in Toolkits & Media)
    let eventDoc: any = null
    if (featured?.featuredEvent && typeof featured.featuredEvent === 'object') {
      eventDoc = featured.featuredEvent
    }

    if (eventDoc) {
      const displayDate = formatDisplayDate(eventDoc.date, locale)
      editorPickEvent = {
        badge: eventDoc.type || (isAr ? 'فعالية معتمدة' : 'VERIFIED EVENT'),
        date: displayDate || eventDoc.time || '',
        title: eventDoc.title || '',
        desc: eventDoc.description || '',
        cta: isAr ? 'الموقع الرسمي والتسجيل' : 'Official Event & Agenda',
        link: eventDoc.rsvpLink || `/${locale}/resources/events`,
        isExternal: Boolean(eventDoc.rsvpLink && eventDoc.rsvpLink.startsWith('http')),
        badgeColor: 'bg-neutral-200 text-neutral-800 border-neutral-300',
      }
    }

    return {
      spotlight,
      editorPickToolkit,
      editorPickPodcast,
      editorPickEvent,
    }
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get resources featured:', error)
    return {
      spotlight: null,
      editorPickToolkit: null,
      editorPickPodcast: null,
      editorPickEvent: null,
    }
  }
})

// 9. Get Navbar Resources Card Global
export const getNavbarResourcesCard = cache(async (locale: Locale = 'en'): Promise<AdaptedNavbarResourcesCard> => {
  const isAr = locale.startsWith('ar')

  const defaultCard: AdaptedNavbarResourcesCard = {
    enabled: true,
    badge: isAr ? 'تقرير تحليلي' : 'SPECIAL REPORT',
    title: isAr ? 'فجوة الكفاءات في مشاريع الطاقة المتجددة' : 'Bridging the Clean Energy Skills Gap',
    description: isAr
      ? 'دراسة ميدانية حول تحديات استقطاب وتأهيل المهندسين في مشاريع الطاقة بالخليج'
      : 'An executive analysis on talent bottlenecks and engineering capability building across GCC infrastructure.',
    image: '/executive_training_room.jpg',
    link: `/${locale}/resources/blog/renewable-energy-skills-gap`,
    linkText: isAr ? 'قراءة التقرير' : 'Read report',
  }

  try {
    const payload = await getPayloadClient()
    const card = await payload.findGlobal({
      slug: 'navbar-resources-card',
      locale: toPayloadLocale(locale),
      depth: 2,
      overrideAccess: false,
    })

    if (!card) {
      return defaultCard
    }

    const enabled = card.enabled !== undefined && card.enabled !== null ? Boolean(card.enabled) : true
    const postType = (card as any).postType || 'article'
    const customBadge = (card as any).customBadge?.trim()

    // 1. Resolve custom image override if provided
    let customImageUrl: string | null = null
    if ((card as any).customImage) {
      const resolvedCustomMedia = await resolveMediaDoc(payload, (card as any).customImage, toPayloadLocale(locale))
      customImageUrl = getMediaUrl(resolvedCustomMedia)
    }

    // 2. Resolve Selected Article
    if (postType === 'article' && (card as any).selectedArticle) {
      let artDoc = (card as any).selectedArticle
      if (typeof artDoc === 'number' || (typeof artDoc === 'string' && /^\d+$/.test(artDoc))) {
        try {
          artDoc = await payload.findByID({
            collection: 'articles',
            id: Number(artDoc),
            depth: 1,
            locale: toPayloadLocale(locale),
            fallbackLocale: 'en',
          })
        } catch (err) {
          console.warn('[Payload Data Layer] Could not fetch selectedArticle:', err)
        }
      }

      if (artDoc && typeof artDoc === 'object') {
        let imageUrl = customImageUrl
        if (!imageUrl && artDoc.featuredImage) {
          const resolvedMedia = await resolveMediaDoc(payload, artDoc.featuredImage, toPayloadLocale(locale))
          imageUrl = getMediaUrl(resolvedMedia)
        }

        return {
          enabled,
          badge: customBadge || (artDoc.category ? getCategoryLabel(artDoc.category, locale) : (isAr ? 'مقال مميز' : 'FEATURED ARTICLE')),
          title: artDoc.title || defaultCard.title,
          description:
            artDoc.excerpt ||
            (isAr
              ? 'تصفح المقال بالكامل للاطلاع على أحدث الدراسات والاستراتيجيات.'
              : 'Explore the full article for practical frameworks and actionable insights.'),
          image: imageUrl || defaultCard.image,
          link: `/${locale}/resources/blog/${artDoc.slug || 'renewable-energy-skills-gap'}`,
          linkText: isAr ? 'قراءة المقال' : 'Read article',
        }
      }
    }

    // 3. Resolve Selected Event
    if (postType === 'event' && (card as any).selectedEvent) {
      let evDoc = (card as any).selectedEvent
      if (typeof evDoc === 'number' || (typeof evDoc === 'string' && /^\d+$/.test(evDoc))) {
        try {
          evDoc = await payload.findByID({
            collection: 'events',
            id: Number(evDoc),
            depth: 1,
            locale: toPayloadLocale(locale),
            fallbackLocale: 'en',
          })
        } catch (err) {
          console.warn('[Payload Data Layer] Could not fetch selectedEvent:', err)
        }
      }

      if (evDoc && typeof evDoc === 'object') {
        const displayDate = formatDisplayDate(evDoc.date, locale)
        const eventBadge =
          customBadge ||
          (evDoc.location
            ? `${evDoc.location.toUpperCase()} · ${displayDate}`
            : evDoc.type || (isAr ? 'فعالية قادمة' : 'UPCOMING EVENT'))

        let link = evDoc.rsvpLink?.trim() || `/${locale}/resources/events`
        if (link.startsWith('/resources') && !link.startsWith(`/${locale}`)) {
          link = `/${locale}${link}`
        }

        return {
          enabled,
          badge: eventBadge,
          title: evDoc.title || defaultCard.title,
          description: evDoc.description || defaultCard.description,
          image: customImageUrl || defaultCard.image,
          link,
          linkText: isAr ? 'تفاصيل المؤتمر' : 'Conference details',
        }
      }
    }

    // Fallback: If neither was populated or selected yet, return default card with enabled toggle respected
    return {
      ...defaultCard,
      enabled,
    }
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get navbar resources card:', error)
    return defaultCard
  }
})


