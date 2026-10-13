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
  content: any
  plainContent?: string
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
  editorPickEventB?: AdaptedEditorPickEvent
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
          content: art.content || contentText,
          plainContent: contentText,
          image: imageUrl,
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
            ogImage: art.meta?.ogImage ? getMediaUrl(await resolveMediaDoc(payload, art.meta.ogImage)) : undefined,
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
      content: art.content || contentText,
      plainContent: contentText,
      image: imageUrl,
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
        ogImage: art.meta?.ogImage ? getMediaUrl(await resolveMediaDoc(payload, art.meta.ogImage)) : undefined,
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

// Curated, verified real-world events from the web in Saudi Arabia and GCC
export const REAL_WEB_EVENTS = [
  {
    id: 'atd-saudi-arabia-2026',
    slug: 'atd-saudi-arabia-conference-2026',
    titleEn: 'ATD Saudi Arabia Conference 2026',
    titleAr: 'مؤتمر جمعية تطوير المواهب (ATD) السعودية ٢٠٢٦',
    dateEn: 'December 7–8, 2026',
    dateAr: '٧ – ٨ ديسمبر ٢٠٢٦',
    timeEn: 'Full Day Conference & Masterclasses',
    timeAr: 'مؤتمر يوم كامل وورش عمل تخصصية',
    locationEn: 'Crowne Plaza Riyadh RDC, Saudi Arabia',
    locationAr: 'فندق كراون بلازا RDC، الرياض، السعودية',
    typeEn: 'L&D & Talent Conference',
    typeAr: 'مؤتمر تنمية المواهب والتعلم',
    descEn: 'The Kingdom benchmark talent development gathering by the Association for Talent Development (ATD), uniting enterprise CLOs and HR directors to accelerate national workforce capabilities.',
    descAr: 'الحدث السنوي الأبرز في المملكة لتطوير رأس المال البشري بتنظيم ATD العالمية، بمشاركة قيادات التدريب والموارد البشرية لبناء قدرات الكوادر الوطنية.',
    spotsLeftEn: 'Delegate Registration Open',
    spotsLeftAr: 'التسجيل متاح للمشاركين',
    link: 'https://atdksa.com',
  },
  {
    id: 'hr-tech-saudi-2026',
    slug: 'hr-tech-saudi-summit-2026',
    titleEn: 'HR Tech Saudi Summit 2026',
    titleAr: 'قمة تقنيات الموارد البشرية والتدريب في السعودية ٢٠٢٦',
    dateEn: 'November 16–17, 2026',
    dateAr: '١٦ – ١٧ نوفمبر ٢٠٢٦',
    timeEn: '09:00 AM - 04:30 PM (AST)',
    timeAr: '٠٩:٠٠ ص - ٠٤:٣٠ م (توقيت مكة)',
    locationEn: 'voco Riyadh, Saudi Arabia',
    locationAr: 'فندق فوكو الرياض، المملكة العربية السعودية',
    typeEn: 'Digital HR & Upskilling Summit',
    typeAr: 'قمة التحول الرقمي وتمكين الكفاءات',
    descEn: 'Strategic high-level summit convening C-suite HR leaders and corporate learning innovators driving digital workforce upskilling and Vision 2030 talent localization.',
    descAr: 'قمة استراتيجية تجمع قيادات الموارد البشرية وتقنيات التدريب لبحث حلول التوطين، ومنصات تمكين وتطوير الكفاءات الوطنية.',
    spotsLeftEn: 'Executive Passes Available',
    spotsLeftAr: 'مقاعد تنفيذية متاحة',
    link: 'https://hrtechsaudi.com',
  },
  {
    id: 'hrse-dubai-2026',
    slug: 'hrse-hr-summit-expo-2026',
    titleEn: 'HRSE (HR Summit & Expo) 2026',
    titleAr: 'معرض ومؤتمر الموارد البشرية والتدريب (HRSE) ٢٠٢٦',
    dateEn: 'October 14–15, 2026',
    dateAr: '١٤ – ١٥ أكتوبر ٢٠٢٦',
    timeEn: '08:30 AM - 05:00 PM (GST)',
    timeAr: '٠٨:٣٠ ص - ٠٥:٠٠ م (توقيت الخليج)',
    locationEn: 'Dubai World Trade Centre (DWTC), UAE',
    locationAr: 'مركز دبي التجاري العالمي، الإمارات',
    typeEn: 'Flagship Regional HR Expo',
    typeAr: 'المعرض الإقليمي الأكبر للموارد البشرية',
    descEn: "Informa Connect's premier Middle East HR showcase, gathering over 4,000 workforce directors and enterprise training providers to explore modern learning and employee capability frameworks.",
    descAr: 'المؤتمر والمعرض السنوي الرائد في الشرق الأوسط بتنظيم إنفورما، بمشاركة أكثر من 4,000 مسؤول موارد بشرية ومزودي برامج تدريبية لبحث مستقبل الكفاءات والتعلم المؤسسي.',
    spotsLeftEn: 'Open Registration',
    spotsLeftAr: 'التسجيل مفتوح',
    link: 'https://informaconnect.com/hr-summit-expo/',
  },
  {
    id: 'shrm-mena-2026',
    slug: 'shrm-mena-annual-conference-2026',
    titleEn: 'SHRM MENA Annual Conference & Expo 2026',
    titleAr: 'المؤتمر السنوي لجمعية إدارة الموارد البشرية (SHRM) الشرق الأوسط ٢٠٢٦',
    dateEn: 'December 15–17, 2026',
    dateAr: '١٥ – ١٧ ديسمبر ٢٠٢٦',
    timeEn: '09:00 AM - 05:00 PM (GST)',
    timeAr: '٠٩:٠٠ ص - ٠٥:٠٠ م (توقيت الخليج)',
    locationEn: 'Madinat Jumeirah, Dubai, UAE',
    locationAr: 'مدينة جميرا، دبي، الإمارات',
    typeEn: 'Executive Leadership Conference',
    typeAr: 'مؤتمر القيادة التنفيذية والموارد البشرية',
    descEn: 'The definitive executive forum by SHRM in the Middle East, dedicated to organizational resilience, workplace capability transformation, and future leadership pipelines.',
    descAr: 'الملتقى التنفيذي الرائد للجمعية الأمريكية لإدارة الموارد البشرية، المكرس لمناقشة القيادة، صقل الكفاءات، واستراتيجيات تنمية رأس المال البشري.',
    spotsLeftEn: 'Early Access Passes',
    spotsLeftAr: 'الحجز المبكر متاح',
    link: 'https://shrmmena.org',
  },
  {
    id: 'leap-workforce-2026',
    slug: 'leap-workforce-capabilities-2026',
    titleEn: 'LEAP 2026: Workforce Capabilities & DeepFest',
    titleAr: 'مؤتمر LEAP 2026: مسار المهارات الرقمية وبناء القدرات',
    dateEn: 'August 31 – September 3, 2026',
    dateAr: '٣١ أغسطس – ٣ سبتمبر ٢٠٢٦',
    timeEn: 'Full Day Tech & Learning Stages',
    timeAr: 'جلسات ومسارات تدريبية متكاملة',
    locationEn: 'Riyadh Exhibition & Convention Centre, Malham, KSA',
    locationAr: 'مركز الرياض للمعارض والمؤتمرات، ملهم، السعودية',
    typeEn: 'Global Tech & Workforce Track',
    typeAr: 'المسار العالمي للتقنية وبناء القدرات',
    descEn: 'The world most attended tech gathering featuring dedicated stages on future workforce capabilities, AI-driven workplace learning, and national talent acceleration in the Kingdom.',
    descAr: 'أضخم حدث تقني عالمي يخصص مسارات متقدمة لبناء القدرات الرقمية الوطنية، أدوات التدريب المدعومة بالذكاء الاصطناعي، ومستقبل الوظائف في السعودية.',
    spotsLeftEn: 'Complimentary Pass',
    spotsLeftAr: 'تسجيل مجاني متاح',
    link: 'https://onegiantleap.com',
  },
]

// 5. Get Published Events (Payload collection with verified real web events fallback)
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

    if (result.docs.length > 0) {
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
    }
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get events from database, using verified real web events:', error)
  }

  // Fallback to verified real-world events from the web
  return REAL_WEB_EVENTS.map((ev) => ({
    id: ev.id,
    slug: ev.slug,
    title: locale === 'ar' ? ev.titleAr : ev.titleEn,
    date: locale === 'ar' ? ev.dateAr : ev.dateEn,
    time: locale === 'ar' ? ev.timeAr : ev.timeEn,
    location: locale === 'ar' ? ev.locationAr : ev.locationEn,
    type: locale === 'ar' ? ev.typeAr : ev.typeEn,
    desc: locale === 'ar' ? ev.descAr : ev.descEn,
    spotsLeft: locale === 'ar' ? ev.spotsLeftAr : ev.spotsLeftEn,
    link: ev.link,
  }))
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
    badge: isAr ? 'مؤتمر تطوير المواهب · الرياض' : 'L&D CONFERENCE · RIYADH',
    date: isAr ? '٧ – ٨ ديسمبر ٢٠٢٦' : '7 – 8 Dec 2026',
    title: isAr
      ? 'مؤتمر جمعية تطوير المواهب (ATD) السعودية ٢٠٢٦'
      : 'ATD Saudi Arabia Conference 2026',
    desc: isAr
      ? 'الحدث السنوي الأبرز في المملكة لتطوير رأس المال البشري بتنظيم ATD العالمية، بمشاركة قيادات التدريب والموارد البشرية لبناء قدرات الكوادر الوطنية.'
      : 'The Kingdom benchmark talent development gathering by the Association for Talent Development (ATD), uniting enterprise CLOs and HR directors to accelerate national workforce capabilities.',
    cta: isAr ? 'الموقع الرسمي والتسجيل' : 'Official Event & Agenda',
    link: 'https://atdksa.com',
  }

  const defaultEditorPickEventB: AdaptedEditorPickEvent = {
    badge: isAr ? 'قمة تنفيذية · الرياض' : 'EXECUTIVE SUMMIT · RIYADH',
    date: isAr ? '١٦ – ١٧ نوفمبر ٢٠٢٦' : '16 – 17 Nov 2026',
    title: isAr
      ? 'قمة تقنيات الموارد البشرية والتدريب في السعودية ٢٠٢٦'
      : 'HR Tech Saudi Summit 2026',
    desc: isAr
      ? 'قمة استراتيجية رفيعة المستوى تجمع قيادات الموارد البشرية والتعلم المؤسسي لبحث حلول التوطين والتحول الرقمي للكوادر الوطنية.'
      : 'Strategic gathering of C-suite HR executives and enterprise learning leaders driving digital upskilling and Vision 2030 talent localization.',
    cta: isAr ? 'الموقع الرسمي والتسجيل' : 'Official Summit & RSVP',
    link: 'https://hrtechsaudi.com',
  }

  const defaultEditorPickToolkit: AdaptedEditorPickToolkit = {
    badge: isAr ? 'دليل إرشادي معتمد' : 'PONTLOOK BENCHMARK GUIDE',
    title: isAr ? 'دليل معايير اعتماد التدريب المؤسسي في السعودية' : 'Saudi Enterprise Training Accreditation Guide',
    desc: isAr
      ? 'إطار عملي لفهم متطلبات TVTC وتأهيل مزودي التدريب وبناء برامج الكوادر الوطنية المتوافقة مع رؤية 2030.'
      : 'Strategic operational framework navigating TVTC accreditations, provider vetting criteria, and Vision 2030 talent localization standards.',
    cta: isAr ? 'استعراض الموارد' : 'Explore Resources',
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
    let editorPickEventB = defaultEditorPickEventB

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
        link: ev.rsvpLink || `/${locale}/resources/events`,
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
      editorPickEventB,
    }
  } catch (error) {
    console.error('[Payload Data Layer] Failed to get resources featured:', error)
    return {
      spotlight: defaultSpotlight,
      editorPickEvent: defaultEditorPickEvent,
      editorPickToolkit: defaultEditorPickToolkit,
      editorPickEventB: defaultEditorPickEventB,
    }
  }
})
