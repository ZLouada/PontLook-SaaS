# PontLook L&D Hub — Admin Panel Documentation & Features Guide

Comprehensive overview of all features, architecture, endpoints, and management capabilities available in the **PontLook SaaS Admin Dashboard**.

---

## 📑 Table of Contents
1. [Overview & Access](#-overview--access)
2. [Authentication & Security](#-authentication--security)
3. [Dashboard Layout & Controls](#-dashboard-layout--controls)
4. [Content Management Modules (Tabs)](#-content-management-modules-tabs)
   - [1. Hero Section](#1-hero-section)
   - [2. Featured Spotlight & Editor's Picks](#2-featured-spotlight--editors-picks)
   - [3. Articles & Blog Posts (Knowledge Base)](#3-articles--blog-posts-knowledge-base)
   - [4. Diagnostic Toolkits & Downloads](#4-diagnostic-toolkits--downloads)
   - [5. Executive Events & Roundtables](#5-executive-events--roundtables)
   - [6. Podcasts & Executive Audio](#6-podcasts--executive-audio)
   - [7. Media Library & Asset Manager](#7-media-library--asset-manager)
5. [Media Upload & Dynamic Asset Delivery](#-media-upload--dynamic-asset-delivery)
6. [Data Persistence & Cache Invalidation](#-data-persistence--cache-invalidation)
7. [API Routes Reference](#-api-routes-reference)

---

## 🔐 Overview & Access

The PontLook Admin Panel is a standalone, code-free Content Management System built directly into the Next.js application. It allows administrators to update marketing copy, manage long-form blog articles, configure downloadable tools, schedule events, publish podcasts, and upload media without touching code or redeploying the app.

* **Admin URL:** `/admin`
* **Login URL:** `/admin/login`
* **Default Language Support:** Full bilingual content management (**English & Arabic**) with native Right-to-Left (RTL) input fields.
* **Design Philosophy:** Clean, distraction-free monochrome dark mode (`#000000`, `#0E0E11`, `#141416`, crisp borders, and subtle contrast).

---

## 🛡️ Authentication & Security

* **Direct 1-Step Authentication:** Streamlined login flow without SMS/email 2FA friction.
* **Secure Cookie Sessions:** Authenticated sessions issue an HTTP-only, secure, `SameSite=Lax` cookie (`pontlook_admin_session`) valid for 7 days.
* **Route Protection:** All administrative endpoints under `/api/admin/*` and the `/admin` view require an active authenticated session.
* **Automatic Expiration & Redirects:** Unauthenticated requests automatically redirect to `/admin/login`.
* **Quick Logout:** Instant session invalidation from the top navigation bar.

---

## 🖥️ Dashboard Layout & Controls

* **Top Navigation Bar:**
  * **Brand Header:** Displays PontLook branding with real-time `ADMIN CMS` status badge.
  * **Live Site Quick Links:** Instant buttons to view the live English (`/en/resources`) and Arabic (`/ar/resources`) resource hubs in a new tab.
  * **Global Save Button:** Primary header action to save all unsaved modifications.
  * **Logout Button:** Secure one-click session sign-out.
* **Floating Save Dock:**
  * Automatically slides into view at the bottom of the screen whenever changes are detected.
  * Alerts: *"You have unsaved changes across your resources."*
  * One-click **"Save Changes Now"** button with real-time loading spinner and feedback.
* **Unsaved Changes Warning:** Protects against accidental navigation or tab closure while editing.
* **Tab-Based Navigation:** 7 dedicated tabs for distinct content areas with active indicator badges.

---

## 📦 Content Management Modules (Tabs)

### 1. Hero Section
Manages the primary header copy at the top of the Resources Hub.
* **Hero Title (EN & AR):** Main headline introducing the corporate training and L&D resource hub.
* **Hero Subtitle (EN & AR):** Detailed supporting paragraph explaining the value proposition.

---

### 2. Featured Spotlight & Editor's Picks
Manages the prominent top-of-page featured story and side cards.

* **Spotlight Featured Guide:**
  * **Badge (EN & AR):** (e.g., `FEATURED GUIDE · 2026`)
  * **Category (EN & AR):** (e.g., `L&D STRATEGIES`)
  * **Read Time (EN & AR):** (e.g., `12 min read` / `١٢ دقيقة قراءة`)
  * **Publication Date (EN & AR):** (e.g., `October 2026` / `أكتوبر ٢٠٢٦`)
  * **Title (EN & AR):** Full prominent headline.
  * **Excerpt (EN & AR):** Executive summary of the study/report.
  * **CTA Button Label (EN & AR):** (e.g., `Read Full Guide`)
  * **Destination Link:** Target slug or URL (defaults to `/resources/blog`).
  * **Spotlight Cover Picture:** Image uploader or custom URL.

* **Editor's Pick 1 — Upcoming Event Card:**
  * **Badge, Date & Title (EN & AR)**
  * **Description (EN & AR)**
  * **CTA Label & Link:** Target URL (defaults to `/resources/events`).

* **Editor's Pick 2 — Downloadable Diagnostic Toolkit Card:**
  * **Badge & Title (EN & AR)**
  * **Description (EN & AR)**
  * **CTA Label & Link:** Target URL (defaults to `/resources/downloads`).

---

### 3. Articles & Blog Posts (Knowledge Base)
Full CRUD (Create, Read, Update, Delete) management for articles displayed across the site.

* **New Article Creation:**
  * Clicking **"Add Article (New Blog)"** inserts a new article with **clean, empty input fields** ready for drafting.
* **Auto-Slug Generator:**
  * Clicking the **"Auto-slug"** wand button automatically converts English titles into URL-friendly slugs (e.g., `Human Skills in AI` → `human-skills-in-ai`).
* **Bilingual Fields (English & Arabic):**
  * **Title (EN & AR)**
  * **Category (EN & AR)** (e.g., `NATIONAL TALENT`, `IMPACT & METRICS`)
  * **Read Time (EN & AR)** (e.g., `5 min read`)
  * **Publication Date (EN & AR)** (e.g., `Sep 25, 2026`)
  * **Excerpt / Summary (EN & AR):** Short summary for cards and search snippets.
* **Full Article Content (Markdown / Long-form Text):**
  * Separate multiline editors for English and Arabic full-length article bodies.
  * Formatted with paragraph spacing, headings, and bullet points.
* **Featured Picture:**
  * File uploader with instant thumbnail preview and "View Full" external link.
  * **Card Display Rule:** Pictures are **not shown on listing cards** to keep the grid uniform, sleek, and high-contrast.
  * **Detail Page Rule:** The picture is displayed prominently at the top of the individual article content page (`/resources/blog/[slug]`).
* **Direct Actions:**
  * **Per-Article Save Button:** Save changes immediately without scrolling to the bottom.
  * **Delete Button:** Instant article deletion with automatic store re-sync.

---

### 4. Diagnostic Toolkits & Downloads
Manages downloadable templates, assessment spreadsheets, and executive PDFs.

* **Create & Delete Downloads:** Add new toolkits or remove obsolete templates.
* **Title & Description (EN & AR)**
* **Document Format Tag:** (e.g., `XLSX + PDF`, `Interactive Sheet`, `PDF Guide`)
* **File Size Label:** (e.g., `2.4 MB`, `1.8 MB`)
* **Download URL:** Direct link to the hosted file or intake form.
* **Cover / Preview Picture:** Upload or URL field with preview.
* **Key Features Bullet Points:**
  * Interactive feature list builder for both English and Arabic.
  * Add or remove individual bullet points dynamically.

---

### 5. Executive Events & Roundtables
Manages in-person roundtables, digital summits, and webinars.

* **Create & Delete Events:** Schedule new corporate sessions or remove past events.
* **Title & Description (EN & AR)**
* **Date & Time:** Time-zone specific schedule string (e.g., `October 28, 2026`, `10:00 AM - 12:30 PM (AST)`).
* **Location (EN & AR):** (e.g., `Riyadh, Saudi Arabia (In-Person)` or `Live Interactive Webinar`).
* **Event Type Badge (EN & AR):** (e.g., `Chatham House Roundtable`, `Digital Briefing`).
* **Available Seats Badge (EN & AR):** (e.g., `4 Seats Remaining`, `Open Registration`).
* **Event Banner / Thumbnail Picture:** Upload or URL field.
* **Registration / RSVP Link:** Target registration page or form.

---

### 6. Podcasts & Executive Audio
Manages podcast episodes and audio briefings.

* **Create & Delete Episodes:** Add new episodes or remove archived recordings.
* **Episode Title & Description (EN & AR)**
* **Featured Guest Details (EN & AR):** Name and executive title (e.g., `Sarah Al-Mansoor — Human Capital Advisory Director`).
* **Episode Duration:** (e.g., `42 min`).
* **Publication Date (EN & AR)**
* **Topic Category Tag (EN & AR):** (e.g., `Strategy & Metrics`, `Leadership & Nationalization`).
* **Episode Cover Artwork:** Upload or URL field.
* **Audio Stream URL:** Link to the hosted audio file or podcast platform.

---

### 7. Media Library & Asset Manager
Centralized media manager for managing images and visual assets.

* **Direct Upload Drag & Drop:**
  * Supports `PNG`, `JPG`, `JPEG`, `WebP`, `GIF`, `SVG`, and `AVIF`.
  * Upload file size limit up to **15 MB**.
* **Dual-Storage Persistence:** Automatically writes uploaded assets to both `public/uploads` and `/tmp/pontlook-uploads` to ensure images persist across container restarts.
* **Dynamic Media Serving:** Serves assets via `/uploads/[...file]` route handler with immutable caching headers.
* **Asset Gallery Grid:**
  * Visual thumbnail previews with aspect ratio preservation.
  * File metadata: File name, file size (formatted in KB/MB), and upload timestamp.
  * **"Copy URL" Button:** One-click copy of `/uploads/filename.ext` to clipboard for quick pasting into any module.
  * **"View" Button:** Opens the asset in a new browser tab.
  * **"Delete" Button:** Safely removes the file from both primary and backup storage.

---

## ⚡ Media Upload & Dynamic Asset Delivery

| Component | Path | Responsibility |
| :--- | :--- | :--- |
| **Upload API** | `POST /api/admin/upload` | Validates file type, size, sanitizes filename, and writes to disk storage. |
| **Media Library API** | `GET, DELETE /api/admin/media` | Lists all stored assets sorted by newest first; deletes selected files. |
| **Media Delivery** | `GET /uploads/[...file]` | Streams binary buffers with appropriate MIME type headers and 1-year cache control. |
| **Remote Pattern** | `next.config.mjs` | Configured to support both local `/uploads/*` and any HTTPS external images without breakage. |

---

## 💾 Data Persistence & Cache Invalidation

1. **Dual Storage Engine (`src/lib/resources-store.ts`):**
   * Primary: `src/data/resources.json`
   * Redundant Backup: `/tmp/pontlook-resources.json`
   * In-Memory Cache: Serves requests with zero disk latency; reloads automatically on file modification.
2. **On-Demand Cache Revalidation:**
   * Saving through `/api/admin/resources` triggers Next.js `revalidatePath` across all resource routes:
     * `/[lang]/resources`
     * `/[lang]/resources/blog`
     * `/[lang]/resources/blog/[slug]`
     * `/[lang]/resources/downloads`
     * `/[lang]/resources/events`
     * `/[lang]/resources/podcasts`
3. **Dynamic Route Rendering:**
   * Resource pages use `force-dynamic` rendering (`revalidate = 0`), guaranteeing that newly added or edited articles appear live immediately without rebuilding the application.

---

## 🔌 API Routes Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/admin/auth/login` | Validates credentials and sets HTTP-only session cookie. | No |
| `POST` | `/api/admin/auth/logout` | Clears admin session cookie. | Yes |
| `GET` | `/api/admin/auth/verify` | Checks if current session is authenticated. | No |
| `GET` | `/api/admin/resources` | Retrieves full JSON resources payload for admin editing. | Yes |
| `POST` | `/api/admin/resources` | Validates and persists updated resources JSON + invalidates cache. | Yes |
| `POST` | `/api/admin/upload` | Uploads an image file to disk (`/uploads/...`). | Yes |
| `GET` | `/api/admin/media` | Returns array of all uploaded media files with metadata. | Yes |
| `DELETE` | `/api/admin/media?filename=...` | Deletes a media file from disk storage. | Yes |
| `GET` | `/uploads/[...file]` | Public streaming endpoint for uploaded images and assets. | No |

---

*Documentation generated for PontLook SaaS — October 2026.*
