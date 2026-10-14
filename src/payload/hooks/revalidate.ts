import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Safely revalidates a list of paths using Next.js on-demand revalidation.
 * Catches errors if invoked outside Next.js request context (e.g. CLI scripts).
 */
export function revalidatePaths(
  paths: (string | { path: string; type?: 'page' | 'layout' })[]
): void {
  for (const item of paths) {
    const path = typeof item === 'string' ? item : item.path
    const type = typeof item === 'object' ? item.type : undefined
    try {
      if (type) {
        revalidatePath(path, type)
      } else {
        revalidatePath(path)
      }
      console.log(
        `[Payload Invalidation] Revalidated: ${path}${type ? ` (${type})` : ''}`
      )
    } catch (err: any) {
      console.warn(
        `[Payload Invalidation] Warning revalidating ${path}:`,
        err?.message || err
      )
    }
  }
}

// ----------------------------------------------------
// Articles Invalidation Hooks
// ----------------------------------------------------
export const revalidateArticleChange: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
}) => {
  const paths: (string | { path: string; type?: 'page' | 'layout' })[] = [
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/blog',
    '/ar/resources/blog',
    { path: '/[lang]/resources/blog', type: 'page' },
    { path: '/[lang]/resources/blog/[slug]', type: 'page' },
  ]

  // Invalidate current slug
  if (doc?.slug) {
    paths.push(`/en/resources/blog/${doc.slug}`)
    paths.push(`/ar/resources/blog/${doc.slug}`)
  }

  // Invalidate previous slug if slug was changed
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    paths.push(`/en/resources/blog/${previousDoc.slug}`)
    paths.push(`/ar/resources/blog/${previousDoc.slug}`)
  }

  revalidatePaths(paths)
  return doc
}

export const revalidateArticleDelete: CollectionAfterDeleteHook = ({ doc }) => {
  const paths: (string | { path: string; type?: 'page' | 'layout' })[] = [
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/blog',
    '/ar/resources/blog',
    { path: '/[lang]/resources/blog', type: 'page' },
    { path: '/[lang]/resources/blog/[slug]', type: 'page' },
  ]

  if (doc?.slug) {
    paths.push(`/en/resources/blog/${doc.slug}`)
    paths.push(`/ar/resources/blog/${doc.slug}`)
  }

  revalidatePaths(paths)
  return doc
}

// ----------------------------------------------------
// Downloads Invalidation Hooks
// ----------------------------------------------------
export const revalidateDownloadChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/downloads',
    '/ar/resources/downloads',
    { path: '/[lang]/resources/downloads', type: 'page' },
  ])
  return doc
}

export const revalidateDownloadDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/downloads',
    '/ar/resources/downloads',
    { path: '/[lang]/resources/downloads', type: 'page' },
  ])
  return doc
}

// ----------------------------------------------------
// Events Invalidation Hooks
// ----------------------------------------------------
export const revalidateEventChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/events',
    '/ar/resources/events',
    { path: '/[lang]/resources/events', type: 'page' },
  ])
  return doc
}

export const revalidateEventDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/events',
    '/ar/resources/events',
    { path: '/[lang]/resources/events', type: 'page' },
  ])
  return doc
}

// ----------------------------------------------------
// Podcasts Invalidation Hooks
// ----------------------------------------------------
export const revalidatePodcastChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/podcasts',
    '/ar/resources/podcasts',
    { path: '/[lang]/resources/podcasts', type: 'page' },
  ])
  return doc
}

export const revalidatePodcastDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/podcasts',
    '/ar/resources/podcasts',
    { path: '/[lang]/resources/podcasts', type: 'page' },
  ])
  return doc
}

// ----------------------------------------------------
// Media Invalidation Hooks
// ----------------------------------------------------
export const revalidateMediaChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/blog',
    '/ar/resources/blog',
    '/en/resources/downloads',
    '/ar/resources/downloads',
  ])
  return doc
}

export const revalidateMediaDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
    '/en/resources/blog',
    '/ar/resources/blog',
    '/en/resources/downloads',
    '/ar/resources/downloads',
  ])
  return doc
}

// ----------------------------------------------------
// Globals Invalidation Hooks
// ----------------------------------------------------
export const revalidateResourcesHero: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
  ])
  return doc
}

export const revalidateResourcesFeatured: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePaths([
    '/en/resources',
    '/ar/resources',
    { path: '/[lang]/resources', type: 'page' },
  ])
  return doc
}

export const revalidateNavbar: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePaths([
    { path: '/', type: 'layout' },
    { path: '/[lang]', type: 'layout' },
    '/en',
    '/ar',
    '/en/resources',
    '/ar/resources',
  ])
  return doc
}
