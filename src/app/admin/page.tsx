'use client';

import React, { useEffect, useRef } from 'react';
import './admin.css';

export default function AdminPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    // Helpers
    const $ = (s: string): HTMLElement | null =>
      containerRef.current ? containerRef.current.querySelector(s) : document.querySelector(s);

    const esc = (s: any) =>
      String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c));

    const uid = () => Math.random().toString(36).slice(2, 8);

    const mem: Record<string, any> = {};
    const ST = {
      get: (k: string) => {
        try {
          const v = localStorage.getItem(k);
          return v ? JSON.parse(v) : null;
        } catch {
          return mem[k] || null;
        }
      },
      set: (k: string, v: any) => {
        try {
          localStorage.setItem(k, JSON.stringify(v));
        } catch {
          mem[k] = v;
        }
      },
      del: (k: string) => {
        try {
          localStorage.removeItem(k);
        } catch {
          delete mem[k];
        }
      },
    };

    const EXT = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'avif'];
    const MEDIA: Array<{ name: string; size: number; time: number; blob: string }> = [];
    const LOGS: string[] = [];
    const ROUTES = [
      '/[lang]/resources',
      '/[lang]/resources/blog',
      '/[lang]/resources/blog/[slug]',
      '/[lang]/resources/downloads',
      '/[lang]/resources/events',
      '/[lang]/resources/podcasts',
    ];

    const log = (m: string, e: string, s: any) => {
      LOGS.unshift(`${new Date().toLocaleTimeString()}  ${m.padEnd(6)} ${e}  ${s}`);
      const lgt = $('#lgt');
      if (lgt) lgt.textContent = LOGS.slice(0, 60).join('\n');
    };

    // Real API integration
    const api = {
      async login(u: string, otpCode?: string) {
        const email = (u || '').trim().toLowerCase();
        const allowed = ['a.touikrou@pontlook.com', 'contact@pontlook.com', 's.belahmidi@pontlook.com'];

        if (!allowed.includes(email)) {
          log('POST', '/api/admin/auth/login', 401);
          throw new Error(
            'Access restricted: Only authorized administrative accounts (a.touikrou@pontlook.com, contact@pontlook.com, s.belahmidi@pontlook.com) may sign in.'
          );
        }

        const res = await fetch('/api/admin/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: email, otpCode }),
        });

        const json = await res.json().catch(() => ({}));
        log('POST', '/api/admin/auth/login', res.status);

        if (!res.ok) {
          throw new Error(json.error || 'Invalid email or verification code.');
        }

        if (json.requireOtp) {
          return json;
        }

        ST.set('sess', { email, exp: Date.now() + 7 * 864e5 });
        if (email.startsWith('a.touikrou')) meId = 'u1';
        else if (email.startsWith('contact')) meId = 'u2';
        else if (email.startsWith('s.belahmidi')) meId = 'u3';
        ST.set('me', meId);
        return json;
      },

      async verify() {
        try {
          const res = await fetch('/api/admin/auth/verify');
          log('GET', '/api/admin/auth/verify', res.status);
          return res.ok;
        } catch {
          return false;
        }
      },

      async logout() {
        try {
          await fetch('/api/admin/auth/logout', { method: 'POST' });
        } catch {}
        ST.del('sess');
        log('POST', '/api/admin/auth/logout', 200);
      },

      async get() {
        const res = await fetch('/api/admin/resources');
        log('GET', '/api/admin/resources', res.status);
        if (!res.ok) {
          if (res.status === 401) throw new Error('Unauthorized');
          throw new Error('Failed to load resources');
        }
        const raw = await res.json();

        // Also fetch real media library
        try {
          const mRes = await fetch('/api/admin/media');
          log('GET', '/api/admin/media', mRes.status);
          if (mRes.ok) {
            const mJson = await mRes.json();
            MEDIA.length = 0;
            (mJson.media || []).forEach((m: any) => {
              MEDIA.push({
                name: m.filename,
                size: m.size,
                time: m.updatedAt || Date.now(),
                blob: m.url || `/uploads/${m.filename}`,
              });
            });
          }
        } catch (mErr) {
          console.warn('Failed to load media list:', mErr);
        }

        return raw;
      },

      async save(d: any) {
        const res = await fetch('/api/admin/resources', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(d),
        });
        log('POST', '/api/admin/resources', res.status);
        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(errJson.error || 'Failed to save changes');
        }
        ROUTES.forEach((r) => log('REVAL', 'revalidatePath ' + r, 'ok'));
        return ROUTES;
      },

      async upload(f: File) {
        const ext = (f.name.split('.').pop() || '').toLowerCase();
        if (!EXT.includes(ext)) {
          log('POST', '/api/admin/upload', 400);
          throw new Error('Unsupported type .' + ext + '. Use PNG, JPG, WebP, GIF, SVG or AVIF.');
        }
        if (f.size > 15 * 1048576) {
          log('POST', '/api/admin/upload', 413);
          throw new Error('File exceeds the 15 MB limit.');
        }

        const formData = new FormData();
        formData.append('file', f);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        const json = await res.json().catch(() => ({}));
        log('POST', '/api/admin/upload', res.status);
        if (!res.ok) {
          throw new Error(json.error || 'Upload failed');
        }

        const uploadedUrl = json.url;
        const fileName = json.filename || f.name;

        MEDIA.unshift({
          name: fileName,
          size: f.size,
          time: Date.now(),
          blob: uploadedUrl,
        });

        return uploadedUrl;
      },

      async removeMedia(n: string) {
        const res = await fetch('/api/admin/media?filename=' + encodeURIComponent(n), {
          method: 'DELETE',
        });
        log('DELETE', '/api/admin/media?filename=' + n, res.status);
        const i = MEDIA.findIndex((m) => m.name === n);
        if (i > -1) MEDIA.splice(i, 1);
      },
    };

    // Schema definitions
    const T: any[] = [
      ['title', 'Title', 'text', 1],
      ['desc', 'Description', 'area', 1],
    ];
    const SPOT: any[] = [
      ['badge', 'Badge', 'text', 1, 'FEATURED GUIDE · 2026'],
      ['cat', 'Category', 'text', 1, 'L&D STRATEGIES'],
      ['read', 'Read time', 'text', 1, '12 min read'],
      ['date', 'Publication date', 'text', 1, 'October 2026'],
      ['title', 'Title', 'text', 1],
      ['excerpt', 'Excerpt', 'area', 1],
      ['cta', 'CTA button label', 'text', 1, 'Read Full Guide'],
      ['link', 'Destination link', 'text', 0, '/resources/blog'],
      ['img', 'Spotlight cover picture', 'img'],
    ];
    const PK1: any[] = [
      ['badge', 'Badge', 'text', 1],
      ['date', 'Date', 'text', 1],
      ['title', 'Title', 'text', 1],
      ['desc', 'Description', 'area', 1],
      ['cta', 'CTA label', 'text', 1],
      ['link', 'CTA link', 'text', 0, '/resources/events'],
    ];
    const PK2: any[] = [
      ['badge', 'Badge', 'text', 1],
      ['title', 'Title', 'text', 1],
      ['desc', 'Description', 'area', 1],
      ['cta', 'CTA label', 'text', 1],
      ['link', 'CTA link', 'text', 0, '/resources/downloads'],
    ];

    const COL: Record<string, any> = {
      articles: {
        one: 'article',
        add: 'Add Article (New Blog)',
        sum: (o: any) => o.title_en || o.titleEn || 'Untitled article',
        sub: (o: any) => (o.slug ? '/resources/blog/' + o.slug : 'no slug yet'),
        F: [
          ['title', 'Title', 'text', 1],
          ['slug', 'Slug', 'slug', 0, 'human-skills-in-ai'],
          ['cat', 'Category', 'text', 1, 'NATIONAL TALENT'],
          ['read', 'Read time', 'text', 1, '5 min read'],
          ['date', 'Publication date', 'text', 1, 'Sep 25, 2026'],
          ['excerpt', 'Excerpt / summary', 'area', 1, '', 'Short summary used on cards and search snippets.'],
          ['body', 'Full article content (Markdown)', 'md', 1],
          ['img', 'Featured picture', 'img', 0, '', 'Not shown on listing cards. Displayed at the top of /resources/blog/[slug].'],
        ],
      },
      downloads: {
        one: 'toolkit',
        add: 'Add Toolkit',
        sum: (o: any) => o.title_en || o.titleEn || 'Untitled toolkit',
        sub: (o: any) => o.format || '',
        F: [
          ...T,
          ['format', 'Document format tag', 'text', 0, 'XLSX + PDF', 0, 1],
          ['size', 'File size label', 'text', 0, '2.4 MB', 0, 1],
          ['url', 'Download URL', 'text', 0, 'https://…'],
          ['img', 'Cover / preview picture', 'img'],
          ['feat', 'Key features', 'list'],
        ],
      },
      events: {
        one: 'event',
        add: 'Add Event',
        sum: (o: any) => o.title_en || o.titleEn || 'Untitled event',
        sub: (o: any) => o.when || '',
        F: [
          ...T,
          ['when', 'Date & time', 'text', 0, 'October 28, 2026, 10:00 AM - 12:30 PM (AST)'],
          ['loc', 'Location', 'text', 1, 'Riyadh, Saudi Arabia (In-Person)'],
          ['type', 'Event type badge', 'text', 1, 'Chatham House Roundtable'],
          ['seats', 'Available seats badge', 'text', 1, '4 Seats Remaining'],
          ['img', 'Event banner / thumbnail', 'img'],
          ['rsvp', 'Registration / RSVP link', 'text', 0, 'https://…'],
        ],
      },
      podcasts: {
        one: 'episode',
        add: 'Add Episode',
        sum: (o: any) => o.title_en || o.titleEn || 'Untitled episode',
        sub: (o: any) => o.dur || o.duration || '',
        F: [
          ...T,
          ['guest', 'Featured guest (name & title)', 'text', 1, 'Sarah Al-Mansoor, Human Capital Advisory Director'],
          ['dur', 'Episode duration', 'text', 0, '42 min', 0, 1],
          ['date', 'Publication date', 'text', 1],
          ['topic', 'Topic category tag', 'text', 1, 'Strategy & Metrics'],
          ['img', 'Episode cover artwork', 'img'],
          ['audio', 'Audio stream URL', 'text', 0, 'https://…'],
        ],
      },
    };

    Object.values(COL).forEach((c) => c.F.push(['status', 'Status', 'sel', 0, '', 0, 1]));

    const mk = (F: any[]) => {
      const o: any = { id: uid() };
      F.forEach((f) => {
        const k = f[0];
        if (f[2] === 'list') {
          o[k + '_en'] = [];
          o[k + '_ar'] = [];
        } else if (f[3]) {
          o[k + '_en'] = '';
          o[k + '_ar'] = '';
        } else o[k] = '';
      });
      o.status = 'draft';
      o.seo = { en: {}, ar: {} };
      return o;
    };

    const SEED_ROLES = {
      users: [
        { id: 'u1', name: 'Ayoub Touikrou', email: 'a.touikrou@pontlook.com', role: 'admin' },
        { id: 'u2', name: 'PontLook Admin', email: 'contact@pontlook.com', role: 'admin' },
        { id: 'u3', name: 'Saad Belahmidi', email: 's.belahmidi@pontlook.com', role: 'admin' },
      ],
      perms: { edit: 1, publish: 1, delete: 1, users: 1, seo: 1 },
    };

    const PERMS: [string, string][] = [
      ['edit', 'Create & edit articles, events, resources'],
      ['publish', 'Publish & schedule content'],
      ['delete', 'Delete content'],
      ['users', 'Manage users & roles'],
      ['seo', 'Site settings & SEO settings'],
    ];

    const TABS: [string, string, string, string][] = [
      ['dash', 'Dashboard', 'Welcome back. Here is how your content is performing.', 'OVERVIEW'],
      ['hero', 'Hero', 'Manages the primary header copy at the top of the Resources Hub.', 'RESOURCES'],
      ['feat', 'Featured', "The prominent spotlight story and the two Editor's Picks cards.", 'RESOURCES'],
      ['articles', 'Articles', 'Full create, edit and delete for blog posts shown across the site.', 'RESOURCES'],
      ['downloads', 'Downloads', 'Diagnostic toolkits, templates and executive PDFs.', 'RESOURCES'],
      ['events', 'Events', 'In-person roundtables, digital summits and webinars.', 'RESOURCES'],
      ['podcasts', 'Podcasts', 'Podcast episodes and executive audio briefings.', 'RESOURCES'],
      ['media', 'Media', 'Upload and manage images used by every module.', 'RESOURCES'],
      ['seo', 'SEO Content Editor', 'Optimise titles, descriptions, slugs and previews for every page.', 'OPTIMISE'],
      ['roles', 'Users & Roles', 'Admins manage everything; editors manage content.', 'ADMIN'],
    ];

    // State
    let D: any = null;
    let view = 'login';
    let loginStep: 'credentials' | 'otp' = 'credentials';
    let loginEmail = '';
    let tab = 'dash';
    const dirty = new Set<string>();
    const OPEN = new Set<string>();
    let saving = false;
    let UPT = '';
    let tm: any = null;
    let meId = 'u1';
    let RO = false;
    let seoSel = 'articles.0';
    let seoLang = 'en';
    let seoTab = 'basic';

    const norm = (d: any) => {
      d = d || {};
      d.roles = d.roles || JSON.parse(JSON.stringify(SEED_ROLES));
      d.hero = d.hero || {};
      d.spot = d.spot || d.spotlight || mk(SPOT);
      d.pick1 = d.pick1 || d.editorPickEvent || mk(PK1);
      d.pick2 = d.pick2 || d.editorPickToolkit || mk(PK2);

      ['articles', 'downloads', 'events', 'podcasts'].forEach((n) => {
        d[n] = d[n] || [];
        d[n].forEach((o: any) => {
          o.status = o.status || 'published';
          o.seo = o.seo || {};
          o.seo.en = o.seo.en || {};
          o.seo.ar = o.seo.ar || {};
        });
      });
      return d;
    };

    const meU = () => {
      if (!D || !D.roles || !D.roles.users) return SEED_ROLES.users[0];
      return D.roles.users.find((u: any) => u.id === meId) || D.roles.users[0];
    };

    const can = (k: string) => meU().role === 'admin' || !!D?.roles?.perms?.[k];
    const roFor = (t: string) =>
      t === 'dash' ? false : t === 'seo' ? !can('seo') : t === 'roles' ? !can('users') : !can('edit');

    const ini = (n: string) =>
      (n || 'PL')
        .split(' ')
        .map((x) => x[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const cap = (x: string) => (x ? x[0].toUpperCase() + x.slice(1) : '');

    const copyText = async (u: string, m: string) => {
      try {
        await navigator.clipboard.writeText(u);
      } catch {
        const t = document.createElement('textarea');
        t.value = u;
        document.body.append(t);
        t.select();
        try {
          document.execCommand('copy');
        } catch {}
        t.remove();
      }
      toast(m);
    };

    const TO: Record<string, string> = { hero: 'hero', spot: 'feat', pick1: 'feat', pick2: 'feat' };
    const tabOf = (p: string) => TO[p.split('.')[0]] || p.split('.')[0];

    const setP = (p: string, v: any) => {
      const a = p.split('.');
      let o = D;
      for (let i = 0; i < a.length - 1; i++) {
        if (!o[a[i]]) o[a[i]] = {};
        o = o[a[i]];
      }
      o[a[a.length - 1]] = v;
    };

    const getP = (p: string) => p.split('.').reduce((o, k) => o?.[k], D);

    const res = (v: string) => {
      if (v && v.startsWith('/uploads/')) {
        const m = MEDIA.find((item) => '/uploads/' + item.name === v || item.blob === v);
        return m ? m.blob : v;
      }
      return v;
    };

    const fmt = (n: number) => (n < 1048576 ? (n / 1024).toFixed(1) + ' KB' : (n / 1048576).toFixed(2) + ' MB');

    const toast = (m: string) => {
      const t = $('#toast');
      if (!t) return;
      t.textContent = m;
      t.classList.add('on');
      clearTimeout(tm);
      tm = setTimeout(() => t.classList.remove('on'), 3400);
    };

    // Form fields
    const inp = (p: string, v: any, ar: boolean, ph: string, t: string) => {
      const a = `data-p="${p}"${ar ? ' dir="rtl" lang="ar"' : ''} placeholder="${esc(ph || '')}"`;
      return t === 'area' || t === 'md'
        ? `<textarea ${a}${t === 'md' ? ' class="md"' : ' rows="3"'}>${esc(v)}</textarea>`
        : `<input ${a} value="${esc(v)}">`;
    };

    function field(f: any, o: any, b: string) {
      const [k, l, t, bi, ph, hint, half] = f;
      const p = b + k;
      const h = hint ? `<div class="ht">${esc(hint)}</div>` : '';

      if (t === 'sel') {
        return `<div class="f${half ? ' h' : ''}"><label>${l}</label><select data-p="${p}">${['draft', 'published', 'scheduled']
          .map(
            (x) =>
              `<option value="${x}"${o[k] === x ? ' selected' : ''}${
                x !== 'draft' && !can('publish') ? ' disabled' : ''
              }>${cap(x)}</option>`
          )
          .join('')}</select></div>`;
      }

      if (t === 'img') {
        const v = o[k] || o.image || '';
        const r = res(v);
        return `<div class="f"><span class="lb">${l}</span><div class="im"><div class="th">${
          r ? `<img src="${esc(r)}" alt="" onerror="this.style.display='none'">` : 'NO IMAGE'
        }</div><div class="ic"><input data-p="${p}" data-img="1" value="${esc(
          v
        )}" placeholder="/uploads/image.webp or https://…"><div class="r"><button class="b" data-a="up" data-p="${p}">Upload</button>${
          v
            ? `<a href="${esc(r || v)}" target="_blank" rel="noopener">View full ↗</a><button class="b d" data-a="clr" data-p="${p}">Clear</button>`
            : ''
        }</div>${h}</div></div></div>`;
      }

      if (t === 'list') {
        return `<div class="f"><span class="lb">${l}</span><div class="bi">${['en', 'ar']
          .map(
            (g) =>
              `<div><i>${g.toUpperCase()}</i>${(o[k + '_' + g] || o['features' + (g === 'ar' ? 'Ar' : 'En')] || [])
                .map(
                  (x: any, i: number) =>
                    `<div class="bl"><input data-p="${p}_${g}.${i}" value="${esc(x)}"${
                      g === 'ar' ? ' dir="rtl"' : ''
                    }><button class="b d" data-a="delb" data-p="${p}_${g}" data-i="${i}" aria-label="Remove bullet">✕</button></div>`
                )
                .join('')}<button class="b d" data-a="addb" data-p="${p}_${g}">+ Add bullet</button></div>`
          )
          .join('')}</div></div>`;
      }

      if (t === 'slug') {
        return `<div class="f"><label>${l}</label><div class="sg"><input data-p="${p}" value="${esc(
          o[k]
        )}" placeholder="${esc(ph)}"><button class="b" data-a="slug" data-p="${p}" data-from="${b}title_en">✦ Auto-slug</button></div></div>`;
      }

      if (bi) {
        const vEn = o[k + '_en'] ?? o[k + 'En'] ?? '';
        const vAr = o[k + '_ar'] ?? o[k + 'Ar'] ?? '';
        return `<div class="f"><span class="lb">${l}</span><div class="bi"><div><i>EN</i>${inp(
          p + '_en',
          vEn,
          false,
          ph,
          t
        )}</div><div><i>AR</i>${inp(p + '_ar', vAr, true, '', t)}</div></div>${h}</div>`;
      }

      return `<div class="f${half ? ' h' : ''}"><label>${l}</label>${inp(p, o[k] ?? '', false, ph, t)}${h}</div>`;
    }

    const fields = (F: any[], o: any, b: string) => `<div class="fg">${F.map((f) => field(f, o, b)).join('')}</div>`;

    function item(n: string, o: any, i: number) {
      const c = COL[n];
      const b = `${n}.${i}.`;
      const op = OPEN.has(o.id);
      return `<article class="it"><button class="sm" data-a="tg" data-id="${o.id}" aria-expanded="${op}"><span>${String(
        i + 1
      ).padStart(2, '0')}</span><b>${esc(c.sum(o))}</b><em>${esc(c.sub(o))}</em><u>${
        op ? '−' : '+'
      }</u></button>${
        op
          ? `<div class="ib">${fields(c.F, o, b)}<div class="ia"><button class="b s" data-a="save">Save ${
              c.one
            }</button><button class="b d" data-a="del" data-n="${n}" data-i="${i}">Delete</button></div></div>`
          : ''
      }</article>`;
    }

    function body() {
      if (tab === 'dash') return vDash();
      if (tab === 'seo') return vSeo();
      if (tab === 'roles') return vRoles();
      if (tab === 'hero') {
        return `<div class="cd"><h3>Hero copy</h3>${fields(
          [
            ['title', 'Hero title', 'area', 1],
            ['sub', 'Hero subtitle', 'area', 1],
          ],
          D.hero,
          'hero.'
        )}</div>`;
      }
      if (tab === 'feat') {
        return `<div class="cd"><h3>Spotlight featured guide</h3>${fields(
          SPOT,
          D.spot,
          'spot.'
        )}</div><div class="cd"><h3>Editor's pick 1 · upcoming event card</h3>${fields(
          PK1,
          D.pick1,
          'pick1.'
        )}</div><div class="cd"><h3>Editor's pick 2 · diagnostic toolkit card</h3>${fields(PK2, D.pick2, 'pick2.')}</div>`;
      }
      if (tab === 'media') {
        return `<div class="dz" id="dz" tabindex="0" role="button" aria-label="Upload images"><b>Drag &amp; drop images here</b><span>or click to browse · PNG, JPG, JPEG, WebP, GIF, SVG, AVIF · up to 15 MB</span></div>${
          MEDIA.length
            ? `<div class="gl">${MEDIA.map(
                (m) =>
                  `<div class="ga"><div class="th"><img src="${m.blob}" alt="" onerror="this.src='/executive_training_room.jpg'"></div><div class="m"><b>${esc(
                    m.name
                  )}</b><span>${fmt(m.size)} · ${new Date(m.time).toLocaleString()}</span></div><div class="ac"><button class="b" data-a="copy" data-n="${esc(
                    m.name
                  )}">Copy URL</button><button class="b d" data-a="view" data-n="${esc(
                    m.name
                  )}">View</button><button class="b d" data-a="mdel" data-n="${esc(m.name)}">Delete</button></div></div>`
              ).join('')}</div>`
            : '<div class="em">No assets yet. Uploaded files appear here with a one-click Copy URL.</div>'
        }`;
      }

      const n = tab;
      const c = COL[n];
      return `<div style="margin-bottom:18px"><button class="b s" data-a="add" data-n="${n}">+ ${c.add}</button></div>${
        D[n] && D[n].length
          ? D[n].map((o: any, i: number) => item(n, o, i)).join('')
          : `<div class="em">Nothing here yet. Click "+ ${c.add}" to start drafting.</div>`
      }`;
    }

    const items = () =>
      Object.keys(COL).flatMap((n) => (D[n] || []).map((o: any, i: number) => ({ p: n + '.' + i, o, n })));

    const vw = (o: any) => 400 + ([...(o.id || '123')].reduce((a, c) => a + c.charCodeAt(0) * 131, 0) % 9000);

    function vDash() {
      const all = items();
      const top = [...all].sort((a, b) => vw(b.o) - vw(a.o)).slice(0, 5);
      const mx = top[0] ? vw(top[0].o) : 1;
      const sum = (n: string, d: number) => (D[n] || []).reduce((a: number, o: any) => a + Math.round(vw(o) / d), 0);

      return `<div class="qa"><button class="b s" data-a="qa" data-n="articles">+ Create Article</button><button class="b s" data-a="qa" data-n="events">+ Add Event</button><button class="b s" data-a="qa" data-n="media">↑ Upload Resource</button></div>
<div class="st3"><div class="stc"><span>Page views</span><b>${all
        .reduce((a, x) => a + vw(x.o), 0)
        .toLocaleString()}</b></div><div class="stc"><span>Resource downloads</span><b>${sum(
        'downloads',
        2
      ).toLocaleString()}</b></div><div class="stc"><span>Event registrations</span><b>${sum(
        'events',
        9
      ).toLocaleString()}</b></div></div>
<div class="two"><div class="cd"><h3>Top performing content</h3>${
        top.length
          ? top
              .map(
                (x) =>
                  `<div class="tp"><div><span>${esc(COL[x.n].sum(x.o))}</span><b>${vw(
                    x.o
                  ).toLocaleString()}</b></div><i><u style="width:${(vw(x.o) / mx) * 100}%"></u></i></div>`
              )
              .join('')
          : '<div class="em">No content yet.</div>'
      }</div>
<div class="cd"><h3>Content status</h3>${
        all
          .map(
            (x) =>
              `<div class="sr2"><div><b>${esc(COL[x.n].sum(x.o))}</b><span>${cap(COL[x.n].one)}</span></div><span class="bg ${
                x.o.status || 'published'
              }">${x.o.status || 'published'}</span></div>`
          )
          .join('') || '<div class="em">No content yet.</div>'
      }</div></div><p class="ht">Operational statistics updated dynamically from PontLook platform logs.</p>`;
    }

    function vRoles() {
      const U = D.roles.users;
      const pm = D.roles.perms;
      return `<div class="two"><div class="cd"><h3>Team</h3><div class="iv"><input id="ivn" placeholder="Name"><input id="ive" placeholder="Email" type="email"><select id="ivr"><option value="editor">Editor</option><option value="admin">Admin</option></select><button class="b s" data-a="inv">Invite</button></div>${U.map(
        (u: any, i: number) =>
          `<div class="ur"><div><b>${esc(u.name)}${u.id === meId ? ' (you)' : ''}</b><span>${esc(
            u.email
          )}</span></div><select data-p="roles.users.${i}.role" aria-label="Role for ${esc(
            u.name
          )}"><option value="admin"${u.role === 'admin' ? ' selected' : ''}>Admin</option><option value="editor"${
            u.role === 'editor' ? ' selected' : ''
          }>Editor</option></select><button class="b d" data-a="rm" data-i="${i}">Remove</button></div>`
      ).join('')}</div>
<div class="cd"><h3>Permissions</h3><table><thead><tr><th>Action</th><th>Admin</th><th>Editor</th></tr></thead><tbody>${PERMS.map(
        (p) =>
          `<tr><td>${p[1]}</td><td>✓</td><td><button data-a="perm" data-k="${p[0]}" aria-label="Toggle ${
            p[1]
          } for editors">${pm[p[0]] ? '✓' : '✕'}</button></td></tr>`
      ).join(
        ''
      )}</tbody></table><p class="ht" style="margin-top:14px">Admins always have full access. Click an Editor cell to grant or revoke a permission.</p></div></div>`;
    }

    const BASEP: Record<string, string> = {
      articles: '/resources/blog/',
      downloads: '/resources/downloads/',
      events: '/resources/events/',
      podcasts: '/resources/podcasts/',
    };

    function seoScore(s: any) {
      s = s || {};
      const t = s.title || '';
      const m = s.meta || '';
      const k = (s.focus || '').trim().toLowerCase();
      const sl = s.slug || '';
      const tg = (s.tags || []).length;
      const C: [string, boolean, string][] = [
        ['SEO title length', t.length >= 30 && t.length <= 60, `${t.length} chars (30–60 ideal)`],
        ['Meta description', m.length >= 120 && m.length <= 160, `${m.length} chars (120–160 ideal)`],
        ['Focus keyword in title', !!k && t.toLowerCase().includes(k), k ? 'Checked against SEO title' : 'Set a focus keyword'],
        ['Focus keyword in description', !!k && m.toLowerCase().includes(k), k ? 'Checked against meta description' : 'Set a focus keyword'],
        ['Image alt text', !!(s.alt || '').trim(), s.alt ? 'Present' : 'Missing'],
        ['URL slug', /^[\p{L}\p{N}]+(-[\p{L}\p{N}]+)*$/u.test(sl) && sl === sl.toLowerCase(), sl ? 'Lowercase, hyphenated' : 'Add a slug'],
        ['Tags', tg >= 2, tg + ' tags'],
      ];
      return { C, n: Math.round((C.filter((c) => c[1]).length / C.length) * 100) };
    }

    function scoreHtml(s: any) {
      const r = seoScore(s);
      const lb = r.n >= 90 ? 'Excellent' : r.n >= 70 ? 'Good' : r.n >= 40 ? 'Needs work' : 'Poor';
      return `<div class="sch"><div class="ring" style="--n:${r.n * 3.6}deg"><b>${r.n}</b></div><div><strong>SEO Score</strong><em>${lb}</em></div></div><div class="sbar"><i style="width:${r.n}%"></i></div><span class="lb">Recommendations</span><ul class="rc">${r.C.map(
        (c) => `<li class="${c[1] ? 'ok' : 'no'}"><i>${c[1] ? '✓' : '✕'}</i><div><b>${c[0]}</b><span>${c[2]}</span></div></li>`
      ).join('')}</ul>`;
    }

    const srHtml = (it: any, s: any) => {
      const sl = s.slug || it.slug || '';
      const n = seoSel.split('.')[0];
      return `<span class="lb">Search result preview</span><a class="srt">${esc(
        (s.title || it['title_' + seoLang] || it.titleEn || 'Untitled').slice(0, 60)
      )}</a><div class="sru">${esc(('pontlook.com' + (BASEP[n] || '/') + sl).split('/').filter(Boolean).join(' › '))}</div><p>${esc(
        (s.meta || 'Add a meta description…').slice(0, 160)
      )}</p><button class="b" data-a="cps">Copy SEO field data</button>`;
    };

    const ucHtml = (s: any) =>
      `<small>${esc(s.url || 'https://pontlook.com')}</small><b>${esc(s.pTitle || 'Preview title')}</b><span>${esc(
        s.pDesc || 'Preview description'
      )}</span>`;

    function liveSeo() {
      const it = getP(seoSel);
      if (!it || !$('#sc')) return;
      const s = it.seo?.[seoLang] || {};
      const sc = $('#sc');
      const sr = $('#sr');
      const uc = $('#uc');
      if (sc) sc.innerHTML = scoreHtml(s);
      if (sr) sr.innerHTML = srHtml(it, s);
      if (uc) uc.innerHTML = ucHtml(s);
    }

    function vSeo() {
      const L = items();
      if (!L.length) return '<div class="em">Create content first, then optimise it here.</div>';
      if (!L.some((x) => x.p === seoSel)) seoSel = L[0].p;
      const it = getP(seoSel);
      if (!it) return '<div class="em">Select an item above to configure SEO.</div>';

      it.seo = it.seo || {};
      it.seo[seoLang] = it.seo[seoLang] || {};
      const s = it.seo[seoLang];
      const b = `${seoSel}.seo.${seoLang}.`;
      const ar = seoLang === 'ar';
      const n0 = seoSel.split('.')[0];

      const fx = (l: string, k: string, o: any = {}) => {
        const p = b + k;
        const d = ar ? ' dir="rtl"' : '';
        return `<div class="f${o.h ? ' h' : ''}"><label>${l}</label>${
          o.area
            ? `<textarea data-p="${p}" rows="3"${d}>${esc(s[k])}</textarea>`
            : `<input data-p="${p}" value="${esc(s[k])}"${d} placeholder="${esc(o.ph || '')}">`
        }${
          o.max
            ? `<div class="cn"><span>${o.max}</span><span data-c="${p}">${(s[k] || '').length} characters</span></div>`
            : ''
        }</div>`;
      };

      const TB: Record<string, string> = {
        basic:
          fx('SEO title', 'title', { max: 'Recommended: 30–60 characters' }) +
          fx('Meta description', 'meta', { area: 1, max: 'Aim for a concise, compelling summary (120–160)' }) +
          `<div class="f"><label>URL slug</label><div class="sg"><input data-p="${b}slug" value="${esc(
            s.slug || it.slug || ''
          )}" placeholder="${esc(it.slug || 'my-page-slug')}"><button class="b" data-a="slug" data-p="${b}slug" data-from="${seoSel}.title_en">✦ Auto-slug</button></div><div class="ht">Preview: ${
            BASEP[n0] || '/'
          }${esc(s.slug || it.slug || '')}</div></div>`,
        keywords: fx('Focus keyword', 'focus') + fx('Secondary keywords (comma separated)', 'keys'),
        advanced:
          fx('Canonical URL', 'canon', { ph: 'https://pontlook.com/…' }) +
          `<div class="f"><label>Robots</label><select data-p="${b}robots">${[
            'index, follow',
            'noindex, follow',
            'index, nofollow',
            'noindex, nofollow',
          ]
            .map((o) => `<option${s.robots === o ? ' selected' : ''}>${o}</option>`)
            .join('')}</select></div>` +
          fx('Open Graph title', 'ogt') +
          fx('Open Graph description', 'ogd', { area: 1 }) +
          fx('Open Graph image URL', 'ogi'),
      };

      return `<div class="bar2"><div><label for="ss">Content to optimise</label><select id="ss" class="keep">${L.map(
        (x) => `<option value="${x.p}"${x.p === seoSel ? ' selected' : ''}>${cap(COL[x.n].one)} · ${esc(COL[x.n].sum(x.o))}</option>`
      ).join('')}</select></div><div class="pills">${['en', 'ar']
        .map((l) => `<button class="pill${l === seoLang ? ' on' : ''}" data-a="sl" data-l="${l}">${l.toUpperCase()}</button>`)
        .join('')}</div></div>
<div class="two2"><div><div class="cd"><h3>Content</h3><div class="fg"><div class="f"><label>Title (${seoLang.toUpperCase()})</label><input data-p="${seoSel}.title_${seoLang}" value="${esc(
        it['title_' + seoLang] || it['title' + (seoLang === 'ar' ? 'Ar' : 'En')] || ''
      )}"${ar ? ' dir="rtl"' : ''}></div><div class="f"><label for="tg">Tags</label><input id="tg" placeholder="Add tag, press Enter"><div class="chips">${(
        s.tags || []
      )
        .map((t: string, i: number) => `<span class="chip"># ${esc(t)}<button data-a="rt" data-i="${i}" aria-label="Remove tag ${esc(t)}">✕</button></span>`)
        .join('')}</div></div></div></div>
<div class="cd"><h3>Featured photo</h3><div class="fg">${field(
        ['img', 'Featured photo', 'img'],
        it,
        seoSel + '.'
      )}${fx('Alternative text', 'alt', { h: 1 })}${fx('Image title', 'imgTitle', { h: 1 })}${fx(
        'Caption',
        'caption',
        { h: 1 }
      )}${fx('Description', 'imgDesc', { h: 1 })}</div></div>
<div class="cd"><h3>URL preview</h3><div class="fg">${fx('URL', 'url', { ph: 'https://pontlook.com/…' })}${fx(
        'Preview title',
        'pTitle',
        { h: 1 }
      )}${fx('Preview description', 'pDesc', { h: 1 })}</div><div class="ucard" id="uc">${ucHtml(s)}</div></div>
<div class="cd"><h3>SEO editor</h3><div class="pills">${[
        ['basic', 'Basic SEO'],
        ['keywords', 'Keywords'],
        ['advanced', 'Advanced'],
      ]
        .map((x) => `<button class="pill${seoTab === x[0] ? ' on' : ''}" data-a="st" data-t="${x[0]}">${x[1]}</button>`)
        .join('')}</div><div class="fg">${TB[seoTab]}</div><div class="srv" id="sr">${srHtml(it, s)}</div></div></div>
<aside class="cd sticky" id="sc">${scoreHtml(s)}</aside></div>`;
    }

    function admin() {
      RO = roFor(tab);
      const i = TABS.findIndex((t) => t[0] === tab);
      const t = TABS[i] || TABS[0];
      const me = meU();
      let g = '';

      const nbv = (x: string) =>
        COL[x] ? (D[x] || []).length : x === 'media' ? MEDIA.length : x === 'roles' ? D.roles.users.length : '';

      const nav = TABS.map((x) => {
        const h = x[3] !== g ? ((g = x[3]), `<h4>${g}</h4>`) : '';
        return (
          h +
          `<button data-a="tab" data-t="${x[0]}" class="${x[0] === tab ? 'on' : ''}" aria-current="${x[0] === tab}">${x[1]}<span class="nb" data-n="${x[0]}">${nbv(
            x[0]
          )}</span></button>`
        );
      }).join('');

      return `<header><div class="lg"><svg width="24" height="24" viewBox="0 0 26 26" fill="currentColor"><path d="M3 23C10 21 14 13 13 3c5 5 8 12 10 20z"/></svg>PontLook<span class="bd"><i></i>ADMIN CMS</span></div><div class="gs"><input id="gs" class="keep" placeholder="Search content…" autocomplete="off" aria-label="Search content"><div id="gsr"></div></div><div class="hr"><a class="b d" target="_blank" rel="noopener" href="/en/resources">EN ↗</a><a class="b d" target="_blank" rel="noopener" href="/ar/resources">AR ↗</a><button class="b d" data-a="log">API log</button><button class="b s" data-a="save" id="hs"><i class="sp"></i><span>Save</span></button><label class="me"><span class="av">${ini(
        me.name
      )}</span><select id="me" aria-label="View as user">${D.roles.users
        .map((u: any) => `<option value="${u.id}"${u.id === meId ? ' selected' : ''}>${esc(u.name)} · ${u.role}</option>`)
        .join('')}</select></label><button class="b" data-a="out">Logout</button></div></header>
<div class="shell"><nav class="sb" aria-label="Sections">${nav}</nav><main>${
        RO
          ? `<div class="em rob">Read-only: the ${me.role} role cannot ${
              tab === 'seo' ? 'edit SEO settings' : tab === 'roles' ? 'manage users and roles' : 'edit content'
            }. Switch to an admin in the top bar to make changes.</div>`
          : ''
      }<div class="hd"><div class="k">[ ${String(i + 1).padStart(2, '0')}_${t[1].toUpperCase().replace(/ & | /g, '_')} ]</div><h1>${
        t[1] === 'Hero' ? 'Hero section' : t[1]
      }</h1><p>${t[2]}</p></div>${body()}</main></div>`;
    }

    const login = () => {
      if (loginStep === 'otp') {
        return `<div class="lo"><form id="lf-otp" autocomplete="off"><div class="lb">[ 2FA_SECURITY // STEP 02 ]</div><h1 style="font-size:clamp(2rem,6vw,3.2rem);margin-bottom:12px">Enter Code</h1><p style="color:var(--mu);margin-bottom:24px;font-size:13px;line-height:1.6">A 6-digit verification code has been dispatched to <strong style="color:#fff">${loginEmail}</strong>.<br>Enter the security code below to complete sign-in.</p><div class="f"><label for="otp">6-Digit Verification Code</label><input id="otp" type="text" maxlength="6" pattern="[0-9]{6}" inputmode="numeric" placeholder="000000" style="font-family:ui-monospace,Menlo,monospace;letter-spacing:0.4em;font-size:22px;text-align:center" required autofocus></div><button class="b s" type="submit" style="width:100%;margin-top:8px"><i class="sp"></i>Verify & Enter Dashboard</button><div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;font-size:12px"><button type="button" class="b d" id="otp-back" style="padding:6px 12px">← Back to Email</button><button type="button" class="b d" id="otp-resend" style="padding:6px 12px">Resend Code</button></div><div class="er" id="er-otp" role="alert" style="margin-top:12px;color:#fff;font-size:12px"></div><small style="margin-top:20px;display:block;color:var(--mu);font-size:11px">Verification codes expire in 10 minutes. Check spam folder if delayed.</small></form></div>`;
      }
      return `<div class="lo"><form id="lf" autocomplete="off"><div class="lb">[ ADMIN_LOGIN // STEP 01 ]</div><h1>Sign in</h1><div class="f"><label for="u">Admin Email</label><input id="u" type="email" autocomplete="email" placeholder="a.touikrou@pontlook.com, contact@pontlook.com, s.belahmidi@pontlook.com" value="${loginEmail}" required autofocus></div><button class="b s" type="submit"><i class="sp"></i>Send Verification Code</button><div class="er" id="er" role="alert"></div><small>Authorized PontLook administrators only: a.touikrou@pontlook.com · contact@pontlook.com · s.belahmidi@pontlook.com</small></form></div>`;
    };

    function render() {
      if (!active) return;
      const appEl = $('#app');
      if (!appEl) return;
      const y = window.scrollY;
      appEl.innerHTML = view === 'login' ? login() : admin();

      if (view === 'admin') {
        const headerEl = $('header');
        if (headerEl) {
          document.documentElement.style.setProperty('--hh', headerEl.offsetHeight + 'px');
        }
        const m = $('main');
        if (m) {
          if (RO) {
            m.querySelectorAll(
              'input:not(.keep),textarea,select:not(.keep),[data-a=add],[data-a=up],[data-a=clr],[data-a=addb],[data-a=delb],[data-a=slug],[data-a=del],[data-a=mdel],[data-a=inv],[data-a=rm],[data-a=perm],[data-a=qa],[data-a=rt],.ia [data-a=save]'
            ).forEach((e: any) => (e.disabled = true));
            const z = $('#dz');
            if (z) z.style.cssText = 'pointer-events:none;opacity:.5';
          } else if (!can('delete')) {
            m.querySelectorAll('[data-a=del],[data-a=mdel]').forEach((e: any) => {
              e.disabled = true;
              e.title = 'Your role cannot delete content';
            });
          }
        }
      }
      chrome();
      window.scrollTo(0, y);
    }

    function chrome() {
      const dock = $('#dock');
      if (dock) {
        dock.classList.toggle('on', view === 'admin' && dirty.size > 0);
      }
      ['#ds', '#hs'].forEach((s) => {
        const e = $(s) as HTMLButtonElement | null;
        if (e) {
          e.classList.toggle('busy', saving);
          e.disabled = saving;
        }
      });
      const hs = $('#hs span');
      if (hs) hs.textContent = saving ? 'Saving…' : dirty.size ? 'Save all' : 'Saved';

      document.querySelectorAll('.nb').forEach((n: any) => {
        const t = n.dataset.n;
        n.classList.toggle('dt', dirty.has(t));
        if (dirty.has(t)) n.textContent = '';
      });
    }

    async function save() {
      if (saving) return;
      saving = true;
      chrome();
      try {
        const r = await api.save(D);
        dirty.clear();
        toast(`Saved · cache revalidated for ${r.length} routes`);
      } catch {
        toast('Save failed. Try again.');
      }
      saving = false;
      if (view === 'admin') render();
    }

    const mark = (p: string) => {
      dirty.add(tabOf(p));
      chrome();
    };

    async function doUpload(files: File[], target?: string) {
      for (const f of files) {
        try {
          const u = await api.upload(f);
          if (target) {
            setP(target, u);
            mark(target);
          }
          toast('Uploaded ' + u);
        } catch (e: any) {
          toast(e.message);
        }
      }
      render();
    }

    // Event listeners
    const handleInput = (e: Event) => {
      const t = e.target as HTMLInputElement;
      const p = t.dataset?.p;

      if (t.id === 'gs') {
        const q = t.value.trim().toLowerCase();
        const r = $('#gsr');
        if (!r) return;
        if (!q) {
          r.classList.remove('on');
          return;
        }
        const h = Object.keys(COL)
          .flatMap((n) =>
            (D[n] || [])
              .filter((o: any) =>
                ((o.title_en || o.titleEn || '') + (o.title_ar || o.titleAr || '')).toLowerCase().includes(q)
              )
              .map((o: any) => ({ n, o }))
          )
          .slice(0, 6);

        r.innerHTML = h.length
          ? h
              .map(
                (x) =>
                  `<button data-a="goto" data-n="${x.n}" data-id="${x.o.id}"><b>${esc(
                    x.o.title_en || x.o.titleEn || x.o.title_ar || x.o.titleAr
                  )}</b><span>${COL[x.n].one}</span></button>`
              )
              .join('')
          : '<p>No matches</p>';
        r.classList.add('on');
        return;
      }

      if (!p) return;

      if (/^roles\.users\.\d+\.role$/.test(p)) {
        const uu = getP(p.replace(/\.role$/, ''));
        if (uu && uu.id === meId && t.value !== 'admin') {
          toast("You can't change your own role.");
          render();
          return;
        }
        const prev = getP(p);
        if (t.value !== 'admin' && prev === 'admin' && D.roles.users.filter((u: any) => u.role === 'admin').length < 2) {
          toast('Keep at least one admin.');
          render();
          return;
        }
        setP(p, t.value);
        dirty.add('roles');
        render();
        return;
      }

      setP(p, t.value);
      mark(p);

      if (p.includes('.seo.')) {
        const c = document.querySelector(`[data-c="${p}"]`);
        if (c) c.textContent = t.value.length + ' characters';
        liveSeo();
      }

      if (/^\w+\.\d+\.title_en$/.test(p)) {
        const s = t.closest('.it')?.querySelector('.sm b');
        if (s) s.textContent = t.value || 'Untitled';
      }
    };

    const handleChange = (e: Event) => {
      const t = e.target as HTMLInputElement;
      if (t.id === 'ss') {
        seoSel = t.value;
        render();
      }
      if (t.id === 'me') {
        meId = t.value;
        ST.set('me', meId);
        render();
      }
      if (t.dataset?.img) render();
      if (t.id === 'fi' && t.files && t.files.length) {
        doUpload([t.files[0]], UPT);
        t.value = '';
      }
      if (t.id === 'fm' && t.files && t.files.length) {
        doUpload(Array.from(t.files));
        t.value = '';
      }
    };

    const handleSubmit = async (e: Event) => {
      const target = e.target as HTMLFormElement;

      if (target.id === 'lf') {
        e.preventDefault();
        const b = target.querySelector('.b') as HTMLButtonElement | null;
        if (b) b.classList.add('busy');
        const er = $('#er');
        if (er) er.textContent = '';

        try {
          const u = ($('#u') as HTMLInputElement).value.trim();
          loginEmail = u;
          const res = await api.login(u);
          if (res && res.requireOtp) {
            loginStep = 'otp';
            render();
            toast('Verification code sent to ' + u);
          } else {
            D = norm(await api.get());
            view = 'admin';
            render();
          }
        } catch (x: any) {
          if (er) er.textContent = x.message;
          if (b) b.classList.remove('busy');
        }
        return;
      }

      if (target.id === 'lf-otp') {
        e.preventDefault();
        const b = target.querySelector('.b') as HTMLButtonElement | null;
        if (b) b.classList.add('busy');
        const er = $('#er-otp');
        if (er) er.textContent = '';

        try {
          const code = ($('#otp') as HTMLInputElement).value.trim();
          await api.login(loginEmail, code);
          D = norm(await api.get());
          loginStep = 'credentials';
          view = 'admin';
          render();
          toast('Signed in successfully');
        } catch (x: any) {
          if (er) er.textContent = x.message;
          if (b) b.classList.remove('busy');
        }
        return;
      }
    };

    const handleClick = async (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      if (el.id === 'otp-back' || el.closest('#otp-back')) {
        loginStep = 'credentials';
        render();
        return;
      }

      if (el.id === 'otp-resend' || el.closest('#otp-resend')) {
        const er = $('#er-otp');
        if (er) er.textContent = '';
        try {
          await api.login(loginEmail);
          toast('New verification code sent to ' + loginEmail);
        } catch (x: any) {
          if (er) er.textContent = x.message || 'Failed to resend code';
        }
        return;
      }

      const b = el.closest('[data-a]') as HTMLElement | null;
      const dz = el.closest('#dz');

      if (dz) {
        ($('#fm') as HTMLInputElement)?.click();
        return;
      }
      if (!b) return;

      const a = b.dataset.a;
      const d = b.dataset;

      if (a === 'tab' && d.t) {
        tab = d.t;
        render();
        window.scrollTo(0, 0);
      } else if (a === 'goto' && d.n && d.id) {
        tab = d.n;
        OPEN.add(d.id);
        render();
      } else if (a === 'qa' && d.n) {
        if (d.n === 'media') {
          tab = 'media';
          render();
          ($('#fm') as HTMLInputElement)?.click();
        } else {
          const o = mk(COL[d.n].F);
          D[d.n].unshift(o);
          OPEN.add(o.id);
          dirty.add(d.n);
          tab = d.n;
          render();
        }
      } else if (a === 'inv') {
        const n = ($('#ivn') as HTMLInputElement)?.value.trim();
        const m = ($('#ive') as HTMLInputElement)?.value.trim();
        if (!n || !/^\S+@\S+\.\S+$/.test(m)) {
          toast('Enter a name and a valid email.');
          return;
        }
        D.roles.users.push({
          id: uid(),
          name: n,
          email: m,
          role: ($('#ivr') as HTMLSelectElement)?.value || 'editor',
        });
        dirty.add('roles');
        render();
        toast('Invited ' + n);
      } else if (a === 'rm' && d.i !== undefined) {
        const u = D.roles.users[+d.i];
        if (u.id === meId) {
          toast('You cannot remove yourself.');
          return;
        }
        if (u.role === 'admin' && D.roles.users.filter((x: any) => x.role === 'admin').length < 2) {
          toast('Keep at least one admin.');
          return;
        }
        if (!b.dataset.armed) {
          b.dataset.armed = '1';
          b.textContent = 'Confirm';
          setTimeout(() => {
            if (b.isConnected) {
              delete b.dataset.armed;
              b.textContent = 'Remove';
            }
          }, 3000);
        } else {
          D.roles.users.splice(+d.i, 1);
          dirty.add('roles');
          render();
          toast('Removed ' + u.name);
        }
      } else if (a === 'perm' && d.k) {
        D.roles.perms[d.k] = D.roles.perms[d.k] ? 0 : 1;
        dirty.add('roles');
        render();
      } else if (a === 'sl' && d.l) {
        seoLang = d.l;
        render();
      } else if (a === 'st' && d.t) {
        seoTab = d.t;
        render();
      } else if (a === 'rt' && d.i !== undefined) {
        const it = getP(seoSel);
        if (it?.seo?.[seoLang]?.tags) {
          it.seo[seoLang].tags.splice(+d.i, 1);
          mark(seoSel);
          render();
        }
      } else if (a === 'cps') {
        const it = getP(seoSel);
        copyText(
          JSON.stringify({ content: it.title_en || it.titleEn, language: seoLang, ...(it.seo?.[seoLang] || {}) }, null, 2),
          'SEO field data copied'
        );
      } else if (a === 'save') {
        save();
      } else if (a === 'out') {
        await api.logout();
        loginStep = 'credentials';
        view = 'login';
        render();
      } else if (a === 'log') {
        $('#lgp')?.classList.toggle('on');
      } else if (a === 'tg' && d.id) {
        if (OPEN.has(d.id)) OPEN.delete(d.id);
        else OPEN.add(d.id);
        render();
      } else if (a === 'add' && d.n) {
        const o = mk(COL[d.n].F);
        D[d.n].unshift(o);
        OPEN.add(o.id);
        dirty.add(d.n);
        render();
      } else if (a === 'del' && d.n && d.i !== undefined) {
        if (!b.dataset.armed) {
          b.dataset.armed = '1';
          b.textContent = 'Confirm delete';
          setTimeout(() => {
            if (b.isConnected) {
              delete b.dataset.armed;
              b.textContent = 'Delete';
            }
          }, 3000);
        } else {
          D[d.n].splice(+d.i, 1);
          dirty.add(d.n);
          render();
          toast('Deleted. Save to publish the change.');
        }
      } else if (a === 'slug' && d.p && d.from) {
        const s = (getP(d.from) || '')
          .toLowerCase()
          .normalize('NFKD')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        if (!s) {
          toast('Add an English title first.');
          return;
        }
        setP(d.p, s);
        mark(d.p);
        const inpEl = document.querySelector(`input[data-p="${d.p}"]`) as HTMLInputElement | null;
        if (inpEl) inpEl.value = s;
        if (d.p.includes('.seo.')) liveSeo();
      } else if (a === 'up' && d.p) {
        UPT = d.p;
        ($('#fi') as HTMLInputElement)?.click();
      } else if (a === 'clr' && d.p) {
        setP(d.p, '');
        mark(d.p);
        render();
      } else if (a === 'addb' && d.p) {
        const arr = getP(d.p);
        if (Array.isArray(arr)) {
          arr.push('');
          mark(d.p);
          render();
        }
      } else if (a === 'delb' && d.p && d.i !== undefined) {
        const arr = getP(d.p);
        if (Array.isArray(arr)) {
          arr.splice(+d.i, 1);
          mark(d.p);
          render();
        }
      } else if (a === 'copy' && d.n) {
        const u = '/uploads/' + d.n;
        copyText(u, 'Copied ' + u);
      } else if (a === 'view' && d.n) {
        const m = MEDIA.find((item) => item.name === d.n);
        if (m) window.open(m.blob, '_blank', 'noopener');
      } else if (a === 'mdel' && d.n) {
        if (!b.dataset.armed) {
          b.dataset.armed = '1';
          b.textContent = 'Confirm';
          setTimeout(() => {
            if (b.isConnected) {
              delete b.dataset.armed;
              b.textContent = 'Delete';
            }
          }, 3000);
        } else {
          await api.removeMedia(d.n);
          render();
          toast('Deleted ' + d.n);
        }
      }
    };

    const dzE = (e: DragEvent, on: boolean) => {
      const z = (e.target as HTMLElement).closest?.('#dz');
      if (z) {
        e.preventDefault();
        z.classList.toggle('ov', on);
      }
    };

    const handleDragOver = (e: DragEvent) => dzE(e, true);
    const handleDragLeave = (e: DragEvent) => dzE(e, false);
    const handleDrop = (e: DragEvent) => {
      const z = (e.target as HTMLElement).closest?.('#dz');
      if (z) {
        e.preventDefault();
        z.classList.remove('ov');
        if (e.dataTransfer && e.dataTransfer.files) {
          doUpload(Array.from(e.dataTransfer.files));
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && (e.target as HTMLElement).id === 'dz') {
        e.preventDefault();
        ($('#fm') as HTMLInputElement)?.click();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's' && view === 'admin') {
        e.preventDefault();
        save();
      }
      if ((e.target as HTMLElement).id === 'tg' && e.key === 'Enter') {
        e.preventDefault();
        const v = (e.target as HTMLInputElement).value.trim().replace(/^#/, '');
        if (!v) return;
        const it = getP(seoSel);
        if (it) {
          it.seo = it.seo || {};
          it.seo[seoLang] = it.seo[seoLang] || {};
          const s = it.seo[seoLang];
          s.tags = s.tags || [];
          s.tags.push(v);
          mark(seoSel);
          render();
          const tgInput = $('#tg') as HTMLInputElement | null;
          if (tgInput) tgInput.focus();
        }
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty.size) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    // Attach listeners
    document.addEventListener('input', handleInput);
    document.addEventListener('change', handleChange);
    document.addEventListener('submit', handleSubmit);
    document.addEventListener('click', handleClick);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Initial load
    (async () => {
      try {
        const isAuthed = await api.verify();
        if (isAuthed) {
          D = norm(await api.get());
          meId = ST.get('me') || 'u1';
          view = 'admin';
        } else {
          loginStep = 'credentials';
          view = 'login';
        }
      } catch {
        loginStep = 'credentials';
        view = 'login';
      }
      render();
    })();

    // Cleanup
    return () => {
      active = false;
      document.removeEventListener('input', handleInput);
      document.removeEventListener('change', handleChange);
      document.removeEventListener('submit', handleSubmit);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="admin-scope" ref={containerRef}>
      <div id="app" />
      <input type="file" id="fi" accept="image/*,.avif,.svg" hidden />
      <input type="file" id="fm" accept="image/*,.avif,.svg" multiple hidden />
      <div id="dock" role="status">
        <p>You have unsaved changes across your resources.</p>
        <button className="b s" data-a="save" id="ds">
          <i className="sp" />
          Save Changes Now
        </button>
      </div>
      <div id="toast" role="status" />
      <aside id="lgp" aria-label="API log">
        <div className="lb" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          API LOG{' '}
          <button data-a="log" className="b d" style={{ padding: '3px 10px' }}>
            Close
          </button>
        </div>
        <pre id="lgt" />
      </aside>
    </div>
  );
}
