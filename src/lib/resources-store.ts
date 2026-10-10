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

export function saveResourcesStore(data: ResourcesContent): boolean {
  // Always update memory cache immediately
  memoryCache = JSON.parse(JSON.stringify(data));
  lastLoadedMtime = Date.now();

  let savedPrimary = false;

  // 1. Try writing to primary DATA_FILE
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    savedPrimary = true;
  } catch (err) {
    console.warn('[PontLook Store] Warning: Could not save to primary path, writing to backup:', err);
  }

  // 2. Try writing to backup DATA_FILE
  try {
    fs.writeFileSync(BACKUP_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // backup write warning
  }

  // If memoryCache is updated and at least one destination was written (or in-memory set)
  return true;
}
