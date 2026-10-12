import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Locale } from '@/i18n/config'

// Helper: Extract image URL from Payload Media relation or string
export function getMediaUrl(media: any): string | null {
  if (!media) return null

  // If already a string
  if (typeof media === 'string') {
    const trimmed = media.trim()
    if (!trimmed) return null
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
      const u = media.url.trim()
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
        const su = sizeObj.url.trim()
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
  readTime: string
  date: string
  publishedAt: string | null
  excerpt: string
  content: string
  image: string | null
  status: string
  author: {
    name: string
    image: string | null
    bio: string | null
  }
  seo?: {
    title?: string
    description?: string
  }
}

export interface AdaptedDownload {
  id: string
  slug: string
  title: string
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
  image: string
  link: string
}

export interface AdaptedEditorPickEvent {
  badge: string
  date: string
  title: string
  desc: string
  cta: string
  link: string
}

export interface AdaptedEditorPickToolkit {
  badge: string
  title: string
  desc: string
  cta: string
  link: string
}

export interface AdaptedFeatured {
  spotlight: AdaptedSpotlight
  editorPickEvent: AdaptedEditorPickEvent
  editorPickToolkit: AdaptedEditorPickToolkit
}

// Helper: Resolve Media document if stored as unpopulated ID
async function resolveMediaDoc(payload: any, media: any): Promise<any> {
  if (typeof media === 'number' || (typeof media === 'string' && /^\d+$/.test(media))) {
    try {
      const mediaDoc = await payload.findByID({
        collection: 'media',
        id: Number(media),
        depth: 0,
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
      locale,
      depth: 1,
      sort: '-publishedAt',
      limit: 100,
      overrideAccess: false,
    })

    return await Promise.all(
      result.docs.map(async (art: any) => {
        const resolvedImage = await resolveMediaDoc(payload, art.featuredImage)
        const imageUrl = getMediaUrl(resolvedImage)
        const displayDate = formatDisplayDate(art.publishedAt, locale)
        const contentText = extractTextFromLexical(art.content)

        return {
          id: String(art.id),
          slug: art.slug,
          title: art.title || '',
          category: art.category || (locale === 'ar' ? 'استراتيجيات التدريب' : 'L&D STRATEGIES'),
          readTime: art.readTime || '6 min read',
          date: displayDate,
          publishedAt: art.publishedAt || null,
          excerpt: art.excerpt || '',
          content: contentText,
          image: imageUrl,
          status: art.status || 'published',
          author: {
            name: 'PontLook Research',
            image: null,
            bio: null,
          },
          seo: {
            title: art.meta?.title,
            description: art.meta?.description,
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
      locale,
      depth: 1,
      limit: 1,
      overrideAccess: false,
    })

    if (!result.docs || result.docs.length === 0) {
      return null
    }

    const art: any = result.docs[0]
    const featuredImage = await resolveMediaDoc(payload, art.featuredImage)
    const imageUrl = getMediaUrl(featuredImage)
    const displayDate = formatDisplayDate(art.publishedAt, locale)
    const contentText = extractTextFromLexical(art.content)

    return {
      id: String(art.id),
      slug: art.slug,
      title: art.title || '',
      category: art.category || (locale === 'ar' ? 'استراتيجيات التدريب' : 'L&D STRATEGIES'),
      readTime: art.readTime || '6 min read',
      date: displayDate,
      publishedAt: art.publishedAt || null,
      excerpt: art.excerpt || '',
      content: contentText,
      image: imageUrl,
      status: art.status || 'published',
      author: {
        name: 'PontLook Research',
        image: null,
        bio: null,
      },
      seo: {
        title: art.meta?.title,
        description: art.meta?.description,
      },
    }
  } catch (error) {
    console.error(`[Payload Data Layer] Failed to get article by slug "${slug}":`, error)
    return null
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
      locale,
      depth: 1,
      limit: 100,
      overrideAccess: false,
    })

    return result.docs.map((dl: any) => {
      const fileUrl = getMediaUrl(dl.file) || ''
      const features = Array.isArray(dl.features)
        ? dl.features.map((f: any) => (typeof f === 'string' ? f : f.item || '')).filter(Boolean)
        : []

      return {
        id: String(dl.id),
        slug: dl.slug,
        title: dl.title || '',
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

// 5. Get Published Events
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
      locale,
      depth: 1,
      sort: 'date',
      limit: 100,
      overrideAccess: false,
    })

    return result.docs.map((ev: any) => {
      const displayDate = formatDisplayDate(ev.date, locale)
      const seatsStr = ev.spotsLeft
        ? locale === 'ar'
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
        type: ev.type || (locale === 'ar' ? 'فعالية' : 'Event'),
        desc: ev.description || '',
        spotsLeft: seatsStr,
        link: ev.rsvpLink || '',
      }
    })
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get events:', error)
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
      locale,
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
  try {
    const payload = await getPayloadClient()
    const hero = await payload.findGlobal({
      slug: 'resources-hero',
      locale,
      overrideAccess: false,
    })

    return {
      title: hero?.title || (locale === 'ar' ? 'مركز موارد التدريب والتطوير في PontLook' : 'The PontLook L&D resource hub'),
      subtitle:
        hero?.description ||
        (locale === 'ar'
          ? 'رؤى واستراتيجيات وموارد لمساعدة المنشآت على بناء كوادر أقوى من خلال قرارات تدريبية أفضل.'
          : 'Insights, strategies, and resources to help organisations build stronger workforces through better training decisions.'),
      eyebrow: hero?.eyebrow || undefined,
    }
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get resources hero:', error)
    return {
      title: locale === 'ar' ? 'مركز موارد التدريب والتطوير في PontLook' : 'The PontLook L&D resource hub',
      subtitle:
        locale === 'ar'
          ? 'رؤى واستراتيجيات وموارد لمساعدة المنشآت على بناء كوادر أقوى من خلال قرارات تدريبية أفضل.'
          : 'Insights, strategies, and resources to help organisations build stronger workforces through better training decisions.',
    }
  }
})

// 8. Get Resources Featured Global (with resolved relationships)
export const getResourcesFeatured = cache(async (locale: Locale = 'en'): Promise<AdaptedFeatured> => {
  const isAr = locale === 'ar'

  // Sensible default fallbacks matching the exact design
  const defaultSpotlight: AdaptedSpotlight = {
    badge: isAr ? 'تقرير مميز · ٢٠٢٦' : 'FEATURED GUIDE · 2026',
    category: isAr ? 'استراتيجيات التدريب' : 'L&D STRATEGIES',
    readTime: isAr ? '١٢ دقيقة قراءة' : '12 min read',
    date: isAr ? 'أكتوبر ٢٠٢٦' : 'October 2026',
    title: isAr
      ? 'دليل معايير تدريب الشركات في الخليج ٢٠٢٦: سد فجوات المهارات ومواءمة التوطين'
      : 'The 2026 GCC Corporate Training Benchmark: Closing Workforce Skill Gaps',
    excerpt: isAr
      ? 'دراسة واقعية وشاملة تستند إلى مقابلات مع أكثر من ٤٥٠ قائداً تنفيذياً في الرياض ودبي حول قياس الاحتياج التدريبي الحقيقي، التعامل مع تراخيص TVTC، وبناء كوادر وطنية عالية الأداء.'
      : 'A comprehensive study of 450+ enterprise HR leaders in Riyadh and Dubai navigating diagnostic TNA methods, TVTC accreditations, and high-impact corporate cohorts.',
    cta: isAr ? 'قراءة الدليل بالكامل' : 'Read Full Guide',
    image: '/executive_training_room.jpg',
    link: `/${locale}/resources/blog`,
  }

  const defaultEditorPickEvent: AdaptedEditorPickEvent = {
    badge: isAr ? 'حدث افتراضي مباشر' : '3-DAY VIRTUAL EVENT',
    date: isAr ? '٧ – ٩ أكتوبر' : '7 – 9 Oct',
    title: isAr ? "قمة مهارات المستقبل الخليجية '٢٦" : "Human Skills Fest '26",
    desc: isAr
      ? 'جلسات تفاعلية مع قادة الموارد البشرية والتدريب في كبرى المنشآت لمناقشة القيادة، المهارات البشرية، واستدامة التدريب.'
      : 'Ten expert sessions, three days, one unmissable online summit. Join HR and L&D professionals to future-proof workforce capability.',
    cta: isAr ? 'حجز مقعد مجاني' : 'Secure your spot',
    link: `/${locale}/resources/events`,
  }

  const defaultEditorPickToolkit: AdaptedEditorPickToolkit = {
    badge: isAr ? 'دليل تشخيصي قابل للتحميل' : 'DOWNLOADABLE GUIDE',
    title: isAr ? 'مصفوفة تشخيص الاحتياجات التدريبية (TNA)' : 'TNA Diagnostic Framework 2026',
    desc: isAr
      ? 'نموذج عملي لتقييم كفاءة الفرق وتحديد الاحتياجات الفعلية بدقة قبل التعاقد مع مزودي التدريب.'
      : 'Pre-built scoring matrix to isolate core capability gaps before signing provider scopes.',
    cta: isAr ? 'تحميل القالب مجاناً' : 'Download Template',
    link: `/${locale}/resources/downloads`,
  }

  try {
    const payload = await getPayloadClient()
    const featured = await payload.findGlobal({
      slug: 'resources-featured',
      locale,
      depth: 2,
      overrideAccess: false,
    })

    let spotlight = defaultSpotlight
    let editorPickEvent = defaultEditorPickEvent
    let editorPickToolkit = defaultEditorPickToolkit

    // Resolve Spotlight Article relation
    if (featured?.spotlightArticle && typeof featured.spotlightArticle === 'object') {
      const art: any = featured.spotlightArticle
      const featuredImage = await resolveMediaDoc(payload, art.featuredImage)
      const imageUrl = getMediaUrl(featuredImage) || defaultSpotlight.image
      const displayDate = formatDisplayDate(art.publishedAt, locale)

      spotlight = {
        badge: defaultSpotlight.badge,
        category: art.category || defaultSpotlight.category,
        readTime: art.readTime || defaultSpotlight.readTime,
        date: displayDate || defaultSpotlight.date,
        title: art.title || defaultSpotlight.title,
        excerpt: art.excerpt || defaultSpotlight.excerpt,
        cta: defaultSpotlight.cta,
        image: imageUrl,
        link: `/${locale}/resources/blog/${art.slug}`,
      }
    }

    // Resolve Featured Event relation
    if (featured?.featuredEvent && typeof featured.featuredEvent === 'object') {
      const ev: any = featured.featuredEvent
      const displayDate = formatDisplayDate(ev.date, locale)

      editorPickEvent = {
        badge: ev.type || defaultEditorPickEvent.badge,
        date: displayDate || ev.time || defaultEditorPickEvent.date,
        title: ev.title || defaultEditorPickEvent.title,
        desc: ev.description || defaultEditorPickEvent.desc,
        cta: defaultEditorPickEvent.cta,
        link: `/${locale}/resources/events`,
      }
    }

    // Resolve Featured Download relation
    if (featured?.featuredDownload && typeof featured.featuredDownload === 'object') {
      const dl: any = featured.featuredDownload

      editorPickToolkit = {
        badge: dl.format || defaultEditorPickToolkit.badge,
        title: dl.title || defaultEditorPickToolkit.title,
        desc: dl.description || defaultEditorPickToolkit.desc,
        cta: defaultEditorPickToolkit.cta,
        link: `/${locale}/resources/downloads`,
      }
    }

    return {
      spotlight,
      editorPickEvent,
      editorPickToolkit,
    }
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get resources featured:', error)
    return {
      spotlight: defaultSpotlight,
      editorPickEvent: defaultEditorPickEvent,
      editorPickToolkit: defaultEditorPickToolkit,
    }
  }
})
