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
    status?: string;
    title_en?: string;
    title_ar?: string;
    cat_en?: string;
    cat_ar?: string;
    read_en?: string;
    read_ar?: string;
    date_en?: string;
    date_ar?: string;
    excerpt_en?: string;
    excerpt_ar?: string;
    body_en?: string;
    body_ar?: string;
    img?: string;
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
    status?: string;
    title_en?: string;
    title_ar?: string;
    desc_en?: string;
    desc_ar?: string;
    size?: string;
    url?: string;
    img?: string;
    feat_en?: string[];
    feat_ar?: string[];
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
    status?: string;
    title_en?: string;
    title_ar?: string;
    desc_en?: string;
    desc_ar?: string;
    when?: string;
    date_en?: string;
    date_ar?: string;
    loc_en?: string;
    loc_ar?: string;
    type_en?: string;
    type_ar?: string;
    seats_en?: string;
    seats_ar?: string;
    img?: string;
    rsvp?: string;
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
    status?: string;
    title_en?: string;
    title_ar?: string;
    desc_en?: string;
    desc_ar?: string;
    guest_en?: string;
    guest_ar?: string;
    dur?: string;
    date_en?: string;
    date_ar?: string;
    topic_en?: string;
    topic_ar?: string;
    tag_en?: string;
    tag_ar?: string;
    img?: string;
    audio?: string;
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
  // 1. Check backup file in /tmp first — on serverless platforms (like Vercel),
  // runtime admin changes are written to /tmp because process.cwd() is read-only.
  try {
    if (fs.existsSync(BACKUP_DATA_FILE)) {
      const stats = fs.statSync(BACKUP_DATA_FILE);
      if (!memoryCache || stats.mtimeMs > lastLoadedMtime) {
        const content = fs.readFileSync(BACKUP_DATA_FILE, 'utf-8');
        memoryCache = normalizeResourcesData(JSON.parse(content));
        lastLoadedMtime = stats.mtimeMs;
      }
      if (memoryCache) {
        return memoryCache;
      }
    }
  } catch (err) {
    console.error('Failed to read backup resources.json:', err);
  }

  // 2. Fall back to primary static DATA_FILE if no runtime /tmp override exists
  try {
    if (fs.existsSync(DATA_FILE)) {
      const stats = fs.statSync(DATA_FILE);
      if (!memoryCache || stats.mtimeMs > lastLoadedMtime) {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        memoryCache = normalizeResourcesData(JSON.parse(content));
        lastLoadedMtime = stats.mtimeMs;
      }
      if (memoryCache) {
        return memoryCache;
      }
    }
  } catch (err) {
    console.error('Failed to read primary resources.json:', err);
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
    const titleEn = art.title_en !== undefined ? art.title_en : (art.titleEn ?? '');
    const titleAr = art.title_ar !== undefined ? art.title_ar : (art.titleAr ?? '');
    const slug = art.slug || '';
    const catEn = art.cat_en !== undefined ? art.cat_en : (art.categoryEn ?? '');
    const catAr = art.cat_ar !== undefined ? art.cat_ar : (art.categoryAr ?? '');
    const readEn = art.read_en !== undefined ? art.read_en : (art.readTimeEn ?? '');
    const readAr = art.read_ar !== undefined ? art.read_ar : (art.readTimeAr ?? '');
    const dateEn = art.date_en !== undefined ? art.date_en : (art.dateEn ?? '');
    const dateAr = art.date_ar !== undefined ? art.date_ar : (art.dateAr ?? '');
    const excerptEn = art.excerpt_en !== undefined ? art.excerpt_en : (art.excerptEn ?? '');
    const excerptAr = art.excerpt_ar !== undefined ? art.excerpt_ar : (art.excerptAr ?? '');
    const contentEn = art.body_en !== undefined ? art.body_en : (art.contentEn ?? '');
    const contentAr = art.body_ar !== undefined ? art.body_ar : (art.contentAr ?? '');
    const image = art.img !== undefined ? art.img : (art.image ?? '');
    const status = art.status || 'published';

    a.titleEn = titleEn;
    a.title_en = titleEn;
    a.titleAr = titleAr;
    a.title_ar = titleAr;
    a.slug = slug;
    a.categoryEn = catEn;
    a.cat_en = catEn;
    a.categoryAr = catAr;
    a.cat_ar = catAr;
    a.readTimeEn = readEn;
    a.read_en = readEn;
    a.readTimeAr = readAr;
    a.read_ar = readAr;
    a.dateEn = dateEn;
    a.date_en = dateEn;
    a.dateAr = dateAr;
    a.date_ar = dateAr;
    a.excerptEn = excerptEn;
    a.excerpt_en = excerptEn;
    a.excerptAr = excerptAr;
    a.excerpt_ar = excerptAr;
    a.contentEn = contentEn;
    a.body_en = contentEn;
    a.contentAr = contentAr;
    a.body_ar = contentAr;
    a.image = image;
    a.img = image;
    a.status = status;
    a.seo = a.seo || { en: {}, ar: {} };
    return a;
  });

  // 5. Downloads
  result.downloads = (result.downloads || []).map((dl: any, i: number) => {
    const d = { ...dl };
    d.id = d.id || `toolkit-${Date.now()}-${i}`;
    const titleEn = dl.title_en !== undefined ? dl.title_en : (dl.titleEn ?? '');
    const titleAr = dl.title_ar !== undefined ? dl.title_ar : (dl.titleAr ?? '');
    const descEn = dl.desc_en !== undefined ? dl.desc_en : (dl.descEn ?? '');
    const descAr = dl.desc_ar !== undefined ? dl.desc_ar : (dl.descAr ?? '');
    const format = dl.format || 'PDF';
    const fileSize = dl.size !== undefined ? dl.size : (dl.fileSize ?? '');
    const fileUrl = dl.url !== undefined ? dl.url : (dl.fileUrl ?? '');
    const image = dl.img !== undefined ? dl.img : (dl.image ?? '');
    const featEn = Array.isArray(dl.feat_en) ? dl.feat_en : (Array.isArray(dl.featuresEn) ? dl.featuresEn : []);
    const featAr = Array.isArray(dl.feat_ar) ? dl.feat_ar : (Array.isArray(dl.featuresAr) ? dl.featuresAr : []);
    const status = dl.status || 'published';

    d.titleEn = titleEn;
    d.title_en = titleEn;
    d.titleAr = titleAr;
    d.title_ar = titleAr;
    d.descEn = descEn;
    d.desc_en = descEn;
    d.descAr = descAr;
    d.desc_ar = descAr;
    d.format = format;
    d.fileSize = fileSize;
    d.size = fileSize;
    d.fileUrl = fileUrl;
    d.url = fileUrl;
    d.image = image;
    d.img = image;
    d.featuresEn = featEn;
    d.feat_en = featEn;
    d.featuresAr = featAr;
    d.feat_ar = featAr;
    d.status = status;
    return d;
  });

  // 6. Events
  result.events = (result.events || []).map((ev: any, i: number) => {
    const e = { ...ev };
    e.id = e.id || `event-${Date.now()}-${i}`;
    const titleEn = ev.title_en !== undefined ? ev.title_en : (ev.titleEn ?? '');
    const titleAr = ev.title_ar !== undefined ? ev.title_ar : (ev.titleAr ?? '');
    const descEn = ev.desc_en !== undefined ? ev.desc_en : (ev.descEn ?? '');
    const descAr = ev.desc_ar !== undefined ? ev.desc_ar : (ev.descAr ?? '');
    const when = ev.when !== undefined ? ev.when : (ev.dateEn ?? '');
    const dateAr = ev.date_ar !== undefined ? ev.date_ar : (ev.dateAr ?? when);
    const locEn = ev.loc_en !== undefined ? ev.loc_en : (ev.locationEn ?? '');
    const locAr = ev.loc_ar !== undefined ? ev.loc_ar : (ev.locationAr ?? '');
    const typeEn = ev.type_en !== undefined ? ev.type_en : (ev.typeEn ?? '');
    const typeAr = ev.type_ar !== undefined ? ev.type_ar : (ev.typeAr ?? '');
    const seatsEn = ev.seats_en !== undefined ? ev.seats_en : (ev.spotsLeftEn ?? '');
    const seatsAr = ev.seats_ar !== undefined ? ev.seats_ar : (ev.spotsLeftAr ?? '');
    const image = ev.img !== undefined ? ev.img : (ev.image ?? '');
    const link = ev.rsvp !== undefined ? ev.rsvp : (ev.link ?? '');
    const status = ev.status || 'published';

    e.titleEn = titleEn;
    e.title_en = titleEn;
    e.titleAr = titleAr;
    e.title_ar = titleAr;
    e.descEn = descEn;
    e.desc_en = descEn;
    e.descAr = descAr;
    e.desc_ar = descAr;
    e.when = when;
    e.dateEn = when;
    e.date_en = when;
    e.dateAr = dateAr;
    e.date_ar = dateAr;
    e.time = ev.time || '';
    e.locationEn = locEn;
    e.loc_en = locEn;
    e.locationAr = locAr;
    e.loc_ar = locAr;
    e.typeEn = typeEn;
    e.type_en = typeEn;
    e.typeAr = typeAr;
    e.type_ar = typeAr;
    e.spotsLeftEn = seatsEn;
    e.seats_en = seatsEn;
    e.spotsLeftAr = seatsAr;
    e.seats_ar = seatsAr;
    e.image = image;
    e.img = image;
    e.link = link;
    e.rsvp = link;
    e.status = status;
    return e;
  });

  // 7. Podcasts
  result.podcasts = (result.podcasts || []).map((po: any, i: number) => {
    const p = { ...po };
    p.id = p.id || `pod-${Date.now()}-${i}`;
    const titleEn = po.title_en !== undefined ? po.title_en : (po.titleEn ?? '');
    const titleAr = po.title_ar !== undefined ? po.title_ar : (po.titleAr ?? '');
    const descEn = po.desc_en !== undefined ? po.desc_en : (po.descEn ?? '');
    const descAr = po.desc_ar !== undefined ? po.desc_ar : (po.descAr ?? '');
    const guestEn = po.guest_en !== undefined ? po.guest_en : (po.guestEn ?? '');
    const guestAr = po.guest_ar !== undefined ? po.guest_ar : (po.guestAr ?? '');
    const dur = po.dur !== undefined ? po.dur : (po.duration ?? '');
    const dateEn = po.date_en !== undefined ? po.date_en : (po.dateEn ?? '');
    const dateAr = po.date_ar !== undefined ? po.date_ar : (po.dateAr ?? '');
    const topicEn = po.topic_en !== undefined ? po.topic_en : (po.tagEn ?? '');
    const topicAr = po.topic_ar !== undefined ? po.topic_ar : (po.tagAr ?? '');
    const image = po.img !== undefined ? po.img : (po.image ?? '');
    const audio = po.audio !== undefined ? po.audio : (po.audioUrl ?? '');
    const status = po.status || 'published';

    p.titleEn = titleEn;
    p.title_en = titleEn;
    p.titleAr = titleAr;
    p.title_ar = titleAr;
    p.descEn = descEn;
    p.desc_en = descEn;
    p.descAr = descAr;
    p.desc_ar = descAr;
    p.guestEn = guestEn;
    p.guest_en = guestEn;
    p.guestAr = guestAr;
    p.guest_ar = guestAr;
    p.duration = dur;
    p.dur = dur;
    p.dateEn = dateEn;
    p.date_en = dateEn;
    p.dateAr = dateAr;
    p.date_ar = dateAr;
    p.tagEn = topicEn;
    p.topic_en = topicEn;
    p.tagAr = topicAr;
    p.topic_ar = topicAr;
    p.image = image;
    p.img = image;
    p.audioUrl = audio;
    p.audio = audio;
    p.status = status;
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
