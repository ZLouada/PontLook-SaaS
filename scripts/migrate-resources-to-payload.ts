import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import { normalizeCategorySlug } from '../src/constants/categories'

// Helper: Parse human dates into ISO strings
function parseDateToISO(dateStr?: string): string | undefined {
  if (!dateStr) return undefined
  // First check range match like "December 15-16, 2026" or "7 – 9 Oct"
  const rangeMatch = dateStr.match(/^([A-Za-z]+)\s+(\d+)[-–](\d+),\s+(\d{4})$/)
  if (rangeMatch) {
    const d = new Date(`${rangeMatch[1]} ${rangeMatch[2]}, ${rangeMatch[4]}`)
    if (!isNaN(d.getTime())) return d.toISOString()
  }
  // Month + Year like "October 2026"
  const monthYearMatch = dateStr.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (monthYearMatch) {
    const d = new Date(`${monthYearMatch[1]} 1, ${monthYearMatch[2]}`)
    if (!isNaN(d.getTime())) return d.toISOString()
  }
  // Standard parse
  const parsed = Date.parse(dateStr)
  if (!isNaN(parsed)) {
    return new Date(parsed).toISOString()
  }
  return undefined
}

// Helper: Parse spots left number
function parseSpotsLeft(spotsStr?: string): number | undefined {
  if (!spotsStr) return undefined
  const match = spotsStr.match(/\d+/)
  return match ? parseInt(match[0], 10) : undefined
}

// Helper: Build Lexical rich text object for paragraph
function buildLexicalParagraph(text?: string, isRtl = false) {
  const dir = (isRtl ? 'rtl' : 'ltr') as 'ltr' | 'rtl'
  if (!text) {
    return {
      root: {
        type: 'root',
        format: '' as const,
        indent: 0,
        version: 1,
        children: [],
        direction: dir,
      },
    }
  }
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text,
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
              version: 1,
            },
          ],
          direction: dir,
        },
      ],
      direction: dir,
    },
  }
}

async function run() {
  const isDryRun = process.argv.includes('--dry-run')
  console.log(`\n==================================================`)
  console.log(`PONTLOOK RESOURCES PAYLOAD MIGRATION`)
  console.log(`Mode: ${isDryRun ? 'DRY-RUN (Simulation only, no DB writes)' : 'LIVE MIGRATION (Writing to Supabase PostgreSQL)'}`)
  console.log(`==================================================\n`)

  const jsonPath = path.resolve(process.cwd(), 'src/data/resources.json')
  if (!fs.existsSync(jsonPath)) {
    console.error(`[Error] resources.json not found at: ${jsonPath}`)
    process.exit(1)
  }

  const rawJson = fs.readFileSync(jsonPath, 'utf8')
  const data = JSON.parse(rawJson)

  const sourceArticles = Array.isArray(data.articles) ? data.articles : []
  const sourceDownloads = Array.isArray(data.downloads) ? data.downloads : []
  const sourceEvents = Array.isArray(data.events) ? data.events : []
  const sourcePodcasts = Array.isArray(data.podcasts) ? data.podcasts : []
  const sourceHero = data.hero || null
  const sourceSpotlight = data.spotlight || null
  const sourceEditorPickEvent = data.editorPickEvent || null
  const sourceEditorPickToolkit = data.editorPickToolkit || null

  console.log(`[Source Data Inspection]`)
  console.log(`- Articles: ${sourceArticles.length}`)
  console.log(`- Downloads: ${sourceDownloads.length}`)
  console.log(`- Events: ${sourceEvents.length}`)
  console.log(`- Podcasts: ${sourcePodcasts.length}`)
  console.log(`- Hero: ${sourceHero ? 'Present' : 'Missing'}`)
  console.log(`- Spotlight: ${sourceSpotlight ? 'Present' : 'Missing'}`)
  console.log(`- EditorPickEvent: ${sourceEditorPickEvent ? 'Present' : 'Missing'}`)
  console.log(`- EditorPickToolkit: ${sourceEditorPickToolkit ? 'Present' : 'Missing'}\n`)

  // Check Media files referenced
  const referencedMedia: Array<{ filename: string; absPath: string; altEn: string; altAr: string }> = []
  if (sourceSpotlight?.image) {
    const cleanImgPath = sourceSpotlight.image.replace(/^\//, '')
    const absPath = path.resolve(process.cwd(), 'public', cleanImgPath)
    if (fs.existsSync(absPath)) {
      referencedMedia.push({
        filename: path.basename(absPath),
        absPath,
        altEn: 'Executive Training Room',
        altAr: 'قاعة التدريب التنفيذي',
      })
    } else {
      console.warn(`[Warning] Referenced image does not exist on disk: ${absPath}`)
    }
  }

  console.log(`[Media Audit]`)
  console.log(`- Referenced media files detected on disk: ${referencedMedia.length}`)
  for (const m of referencedMedia) {
    console.log(`  * ${m.filename} (${m.absPath})`)
  }
  console.log(``)

  if (isDryRun) {
    console.log(`[Dry-Run Mapping Simulation]`)

    // Simulate Articles
    console.log(`\n--- Articles (${sourceArticles.length}) ---`)
    for (const art of sourceArticles) {
      const slug = art.slug || art.id
      const dateISO = parseDateToISO(art.dateEn)
      console.log(`Article: "${art.titleEn}" / "${art.titleAr}"`)
      console.log(`  - slug: ${slug}`)
      console.log(`  - category: ${art.categoryEn} / ${art.categoryAr}`)
      console.log(`  - date: ${dateISO || art.dateEn}`)
      console.log(`  - status: published`)
    }

    // Simulate Downloads
    console.log(`\n--- Downloads (${sourceDownloads.length}) ---`)
    for (const dl of sourceDownloads) {
      const slug = dl.slug || dl.id
      console.log(`Download: "${dl.titleEn}" / "${dl.titleAr}"`)
      console.log(`  - slug: ${slug}`)
      console.log(`  - format: ${dl.format}, size: ${dl.fileSize}`)
      console.log(`  - features: ${dl.featuresEn?.length || 0} EN items, ${dl.featuresAr?.length || 0} AR items`)
      console.log(`  - status: published`)
    }

    // Simulate Events
    console.log(`\n--- Events (${sourceEvents.length}) ---`)
    for (const ev of sourceEvents) {
      const slug = ev.slug || ev.id
      const dateISO = parseDateToISO(ev.dateEn)
      const seats = parseSpotsLeft(ev.spotsLeftEn)
      console.log(`Event: "${ev.titleEn}" / "${ev.titleAr}"`)
      console.log(`  - slug: ${slug}`)
      console.log(`  - date: ${dateISO || ev.dateEn}, time: ${ev.time}`)
      console.log(`  - location: ${ev.locationEn} / ${ev.locationAr}`)
      console.log(`  - spotsLeft: ${seats ?? 'N/A'}`)
      console.log(`  - status: published`)
    }

    // Simulate Podcasts
    console.log(`\n--- Podcasts (${sourcePodcasts.length}) ---`)
    for (const pod of sourcePodcasts) {
      const slug = pod.slug || pod.id
      const dateISO = parseDateToISO(pod.dateEn)
      console.log(`Podcast: "${pod.titleEn}" / "${pod.titleAr}"`)
      console.log(`  - slug: ${slug}`)
      console.log(`  - guest: ${pod.guestEn} / ${pod.guestAr}`)
      console.log(`  - duration: ${pod.duration}, date: ${dateISO || pod.dateEn}`)
      console.log(`  - tag: ${pod.tagEn} / ${pod.tagAr}`)
      console.log(`  - status: published`)
    }

    // Simulate Hero
    console.log(`\n--- ResourcesHero ---`)
    if (sourceHero) {
      console.log(`Hero Title: "${sourceHero.titleEn}" / "${sourceHero.titleAr}"`)
      console.log(`Hero Subtitle: "${sourceHero.subtitleEn}" / "${sourceHero.subtitleAr}"`)
    }

    // Simulate Featured
    console.log(`\n--- ResourcesFeatured ---`)
    console.log(`Spotlight Article target: ${sourceArticles[0]?.slug || sourceArticles[0]?.id || 'none'}`)
    console.log(`Featured Event target: ${sourceEvents[0]?.slug || sourceEvents[0]?.id || 'none'}`)
    console.log(`Featured Download target: ${sourceDownloads[0]?.slug || sourceDownloads[0]?.id || 'none'}`)
    console.log(`Featured Podcast target: ${sourcePodcasts[0]?.slug || sourcePodcasts[0]?.id || 'none'}`)

    console.log(`\n[DRY-RUN VALIDATION COMPLETE]`)
    console.log(`No records were inserted or modified in PostgreSQL.`)
    console.log(`==================================================\n`)
    return
  }

  // Real Migration Execution
  console.log(`[Connecting to Payload CMS & PostgreSQL...]`)
  const payload = await getPayload({ config: configPromise })
  console.log(`[Payload Initialized Successfully]\n`)

  // 1. Media Migration
  const mediaMap = new Map<string, number | string>()
  for (const m of referencedMedia) {
    console.log(`[Media] Processing ${m.filename}...`)
    // Check if media already exists
    const existing = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: m.filename,
        },
      },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      const existingId = existing.docs[0].id
      console.log(`  -> Already exists with ID ${existingId}. Reusing record.`)
      mediaMap.set(m.filename, existingId)
    } else {
      console.log(`  -> Uploading new media record from ${m.absPath}...`)
      const created = await payload.create({
        collection: 'media',
        filePath: m.absPath,
        locale: 'en',
        data: {
          alt: m.altEn,
          caption: m.altEn,
        },
        overrideAccess: true,
      })
      // Update Arabic metadata
      await payload.update({
        collection: 'media',
        id: created.id,
        locale: 'ar',
        data: {
          alt: m.altAr,
          caption: m.altAr,
        },
        overrideAccess: true,
      })
      console.log(`  -> Created media ID ${created.id}`)
      mediaMap.set(m.filename, created.id)
    }
  }

  const spotlightMediaId = mediaMap.get('executive_training_room.jpg')

  // 2. Articles Migration
  console.log(`\n[Articles] Migrating ${sourceArticles.length} articles...`)
  const articleMap = new Map<string, number | string>()
  for (const art of sourceArticles) {
    const slug = art.slug || art.id
    const publishedAt = parseDateToISO(art.dateEn)
    const contentEn = buildLexicalParagraph(art.excerptEn, false)
    const contentAr = buildLexicalParagraph(art.excerptAr, true)

    const existing = await payload.find({
      collection: 'articles',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      overrideAccess: true,
    })

    let docId: number | string
    if (existing.docs.length > 0) {
      docId = existing.docs[0].id
      console.log(`  -> Article "${slug}" exists (ID: ${docId}). Updating English...`)
      await payload.update({
        collection: 'articles',
        id: docId,
        locale: 'en',
        data: {
          title: art.titleEn,
          category: normalizeCategorySlug(art.categoryEn),
          readTime: art.readTimeEn,
          publishedAt,
          excerpt: art.excerptEn,
          content: contentEn,
          featuredImage: spotlightMediaId as any,
          status: 'published',
          meta: {
            title: art.titleEn,
            description: art.excerptEn,
          },
        },
        overrideAccess: true,
      })
    } else {
      console.log(`  -> Creating article "${slug}" in English...`)
      const created = await payload.create({
        collection: 'articles',
        locale: 'en',
        data: {
          title: art.titleEn,
          slug,
          category: normalizeCategorySlug(art.categoryEn),
          readTime: art.readTimeEn,
          publishedAt,
          excerpt: art.excerptEn,
          content: contentEn,
          featuredImage: spotlightMediaId as any,
          status: 'published',
          meta: {
            title: art.titleEn,
            description: art.excerptEn,
          },
        },
        overrideAccess: true,
      })
      docId = created.id
    }

    // Update Arabic locale
    console.log(`  -> Updating article "${slug}" in Arabic...`)
    await payload.update({
      collection: 'articles',
      id: docId,
      locale: 'ar',
      data: {
        title: art.titleAr,
        excerpt: art.excerptAr,
        content: contentAr,
        meta: {
          title: art.titleAr,
          description: art.excerptAr,
        },
      },
      overrideAccess: true,
    })
    articleMap.set(slug, docId)
  }

  // 3. Downloads Migration
  console.log(`\n[Downloads] Migrating ${sourceDownloads.length} downloads...`)
  const downloadMap = new Map<string, number | string>()
  for (const dl of sourceDownloads) {
    const slug = dl.slug || dl.id
    const featuresEn = (dl.featuresEn || []).map((f: string) => ({ item: f }))
    const featuresAr = (dl.featuresAr || []).map((f: string) => ({ item: f }))

    const existing = await payload.find({
      collection: 'downloads',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      overrideAccess: true,
    })

    let docId: number | string
    if (existing.docs.length > 0) {
      docId = existing.docs[0].id
      console.log(`  -> Download "${slug}" exists (ID: ${docId}). Updating English...`)
      await payload.update({
        collection: 'downloads',
        id: docId,
        locale: 'en',
        data: {
          title: dl.titleEn,
          category: normalizeCategorySlug((dl as any).category || 'leadership'),
          format: dl.format,
          fileSize: dl.fileSize,
          description: dl.descEn,
          features: featuresEn,
          file: spotlightMediaId as any,
          status: 'published',
        },
        overrideAccess: true,
      })
    } else {
      console.log(`  -> Creating download "${slug}" in English...`)
      const created = await payload.create({
        collection: 'downloads',
        locale: 'en',
        data: {
          title: dl.titleEn,
          slug,
          category: normalizeCategorySlug((dl as any).category || 'leadership'),
          format: dl.format,
          fileSize: dl.fileSize,
          description: dl.descEn,
          features: featuresEn,
          file: spotlightMediaId as any,
          status: 'published',
        },
        overrideAccess: true,
      })
      docId = created.id
    }

    // Update Arabic locale
    console.log(`  -> Updating download "${slug}" in Arabic...`)
    await payload.update({
      collection: 'downloads',
      id: docId,
      locale: 'ar',
      data: {
        title: dl.titleAr,
        description: dl.descAr,
        features: featuresAr,
      },
      overrideAccess: true,
    })
    downloadMap.set(slug, docId)
  }

  // 4. Events Migration
  console.log(`\n[Events] Migrating ${sourceEvents.length} events...`)
  const eventMap = new Map<string, number | string>()
  for (const ev of sourceEvents) {
    const slug = ev.slug || ev.id
    const dateISO = parseDateToISO(ev.dateEn) || new Date().toISOString()
    const spotsLeft = parseSpotsLeft(ev.spotsLeftEn)

    const existing = await payload.find({
      collection: 'events',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      overrideAccess: true,
    })

    let docId: number | string
    if (existing.docs.length > 0) {
      docId = existing.docs[0].id
      console.log(`  -> Event "${slug}" exists (ID: ${docId}). Updating English...`)
      await payload.update({
        collection: 'events',
        id: docId,
        locale: 'en',
        data: {
          title: ev.titleEn,
          date: dateISO,
          time: ev.time,
          location: ev.locationEn,
          type: ev.typeEn,
          description: ev.descEn,
          spotsLeft,
          rsvpLink: ev.link || '',
          status: 'published',
        },
        overrideAccess: true,
      })
    } else {
      console.log(`  -> Creating event "${slug}" in English...`)
      const created = await payload.create({
        collection: 'events',
        locale: 'en',
        data: {
          title: ev.titleEn,
          slug,
          date: dateISO,
          time: ev.time,
          location: ev.locationEn,
          type: ev.typeEn,
          description: ev.descEn,
          spotsLeft,
          rsvpLink: ev.link || '',
          status: 'published',
        },
        overrideAccess: true,
      })
      docId = created.id
    }

    // Update Arabic locale
    console.log(`  -> Updating event "${slug}" in Arabic...`)
    await payload.update({
      collection: 'events',
      id: docId,
      locale: 'ar',
      data: {
        title: ev.titleAr,
        location: ev.locationAr,
        type: ev.typeAr,
        description: ev.descAr,
      },
      overrideAccess: true,
    })
    eventMap.set(slug, docId)
  }

  // 5. Podcasts Migration
  console.log(`\n[Podcasts] Migrating ${sourcePodcasts.length} podcasts...`)
  const podcastMap = new Map<string, number | string>()
  for (const pod of sourcePodcasts) {
    const slug = pod.slug || pod.id
    const dateISO = parseDateToISO(pod.dateEn)

    const existing = await payload.find({
      collection: 'podcasts',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      overrideAccess: true,
    })

    let docId: number | string
    if (existing.docs.length > 0) {
      docId = existing.docs[0].id
      console.log(`  -> Podcast "${slug}" exists (ID: ${docId}). Updating English...`)
      await payload.update({
        collection: 'podcasts',
        id: docId,
        locale: 'en',
        data: {
          title: pod.titleEn,
          guest: pod.guestEn,
          duration: pod.duration,
          date: dateISO,
          description: pod.descEn,
          tag: pod.tagEn,
          audioUrl: pod.audioUrl || '',
          status: 'published',
        },
        overrideAccess: true,
      })
    } else {
      console.log(`  -> Creating podcast "${slug}" in English...`)
      const created = await payload.create({
        collection: 'podcasts',
        locale: 'en',
        data: {
          title: pod.titleEn,
          slug,
          guest: pod.guestEn,
          duration: pod.duration,
          date: dateISO,
          description: pod.descEn,
          tag: pod.tagEn,
          audioUrl: pod.audioUrl || '',
          status: 'published',
        },
        overrideAccess: true,
      })
      docId = created.id
    }

    // Update Arabic locale
    console.log(`  -> Updating podcast "${slug}" in Arabic...`)
    await payload.update({
      collection: 'podcasts',
      id: docId,
      locale: 'ar',
      data: {
        title: pod.titleAr,
        guest: pod.guestAr,
        description: pod.descAr,
        tag: pod.tagAr,
      },
      overrideAccess: true,
    })
    podcastMap.set(slug, docId)
  }

  // 6. ResourcesHero Global Migration
  if (sourceHero) {
    console.log(`\n[ResourcesHero] Updating global...`)
    await payload.updateGlobal({
      slug: 'resources-hero',
      locale: 'en',
      data: {
        title: sourceHero.titleEn,
        description: sourceHero.subtitleEn,
      },
      overrideAccess: true,
    })
    await payload.updateGlobal({
      slug: 'resources-hero',
      locale: 'ar',
      data: {
        title: sourceHero.titleAr,
        description: sourceHero.subtitleAr,
      },
      overrideAccess: true,
    })
    console.log(`  -> ResourcesHero global updated (en & ar).`)
  }

  // 7. ResourcesFeatured Global Migration
  console.log(`\n[ResourcesFeatured] Updating global relationships...`)
  const featuredArticleId = articleMap.get('human-skills-in-the-age-of-ai') || Array.from(articleMap.values())[0]
  const featuredEventId = eventMap.get('event-riyadh-roundtable') || Array.from(eventMap.values())[0]
  const featuredDownloadId = downloadMap.get('toolkit-tna') || Array.from(downloadMap.values())[0]
  const featuredPodcastId = podcastMap.get('ep-01') || Array.from(podcastMap.values())[0]

  await payload.updateGlobal({
    slug: 'resources-featured',
    data: {
      spotlightArticle: featuredArticleId as any,
      featuredEvent: featuredEventId as any,
      featuredDownload: featuredDownloadId as any,
      featuredPodcast: featuredPodcastId as any,
    },
    overrideAccess: true,
  })
  console.log(`  -> ResourcesFeatured global updated:`)
  console.log(`     * spotlightArticle: ${featuredArticleId}`)
  console.log(`     * featuredEvent: ${featuredEventId}`)
  console.log(`     * featuredDownload: ${featuredDownloadId}`)
  console.log(`     * featuredPodcast: ${featuredPodcastId}`)

  // 8. Final Count Verification
  console.log(`\n==================================================`)
  console.log(`VERIFICATION AFTER MIGRATION`)
  console.log(`==================================================`)

  const liveArticles = await payload.find({ collection: 'articles', limit: 100, overrideAccess: true })
  const liveDownloads = await payload.find({ collection: 'downloads', limit: 100, overrideAccess: true })
  const liveEvents = await payload.find({ collection: 'events', limit: 100, overrideAccess: true })
  const livePodcasts = await payload.find({ collection: 'podcasts', limit: 100, overrideAccess: true })
  const liveMedia = await payload.find({ collection: 'media', limit: 100, overrideAccess: true })
  const liveHero = await payload.findGlobal({ slug: 'resources-hero', overrideAccess: true })
  const liveFeatured = await payload.findGlobal({ slug: 'resources-featured', overrideAccess: true })

  console.log(`Articles: ${liveArticles.totalDocs} (Source: ${sourceArticles.length})`)
  console.log(`Downloads: ${liveDownloads.totalDocs} (Source: ${sourceDownloads.length})`)
  console.log(`Events: ${liveEvents.totalDocs} (Source: ${sourceEvents.length})`)
  console.log(`Podcasts: ${livePodcasts.totalDocs} (Source: ${sourcePodcasts.length})`)
  console.log(`Media: ${liveMedia.totalDocs}`)
  console.log(`ResourcesHero: ${liveHero?.title ? 'present' : 'missing'}`)
  console.log(`ResourcesFeatured: ${liveFeatured?.spotlightArticle ? 'present' : 'missing'}`)

  if (
    liveArticles.totalDocs !== sourceArticles.length ||
    liveDownloads.totalDocs !== sourceDownloads.length ||
    liveEvents.totalDocs !== sourceEvents.length ||
    livePodcasts.totalDocs !== sourcePodcasts.length
  ) {
    console.error(`[Error] Counts do not match source data! Aborting.`)
    process.exit(1)
  }

  console.log(`\nAll counts match source data perfectly! Migration successful.`)
  console.log(`==================================================\n`)
  process.exit(0)
}

run().catch((err) => {
  console.error('[Migration Error]', err)
  process.exit(1)
})
