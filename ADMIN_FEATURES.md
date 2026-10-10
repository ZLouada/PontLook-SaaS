# PontLook SaaS — Admin CMS Features & Architectural Documentation

Welcome to the **PontLook SaaS Admin CMS** documentation. This document provides a complete inventory of features, architecture, authentication mechanisms, and workflows implemented within the administration portal.

---

## 🎨 Design Philosophy & User Interface

The Admin CMS is built with an **ultra-sleek, minimalist monochrome aesthetic** adhering strictly to PontLook’s corporate executive identity:

* **Monochrome Palette:** Pure black (`#000000`), deep charcoal panels (`#0E0E11`, `#141416`), crisp borders (`#2B2B30`), and stark white accents (`#FFFFFF`).
* **Typography:** Clean, legible `Inter` typography with tight tracking, subtle letter-spacing, and clear hierarchy.
* **Layout Structure:**
  * **Sticky Header:** Features the PontLook brand logo, live system pulse indicator, global search shortcut (`Ctrl+K`), API log drawer toggle (`Ctrl+L`), and logout action.
  * **Sticky Sidebar Navigation:** Quick navigation across 10 functional modules with active state highlighting.
  * **Main Content Stage:** Responsive grid cards and collapsible accordions.
  * **Floating Save Dock:** Dynamically slides up whenever unsaved modifications are made (`Ctrl+S` / `Cmd+S`).
  * **Slide-out API Console:** Real-time log drawer capturing client-server payloads and response statuses.

---

## 🔒 Authentication & Access Control

Access to the admin portal is protected by **strict email whitelisting** and **HMAC-SHA256 session tokens**:

### 1. Authorized Executive Accounts
Only the following three email addresses are authorized to access the Admin CMS:
1. `a.touikrou@pontlook.com`
2. `contact@pontlook.com`
3. `s.belahmidi@pontlook.com`

Any other email address is rejected immediately with a descriptive authorization error.

### 2. Passwordless Email Code Authentication
* **Step 1 (Authorized Email):** The administrator enters their authorized PontLook email address (no password required).
* **Code Dispatch:** A secure 6-digit verification code is generated (10-minute expiry) and dispatched directly to the administrator's email inbox via Web3Forms (with Resend fallback).
* **Step 2 (Code Entry):** The administrator enters the 6-digit code received in their email.
* **Session Security:**
  * **Cookie:** `pontlook_admin_session`
  * **Attributes:** `httpOnly: true`, `secure: true` (in production), `sameSite: "lax"`, `path: "/"`.
  * **Validity:** 7 days rolling validity with HMAC-SHA256 signature validation.
  * **Verification Route:** `/api/admin/auth/verify` dynamically checks session state.

---

## 📦 Functional Modules Breakdown

### 1. Executive Dashboard & System Health
* **KPI Metrics Bar:** Instant count of total articles, published diagnostic toolkits, upcoming executive roundtables, and media assets.
* **Live Activity Feed:** Chronological log of recent publishing events, updates, and uploads.
* **System Status & Storage:** Health checks for storage capacity, memory consumption, and cache readiness.

---

### 2. Hero & Intro Editor
Configures the prominent landing section of the Resources directory (`/[lang]/resources`):
* **Bilingual Headlines (EN & AR):** Prominent header typography.
* **Sub-tagline (EN & AR):** Executive mission statement.
* **Primary Call-to-Action:** Button text (EN/AR) and target route.
* **Secondary Call-to-Action:** Button text (EN/AR) and target route.

---

### 3. Featured Spotlight & Editor's Picks
Manages prominent cards at the top of the Resources hub:
* **Primary Spotlight Feature:**
  * Bilingual Title & Executive Excerpt.
  * Call-to-Action button label and destination URL.
  * Spotlight Cover Image (uploader or URL).
* **Editor's Pick 1 (Executive Event):**
  * Bilingual Category Badge, Date, Title, and Description.
  * RSVP destination URL.
* **Editor's Pick 2 (Diagnostic Toolkit):**
  * Bilingual Category Badge, Title, and Description.
  * Download destination URL.

---

### 4. Articles & Knowledge Base (Blog)
Full CRUD management for thought-leadership articles:
* **Empty New Article Drafting:** Clicking *"Add Article (New Blog)"* creates a fresh, empty draft ready for authoring.
* **Interactive Accordion:** Collapsible card layout allowing focused editing per article.
* **Auto-Slug Generator:** One-click wand tool (`🪄 Auto-slug`) that converts English headlines into clean, URL-safe slugs.
* **Bilingual Metadata:**
  * Title (EN & AR)
  * Category / Tag (EN & AR) (e.g., `NATIONAL TALENT`, `IMPACT & METRICS`)
  * Read Time (EN & AR) (e.g., `5 min read`)
  * Publication Date (EN & AR)
  * Short Summary / Excerpt (EN & AR)
* **Long-Form Markdown Article Body:**
  * Dedicated English and Arabic content editors supporting markdown, headings, bullet lists, and paragraphs.
* **Featured Picture & Presentation Rules:**
  * Picture uploader with instant thumbnail preview and "View Full" external link.
  * **Card Display Rule:** Images are intentionally suppressed on listing cards for a sleek, content-focused executive look.
  * **Detail View Rule:** The featured image is displayed prominently inside the full article reader (`/[lang]/resources/blog/[slug]`).
* **Direct Actions:** Per-article Save and Delete buttons.

---

### 5. Diagnostic Toolkits & Downloads
Configures downloadable spreadsheets, assessment guides, and frameworks:
* **Title & Description (EN & AR)**
* **Document Format Tag:** (e.g., `XLSX + PDF`, `Interactive Sheet`, `PDF Guide`)
* **File Size Label:** (e.g., `2.4 MB`, `1.8 MB`)
* **Direct Download URL:** Hosted file path or intake gate.
* **Dynamic Feature Bullet Points:** Add and remove bullet points for key features in both English and Arabic.

---

### 6. Executive Events & Roundtables
Manages executive roundtables, strategy forums, and webinars:
* **Title & Description (EN & AR)**
* **Date & Time:** Timezone-specific scheduling (e.g., `October 28, 2026`, `10:00 AM AST`).
* **Location (EN & AR):** (e.g., `Riyadh, Saudi Arabia (In-Person)` or `Virtual Executive Briefing`).
* **Event Type Badge (EN & AR):** (e.g., `Chatham House Roundtable`, `Digital Briefing`).
* **Seat Capacity Counter:** (e.g., `4 Seats Remaining`, `Open Registration`).
* **RSVP Link:** Direct registration destination.

---

### 7. Podcasts & Audio Briefings
Manages audio interviews, leadership talks, and corporate podcasts:
* **Episode Title & Description (EN & AR)**
* **Featured Guest Details (EN & AR):** Name and executive title.
* **Episode Duration:** (e.g., `42 min`).
* **Publication Date & Topic Category (EN & AR)**
* **Audio Stream URL:** Link to audio host or embed.

---

### 8. Media Library & Asset Manager
Centralized asset repository with drag-and-drop uploading:
* **Supported Formats:** PNG, JPG, JPEG, WebP, GIF, SVG, AVIF.
* **Maximum File Size:** 15 MB.
* **Dual-Storage Persistence:** Saves concurrently to `public/uploads` and `/tmp/pontlook-uploads` to ensure images persist across rebuilds or container restarts.
* **Asset Grid View:**
  * Thumbnail preview with aspect ratio preservation.
  * File metadata (filename, formatted size, upload date).
  * **"Copy URL":** One-click copy of `/uploads/filename.ext` to clipboard.
  * **"View":** Opens media asset in a new tab.
  * **"Delete":** Permanently deletes file from disk storage.

---

### 9. Real-Time SEO Content Auditor
Interactive content optimization tool:
* **Dynamic Score Ring:** Visual SVG ring calculating an SEO score from `0` to `100%` in real time.
* **Audited Metrics:**
  * Meta Title length (recommended 40–65 characters).
  * Meta Description length (recommended 120–160 characters).
  * Focus keyword density in title, excerpt, and article body.
  * URL slug hyphenation and length.
  * Body copy word count (recommending > 300 words).
* **Live Action Checklist:** Visual checkmarks dynamically toggle between completed and pending tasks.

---

### 10. Users & Roles Permissions Matrix
Executive governance and team access overview:
* **Role Tiers:** `Super Admin`, `Editor`, `Contributor`.
* **Permissions Matrix:** Read, write, and delete permissions mapped across Articles, Events, Downloads, Media, and System Settings.

---

## ⚡ Keyboard Shortcuts & Productivity Features

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + S` / `Cmd + S` | Immediately saves all modified resources to the store. |
| `Ctrl + K` / `Cmd + K` | Focuses the global search input. |
| `Ctrl + L` / `Cmd + L` | Toggles the real-time API request log drawer. |
| `Esc` | Closes search results or open modal drawers. |

---

## 🌐 API & Persistence Reference

| Endpoint | Method | Purpose | Authentication |
| :--- | :--- | :--- | :---: |
| `/api/admin/auth/login` | `POST` | Validates credentials against allowed emails and sets HTTP-only cookie. | Public |
| `/api/admin/auth/verify` | `GET` | Validates current session status. | Public |
| `/api/admin/auth/logout` | `POST` | Invalidates and removes the session cookie. | Authenticated |
| `/api/admin/resources` | `GET` | Fetches complete resources JSON data. | Authenticated |
| `/api/admin/resources` | `POST` | Persists resources data, writes to dual storage, and triggers cache revalidation. | Authenticated |
| `/api/admin/upload` | `POST` | Receives multipart form data and saves image to disk. | Authenticated |
| `/api/admin/media` | `GET` | Returns an array of uploaded files with metadata. | Authenticated |
| `/api/admin/media?filename=...` | `DELETE` | Deletes the specified file from storage. | Authenticated |
| `/uploads/[...file]` | `GET` | Public streaming route delivering uploaded media with caching headers. | Public |

---

*PontLook SaaS Documentation — October 2026*
