'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Save,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Headphones,
  Download,
  Sparkles,
  Layout,
  RefreshCw,
} from 'lucide-react';
import type { ResourcesContent } from '@/lib/resources-store';

export default function AdminDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'hero' | 'spotlight' | 'articles' | 'downloads' | 'events' | 'podcasts'>('hero');
  const [data, setData] = useState<ResourcesContent | null>(null);

  // Fetch current data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/resources');
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        if (!res.ok) throw new Error('Failed to load resources');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setErrorMessage(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  // Save changes
  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setSaveSuccess(false);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!res.ok) throw new Error('Failed to save changes');

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw size={28} className="animate-spin text-white" />
          <p className="text-xs font-mono text-neutral-400">LOADING PONTLOOK ADMIN...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
        <div className="bg-[#0e0e11] border border-red-500/20 p-6 rounded-2xl max-w-md text-center">
          <AlertCircle size={28} className="text-red-400 mx-auto mb-2" />
          <h3 className="text-white font-bold mb-1">Failed to load data</h3>
          <p className="text-neutral-400 text-xs mb-4">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 pb-28">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#000000]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center p-1">
              <Image
                src="/images/brand/pontlook-icon-white.png"
                alt="PontLook"
                width={22}
                height={22}
                className="object-contain"
              />
            </div>
            <span className="font-heading font-extrabold text-lg text-white">PontLook</span>
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20 font-semibold">
            CMS ADMIN
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/en/resources"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs transition-colors border border-white/10"
          >
            <span>Live Site</span>
            <ExternalLink size={12} />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-colors border border-red-500/20 cursor-pointer"
          >
            <LogOut size={12} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Page Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Resources Content Manager
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              Edit the live copy, guides, and media across all resources pages without touching any code.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-medium">Auto-Sync Enabled</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 mb-8 no-scrollbar">
          {[
            { id: 'hero', label: 'Hero Canopy', icon: Layout },
            { id: 'spotlight', label: 'Spotlight & Picks', icon: Sparkles },
            { id: 'articles', label: 'Articles & Blog', icon: FileText },
            { id: 'downloads', label: 'Downloads & Toolkits', icon: Download },
            { id: 'events', label: 'Events & Summits', icon: Calendar },
            { id: 'podcasts', label: 'Podcasts', icon: Headphones },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: HERO CANOPY                                       */}
        {/* ======================================================== */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            {/* Live Preview Card */}
            <div className="rounded-3xl bg-neutral-900 border border-white/15 text-white p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-3 end-4 text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                Live Preview
              </div>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white mb-3 max-w-2xl mx-auto leading-tight">
                {data.hero.titleEn || 'The PontLook L&D resource hub'}
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                {data.hero.subtitleEn || 'Insights, strategies, and resources...'}
              </p>
            </div>

            {/* Editable Form */}
            <div className="bg-[#0e0e11] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                Hero Canopy Copy (English & Arabic)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    value={data.hero.titleEn}
                    onChange={(e) =>
                      setData({ ...data, hero: { ...data.hero, titleEn: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    Title (Arabic)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={data.hero.titleAr}
                    onChange={(e) =>
                      setData({ ...data, hero: { ...data.hero, titleAr: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    Subtitle (English)
                  </label>
                  <textarea
                    rows={3}
                    value={data.hero.subtitleEn}
                    onChange={(e) =>
                      setData({ ...data, hero: { ...data.hero, subtitleEn: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                    Subtitle (Arabic)
                  </label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={data.hero.subtitleAr}
                    onChange={(e) =>
                      setData({ ...data, hero: { ...data.hero, subtitleAr: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SPOTLIGHT & EDITOR'S PICKS                        */}
        {/* ======================================================== */}
        {activeTab === 'spotlight' && (
          <div className="space-y-8">
            {/* Main Featured Guide */}
            <div className="bg-[#0e0e11] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                Primary Featured Guide (8-Column Spotlight Card)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    value={data.spotlight.titleEn}
                    onChange={(e) =>
                      setData({ ...data, spotlight: { ...data.spotlight, titleEn: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Title (Arabic)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={data.spotlight.titleAr}
                    onChange={(e) =>
                      setData({ ...data, spotlight: { ...data.spotlight, titleAr: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Excerpt (English)
                  </label>
                  <textarea
                    rows={3}
                    value={data.spotlight.excerptEn}
                    onChange={(e) =>
                      setData({ ...data, spotlight: { ...data.spotlight, excerptEn: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Excerpt (Arabic)
                  </label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={data.spotlight.excerptAr}
                    onChange={(e) =>
                      setData({ ...data, spotlight: { ...data.spotlight, excerptAr: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Category Tag (EN)
                  </label>
                  <input
                    type="text"
                    value={data.spotlight.categoryEn}
                    onChange={(e) =>
                      setData({ ...data, spotlight: { ...data.spotlight, categoryEn: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Read Time (EN)
                  </label>
                  <input
                    type="text"
                    value={data.spotlight.readTimeEn}
                    onChange={(e) =>
                      setData({ ...data, spotlight: { ...data.spotlight, readTimeEn: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Image Path
                  </label>
                  <input
                    type="text"
                    value={data.spotlight.image}
                    onChange={(e) =>
                      setData({ ...data, spotlight: { ...data.spotlight, image: e.target.value } })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Editor's Pick 1: Event */}
            <div className="bg-[#101216] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                Editor&apos;s Pick: Upcoming Event Card
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Title (EN)</label>
                  <input
                    type="text"
                    value={data.editorPickEvent.titleEn}
                    onChange={(e) =>
                      setData({
                        ...data,
                        editorPickEvent: { ...data.editorPickEvent, titleEn: e.target.value },
                      })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Title (AR)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={data.editorPickEvent.titleAr}
                    onChange={(e) =>
                      setData({
                        ...data,
                        editorPickEvent: { ...data.editorPickEvent, titleAr: e.target.value },
                      })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Description (EN)</label>
                  <textarea
                    rows={2}
                    value={data.editorPickEvent.descEn}
                    onChange={(e) =>
                      setData({
                        ...data,
                        editorPickEvent: { ...data.editorPickEvent, descEn: e.target.value },
                      })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Description (AR)</label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={data.editorPickEvent.descAr}
                    onChange={(e) =>
                      setData({
                        ...data,
                        editorPickEvent: { ...data.editorPickEvent, descAr: e.target.value },
                      })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Editor's Pick 2: Toolkit */}
            <div className="bg-[#101216] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                Editor&apos;s Pick: Downloadable Toolkit Card
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Title (EN)</label>
                  <input
                    type="text"
                    value={data.editorPickToolkit.titleEn}
                    onChange={(e) =>
                      setData({
                        ...data,
                        editorPickToolkit: { ...data.editorPickToolkit, titleEn: e.target.value },
                      })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Title (AR)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={data.editorPickToolkit.titleAr}
                    onChange={(e) =>
                      setData({
                        ...data,
                        editorPickToolkit: { ...data.editorPickToolkit, titleAr: e.target.value },
                      })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Description (EN)</label>
                  <textarea
                    rows={2}
                    value={data.editorPickToolkit.descEn}
                    onChange={(e) =>
                      setData({
                        ...data,
                        editorPickToolkit: { ...data.editorPickToolkit, descEn: e.target.value },
                      })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Description (AR)</label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={data.editorPickToolkit.descAr}
                    onChange={(e) =>
                      setData({
                        ...data,
                        editorPickToolkit: { ...data.editorPickToolkit, descAr: e.target.value },
                      })
                    }
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ARTICLES & BLOG                                   */}
        {/* ======================================================== */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                Articles Library ({data.articles.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  const newArt = {
                    id: `art-${Date.now()}`,
                    slug: `new-article-${Date.now()}`,
                    titleEn: 'New Enterprise Training Article',
                    titleAr: 'مقال تدريبي مؤسسي جديد',
                    categoryEn: 'L&D STRATEGIES',
                    categoryAr: 'استراتيجيات التدريب',
                    readTimeEn: '5 min read',
                    readTimeAr: '٥ دقائق قراءة',
                    dateEn: 'October 2026',
                    dateAr: 'أكتوبر ٢٠٢٦',
                    excerptEn: 'Article summary and key takeaways for corporate decision makers.',
                    excerptAr: 'ملخص المقال والنقاط الرئيسية لصناع القرار في التدريب المؤسسي.',
                  };
                  setData({ ...data, articles: [newArt, ...data.articles] });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs cursor-pointer shadow-md"
              >
                <Plus size={14} />
                <span>Add Article</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.articles.map((art, idx) => (
                <div key={art.id || idx} className="bg-[#0e0e11] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-mono text-neutral-300 font-bold">#{idx + 1} Article</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.articles.filter((_, i) => i !== idx);
                        setData({ ...data, articles: updated });
                      }}
                      className="text-neutral-500 hover:text-red-400 text-xs transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (EN)</label>
                      <input
                        type="text"
                        value={art.titleEn}
                        onChange={(e) => {
                          const updated = [...data.articles];
                          updated[idx].titleEn = e.target.value;
                          setData({ ...data, articles: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={art.titleAr}
                        onChange={(e) => {
                          const updated = [...data.articles];
                          updated[idx].titleAr = e.target.value;
                          setData({ ...data, articles: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Excerpt (EN)</label>
                      <textarea
                        rows={2}
                        value={art.excerptEn}
                        onChange={(e) => {
                          const updated = [...data.articles];
                          updated[idx].excerptEn = e.target.value;
                          setData({ ...data, articles: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Excerpt (AR)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={art.excerptAr}
                        onChange={(e) => {
                          const updated = [...data.articles];
                          updated[idx].excerptAr = e.target.value;
                          setData({ ...data, articles: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">Category (EN)</label>
                      <input
                        type="text"
                        value={art.categoryEn}
                        onChange={(e) => {
                          const updated = [...data.articles];
                          updated[idx].categoryEn = e.target.value;
                          setData({ ...data, articles: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">Read Time (EN)</label>
                      <input
                        type="text"
                        value={art.readTimeEn}
                        onChange={(e) => {
                          const updated = [...data.articles];
                          updated[idx].readTimeEn = e.target.value;
                          setData({ ...data, articles: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">URL Slug</label>
                      <input
                        type="text"
                        value={art.slug}
                        onChange={(e) => {
                          const updated = [...data.articles];
                          updated[idx].slug = e.target.value;
                          setData({ ...data, articles: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: DOWNLOADS                                         */}
        {/* ======================================================== */}
        {activeTab === 'downloads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                Downloadable Toolkits ({data.downloads.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  const newDl = {
                    id: `dl-${Date.now()}`,
                    titleEn: 'New Downloadable Corporate Toolkit',
                    titleAr: 'حقيبة ونموذج تدريبي جديد',
                    format: 'PDF + XLSX',
                    fileSize: '1.5 MB',
                    descEn: 'Diagnostic workbook to accelerate workforce readiness.',
                    descAr: 'دليل عملي لتسريع جاهزية وتأهيل الكوادر المؤسسية.',
                    featuresEn: ['Full checklist', 'Formula sheet', 'Executive ready'],
                    featuresAr: ['قائمة مراجعة شاملة', 'معادلات الحساب', 'جاهز للعرض'],
                  };
                  setData({ ...data, downloads: [newDl, ...data.downloads] });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs cursor-pointer shadow-md"
              >
                <Plus size={14} />
                <span>Add Download</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.downloads.map((dl, idx) => (
                <div key={dl.id || idx} className="bg-[#0e0e11] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-mono text-neutral-300 font-bold">#{idx + 1} Download</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.downloads.filter((_, i) => i !== idx);
                        setData({ ...data, downloads: updated });
                      }}
                      className="text-neutral-500 hover:text-red-400 text-xs transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (EN)</label>
                      <input
                        type="text"
                        value={dl.titleEn}
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].titleEn = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={dl.titleAr}
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].titleAr = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Description (EN)</label>
                      <textarea
                        rows={2}
                        value={dl.descEn}
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].descEn = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Description (AR)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={dl.descAr}
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].descAr = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">File Format</label>
                      <input
                        type="text"
                        value={dl.format}
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].format = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">File Size</label>
                      <input
                        type="text"
                        value={dl.fileSize}
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].fileSize = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: EVENTS                                            */}
        {/* ======================================================== */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                Upcoming Executive Events ({data.events.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  const newEvt = {
                    id: `evt-${Date.now()}`,
                    titleEn: 'Executive Corporate Leadership Briefing',
                    titleAr: 'جلسة تدريبية وقيادية تنفيذية',
                    dateEn: 'November 2026',
                    dateAr: 'نوفمبر 2026',
                    time: '10:00 AM - 12:00 PM',
                    locationEn: 'Riyadh / Virtual',
                    locationAr: 'الرياض / افتراضياً',
                    typeEn: 'Executive Roundtable',
                    typeAr: 'طاولة مستديرة تنفيذية',
                    descEn: 'Exclusive discussion on closing skill gaps and enhancing workforce ROI.',
                    descAr: 'نقاش تنفيذي مغلق حول قياس العائد وتأهيل الكفاءات المؤسسية.',
                    spotsLeftEn: 'Open Registration',
                    spotsLeftAr: 'التسجيل متاح',
                  };
                  setData({ ...data, events: [newEvt, ...data.events] });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs cursor-pointer shadow-md"
              >
                <Plus size={14} />
                <span>Add Event</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.events.map((evt, idx) => (
                <div key={evt.id || idx} className="bg-[#0e0e11] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-mono text-neutral-300 font-bold">#{idx + 1} Event</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.events.filter((_, i) => i !== idx);
                        setData({ ...data, events: updated });
                      }}
                      className="text-neutral-500 hover:text-red-400 text-xs transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (EN)</label>
                      <input
                        type="text"
                        value={evt.titleEn}
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].titleEn = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={evt.titleAr}
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].titleAr = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Date (EN)</label>
                      <input
                        type="text"
                        value={evt.dateEn}
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].dateEn = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Location (EN)</label>
                      <input
                        type="text"
                        value={evt.locationEn}
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].locationEn = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: PODCASTS                                          */}
        {/* ======================================================== */}
        {activeTab === 'podcasts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                Podcast Episodes ({data.podcasts.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  const newPod = {
                    id: `ep-${Date.now()}`,
                    titleEn: 'New Leadership & Training Podcast Episode',
                    titleAr: 'حلقة بودكاست جديدة حول التدريب والقيادة',
                    guestEn: 'Guest Name — Title',
                    guestAr: 'اسم الضيف — المنصب',
                    duration: '40 min',
                    dateEn: 'November 2026',
                    dateAr: 'نوفمبر 2026',
                    descEn: 'Insights and actionable conversation on workforce excellence.',
                    descAr: 'حوار ونقاش عملي حول بناء الكفاءات المؤسسية.',
                    tagEn: 'Leadership',
                    tagAr: 'القيادة',
                  };
                  setData({ ...data, podcasts: [newPod, ...data.podcasts] });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs cursor-pointer shadow-md"
              >
                <Plus size={14} />
                <span>Add Episode</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.podcasts.map((pod, idx) => (
                <div key={pod.id || idx} className="bg-[#0e0e11] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-mono text-neutral-300 font-bold">#{idx + 1} Episode</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.podcasts.filter((_, i) => i !== idx);
                        setData({ ...data, podcasts: updated });
                      }}
                      className="text-neutral-500 hover:text-red-400 text-xs transition-colors p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (EN)</label>
                      <input
                        type="text"
                        value={pod.titleEn}
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].titleEn = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={pod.titleAr}
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].titleAr = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Guest (EN)</label>
                      <input
                        type="text"
                        value={pod.guestEn}
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].guestEn = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Guest (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={pod.guestAr}
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].guestAr = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-[#0C0E12]/95 backdrop-blur-xl border-t border-white/10 p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {saveSuccess && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 size={14} />
                <span>Published Live to PontLook Website!</span>
              </div>
            )}
            {errorMessage && (
              <div className="flex items-center gap-2 text-xs text-red-400 font-semibold bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
                <AlertCircle size={14} />
                <span>{errorMessage}</span>
              </div>
            )}
            {!saveSuccess && !errorMessage && (
              <span className="text-xs text-neutral-400 hidden sm:inline">
                Click &quot;Save &amp; Publish&quot; to apply edits to live site immediately.
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                <span>Publishing Changes...</span>
              </>
            ) : (
              <>
                <Save size={15} />
                <span>Save &amp; Publish</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
