# PontLook SaaS — Performance Baseline (Stage 1)

Date: October 2026  
Branch: `perf/reduce-code-and-lag`  
Target: Production Build (`next build && next start` on Linux x86_64, Node.js v20)  
Audited Routes: Bilingual English (`/en`) & Arabic (`/ar` with RTL), Resource Hubs, Admin CMS  

---

## Executive Summary of Baseline

1. **CPU Saturation via Canvas Animation Loops:**
   - Both `Hero.tsx` (Homepage) and `BurjSkylineCanvas.tsx` (Find Training) and `GccProviderHero.tsx` (Providers) execute high-frequency `requestAnimationFrame` animation loops.
   - On the homepage (`/en` and `/ar`), the mobile emulation CPU is 100% pinned (main-thread execution > 33,000 ms during a 35 s trace), triggering Lighthouse CPU-idle timeouts (`NO_TTI_CPU_IDLE_PERIOD`).
   - In `BurjSkylineCanvas.tsx`, `setHudText` (React state dispatch) is executed **inside `requestAnimationFrame`**, causing up to 60 React component re-renders per second on the main thread.
   - When off-screen, the canvas loops continue to queue `requestAnimationFrame(frame)` every 16 ms without cancelling the timer or listening to `document.visibilitychange`.

2. **Client Bundle Bloat & Dead Sanity Artifacts:**
   - Public resource routes (`/en/resources`, `/en/resources/blog`, `/en/resources/blog/[slug]`) load **175 kB First Load JS**, compared to 112 kB on other content pages (+63 kB bloat).
   - Bundle analysis proves the presence of **510+ KB parsed client JS** from unused Sanity studio/client dependencies (`next-sanity` 191 KB, `@sanity/ui` 161 KB, `@sanity/next-loader` 73 KB, `xstate` 41 KB, `styled-components` 26 KB, `rxjs` 25 KB) in the client bundle, even though PontLook uses local file-based JSON storage (`src/data/resources.json`).
   - Motion libraries are duplicated: both `motion` (128.8 KB parsed) and `framer-motion` (99.9 KB parsed) are loaded into client chunks.

3. **Server Response Time (TTFB):**
   - Resource routes (`/resources`, `/resources/blog`, `/resources/downloads`, etc.) are configured with `export const dynamic = 'force-dynamic'` and `revalidate = 0`. Under 10 concurrency / 50 requests load, TTFB is **~130 ms to 181 ms** per request because Next.js re-renders them dynamically on every request instead of serving cached SSG/ISR HTML.
   - In contrast, static SSG pages respond in ~66 ms, and admin API endpoints respond in ~20–25 ms.

4. **Static Media & Image Payloads:**
   - Static assets in `public/` include uncompressed files such as `hero-bridge.png` (2.8 MB), `executive_training_room.jpg` (765 KB), and `providers-hero.png` (704 KB).
   - In contrast, the admin upload directory `public/uploads` is pristine (4.0 KB, only `.gitkeep`), and `src/data/resources.json` is compact (3,305 bytes).

---

## 3.1 Build and Bundle Analysis

### 3.1.1 Build Route Table
Source: `next build` (Next.js 14.2.35)

| Route (app) | Type | Route Size | First Load JS | Notes |
| :--- | :---: | :---: | :---: | :--- |
| `/_not-found` | Static | 879 B | 94.5 kB | Default 404 |
| `/[lang]` (Home) | SSG | 36.1 kB | **190 kB** | Canvas hero + heavy motion |
| `/[lang]/contact` | SSG | 3.2 kB | 144 kB | RHF + Zod |
| `/[lang]/faq` | SSG | 3.11 kB | 123 kB | Accordion FAQs |
| `/[lang]/find-training` | SSG | 10.8 kB | **131 kB** | Burj skyline canvas + intake |
| `/[lang]/find-training/apply` | SSG | 157 B | **174 kB** | Form wizard step |
| `/[lang]/find-training/request` | SSG | 157 B | **174 kB** | Form wizard step |
| `/[lang]/for-providers` | SSG | 12.8 kB | **152 kB** | Helix canvas + story |
| `/[lang]/for-providers/apply` | SSG | 9.15 kB | 131 kB | Provider intake |
| `/[lang]/privacy-policy` | SSG | 894 B | 112 kB | Legal content |
| `/[lang]/resources` | SSG | 916 B | **175 kB** | Sanity bloat included |
| `/[lang]/resources/blog` | SSG | 916 B | **175 kB** | Sanity bloat included |
| `/[lang]/resources/blog/[slug]` | SSG | 916 B | **175 kB** | Sanity bloat included |
| `/[lang]/resources/downloads` | SSG | 894 B | 112 kB | Resource category |
| `/[lang]/resources/events` | SSG | 894 B | 112 kB | Resource category |
| `/[lang]/resources/podcasts` | SSG | 894 B | 112 kB | Resource category |
| `/[lang]/returns-faq` | SSG | 894 B | 112 kB | Legal content |
| `/[lang]/terms-of-service` | SSG | 894 B | 112 kB | Legal content |
| `/[lang]/who-we-are` | SSG | 9.26 kB | 112 kB | About page |
| `/admin` | Static | 16.4 kB | 110 kB | Admin dashboard CMS |
| `/admin/login` | Static | 4.18 kB | 113 kB | Admin login |
| `/api/admin/auth/login` | Dynamic | 0 B | 0 B | Auth API |
| `/api/admin/auth/logout` | Dynamic | 0 B | 0 B | Auth API |
| `/api/admin/auth/verify` | Dynamic | 0 B | 0 B | Auth API |
| `/api/admin/media` | Dynamic | 0 B | 0 B | Media API |
| `/api/admin/resources` | Dynamic | 0 B | 0 B | Resource CMS API |
| `/api/admin/upload` | Dynamic | 0 B | 0 B | Upload API |
| `/api/intake` | Dynamic | 0 B | 0 B | Lead intake API |
| `/robots.txt` | Static | 0 B | 0 B | SEO |
| `/sitemap.xml` | Static | 0 B | 0 B | SEO |
| `/uploads/[...file]` | Dynamic | 0 B | 0 B | Media serving route |

### 3.1.2 Shared Chunks
- **Total Shared First Load JS:** `93.7 kB`
  - `chunks/2117-bd6484805ae35b79.js`: `37.7 kB`
  - `chunks/fd9d1056-efa20bfdb756d212.js`: `53.6 kB`
  - Other shared chunks: `2.27 kB`
- **Middleware Size:** `27 kB`

### 3.1.3 Top 20 Client Modules (from `@next/bundle-analyzer`)
Source: Webpack Client Bundle Analyzer report (`.next/analyze/client.html`)

| Rank | Module / Package | Parsed Size | Stat Size | Gzip Size | File Count | Notes / Impact |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| 1 | `src/components` | 479.47 KB | 1,180.66 KB | 150.88 KB | 131 files | Client UI components |
| 2 | `next` | 476.25 KB | 1,170.19 KB | 195.63 KB | 252 files | Next.js framework runtime |
| 3 | `next-sanity` | **191.46 KB** | 494.08 KB | 64.52 KB | 156 files | **Unused client CMS bloat** |
| 4 | `@sanity/ui` | **161.52 KB** | 342.23 KB | 48.69 KB | 4 files | **Unused UI library bloat** |
| 5 | `motion` | **128.78 KB** | 500.85 KB | 42.89 KB | 266 files | Animation library #1 |
| 6 | `react-dom` | 125.99 KB | 130.53 KB | 40.32 KB | 3 files | React runtime |
| 7 | `framer-motion` | **99.88 KB** | 369.67 KB | 43.61 KB | 214 files | **Duplicate animation library #2** |
| 8 | `@sanity/next-loader` | **73.52 KB** | 174.42 KB | 24.86 KB | 36 files | **Unused Sanity loader bloat** |
| 9 | `src/app` | 59.73 KB | 150.03 KB | 18.37 KB | 5 files | App router client entrypoints |
| 10 | `zod` | 55.29 KB | 145.86 KB | 12.53 KB | 7 files | Form schema validation |
| 11 | `xstate` | **41.65 KB** | 159.89 KB | 14.50 KB | 7 files | Sanity transitive dependency |
| 12 | `styled-components`| **26.17 KB** | 59.80 KB | 10.57 KB | 8 files | Sanity transitive dependency |
| 13 | `react-hook-form` | 26.08 KB | 124.39 KB | 9.47 KB | 1 files | Client form management |
| 14 | `rxjs` | **24.75 KB** | 67.15 KB | 13.00 KB | 61 files | Sanity transitive dependency |
| 15 | `buffer` | **19.91 KB** | 48.92 KB | 5.82 KB | 1 files | Node polyfill in client bundle |
| 16 | `@sanity/client` | **18.67 KB** | 39.63 KB | 7.94 KB | 4 files | Sanity client |
| 17 | `@swc/helpers` | 17.91 KB | 48.50 KB | 11.09 KB | 69 files | Compiler helpers |
| 18 | `@floating-ui/dom` | 17.87 KB | 72.75 KB | 6.90 KB | 4 files | Tooltip/dropdown positioning |
| 19 | `@sanity/icons` | **16.94 KB** | 210.50 KB | 3.38 KB | 1 files | Sanity icon bundle |
| 20 | `refractor` | **16.42 KB** | 35.24 KB | 7.66 KB | 13 files | Syntax highlighter |

---

## 3.2 Runtime and Core Web Vitals

**Audit Conditions:**
- Profile: Lighthouse Mobile (`--preset=perf --form-factor=mobile`)
- Throttling: Default Lighthouse mobile throttling (Simulated 4G, 4x CPU slowdown)
- Server: Production `next start` on `http://localhost:3000`
- Runs: 3 runs per page, median recorded across all metrics

### 3.2.1 Core Web Vitals Median Benchmark Table

| Page Identifier | URL Path | Perf Score | LCP (ms) | TBT (ms) | CLS | Transfer (KB) | Requests | Main Thread (ms) | Status / Bottleneck |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **`en-home`** | `/en` | **null (hung)** | 3,241 ms | **null (hung)** | 0.0000 | 644 KB | 39 | **33,384 ms** | Hero canvas infinite rAF pins CPU |
| **`ar-home`** | `/ar` | **null (hung)** | 5,350 ms | **null (hung)** | 0.0005 | 668 KB | 42 | **33,503 ms** | Hero canvas infinite rAF pins CPU |
| **`en-providers`** | `/en/for-providers` | **61** | 3,445 ms | 1,033 ms | 0.0021 | 619 KB | 37 | **18,247 ms** | Helix canvas loop + heavy motion |
| **`ar-providers`** | `/ar/for-providers` | **59** | 4,011 ms | 1,219 ms | 0.0002 | 641 KB | 40 | **15,979 ms** | Helix canvas loop + heavy motion |
| **`en-findtraining`**| `/en/find-training` | **null (hung)** | 3,568 ms | **null (hung)** | 0.0000 | 687 KB | 42 | **32,339 ms** | `setHudText` in rAF triggers 60 FPS re-renders |
| **`ar-findtraining`**| `/ar/find-training` | **null (hung)** | 2,864 ms | **null (hung)** | 0.0768 | 751 KB | 46 | **33,051 ms** | `setHudText` in rAF triggers 60 FPS re-renders |
| **`en-resources`** | `/en/resources` | **80** | 3,090 ms | 368 ms | 0.0000 | 634 KB | 42 | 8,083 ms | Sanity bloat + `force-dynamic` |
| **`ar-resources`** | `/ar/resources` | **78** | 3,113 ms | 416 ms | 0.0000 | 698 KB | 46 | 8,819 ms | Sanity bloat + `force-dynamic` |
| **`en-blog`** | `/en/resources/blog` | **81** | 2,691 ms | 339 ms | 0.0000 | 600 KB | 39 | 7,163 ms | Sanity bloat + `force-dynamic` |
| **`ar-blog`** | `/ar/resources/blog` | **74** | 2,811 ms | 530 ms | 0.0000 | 664 KB | 45 | 8,708 ms | Sanity bloat + `force-dynamic` |
| **`en-downloads`** | `/en/resources/downloads` | **78** | 2,786 ms | 444 ms | 0.0000 | 602 KB | 40 | 7,840 ms | `force-dynamic`, `revalidate=0` |
| **`ar-downloads`** | `/ar/resources/downloads` | **78** | 2,929 ms | 379 ms | 0.0000 | 665 KB | 46 | 8,942 ms | `force-dynamic`, `revalidate=0` |
| **`en-events`** | `/en/resources/events` | **84** | 2,689 ms | 274 ms | 0.0000 | 601 KB | 40 | 7,181 ms | `force-dynamic`, `revalidate=0` |
| **`ar-events`** | `/ar/resources/events` | **78** | 2,891 ms | 409 ms | 0.0000 | 665 KB | 46 | 8,371 ms | `force-dynamic`, `revalidate=0` |
| **`en-podcasts`** | `/en/resources/podcasts` | **78** | 2,771 ms | 439 ms | 0.0000 | 601 KB | 40 | 7,773 ms | `force-dynamic`, `revalidate=0` |
| **`ar-podcasts`** | `/ar/resources/podcasts` | **79** | 2,874 ms | 362 ms | 0.0000 | 665 KB | 46 | 8,460 ms | `force-dynamic`, `revalidate=0` |

### 3.2.2 Key Lighthouse Opportunities
Across all pages audited, Lighthouse identified the following recurrent performance opportunities:
1. **Reduce Unused CSS:** ~17–19 KiB estimated savings (~150–420 ms improvement) due to global styling and unpurged selectors.
2. **Eliminate Render-Blocking Resources:** Blocking stylesheets and font loads delaying FCP.
3. **Avoid Long Main-Thread Tasks:** Long script evaluation tasks spanning up to 33,000 ms caused by canvas loops and duplicate animation libraries.
4. **Initial Server Response Time (TTFB):** Root document requests take 30–60 ms locally under zero load, inflating to 130–181 ms under concurrency due to dynamic rendering.

---

## 3.3 Animation and Canvas Cost

### 3.3.1 Hero 3D Globe Canvas (`src/components/home/Hero.tsx`)
- **Main Thread Execution:** 33,405 ms busy out of 35,000 ms trace (~95.4% CPU saturation).
- **Per-Frame Operations:**
  - Projects thousands of spherical coordinates through matrix multiplication and trigonometric functions (`Math.cos`, `Math.sin`).
  - Calls `ctx.createRadialGradient` **twice per frame**, forcing GPU context reallocations.
  - Draws up to 150 starfield particles with dynamic alpha oscillation and thousands of land coordinates across 5 depth tiers.
- **Off-Screen CPU Behavior:**
  - While an `IntersectionObserver` flags `vis = false`, `requestAnimationFrame(frame)` is **still continuously scheduled** at line 305:
    ```typescript
    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      if (!vis) return;
    ```
  - When the user scrolls past the hero section, the CPU continues waking every 16 ms to check visibility.
  - No `document.visibilitychange` listener is present; the animation thread continues even when the browser tab is hidden or minimized.

### 3.3.2 Dubai Skyline Match Canvas (`src/components/find-training/BurjSkylineCanvas.tsx`)
- **React Re-render Saturation:**
  - At line 390 inside the `requestAnimationFrame` callback:
    ```typescript
    const nextHud = asm < 1 ? ... : ...;
    setHudText(nextHud);
    ```
  - Directly dispatches a React state update (`setHudText`) on every single animation frame, forcing React to run component diffing and re-rendering 60 times per second on the main thread.
- **Frame Execution:**
  - Multi-layer canvas drawing with bezier curves, beam pulses, and architectural sail clip paths.

### 3.3.3 GCC Double Helix Canvas (`src/components/providers/GccProviderHero.tsx`)
- **Main Thread Execution:** 15,600 ms to 21,600 ms main thread time on mobile emulation.
- **Frame Execution:**
  - Animates 84–320 double-helix 3D particles with sin/cos transforms and ambient dust particles.
  - Suffers from the same off-screen rAF polling leak as `Hero.tsx`.

---

## 3.4 Data and Storage Size

### 3.4.1 Content Storage
- `src/data/resources.json`: **3,305 bytes**
  - Schema objects: `hero` (1), `spotlight` (1), `editorPickEvent` (1), `editorPickToolkit` (1)
  - Collections:
    - Articles: **0**
    - Downloads: **0**
    - Events: **0**
    - Podcasts: **0**
- `public/uploads`: **4.0 KB** (contains only `.gitkeep`, 0 user upload files)
- `/tmp/pontlook-resources.json`: None
- `/tmp/pontlook-uploads`: None

### 3.4.2 Top 15 Largest Static Assets in `public/`
| Rank | File Path | File Size | MIME / Format | Impact / Recommendation |
| :---: | :--- | :---: | :---: | :--- |
| 1 | `public/hero-bridge.png` | **2.8 MB** | PNG | Uncompressed hero graphic; needs WebP/AVIF conversion |
| 2 | `public/executive_training_room.jpg` | **765 KB** | JPEG | Featured guide image; needs modern compression |
| 3 | `public/providers-hero.png` | **704 KB** | PNG | Providers banner; needs modern WebP/AVIF |
| 4 | `public/images/brand/og-providers.png` | **271 KB** | PNG | Open Graph image; could be optimized to <80 KB |
| 5 | `public/burj-al-arab-source.png` | **198 KB** | PNG | Raw source image |
| 6 | `public/burj-al-arab.png` | **153 KB** | PNG | Processed graphic |
| 7 | `public/PontLook-Logo.png` | **152 KB** | PNG | Brand logo |
| 8 | `public/images/traditional-cluttered-desk.webp` | 130 KB | WebP | Comparison image |
| 9 | `public/PontLook-Logo-Orange.png` | 127 KB | PNG | Brand logo variant |
| 10 | `public/PontLook-Logo-White.png` | 95 KB | PNG | Brand logo variant |
| 11 | `public/images/pontlook-clean-office.webp` | 59 KB | WebP | Comparison image |
| 12 | `public/og-image.png` | 45 KB | PNG | Default OG card |
| 13 | `public/images/brand/og-main.png` | 45 KB | PNG | Main brand OG |
| 14 | `public/images/brand/pontlook-provider-icon.png` | 30 KB | PNG | Icon |
| 15 | `public/skyline-bg.webp` | 26 KB | WebP | Background texture |

---

## 3.5 Server Response Time (Autocannon Load Test)

**Benchmark Parameters:**
- Concurrency: 10
- Total Requests: 50 per endpoint
- Client: Local HTTP benchmark via `autocannon`
- Status: All endpoints returned 100% 2xx status codes (admin endpoints tested with signed session token)

| Route Category | Endpoint | Avg Latency | Median (p50) | p99 Latency | Req/sec | Notes |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Marketing Pages** | `/en` | 135.3 ms | 129 ms | 362 ms | 50 | Heavy SSR initial HTML |
| | `/ar` | 82.1 ms | 84 ms | 171 ms | 50 | RTL SSR HTML |
| | `/en/for-providers` | **66.6 ms** | 65 ms | 131 ms | 50 | Fast SSG static route |
| | `/en/find-training` | 106.5 ms | 93 ms | 207 ms | 50 | SSG static route |
| **Resource Hubs** | `/en/resources` | **180.9 ms** | 180 ms | 218 ms | 50 | `force-dynamic`, `revalidate=0` |
| *(Dynamic Lag)* | `/ar/resources` | **181.4 ms** | 182 ms | 213 ms | 50 | `force-dynamic`, `revalidate=0` |
| | `/en/resources/blog` | **156.8 ms** | 155 ms | 197 ms | 50 | `force-dynamic`, `revalidate=0` |
| | `/ar/resources/blog` | **156.9 ms** | 155 ms | 194 ms | 50 | `force-dynamic`, `revalidate=0` |
| | `/en/resources/downloads` | **132.4 ms** | 127 ms | 165 ms | 50 | `force-dynamic`, `revalidate=0` |
| | `/ar/resources/downloads` | **146.1 ms** | 131 ms | 203 ms | 50 | `force-dynamic`, `revalidate=0` |
| | `/en/resources/events` | **126.7 ms** | 127 ms | 161 ms | 50 | `force-dynamic`, `revalidate=0` |
| | `/ar/resources/events` | **135.6 ms** | 134 ms | 171 ms | 50 | `force-dynamic`, `revalidate=0` |
| | `/en/resources/podcasts` | **133.7 ms** | 124 ms | 170 ms | 50 | `force-dynamic`, `revalidate=0` |
| | `/ar/resources/podcasts` | **136.3 ms** | 136 ms | 161 ms | 50 | `force-dynamic`, `revalidate=0` |
| **Admin API** | `/api/admin/auth/verify` | **25.2 ms** | 19 ms | 84 ms | 50 | Authenticated session check |
| *(Authenticated)* | `/api/admin/resources` | **22.4 ms** | 19 ms | 38 ms | 50 | In-memory JSON read |
| | `/api/admin/media` | **19.7 ms** | 18 ms | 35 ms | 50 | Filesystem directory read |

### Key Server Latency Observations:
1. **Dynamic Bypass Penalty on Resources:** Resource pages have nearly **3× the latency** of `/en/for-providers` (181 ms vs 66 ms). The cause is explicit: `export const dynamic = 'force-dynamic'` forces Next.js to reconstruct the full React virtual DOM on every single request, completely bypassing the Next.js full-route cache.
2. **Admin API Speed:** Admin API routes are lean (~20 ms) because `src/lib/resources/store.ts` utilizes an in-memory cache for `resources.json`.
