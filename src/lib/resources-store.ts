import fs from 'fs';
import path from 'path';

export interface ResourcesContent {
  hero: {
    titleEn: string;
    titleAr: string;
    subtitleEn: string;
    subtitleAr: string;
  };
  spotlight: {
    badgeEn: string;
    badgeAr: string;
    categoryEn: string;
    categoryAr: string;
    readTimeEn: string;
    readTimeAr: string;
    dateEn: string;
    dateAr: string;
    titleEn: string;
    titleAr: string;
    excerptEn: string;
    excerptAr: string;
    ctaEn: string;
    ctaAr: string;
    image: string;
    link: string;
  };
  editorPickEvent: {
    badgeEn: string;
    badgeAr: string;
    dateEn: string;
    dateAr: string;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    ctaEn: string;
    ctaAr: string;
    link: string;
  };
  editorPickToolkit: {
    badgeEn: string;
    badgeAr: string;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    ctaEn: string;
    ctaAr: string;
    link: string;
  };
  articles: Array<{
    id: string;
    slug: string;
    titleEn: string;
    titleAr: string;
    categoryEn: string;
    categoryAr: string;
    readTimeEn: string;
    readTimeAr: string;
    dateEn: string;
    dateAr: string;
    excerptEn: string;
    excerptAr: string;
    image?: string;
    contentEn?: string;
    contentAr?: string;
  }>;
  downloads: Array<{
    id: string;
    titleEn: string;
    titleAr: string;
    format: string;
    fileSize: string;
    descEn: string;
    descAr: string;
    image?: string;
    fileUrl?: string;
    featuresEn: string[];
    featuresAr: string[];
  }>;
  events: Array<{
    id: string;
    titleEn: string;
    titleAr: string;
    dateEn: string;
    dateAr: string;
    time: string;
    locationEn: string;
    locationAr: string;
    typeEn: string;
    typeAr: string;
    descEn: string;
    descAr: string;
    spotsLeftEn: string;
    spotsLeftAr: string;
    image?: string;
    link?: string;
  }>;
  podcasts: Array<{
    id: string;
    titleEn: string;
    titleAr: string;
    guestEn: string;
    guestAr: string;
    duration: string;
    dateEn: string;
    dateAr: string;
    descEn: string;
    descAr: string;
    tagEn: string;
    tagAr: string;
    image?: string;
    audioUrl?: string;
  }>;
}

const DATA_FILE = path.join(process.cwd(), 'src/data/resources.json');
const BACKUP_DATA_FILE = path.join('/tmp', 'pontlook-resources.json');

let memoryCache: ResourcesContent | null = null;
let lastLoadedMtime = 0;

export function invalidateResourcesCache(): void {
  memoryCache = null;
  lastLoadedMtime = 0;
}

export function getResourcesStore(): ResourcesContent {
  // Check if DATA_FILE exists on disk and if it was modified since last load
  try {
    if (fs.existsSync(DATA_FILE)) {
      const stats = fs.statSync(DATA_FILE);
      if (!memoryCache || stats.mtimeMs > lastLoadedMtime) {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        memoryCache = JSON.parse(content);
        lastLoadedMtime = stats.mtimeMs;
      }
      if (memoryCache) {
        return memoryCache;
      }
    }
  } catch (err) {
    console.error('Failed to read primary resources.json:', err);
  }

  // Check backup file if primary not found
  try {
    if (fs.existsSync(BACKUP_DATA_FILE)) {
      const stats = fs.statSync(BACKUP_DATA_FILE);
      if (!memoryCache || stats.mtimeMs > lastLoadedMtime) {
        const content = fs.readFileSync(BACKUP_DATA_FILE, 'utf-8');
        memoryCache = JSON.parse(content);
        lastLoadedMtime = stats.mtimeMs;
      }
      if (memoryCache) {
        return memoryCache;
      }
    }
  } catch (err) {
    console.error('Failed to read backup resources.json:', err);
  }

  if (memoryCache) {
    return memoryCache;
  }

  // Fallback defaults
  return {
    hero: {
      titleEn: 'The PontLook L&D resource hub',
      titleAr: 'مركز موارد التدريب والتطوير في PontLook',
      subtitleEn:
        'Insights, strategies, and resources to help organisations build stronger workforces through better training decisions.',
      subtitleAr:
        'رؤى واستراتيجيات وموارد لمساعدة المنشآت على بناء كوادر أقوى من خلال قرارات تدريبية أفضل.',
    },
    spotlight: {
      badgeEn: 'FEATURED GUIDE · 2026',
      badgeAr: 'تقرير مميز · ٢٠٢٦',
      categoryEn: 'L&D STRATEGIES',
      categoryAr: 'استراتيجيات التدريب',
      readTimeEn: '12 min read',
      readTimeAr: '١٢ دقيقة قراءة',
      dateEn: 'October 2026',
      dateAr: 'أكتوبر ٢٠٢٦',
      titleEn:
        'The 2026 GCC Corporate Training Benchmark: Closing Workforce Skill Gaps',
      titleAr:
        'دليل معايير تدريب الشركات في الخليج ٢٠٢٦: سد فجوات المهارات ومواءمة التوطين',
      excerptEn:
        'A comprehensive study of 450+ enterprise HR leaders in Riyadh and Dubai navigating diagnostic TNA methods, TVTC accreditations, and high-impact corporate cohorts.',
      excerptAr:
        'دراسة واقعية وشاملة تستند إلى مقابلات مع أكثر من ٤٥٠ قائداً تنفيذياً في الرياض ودبي حول قياس الاحتياج التدريبي الحقيقي، التعامل مع تراخيص TVTC، وبناء كوادر وطنية عالية الأداء.',
      ctaEn: 'Read Full Guide',
      ctaAr: 'قراءة الدليل بالكامل',
      image: '/executive_training_room.jpg',
      link: '/resources/blog',
    },
    editorPickEvent: {
      badgeEn: '3-DAY VIRTUAL EVENT',
      badgeAr: 'حدث افتراضي مباشر',
      dateEn: '7 – 9 Oct',
      dateAr: '٧ – ٩ أكتوبر',
      titleEn: "Human Skills Fest '26",
      titleAr: "قمة مهارات المستقبل الخليجية '٢٦",
      descEn:
        'Ten expert sessions, three days, one unmissable online summit. Join HR and L&D professionals to future-proof workforce capability.',
      descAr:
        'جلسات تفاعلية مع قادة الموارد البشرية والتدريب في كبرى المنشآت لمناقشة القيادة، المهارات البشرية، واستدامة التدريب.',
      ctaEn: 'Secure your spot',
      ctaAr: 'حجز مقعد مجاني',
      link: '/resources/events',
    },
    editorPickToolkit: {
      badgeEn: 'DOWNLOADABLE GUIDE',
      badgeAr: 'دليل تشخيصي قابل للتحميل',
      titleEn: 'TNA Diagnostic Framework 2026',
      titleAr: 'مصفوفة تشخيص الاحتياجات التدريبية (TNA)',
      descEn:
        'Pre-built scoring matrix to isolate core capability gaps before signing provider scopes.',
      descAr:
        'نموذج عملي لتقييم كفاءة الفرق وتحديد الاحتياجات الفعلية بدقة قبل التعاقد مع مزودي التدريب.',
      ctaEn: 'Download Template',
      ctaAr: 'تحميل القالب مجاناً',
      link: '/resources/downloads',
    },
    articles: [],
    downloads: [],
    events: [],
    podcasts: [],
  };
}

export function normalizeResourcesData(data: any): any {
  if (!data || typeof data !== 'object') return data;

  const result = { ...data };

  // 1. Hero
  const hero = { ...(result.hero || {}) };
  hero.titleEn = hero.titleEn || hero.title_en || '';
  hero.titleAr = hero.titleAr || hero.title_ar || '';
  hero.subtitleEn = hero.subtitleEn || hero.sub_en || '';
  hero.subtitleAr = hero.subtitleAr || hero.sub_ar || '';
  hero.title_en = hero.title_en || hero.titleEn;
  hero.title_ar = hero.title_ar || hero.titleAr;
  hero.sub_en = hero.sub_en || hero.subtitleEn;
  hero.sub_ar = hero.sub_ar || hero.subtitleAr;
  result.hero = hero;

  // 2. Spotlight
  const spot = { ...(result.spotlight || result.spot || {}) };
  spot.badgeEn = spot.badgeEn || spot.badge_en || '';
  spot.badgeAr = spot.badgeAr || spot.badge_ar || '';
  spot.categoryEn = spot.categoryEn || spot.cat_en || '';
  spot.categoryAr = spot.categoryAr || spot.cat_ar || '';
  spot.readTimeEn = spot.readTimeEn || spot.read_en || '';
  spot.readTimeAr = spot.readTimeAr || spot.read_ar || '';
  spot.dateEn = spot.dateEn || spot.date_en || '';
  spot.dateAr = spot.dateAr || spot.date_ar || '';
  spot.titleEn = spot.titleEn || spot.title_en || '';
  spot.titleAr = spot.titleAr || spot.title_ar || '';
  spot.excerptEn = spot.excerptEn || spot.excerpt_en || '';
  spot.excerptAr = spot.excerptAr || spot.excerpt_ar || '';
  spot.ctaEn = spot.ctaEn || spot.cta_en || '';
  spot.ctaAr = spot.ctaAr || spot.cta_ar || '';
  spot.image = spot.image || spot.img || '';
  spot.link = spot.link || '/resources/blog';

  spot.badge_en = spot.badgeEn;
  spot.badge_ar = spot.badgeAr;
  spot.cat_en = spot.categoryEn;
  spot.cat_ar = spot.categoryAr;
  spot.read_en = spot.readTimeEn;
  spot.read_ar = spot.readTimeAr;
  spot.date_en = spot.dateEn;
  spot.date_ar = spot.dateAr;
  spot.title_en = spot.titleEn;
  spot.title_ar = spot.titleAr;
  spot.excerpt_en = spot.excerptEn;
  spot.excerpt_ar = spot.excerptAr;
  spot.cta_en = spot.ctaEn;
  spot.cta_ar = spot.ctaAr;
  spot.img = spot.image;
  result.spotlight = spot;
  result.spot = spot;

  // 3. Editor Picks
  const p1 = { ...(result.editorPickEvent || result.pick1 || {}) };
  p1.badgeEn = p1.badgeEn || p1.badge_en || '';
  p1.badgeAr = p1.badgeAr || p1.badge_ar || '';
  p1.dateEn = p1.dateEn || p1.date_en || '';
  p1.dateAr = p1.dateAr || p1.date_ar || '';
  p1.titleEn = p1.titleEn || p1.title_en || '';
  p1.titleAr = p1.titleAr || p1.title_ar || '';
  p1.descEn = p1.descEn || p1.desc_en || '';
  p1.descAr = p1.descAr || p1.desc_ar || '';
  p1.ctaEn = p1.ctaEn || p1.cta_en || '';
  p1.ctaAr = p1.ctaAr || p1.cta_ar || '';
  p1.link = p1.link || '/resources/events';
  p1.badge_en = p1.badgeEn;
  p1.badge_ar = p1.badgeAr;
  p1.date_en = p1.dateEn;
  p1.date_ar = p1.dateAr;
  p1.title_en = p1.titleEn;
  p1.title_ar = p1.titleAr;
  p1.desc_en = p1.descEn;
  p1.desc_ar = p1.descAr;
  p1.cta_en = p1.ctaEn;
  p1.cta_ar = p1.ctaAr;
  result.editorPickEvent = p1;
  result.pick1 = p1;

  const p2 = { ...(result.editorPickToolkit || result.pick2 || {}) };
  p2.badgeEn = p2.badgeEn || p2.badge_en || '';
  p2.badgeAr = p2.badgeAr || p2.badge_ar || '';
  p2.titleEn = p2.titleEn || p2.title_en || '';
  p2.titleAr = p2.titleAr || p2.title_ar || '';
  p2.descEn = p2.descEn || p2.desc_en || '';
  p2.descAr = p2.descAr || p2.desc_ar || '';
  p2.ctaEn = p2.ctaEn || p2.cta_en || '';
  p2.ctaAr = p2.ctaAr || p2.cta_ar || '';
  p2.link = p2.link || '/resources/downloads';
  p2.badge_en = p2.badgeEn;
  p2.badge_ar = p2.badgeAr;
  p2.title_en = p2.titleEn;
  p2.title_ar = p2.titleAr;
  p2.desc_en = p2.descEn;
  p2.desc_ar = p2.descAr;
  p2.cta_en = p2.ctaEn;
  p2.cta_ar = p2.ctaAr;
  result.editorPickToolkit = p2;
  result.pick2 = p2;

  // 4. Articles
  result.articles = (result.articles || []).map((art: any, i: number) => {
    const a = { ...art };
    a.id = a.id || `art-${Date.now()}-${i}`;
    a.titleEn = a.titleEn || a.title_en || '';
    a.titleAr = a.titleAr || a.title_ar || '';
    a.slug = a.slug || '';
    a.categoryEn = a.categoryEn || a.cat_en || '';
    a.categoryAr = a.categoryAr || a.cat_ar || '';
    a.readTimeEn = a.readTimeEn || a.read_en || '';
    a.readTimeAr = a.readTimeAr || a.read_ar || '';
    a.dateEn = a.dateEn || a.date_en || '';
    a.dateAr = a.dateAr || a.date_ar || '';
    a.excerptEn = a.excerptEn || a.excerpt_en || '';
    a.excerptAr = a.excerptAr || a.excerpt_ar || '';
    a.contentEn = a.contentEn || a.body_en || '';
    a.contentAr = a.contentAr || a.body_ar || '';
    a.image = a.image || a.img || '';
    a.status = a.status || 'published';
    a.seo = a.seo || { en: {}, ar: {} };

    a.title_en = a.titleEn;
    a.title_ar = a.titleAr;
    a.cat_en = a.categoryEn;
    a.cat_ar = a.categoryAr;
    a.read_en = a.readTimeEn;
    a.read_ar = a.readTimeAr;
    a.date_en = a.dateEn;
    a.date_ar = a.dateAr;
    a.excerpt_en = a.excerptEn;
    a.excerpt_ar = a.excerptAr;
    a.body_en = a.contentEn;
    a.body_ar = a.contentAr;
    a.img = a.image;
    return a;
  });

  // 5. Downloads
  result.downloads = (result.downloads || []).map((dl: any, i: number) => {
    const d = { ...dl };
    d.id = d.id || `toolkit-${Date.now()}-${i}`;
    d.titleEn = d.titleEn || d.title_en || '';
    d.titleAr = d.titleAr || d.title_ar || '';
    d.descEn = d.descEn || d.desc_en || '';
    d.descAr = d.descAr || d.desc_ar || '';
    d.format = d.format || '';
    d.fileSize = d.fileSize || d.size || '';
    d.fileUrl = d.fileUrl || d.url || '';
    d.image = d.image || d.img || '';
    d.featuresEn = d.featuresEn || d.feat_en || [];
    d.featuresAr = d.featuresAr || d.feat_ar || [];
    d.status = d.status || 'published';

    d.title_en = d.titleEn;
    d.title_ar = d.titleAr;
    d.desc_en = d.descEn;
    d.desc_ar = d.descAr;
    d.size = d.fileSize;
    d.url = d.fileUrl;
    d.img = d.image;
    d.feat_en = d.featuresEn;
    d.feat_ar = d.featuresAr;
    return d;
  });

  // 6. Events
  result.events = (result.events || []).map((ev: any, i: number) => {
    const e = { ...ev };
    e.id = e.id || `event-${Date.now()}-${i}`;
    e.titleEn = e.titleEn || e.title_en || '';
    e.titleAr = e.titleAr || e.title_ar || '';
    e.descEn = e.descEn || e.desc_en || '';
    e.descAr = e.descAr || e.desc_ar || '';
    e.when = e.when || (e.dateEn + (e.time ? ', ' + e.time : ''));
    e.dateEn = e.dateEn || e.when || '';
    e.dateAr = e.dateAr || '';
    e.locationEn = e.locationEn || e.loc_en || '';
    e.locationAr = e.locationAr || e.loc_ar || '';
    e.typeEn = e.typeEn || e.type_en || '';
    e.typeAr = e.typeAr || e.type_ar || '';
    e.spotsLeftEn = e.spotsLeftEn || e.seats_en || '';
    e.spotsLeftAr = e.spotsLeftAr || e.seats_ar || '';
    e.image = e.image || e.img || '';
    e.link = e.link || e.rsvp || '';
    e.status = e.status || 'published';

    e.title_en = e.titleEn;
    e.title_ar = e.titleAr;
    e.desc_en = e.descEn;
    e.desc_ar = e.descAr;
    e.loc_en = e.locationEn;
    e.loc_ar = e.locationAr;
    e.type_en = e.typeEn;
    e.type_ar = e.typeAr;
    e.seats_en = e.spotsLeftEn;
    e.seats_ar = e.spotsLeftAr;
    e.img = e.image;
    e.rsvp = e.link;
    return e;
  });

  // 7. Podcasts
  result.podcasts = (result.podcasts || []).map((po: any, i: number) => {
    const p = { ...po };
    p.id = p.id || `pod-${Date.now()}-${i}`;
    p.titleEn = p.titleEn || p.title_en || '';
    p.titleAr = p.titleAr || p.title_ar || '';
    p.descEn = p.descEn || p.desc_en || '';
    p.descAr = p.descAr || p.desc_ar || '';
    p.guestEn = p.guestEn || p.guest_en || '';
    p.guestAr = p.guestAr || p.guest_ar || '';
    p.duration = p.duration || p.dur || '';
    p.dateEn = p.dateEn || p.date_en || '';
    p.dateAr = p.dateAr || p.date_ar || '';
    p.tagEn = p.tagEn || p.topic_en || '';
    p.tagAr = p.tagAr || p.topic_ar || '';
    p.image = p.image || p.img || '';
    p.audioUrl = p.audioUrl || p.audio || '';
    p.status = p.status || 'published';

    p.title_en = p.titleEn;
    p.title_ar = p.titleAr;
    p.desc_en = p.descEn;
    p.desc_ar = p.descAr;
    p.guest_en = p.guestEn;
    p.guest_ar = p.guestAr;
    p.dur = p.duration;
    p.date_en = p.dateEn;
    p.date_ar = p.dateAr;
    p.topic_en = p.tagEn;
    p.topic_ar = p.tagAr;
    p.img = p.image;
    p.audio = p.audioUrl;
    return p;
  });

  // 8. Roles
  result.roles = result.roles || {
    users: [
      { id: 'u1', name: 'PontLook Admin', email: 'contact@pontlook.com', role: 'admin' },
    ],
    perms: { edit: 1, publish: 1, delete: 1, users: 1, seo: 1 },
  };

  if (result.roles && Array.isArray(result.roles.users)) {
    result.roles.users = result.roles.users.filter((u: any) => u.email === 'contact@pontlook.com');
    if (result.roles.users.length === 0) {
      result.roles.users = [
        { id: 'u1', name: 'PontLook Admin', email: 'contact@pontlook.com', role: 'admin' },
      ];
    }
  }

  return result;
}

export function saveResourcesStore(data: any): boolean {
  const normalized = normalizeResourcesData(data);

  // Always update memory cache immediately
  memoryCache = normalized;
  lastLoadedMtime = Date.now();

  let savedPrimary = false;

  // 1. Try writing to primary DATA_FILE
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(normalized, null, 2), 'utf-8');
    savedPrimary = true;
  } catch (err) {
    console.warn('[PontLook Store] Warning: Could not save to primary path, writing to backup:', err);
  }

  // 2. Try writing to backup DATA_FILE
  try {
    fs.writeFileSync(BACKUP_DATA_FILE, JSON.stringify(normalized, null, 2), 'utf-8');
  } catch (err) {
    // backup write warning
  }

  // If memoryCache is updated and at least one destination was written (or in-memory set)
  return true;
}
