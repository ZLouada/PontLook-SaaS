'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Save,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Headphones,
  Download,
  Sparkles,
  Layout,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  Copy,
  Check,
  X,
  Wand2,
} from 'lucide-react';
import type { ResourcesContent } from '@/lib/resources-store';

/* ========================================================================== */
/* REUSABLE IMAGE UPLOAD FIELD                                                */
/* ========================================================================== */
function ImageUploadField({
  label,
  value,
  onChange,
  aspect = 'aspect-video',
}: {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  aspect?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');

      onChange(json.url);
    } catch (err: any) {
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-semibold text-neutral-400">{label}</label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[10px] text-neutral-500 hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            <X size={11} /> Clear
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/... or image URL"
          className="flex-1 bg-[#141416] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
        >
          {uploading ? (
            <>
              <RefreshCw size={13} className="animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={13} />
              <span>Upload Picture</span>
            </>
          )}
        </button>
      </div>

      {error && <p className="text-[10px] text-red-400">{error}</p>}

      {value && (
        <div className={`relative ${aspect} w-full max-w-xs rounded-xl overflow-hidden border border-white/10 bg-neutral-900 mt-2 group`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] hover:bg-black flex items-center gap-1"
            >
              <ExternalLink size={10} /> View full
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/* ADMIN MAIN DASHBOARD                                                       */
/* ========================================================================== */
export default function AdminDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    'hero' | 'spotlight' | 'articles' | 'downloads' | 'events' | 'podcasts' | 'media'
  >('hero');
  const [data, setData] = useState<ResourcesContent | null>(null);

  // Media Library state
  const [mediaFiles, setMediaFiles] = useState<
    Array<{ filename: string; url: string; size: number; updatedAt: number }>
  >([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const mediaFileInputRef = useRef<HTMLInputElement | null>(null);

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

  // Fetch media library files
  const fetchMedia = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const json = await res.json();
        setMediaFiles(json.media || []);
      }
    } catch (err) {
      console.error('Error fetching media:', err);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'media') {
      fetchMedia();
    }
  }, [activeTab]);

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

  const handleMediaUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setMediaUploadProgress(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
      }
      await fetchMedia();
    } catch (err) {
      console.error('Error uploading media files:', err);
    } finally {
      setMediaUploadProgress(false);
      if (mediaFileInputRef.current) mediaFileInputRef.current.value = '';
    }
  };

  const handleDeleteMedia = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;
    try {
      const res = await fetch(`/api/admin/media?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMediaFiles((prev) => prev.filter((m) => m.filename !== filename));
      }
    } catch (err) {
      console.error('Error deleting media file:', err);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-red-400 text-xs transition-colors border border-white/10 cursor-pointer"
          >
            <LogOut size={12} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Resources Content Management
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              Publish and update hero canopy, featured spotlight, blog articles, downloads, events, and media.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 no-scrollbar">
          {[
            { id: 'hero', label: 'Hero Canopy', icon: Layout },
            { id: 'spotlight', label: 'Spotlight & Picks', icon: Sparkles },
            { id: 'articles', label: 'Articles & Blog', icon: FileText },
            { id: 'downloads', label: 'Downloads & Toolkits', icon: Download },
            { id: 'events', label: 'Events & Summits', icon: Calendar },
            { id: 'podcasts', label: 'Podcasts', icon: Headphones },
            { id: 'media', label: 'Media Library', icon: ImageIcon },
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
                  <ImageUploadField
                    label="Spotlight Feature Image"
                    value={data.spotlight.image}
                    onChange={(url) =>
                      setData({ ...data, spotlight: { ...data.spotlight, image: url } })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Editor's Pick 1: Event */}
            <div className="bg-[#0e0e11] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
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
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
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
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            {/* Editor's Pick 2: Toolkit */}
            <div className="bg-[#0e0e11] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
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
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
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
                    className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
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
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                  Articles &amp; Blog Library ({data.articles.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Click &ldquo;Add Article&rdquo; to start a clean new blog post with empty fields ready to fill.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  // ALL FIELDS EXPLICITLY INITIALIZED TO EMPTY STRINGS
                  const newArt = {
                    id: `art-${Date.now()}`,
                    slug: '',
                    titleEn: '',
                    titleAr: '',
                    categoryEn: '',
                    categoryAr: '',
                    readTimeEn: '',
                    readTimeAr: '',
                    dateEn: '',
                    dateAr: '',
                    excerptEn: '',
                    excerptAr: '',
                    image: '',
                    contentEn: '',
                    contentAr: '',
                  };
                  setData({ ...data, articles: [newArt, ...data.articles] });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs cursor-pointer shadow-md"
              >
                <Plus size={14} />
                <span>Add Article (New Blog)</span>
              </button>
            </div>

            <div className="space-y-6">
              {data.articles.map((art, idx) => {
                const autoGenerateSlug = () => {
                  if (!art.titleEn) return;
                  const slugified = art.titleEn
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                  const updated = [...data.articles];
                  updated[idx].slug = slugified;
                  setData({ ...data, articles: updated });
                };

                return (
                  <div key={art.id || idx} className="bg-[#0e0e11] border border-white/10 rounded-2xl p-6 space-y-5">
                    {/* Item Top Bar */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-neutral-300 font-bold">
                          #{idx + 1} Article
                        </span>
                        {art.slug && (
                          <span className="text-[11px] font-mono text-neutral-500 bg-white/5 px-2 py-0.5 rounded-md">
                            /{art.slug}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = data.articles.filter((_, i) => i !== idx);
                          setData({ ...data, articles: updated });
                        }}
                        className="text-neutral-500 hover:text-red-400 text-xs transition-colors p-1"
                        title="Delete article"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Titles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                          Article Title (English)
                        </label>
                        <input
                          type="text"
                          value={art.titleEn}
                          placeholder="e.g. Human Skills in the Age of AI"
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].titleEn = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                          Article Title (Arabic)
                        </label>
                        <input
                          type="text"
                          dir="rtl"
                          value={art.titleAr}
                          placeholder="مثال: بناء المهارات القيادية في عصر الذكاء الاصطناعي"
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].titleAr = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* URL Slug & Meta */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[10px] text-neutral-400">URL Slug</label>
                          {art.titleEn && !art.slug && (
                            <button
                              type="button"
                              onClick={autoGenerateSlug}
                              className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1"
                            >
                              <Wand2 size={10} /> Auto-slug
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          value={art.slug}
                          placeholder="e.g. human-skills-ai"
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].slug = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white font-mono placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">Category (EN)</label>
                        <input
                          type="text"
                          value={art.categoryEn}
                          placeholder="e.g. L&D STRATEGIES"
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].categoryEn = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">Category (AR)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={art.categoryAr}
                          placeholder="مثال: استراتيجيات التدريب"
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].categoryAr = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">Read Time (EN)</label>
                        <input
                          type="text"
                          value={art.readTimeEn}
                          placeholder="e.g. 5 min read"
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].readTimeEn = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">Read Time (AR)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={art.readTimeAr}
                          placeholder="مثال: ٥ دقائق قراءة"
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].readTimeAr = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">Date (EN)</label>
                        <input
                          type="text"
                          value={art.dateEn}
                          placeholder="e.g. Oct 2026"
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].dateEn = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">Date (AR)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={art.dateAr}
                          placeholder="مثال: أكتوبر ٢٠٢٦"
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].dateAr = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Excerpts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Excerpt (EN)</label>
                        <textarea
                          rows={2}
                          value={art.excerptEn}
                          placeholder="Short summary displayed on cards..."
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].excerptEn = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Excerpt (AR)</label>
                        <textarea
                          rows={2}
                          dir="rtl"
                          value={art.excerptAr}
                          placeholder="ملخص موجز يظهر في بطاقات المقالات..."
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].excerptAr = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Featured Image Upload */}
                    <div className="pt-1">
                      <ImageUploadField
                        label="Article Featured Picture"
                        value={art.image}
                        onChange={(url) => {
                          const updated = [...data.articles];
                          updated[idx].image = url;
                          setData({ ...data, articles: updated });
                        }}
                      />
                    </div>

                    {/* Full Article Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                          Full Article Content (English)
                        </label>
                        <textarea
                          rows={6}
                          value={art.contentEn || ''}
                          placeholder="Write the full English article body here..."
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].contentEn = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                          Full Article Content (Arabic)
                        </label>
                        <textarea
                          rows={6}
                          dir="rtl"
                          value={art.contentAr || ''}
                          placeholder="اكتب المحتوى الكامل للمقال هنا باللغة العربية..."
                          onChange={(e) => {
                            const updated = [...data.articles];
                            updated[idx].contentAr = e.target.value;
                            setData({ ...data, articles: updated });
                          }}
                          className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: DOWNLOADS & TOOLKITS                              */}
        {/* ======================================================== */}
        {activeTab === 'downloads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                  Downloads &amp; Toolkits Library ({data.downloads.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Click &ldquo;Add Download&rdquo; to create a new resource with clean empty fields.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newDl = {
                    id: `dl-${Date.now()}`,
                    titleEn: '',
                    titleAr: '',
                    format: '',
                    fileSize: '',
                    descEn: '',
                    descAr: '',
                    image: '',
                    fileUrl: '',
                    featuresEn: [],
                    featuresAr: [],
                  };
                  setData({ ...data, downloads: [newDl, ...data.downloads] });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs cursor-pointer shadow-md"
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
                        placeholder="e.g. 2026 TNA Diagnostic Assessment Template"
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].titleEn = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={dl.titleAr}
                        placeholder="مثال: مصفوفة تقييم الاحتياجات التدريبية (TNA)"
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].titleAr = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">Format (e.g. XLSX + PDF)</label>
                      <input
                        type="text"
                        value={dl.format}
                        placeholder="e.g. XLSX + PDF"
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].format = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">File Size (e.g. 2.4 MB)</label>
                      <input
                        type="text"
                        value={dl.fileSize}
                        placeholder="e.g. 2.4 MB"
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].fileSize = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Description (EN)</label>
                      <textarea
                        rows={2}
                        value={dl.descEn}
                        placeholder="Toolkit description..."
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].descEn = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Description (AR)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={dl.descAr}
                        placeholder="وصف القالب التدريبي..."
                        onChange={(e) => {
                          const updated = [...data.downloads];
                          updated[idx].descAr = e.target.value;
                          setData({ ...data, downloads: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <ImageUploadField
                    label="Download Preview / Cover Image"
                    value={dl.image}
                    onChange={(url) => {
                      const updated = [...data.downloads];
                      updated[idx].image = url;
                      setData({ ...data, downloads: updated });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: EVENTS & SUMMITS                                  */}
        {/* ======================================================== */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                  Events &amp; Summits Library ({data.events.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Click &ldquo;Add Event&rdquo; to schedule a new corporate summit or webinar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newEvt = {
                    id: `evt-${Date.now()}`,
                    titleEn: '',
                    titleAr: '',
                    dateEn: '',
                    dateAr: '',
                    time: '',
                    locationEn: '',
                    locationAr: '',
                    typeEn: '',
                    typeAr: '',
                    descEn: '',
                    descAr: '',
                    spotsLeftEn: '',
                    spotsLeftAr: '',
                    image: '',
                    link: '',
                  };
                  setData({ ...data, events: [newEvt, ...data.events] });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs cursor-pointer shadow-md"
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
                        placeholder="e.g. GCC Corporate L&D Leadership Summit '26"
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].titleEn = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={evt.titleAr}
                        placeholder="مثال: قمة قادة التدريب والتطوير الخليجية ٢٠٢٦"
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].titleAr = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">Date (EN)</label>
                      <input
                        type="text"
                        value={evt.dateEn}
                        placeholder="e.g. Nov 14 – 15, 2026"
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].dateEn = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">Location (EN)</label>
                      <input
                        type="text"
                        value={evt.locationEn}
                        placeholder="e.g. Riyadh, KSA (Virtual Broadcast)"
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].locationEn = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">Event Type (EN)</label>
                      <input
                        type="text"
                        value={evt.typeEn}
                        placeholder="e.g. Executive Roundtable"
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].typeEn = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Description (EN)</label>
                      <textarea
                        rows={2}
                        value={evt.descEn}
                        placeholder="Event overview..."
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].descEn = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Description (AR)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={evt.descAr}
                        placeholder="وصف الفعالية..."
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[idx].descAr = e.target.value;
                          setData({ ...data, events: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <ImageUploadField
                    label="Event Banner / Thumbnail Picture"
                    value={evt.image}
                    onChange={(url) => {
                      const updated = [...data.events];
                      updated[idx].image = url;
                      setData({ ...data, events: updated });
                    }}
                  />
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
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                  Podcasts Library ({data.podcasts.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Click &ldquo;Add Episode&rdquo; to publish a new podcast episode.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newPod = {
                    id: `pod-${Date.now()}`,
                    titleEn: '',
                    titleAr: '',
                    guestEn: '',
                    guestAr: '',
                    duration: '',
                    dateEn: '',
                    dateAr: '',
                    descEn: '',
                    descAr: '',
                    tagEn: '',
                    tagAr: '',
                    image: '',
                    audioUrl: '',
                  };
                  setData({ ...data, podcasts: [newPod, ...data.podcasts] });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs cursor-pointer shadow-md"
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
                        placeholder="e.g. Ep 14: Measuring Workforce L&D ROI"
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].titleEn = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Title (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={pod.titleAr}
                        placeholder="مثال: حلقة ١٤: قياس العائد على الاستثمار في تدريب الشركات"
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].titleAr = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">Guest Name (EN)</label>
                      <input
                        type="text"
                        value={pod.guestEn}
                        placeholder="e.g. Dr. Sultan Al-Otaibi"
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].guestEn = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">Duration (e.g. 42 min)</label>
                      <input
                        type="text"
                        value={pod.duration}
                        placeholder="e.g. 42 min"
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].duration = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-1">Topic Tag</label>
                      <input
                        type="text"
                        value={pod.tagEn}
                        placeholder="e.g. Leadership & Strategy"
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].tagEn = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Description (EN)</label>
                      <textarea
                        rows={2}
                        value={pod.descEn}
                        placeholder="Episode description..."
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].descEn = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Description (AR)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={pod.descAr}
                        placeholder="وصف الحلقة..."
                        onChange={(e) => {
                          const updated = [...data.podcasts];
                          updated[idx].descAr = e.target.value;
                          setData({ ...data, podcasts: updated });
                        }}
                        className="w-full bg-[#181A20] border border-white/10 focus:border-white rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <ImageUploadField
                    label="Podcast Episode Artwork / Cover Picture"
                    value={pod.image}
                    onChange={(url) => {
                      const updated = [...data.podcasts];
                      updated[idx].image = url;
                      setData({ ...data, podcasts: updated });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: MEDIA LIBRARY                                     */}
        {/* ======================================================== */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                  Uploaded Media Library ({mediaFiles.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Upload pictures from your computer. Copy the generated URL to use anywhere on your blog or resources.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  ref={mediaFileInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
                  onChange={(e) => handleMediaUpload(e.target.files)}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={mediaUploadProgress}
                  onClick={() => mediaFileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors shadow-md cursor-pointer disabled:opacity-50"
                >
                  {mediaUploadProgress ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Uploading Files...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={14} />
                      <span>Upload Pictures</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={fetchMedia}
                  disabled={loadingMedia}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Refresh media list"
                >
                  <RefreshCw size={14} className={loadingMedia ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleMediaUpload(e.dataTransfer.files);
              }}
              onClick={() => mediaFileInputRef.current?.click()}
              className="p-8 border-2 border-dashed border-white/15 hover:border-white/30 rounded-3xl bg-[#0e0e11] hover:bg-[#121216] transition-all text-center cursor-pointer group"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/5 group-hover:bg-white/10 text-white flex items-center justify-center mx-auto mb-3 transition-colors border border-white/10">
                <Upload size={22} />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Drop pictures here, or <span className="underline underline-offset-4">browse files</span>
              </h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Supports PNG, JPG, WebP, GIF, SVG, and AVIF up to 15MB.
              </p>
            </div>

            {/* Media Grid Gallery */}
            {loadingMedia && mediaFiles.length === 0 ? (
              <div className="py-16 text-center text-neutral-500 flex flex-col items-center gap-3">
                <RefreshCw size={24} className="animate-spin text-white" />
                <p className="text-xs font-mono">LOADING MEDIA FILES...</p>
              </div>
            ) : mediaFiles.length === 0 ? (
              <div className="py-16 text-center text-neutral-500 rounded-3xl border border-white/5 bg-[#0e0e11]">
                <ImageIcon size={32} className="mx-auto mb-3 text-neutral-600" />
                <p className="text-sm font-medium text-neutral-400">No uploaded media pictures yet</p>
                <p className="text-xs text-neutral-600 mt-1">Upload pictures above to start your media library.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaFiles.map((media) => {
                  const isCopied = copiedUrl === media.url;
                  return (
                    <div
                      key={media.filename}
                      className="group bg-[#0e0e11] border border-white/10 hover:border-white/25 rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-square w-full bg-neutral-900 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={media.url}
                          alt={media.filename}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyUrl(media.url);
                            }}
                            className="p-2 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
                            title="Copy image URL"
                          >
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                          <a
                            href={media.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors shadow-lg"
                            title="View full picture"
                          >
                            <ExternalLink size={14} />
                          </a>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMedia(media.filename);
                            }}
                            className="p-2 rounded-xl bg-red-500/80 text-white hover:bg-red-500 transition-colors shadow-lg cursor-pointer"
                            title="Delete picture"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="p-3">
                        <p className="text-[11px] font-medium text-neutral-300 truncate" title={media.filename}>
                          {media.filename}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-1 font-mono">
                          <span>{formatFileSize(media.size)}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyUrl(media.url)}
                            className="hover:text-white transition-colors"
                          >
                            {isCopied ? 'Copied!' : 'Copy URL'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sticky Bottom Save Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#000000]/95 backdrop-blur-xl border-t border-white/10 px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {saveSuccess && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
                <CheckCircle2 size={14} className="text-white" />
                <span>Changes published live!</span>
              </div>
            )}

            {errorMessage && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium">
                <AlertCircle size={14} className="text-red-400" />
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
