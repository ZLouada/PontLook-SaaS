/**
 * SEOScorer
 * Deterministic scoring algorithm with 5 weighted categories (Technical, Content, Keyword, Image, Social).
 * Produces structured checks, category scores, and metrics.
 */

import type {
  SEOAnalysisResult,
  SEOCategoryScore,
  SEOCheck,
  SEOCheckCategory,
  SEOData,
  SEOMetrics,
} from './types'
import { analyzeLexicalContent } from './ContentAnalyzer'
import {
  calculateKeywordDensity,
  checkKeywordInText,
  findKeywordOccurrences,
  normalizeText,
  parseSecondaryKeywords,
} from './KeywordAnalyzer'

export function calculateSEOScore(data: SEOData, locale: string = 'en'): SEOAnalysisResult {
  const isArabic = locale === 'ar'
  const checks: SEOCheck[] = []

  // Resolve effective values
  const effectiveTitle = (data.metaTitle || data.title || '').trim()
  const effectiveDescription = (data.metaDescription || data.excerpt || '').trim()
  const rawSlug = (data.slug || '').trim()
  const focusKeyword = (data.focusKeyword || '').trim()
  const secondaryKeywords = parseSecondaryKeywords(data.secondaryKeywords)

  // 1. Analyze Content
  const contentAnalysis = analyzeLexicalContent(data.content, isArabic)

  // 2. Keyword presence checks
  const focusKeywordWordCount = focusKeyword ? focusKeyword.split(/\s+/).length : 0
  const focusKeywordOccurrences = focusKeyword
    ? findKeywordOccurrences(contentAnalysis.plainText, focusKeyword, isArabic)
    : 0
  const focusKeywordDensity = focusKeyword
    ? calculateKeywordDensity(
        focusKeywordOccurrences,
        focusKeywordWordCount,
        contentAnalysis.wordCount,
      )
    : 0

  const focusKeywordInTitle = focusKeyword
    ? checkKeywordInText(effectiveTitle, focusKeyword, isArabic)
    : false
  const focusKeywordInMetaDesc = focusKeyword
    ? checkKeywordInText(effectiveDescription, focusKeyword, isArabic)
    : false
  const focusKeywordInSlug = focusKeyword
    ? checkKeywordInText(rawSlug.replace(/-/g, ' '), focusKeyword, isArabic)
    : false
  const focusKeywordInFirstParagraph = focusKeyword
    ? checkKeywordInText(contentAnalysis.firstParagraph, focusKeyword, isArabic)
    : false
  const focusKeywordInHeadings = focusKeyword
    ? contentAnalysis.headings.some((h) => checkKeywordInText(h.text, focusKeyword, isArabic))
    : false

  // Secondary keywords matched in content
  const secondaryKeywordsFound = secondaryKeywords.filter((sk) =>
    checkKeywordInText(contentAnalysis.plainText, sk, isArabic),
  )

  // 3. Featured Image details
  const featuredImageExists = Boolean(data.featuredImage)
  let featuredImageAlt = ''
  if (data.featuredImage && typeof data.featuredImage === 'object') {
    featuredImageAlt = (data.featuredImage.alt || '').trim()
  }
  const featuredImageAltExists = Boolean(featuredImageAlt.length > 0)

  // 4. Slug validity
  const isSlugValid =
    rawSlug.length > 0 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rawSlug) &&
    rawSlug.length <= 80

  // ----------------------------------------------------
  // Category 1: Technical SEO (Max 25 pts)
  // ----------------------------------------------------
  let techPoints = 0

  // Title existence (6 pts)
  if (!effectiveTitle) {
    checks.push({
      id: 'tech_title_exists',
      name: 'SEO Title',
      category: 'technical',
      status: 'error',
      message: isArabic ? 'عنوان SEO غير موجود' : 'SEO Title is missing',
      detail: isArabic
        ? 'أضف عنواناً رئيسياً للمقال لتحسين فهرسة محركات البحث.'
        : 'Provide an article title or custom SEO title.',
      pointsAwarded: 0,
      maxPoints: 6,
    })
  } else {
    techPoints += 6
    checks.push({
      id: 'tech_title_exists',
      name: 'SEO Title Presence',
      category: 'technical',
      status: 'pass',
      message: isArabic ? 'عنوان المقال متوفر' : 'SEO Title is present',
      pointsAwarded: 6,
      maxPoints: 6,
    })
  }

  // Title length recommendation (6 pts)
  const titleLen = effectiveTitle.length
  if (titleLen === 0) {
    checks.push({
      id: 'tech_title_length',
      name: 'SEO Title Length',
      category: 'technical',
      status: 'error',
      message: isArabic ? 'العنوان فارغ' : 'Title is empty',
      pointsAwarded: 0,
      maxPoints: 6,
    })
  } else if (titleLen >= 40 && titleLen <= 60) {
    techPoints += 6
    checks.push({
      id: 'tech_title_length',
      name: 'SEO Title Length',
      category: 'technical',
      status: 'pass',
      message: isArabic
        ? `طول العنوان مثالي (${titleLen} حرف)`
        : `Optimal title length (${titleLen} characters)`,
      pointsAwarded: 6,
      maxPoints: 6,
    })
  } else if ((titleLen >= 25 && titleLen < 40) || (titleLen > 60 && titleLen <= 70)) {
    techPoints += 4
    checks.push({
      id: 'tech_title_length',
      name: 'SEO Title Length',
      category: 'technical',
      status: 'warning',
      message:
        titleLen < 40
          ? isArabic
            ? `العنوان قصير نوعاً ما (${titleLen} حرف / الموصى به 40-60)`
            : `Title is slightly short (${titleLen} chars / recommended 40-60)`
          : isArabic
            ? `العنوان طويل وقد يُقتطع في Google (${titleLen} حرف)`
            : `Title is slightly long and may be truncated (${titleLen} chars)`,
      pointsAwarded: 4,
      maxPoints: 6,
    })
  } else {
    techPoints += 1
    checks.push({
      id: 'tech_title_length',
      name: 'SEO Title Length',
      category: 'technical',
      status: 'error',
      message:
        titleLen < 25
          ? isArabic
            ? `العنوان قصير جداً (${titleLen} حرف)`
            : `Title is too short (${titleLen} chars)`
          : isArabic
            ? `العنوان طويل جداً (${titleLen} حرف / سيتجاوز شاشات البحث)`
            : `Title is too long (${titleLen} chars / exceeds search displays)`,
      pointsAwarded: 1,
      maxPoints: 6,
    })
  }

  // Meta description exists (5 pts)
  if (!effectiveDescription) {
    checks.push({
      id: 'tech_desc_exists',
      name: 'Meta Description',
      category: 'technical',
      status: 'error',
      message: isArabic ? 'الوصف التعريفي غير متوفر' : 'Meta description is missing',
      detail: isArabic
        ? 'أضف وصفاً لمحركات البحث لتشجيع القراء على النقر في نتائج البحث.'
        : 'Add a search engine description or article excerpt.',
      pointsAwarded: 0,
      maxPoints: 5,
    })
  } else {
    techPoints += 5
    checks.push({
      id: 'tech_desc_exists',
      name: 'Meta Description Presence',
      category: 'technical',
      status: 'pass',
      message: isArabic ? 'الوصف التعريفي متوفر' : 'Meta description is present',
      pointsAwarded: 5,
      maxPoints: 5,
    })
  }

  // Meta description length (4 pts)
  const descLen = effectiveDescription.length
  if (descLen === 0) {
    checks.push({
      id: 'tech_desc_length',
      name: 'Meta Description Length',
      category: 'technical',
      status: 'error',
      message: isArabic ? 'الوصف فارغ' : 'Description is empty',
      pointsAwarded: 0,
      maxPoints: 4,
    })
  } else if (descLen >= 120 && descLen <= 160) {
    techPoints += 4
    checks.push({
      id: 'tech_desc_length',
      name: 'Meta Description Length',
      category: 'technical',
      status: 'pass',
      message: isArabic
        ? `طول الوصف مثالي (${descLen} حرف)`
        : `Optimal description length (${descLen} characters)`,
      pointsAwarded: 4,
      maxPoints: 4,
    })
  } else if ((descLen >= 70 && descLen < 120) || (descLen > 160 && descLen <= 180)) {
    techPoints += 2
    checks.push({
      id: 'tech_desc_length',
      name: 'Meta Description Length',
      category: 'technical',
      status: 'warning',
      message:
        descLen < 120
          ? isArabic
            ? `الوصف قصير نوعاً ما (${descLen} حرف / الموصى به 120-160)`
            : `Description is slightly short (${descLen} chars / recommended 120-160)`
          : isArabic
            ? `الوصف طويل وقد يُقتطع في Google (${descLen} حرف)`
            : `Description is slightly long and may be truncated (${descLen} chars)`,
      pointsAwarded: 2,
      maxPoints: 4,
    })
  } else {
    techPoints += 1
    checks.push({
      id: 'tech_desc_length',
      name: 'Meta Description Length',
      category: 'technical',
      status: 'error',
      message:
        descLen < 70
          ? isArabic
            ? `الوصف قصير جداً (${descLen} حرف)`
            : `Description is too short (${descLen} chars)`
          : isArabic
            ? `الوصف طويل جداً (${descLen} حرف)`
            : `Description is too long (${descLen} chars)`,
      pointsAwarded: 1,
      maxPoints: 4,
    })
  }

  // Slug Format (4 pts)
  if (!rawSlug) {
    checks.push({
      id: 'tech_slug_format',
      name: 'URL Slug',
      category: 'technical',
      status: 'error',
      message: isArabic ? 'معرف الرابط (Slug) مفقود' : 'URL slug is missing',
      pointsAwarded: 0,
      maxPoints: 4,
    })
  } else if (isSlugValid) {
    techPoints += 4
    checks.push({
      id: 'tech_slug_format',
      name: 'URL Slug Format',
      category: 'technical',
      status: 'pass',
      message: isArabic ? `الرابط متوافق وصحيح (${rawSlug})` : `Clean URL slug (${rawSlug})`,
      pointsAwarded: 4,
      maxPoints: 4,
    })
  } else {
    techPoints += 2
    checks.push({
      id: 'tech_slug_format',
      name: 'URL Slug Format',
      category: 'technical',
      status: 'warning',
      message: isArabic
        ? 'يحتوي الرابط على أحرف غير قياسية أو فواصل غير موصى بها'
        : 'Slug contains uppercase characters, underscores, or invalid format',
      pointsAwarded: 2,
      maxPoints: 4,
    })
  }

  // ----------------------------------------------------
  // Category 2: Content SEO (Max 25 pts)
  // ----------------------------------------------------
  let contentPoints = 0

  // Word count (8 pts)
  const wordCount = contentAnalysis.wordCount
  if (wordCount >= 600) {
    contentPoints += 8
    checks.push({
      id: 'content_word_count',
      name: 'Content Length',
      category: 'content',
      status: 'pass',
      message: isArabic
        ? `محتوى شامل وغني (${wordCount} كلمة)`
        : `Substantial in-depth content (${wordCount} words)`,
      pointsAwarded: 8,
      maxPoints: 8,
    })
  } else if (wordCount >= 300) {
    contentPoints += 5
    checks.push({
      id: 'content_word_count',
      name: 'Content Length',
      category: 'content',
      status: 'warning',
      message: isArabic
        ? `محتوى المقال مقبول ولكن يمكن إثراؤه (${wordCount} كلمة / يفضل 600+)`
        : `Good baseline length (${wordCount} words / 600+ recommended for rankings)`,
      pointsAwarded: 5,
      maxPoints: 8,
    })
  } else if (wordCount > 50) {
    contentPoints += 2
    checks.push({
      id: 'content_word_count',
      name: 'Content Length',
      category: 'content',
      status: 'error',
      message: isArabic
        ? `المحتوى قصير جداً (${wordCount} كلمة / الحد الأدنى 300)`
        : `Content is thin (${wordCount} words / minimum 300 recommended)`,
      pointsAwarded: 2,
      maxPoints: 8,
    })
  } else {
    checks.push({
      id: 'content_word_count',
      name: 'Content Length',
      category: 'content',
      status: 'error',
      message: isArabic ? 'محتوى المقال فارغ' : 'Article body content is empty',
      pointsAwarded: 0,
      maxPoints: 8,
    })
  }

  // Headings hierarchy (6 pts)
  if (contentAnalysis.h2Count >= 1 && !contentAnalysis.hasH1InBody) {
    contentPoints += 6
    checks.push({
      id: 'content_headings',
      name: 'Heading Structure',
      category: 'content',
      status: 'pass',
      message: isArabic
        ? `هيكلية عناوين سليمة (تتضمن ${contentAnalysis.h2Count} أقسام H2)`
        : `Well-structured headings (contains ${contentAnalysis.h2Count} H2 sections)`,
      pointsAwarded: 6,
      maxPoints: 6,
    })
  } else if (contentAnalysis.hasH1InBody) {
    contentPoints += 3
    checks.push({
      id: 'content_headings',
      name: 'Heading Structure',
      category: 'content',
      status: 'warning',
      message: isArabic
        ? 'تم استخدام وسم H1 داخل المحتوى (عنوان المقال هو H1 الأساسي بالفعل)'
        : 'Multiple H1 tags detected in body (article title already acts as H1)',
      pointsAwarded: 3,
      maxPoints: 6,
    })
  } else if (wordCount > 250 && contentAnalysis.h2Count === 0) {
    contentPoints += 2
    checks.push({
      id: 'content_headings',
      name: 'Heading Structure',
      category: 'content',
      status: 'warning',
      message: isArabic
        ? 'يُنصح بإضافة عناوين فرعية H2 لتقسيم المقال وتحسين تجربة القراءة'
        : 'Add subheadings (H2) to structure longer content and aid readability',
      pointsAwarded: 2,
      maxPoints: 6,
    })
  } else {
    contentPoints += 4
    checks.push({
      id: 'content_headings',
      name: 'Heading Structure',
      category: 'content',
      status: 'pass',
      message: isArabic ? 'هيكل العناوين مناسب لحجم النص' : 'Heading structure is appropriate',
      pointsAwarded: 4,
      maxPoints: 6,
    })
  }

  // Paragraph length (5 pts)
  if (contentAnalysis.paragraphs.length > 0 && !contentAnalysis.hasLongParagraphs) {
    contentPoints += 5
    checks.push({
      id: 'content_paragraphs',
      name: 'Paragraph Readability',
      category: 'content',
      status: 'pass',
      message: isArabic
        ? 'طول الفقرات مريح ومناسب للقراءة على الشاشات'
        : 'Well-spaced paragraphs (no monolithic walls of text)',
      pointsAwarded: 5,
      maxPoints: 5,
    })
  } else if (contentAnalysis.hasLongParagraphs) {
    contentPoints += 3
    checks.push({
      id: 'content_paragraphs',
      name: 'Paragraph Readability',
      category: 'content',
      status: 'warning',
      message: isArabic
        ? 'توجد فقرات تزيد عن 150 كلمة — فككها لتسهيل قراءتها'
        : 'Some paragraphs exceed 150 words — consider breaking them up',
      pointsAwarded: 3,
      maxPoints: 5,
    })
  } else {
    contentPoints += 3
    checks.push({
      id: 'content_paragraphs',
      name: 'Paragraph Readability',
      category: 'content',
      status: 'pass',
      message: isArabic ? 'تنسيق الفقرات مقبول' : 'Paragraph layout acceptable',
      pointsAwarded: 3,
      maxPoints: 5,
    })
  }

  // Links (6 pts)
  if (contentAnalysis.internalLinksCount >= 1 && contentAnalysis.externalLinksCount >= 1) {
    contentPoints += 6
    checks.push({
      id: 'content_links',
      name: 'Links & References',
      category: 'content',
      status: 'pass',
      message: isArabic
        ? `روابط داخلية (${contentAnalysis.internalLinksCount}) وخارجية (${contentAnalysis.externalLinksCount}) متوفرة`
        : `Balanced internal (${contentAnalysis.internalLinksCount}) and external (${contentAnalysis.externalLinksCount}) links`,
      pointsAwarded: 6,
      maxPoints: 6,
    })
  } else if (contentAnalysis.internalLinksCount >= 1) {
    contentPoints += 4
    checks.push({
      id: 'content_links',
      name: 'Links & References',
      category: 'content',
      status: 'pass',
      message: isArabic
        ? `يحتوي على روابط داخلية (${contentAnalysis.internalLinksCount})`
        : `Contains internal links (${contentAnalysis.internalLinksCount})`,
      pointsAwarded: 4,
      maxPoints: 6,
    })
  } else {
    contentPoints += 2
    checks.push({
      id: 'content_links',
      name: 'Links & References',
      category: 'content',
      status: 'warning',
      message: isArabic
        ? 'أضف رابطاً داخلياً واحداً على الأقل نحو موارد أو برامج تدريبية ذات صلة'
        : 'Add at least one internal link pointing to related platform resources',
      pointsAwarded: 2,
      maxPoints: 6,
    })
  }

  // ----------------------------------------------------
  // Category 3: Keyword SEO (Max 20 pts)
  // ----------------------------------------------------
  let keywordPoints = 0

  if (!focusKeyword) {
    // If no keyword is set, provide guidance without punishing harshly
    keywordPoints += 10
    checks.push({
      id: 'kw_focus_set',
      name: 'Focus Keyword',
      category: 'keyword',
      status: 'optional',
      message: isArabic
        ? 'الكلمة المفتاحية اختيارية (حدد كلمة مفتاحية للحصول على تدقيق دقيق)'
        : 'Focus keyword is optional (set a target phrase for in-depth analysis)',
      pointsAwarded: 10,
      maxPoints: 20,
    })
  } else {
    // Focus keyword defined (3 pts)
    keywordPoints += 3
    checks.push({
      id: 'kw_focus_set',
      name: 'Focus Keyword Defined',
      category: 'keyword',
      status: 'pass',
      message: isArabic
        ? `الكلمة المستهدفة: "${focusKeyword}"`
        : `Target focus keyword: "${focusKeyword}"`,
      pointsAwarded: 3,
      maxPoints: 3,
    })

    // In Title (4 pts)
    if (focusKeywordInTitle) {
      keywordPoints += 4
      checks.push({
        id: 'kw_in_title',
        name: 'Keyword in Title',
        category: 'keyword',
        status: 'pass',
        message: isArabic ? 'الكلمة المفتاحية موجودة في العنوان' : 'Focus keyword found in title',
        pointsAwarded: 4,
        maxPoints: 4,
      })
    } else {
      checks.push({
        id: 'kw_in_title',
        name: 'Keyword in Title',
        category: 'keyword',
        status: 'warning',
        message: isArabic
          ? 'الكلمة المفتاحية غير موجودة في عنوان المقال'
          : 'Focus keyword does not appear in the title',
        pointsAwarded: 0,
        maxPoints: 4,
      })
    }

    // In Meta Description (4 pts)
    if (focusKeywordInMetaDesc) {
      keywordPoints += 4
      checks.push({
        id: 'kw_in_desc',
        name: 'Keyword in Meta Description',
        category: 'keyword',
        status: 'pass',
        message: isArabic
          ? 'الكلمة المفتاحية موجودة في الوصف التعريفي'
          : 'Focus keyword found in meta description',
        pointsAwarded: 4,
        maxPoints: 4,
      })
    } else {
      checks.push({
        id: 'kw_in_desc',
        name: 'Keyword in Meta Description',
        category: 'keyword',
        status: 'warning',
        message: isArabic
          ? 'الكلمة المفتاحية غير موجودة في الوصف التعريفي'
          : 'Focus keyword missing from meta description',
        pointsAwarded: 0,
        maxPoints: 4,
      })
    }

    // In Slug (3 pts)
    if (focusKeywordInSlug) {
      keywordPoints += 3
      checks.push({
        id: 'kw_in_slug',
        name: 'Keyword in URL Slug',
        category: 'keyword',
        status: 'pass',
        message: isArabic ? 'الكلمة المفتاحية موجودة في رابط المقال' : 'Focus keyword found in slug',
        pointsAwarded: 3,
        maxPoints: 3,
      })
    } else {
      checks.push({
        id: 'kw_in_slug',
        name: 'Keyword in URL Slug',
        category: 'keyword',
        status: 'optional',
        message: isArabic
          ? 'الكلمة المفتاحية غير مضمنة في الرابط'
          : 'Focus keyword is not present in URL slug',
        pointsAwarded: 1,
        maxPoints: 3,
      })
      keywordPoints += 1
    }

    // In First Paragraph (3 pts)
    if (focusKeywordInFirstParagraph) {
      keywordPoints += 3
      checks.push({
        id: 'kw_in_first_p',
        name: 'Keyword in First Paragraph',
        category: 'keyword',
        status: 'pass',
        message: isArabic
          ? 'الكلمة المفتاحية موجودة في مقدمة المقال'
          : 'Focus keyword appears in the first paragraph',
        pointsAwarded: 3,
        maxPoints: 3,
      })
    } else {
      checks.push({
        id: 'kw_in_first_p',
        name: 'Keyword in First Paragraph',
        category: 'keyword',
        status: 'warning',
        message: isArabic
          ? 'أضف الكلمة المفتاحية في أول 100 كلمة من المقال'
          : 'Consider introducing the keyword in the first paragraph',
        pointsAwarded: 0,
        maxPoints: 3,
      })
    }

    // In Headings (3 pts)
    if (focusKeywordInHeadings) {
      keywordPoints += 3
      checks.push({
        id: 'kw_in_headings',
        name: 'Keyword in Headings',
        category: 'keyword',
        status: 'pass',
        message: isArabic
          ? 'الكلمة المفتاحية مستخدمة في العناوين الفرعية'
          : 'Focus keyword used in subheadings',
        pointsAwarded: 3,
        maxPoints: 3,
      })
    } else {
      checks.push({
        id: 'kw_in_headings',
        name: 'Keyword in Headings',
        category: 'keyword',
        status: 'optional',
        message: isArabic
          ? 'يُستحسن تضمين الكلمة في أحد العناوين الفرعية H2'
          : 'Include the keyword in at least one H2 subheading',
        pointsAwarded: 1,
        maxPoints: 3,
      })
      keywordPoints += 1
    }
  }

  // ----------------------------------------------------
  // Category 4: Image SEO (Max 15 pts)
  // ----------------------------------------------------
  let imagePoints = 0

  // Featured image exists (6 pts)
  if (featuredImageExists) {
    imagePoints += 6
    checks.push({
      id: 'img_featured_exists',
      name: 'Featured Image',
      category: 'image',
      status: 'pass',
      message: isArabic ? 'الصورة المميزة محددة' : 'Featured image is set',
      pointsAwarded: 6,
      maxPoints: 6,
    })
  } else {
    checks.push({
      id: 'img_featured_exists',
      name: 'Featured Image',
      category: 'image',
      status: 'error',
      message: isArabic ? 'لم يتم تحديد صورة مميزة للمقال' : 'Featured image is missing',
      detail: isArabic
        ? 'اختر صورة من مكتبة الوسائط لتعزيز الجاذبية البصرية ومشاركات التواصل.'
        : 'Select an image from the Media collection for social cards & search snippets.',
      pointsAwarded: 0,
      maxPoints: 6,
    })
  }

  // Featured image alt text exists (5 pts)
  if (featuredImageExists && featuredImageAltExists) {
    imagePoints += 5
    checks.push({
      id: 'img_alt_exists',
      name: 'Image Alt Text',
      category: 'image',
      status: 'pass',
      message: isArabic
        ? `النص البديل متوفر: "${featuredImageAlt.slice(0, 30)}..."`
        : `Alt text is present: "${featuredImageAlt.slice(0, 35)}..."`,
      pointsAwarded: 5,
      maxPoints: 5,
    })
  } else if (featuredImageExists) {
    checks.push({
      id: 'img_alt_exists',
      name: 'Image Alt Text',
      category: 'image',
      status: 'error',
      message: isArabic
        ? 'الصورة المميزة تفتقر للنص البديل (Alt text)'
        : 'Featured image is missing descriptive alt text',
      detail: isArabic
        ? 'أضف نصاً بديلاً وصفياً في وسائط الصورة لتحسين سهولة الوصول ونتائج صور Google.'
        : 'Add descriptive alt text to the Media record for accessibility and image search.',
      pointsAwarded: 0,
      maxPoints: 5,
    })
  } else {
    checks.push({
      id: 'img_alt_exists',
      name: 'Image Alt Text',
      category: 'image',
      status: 'error',
      message: isArabic ? 'لا توجد صورة للتحقق من النص البديل' : 'No image to analyze alt text',
      pointsAwarded: 0,
      maxPoints: 5,
    })
  }

  // Alt text quality (4 pts)
  if (featuredImageAltExists) {
    const isGeneric = /^(image|photo|picture|صورة|صوره)$/i.test(featuredImageAlt.trim())
    if (!isGeneric && featuredImageAlt.length >= 8) {
      imagePoints += 4
      checks.push({
        id: 'img_alt_quality',
        name: 'Alt Text Quality',
        category: 'image',
        status: 'pass',
        message: isArabic ? 'النص البديل وصفي وذو جودة' : 'Alt text is descriptive and meaningful',
        pointsAwarded: 4,
        maxPoints: 4,
      })
    } else {
      imagePoints += 2
      checks.push({
        id: 'img_alt_quality',
        name: 'Alt Text Quality',
        category: 'image',
        status: 'warning',
        message: isArabic
          ? 'النص البديل قصير أو عام جداً، يُفضل كتابة وصف دقيق'
          : 'Alt text appears brief or generic — describe the image accurately',
        pointsAwarded: 2,
        maxPoints: 4,
      })
    }
  } else {
    checks.push({
      id: 'img_alt_quality',
      name: 'Alt Text Quality',
      category: 'image',
      status: 'error',
      message: isArabic ? 'النص البديل غير متوفر' : 'Missing alt text',
      pointsAwarded: 0,
      maxPoints: 4,
    })
  }

  // ----------------------------------------------------
  // Category 5: Social SEO (Max 15 pts)
  // ----------------------------------------------------
  let socialPoints = 0

  const ogTitle = (data.ogTitle || data.metaTitle || data.title || '').trim()
  const ogDescription = (data.ogDescription || data.metaDescription || data.excerpt || '').trim()
  const ogImageExists = Boolean(data.ogImage || data.featuredImage)

  // OG Title (5 pts)
  if (ogTitle.length > 0) {
    socialPoints += 5
    checks.push({
      id: 'social_og_title',
      name: 'Social / OG Title',
      category: 'social',
      status: 'pass',
      message: isArabic
        ? 'عنوان بطاقات التواصل الاجتماعي جاهز'
        : 'Open Graph title is configured',
      pointsAwarded: 5,
      maxPoints: 5,
    })
  } else {
    checks.push({
      id: 'social_og_title',
      name: 'Social / OG Title',
      category: 'social',
      status: 'error',
      message: isArabic
        ? 'عنوان بطاقات التواصل مفقود'
        : 'Missing title for social media cards',
      pointsAwarded: 0,
      maxPoints: 5,
    })
  }

  // OG Description (5 pts)
  if (ogDescription.length > 0) {
    socialPoints += 5
    checks.push({
      id: 'social_og_desc',
      name: 'Social / OG Description',
      category: 'social',
      status: 'pass',
      message: isArabic
        ? 'وصف بطاقات التواصل الاجتماعي جاهز'
        : 'Open Graph description is configured',
      pointsAwarded: 5,
      maxPoints: 5,
    })
  } else {
    checks.push({
      id: 'social_og_desc',
      name: 'Social / OG Description',
      category: 'social',
      status: 'warning',
      message: isArabic
        ? 'أضف وصفاً لبطاقات التواصل الاجتماعي'
        : 'Social share cards lack a descriptive snippet',
      pointsAwarded: 0,
      maxPoints: 5,
    })
  }

  // OG Image (5 pts)
  if (ogImageExists) {
    socialPoints += 5
    checks.push({
      id: 'social_og_image',
      name: 'Social Share Image',
      category: 'social',
      status: 'pass',
      message: isArabic
        ? 'صورة بطاقات التواصل الاجتماعي محددة'
        : 'Social preview share image ready',
      pointsAwarded: 5,
      maxPoints: 5,
    })
  } else {
    checks.push({
      id: 'social_og_image',
      name: 'Social Share Image',
      category: 'social',
      status: 'warning',
      message: isArabic
        ? 'لا توجد صورة مخصصة لبطاقات التواصل الاجتماعي (ستظهر البطاقة بنص فقط)'
        : 'Missing social share image — cards will appear text-only on LinkedIn / X',
      pointsAwarded: 0,
      maxPoints: 5,
    })
  }

  // ----------------------------------------------------
  // Compute Category Totals & Overall Score
  // ----------------------------------------------------
  const computeCategoryScore = (
    cat: SEOCheckCategory,
    label: string,
    score: number,
    maxScore: number,
  ): SEOCategoryScore => {
    const catChecks = checks.filter((c) => c.category === cat)
    return {
      category: cat,
      label,
      score: Math.min(maxScore, Math.max(0, score)),
      maxScore,
      passedCount: catChecks.filter((c) => c.status === 'pass').length,
      warningCount: catChecks.filter((c) => c.status === 'warning').length,
      errorCount: catChecks.filter((c) => c.status === 'error').length,
    }
  }

  const categories: Record<SEOCheckCategory, SEOCategoryScore> = {
    technical: computeCategoryScore(
      'technical',
      isArabic ? 'السيو التقني' : 'Technical SEO',
      techPoints,
      25,
    ),
    content: computeCategoryScore(
      'content',
      isArabic ? 'سيو المحتوى' : 'Content SEO',
      contentPoints,
      25,
    ),
    keyword: computeCategoryScore(
      'keyword',
      isArabic ? 'الكلمات المفتاحية' : 'Keyword SEO',
      keywordPoints,
      20,
    ),
    image: computeCategoryScore(
      'image',
      isArabic ? 'سيو الصور' : 'Image SEO',
      imagePoints,
      15,
    ),
    social: computeCategoryScore(
      'social',
      isArabic ? 'التواصل الاجتماعي' : 'Social SEO',
      socialPoints,
      15,
    ),
  }

  const totalScore = Math.min(
    100,
    Math.max(
      0,
      categories.technical.score +
        categories.content.score +
        categories.keyword.score +
        categories.image.score +
        categories.social.score,
    ),
  )

  let status: 'excellent' | 'good' | 'needs-improvement' | 'poor' = 'poor'
  let statusLabel = isArabic ? 'يحتاج تحسين' : 'Poor'

  if (totalScore >= 90) {
    status = 'excellent'
    statusLabel = isArabic ? 'ممتاز' : 'Excellent'
  } else if (totalScore >= 75) {
    status = 'good'
    statusLabel = isArabic ? 'جيد جداً' : 'Good'
  } else if (totalScore >= 50) {
    status = 'needs-improvement'
    statusLabel = isArabic ? 'يحتاج تحسين' : 'Needs Improvement'
  }

  const metrics: SEOMetrics = {
    titleLength: (data.title || '').length,
    metaTitleLength: (data.metaTitle || '').length,
    effectiveTitleLength: effectiveTitle.length,
    metaDescriptionLength: (data.metaDescription || '').length,
    effectiveDescriptionLength: effectiveDescription.length,
    slugLength: rawSlug.length,
    isSlugValid,
    wordCount: contentAnalysis.wordCount,
    readingTimeMinutes: contentAnalysis.readingTimeMinutes,
    paragraphCount: contentAnalysis.paragraphs.length,
    headingCount: contentAnalysis.headings.length,
    h2Count: contentAnalysis.h2Count,
    hasH1InBody: contentAnalysis.hasH1InBody,
    internalLinkCount: contentAnalysis.internalLinksCount,
    externalLinkCount: contentAnalysis.externalLinksCount,
    inlineImageCount: contentAnalysis.inlineImages.length,
    inlineImagesMissingAlt: contentAnalysis.inlineImagesMissingAltCount,
    featuredImageExists,
    featuredImageAltExists,
    featuredImageAlt,
    focusKeyword,
    focusKeywordDensity,
    focusKeywordOccurrences,
    focusKeywordInTitle,
    focusKeywordInMetaDesc,
    focusKeywordInSlug,
    focusKeywordInFirstParagraph,
    focusKeywordInHeadings,
    secondaryKeywordsList: secondaryKeywords,
    secondaryKeywordsFound,
    isArabic,
  }

  return {
    score: totalScore,
    status,
    statusLabel,
    categories,
    checks,
    metrics,
  }
}
