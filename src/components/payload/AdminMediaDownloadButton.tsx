'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFormFields, useLocale } from '@payloadcms/ui'
import { formatBytes, getFileExtension } from '@/utils/formatBytes'

export interface AdminMediaDownloadButtonProps {
  path?: string
  field?: {
    name?: string
    admin?: {
      custom?: {
        targetField?: string
        label?: string
        kind?: 'podcast' | 'attachment' | 'general'
      }
    }
    custom?: {
      targetField?: string
      label?: string
      kind?: 'podcast' | 'attachment' | 'general'
    }
  }
  targetField?: string
  label?: string
  kind?: 'podcast' | 'attachment' | 'general'
}

interface ResolvedMedia {
  id?: string | number
  filename?: string
  filesize?: number | null
  mimeType?: string | null
  url: string
}

export const AdminMediaDownloadButton: React.FC<AdminMediaDownloadButtonProps> = (props) => {
  const { path: fieldPath, field, targetField: explicitTarget, label: explicitLabel, kind: explicitKind } = props

  // Determine configuration from props, field.admin.custom, or field.custom
  const customConfig = field?.admin?.custom || field?.custom || {}
  const targetField = explicitTarget || customConfig.targetField
  const customLabel = explicitLabel || customConfig.label
  const mediaKind = explicitKind || customConfig.kind || 'general'

  // Locale context
  const localeContext = useLocale()
  const currentLocale = typeof localeContext === 'string' ? localeContext : localeContext?.code || 'en'

  // In-memory cache for fetched media docs
  const mediaCache = useRef<Map<string | number, ResolvedMedia>>(new Map())
  const [resolvedMedia, setResolvedMedia] = useState<ResolvedMedia | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Subscribe to form state to detect uploaded media changes
  const formState = useFormFields(([fields]) => {
    const f = fields || {}

    // Priority 1: Specified target field
    if (targetField && f[targetField]?.value !== undefined) {
      return f[targetField]?.value
    }

    // Priority 2: Infer from current UI field path
    const p = (fieldPath || field?.name || '').toLowerCase()
    if (p.includes('podcast')) {
      return f['mediaAttachments.podcastAudio']?.value || f.podcastAudio?.value
    }
    if (p.includes('attachment') || p.includes('download')) {
      return f['mediaAttachments.downloadableAttachment']?.value || f.downloadableAttachment?.value
    }
    if (p.includes('file')) {
      return f.file?.value || f['file']?.value
    }

    // Priority 3: Fallback candidates
    return (
      f['mediaAttachments.podcastAudio']?.value ||
      f['mediaAttachments.downloadableAttachment']?.value ||
      f.podcastAudio?.value ||
      f.downloadableAttachment?.value ||
      f.file?.value
    )
  })

  useEffect(() => {
    let isCancelled = false

    if (!formState) {
      setResolvedMedia(null)
      setIsLoading(false)
      return
    }

    // Case A: Form state already holds populated Media document object
    if (typeof formState === 'object' && formState !== null) {
      const mediaDoc = formState as any
      const rawUrl = mediaDoc.url || (mediaDoc.filename ? `/payload-media/${mediaDoc.filename}` : null)
      if (rawUrl) {
        setResolvedMedia({
          id: mediaDoc.id,
          filename: mediaDoc.filename || 'media-file',
          filesize: typeof mediaDoc.filesize === 'number' ? mediaDoc.filesize : null,
          mimeType: mediaDoc.mimeType || null,
          url: rawUrl,
        })
        setIsLoading(false)
        return
      }
    }

    // Case B: Form state holds an unpopulated ID (number or string)
    const mediaId = formState as string | number
    if (typeof mediaId === 'number' || (typeof mediaId === 'string' && /^\d+$/.test(mediaId))) {
      if (mediaCache.current.has(mediaId)) {
        setResolvedMedia(mediaCache.current.get(mediaId)!)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      const fetchMedia = async () => {
        try {
          const res = await fetch(`/payload-api/media/${mediaId}?depth=0&locale=${currentLocale}`)
          if (!res.ok) {
            if (!isCancelled) {
              setResolvedMedia(null)
              setIsLoading(false)
            }
            return
          }
          const data = await res.json()
          if (!isCancelled && data) {
            const rawUrl = data.url || (data.filename ? `/payload-media/${data.filename}` : null)
            if (rawUrl) {
              const item: ResolvedMedia = {
                id: data.id,
                filename: data.filename || 'media-file',
                filesize: typeof data.filesize === 'number' ? data.filesize : null,
                mimeType: data.mimeType || null,
                url: rawUrl,
              }
              mediaCache.current.set(mediaId, item)
              setResolvedMedia(item)
            } else {
              setResolvedMedia(null)
            }
          }
        } catch (err) {
          console.warn('[AdminMediaDownloadButton] Failed to fetch media ID:', mediaId, err)
          if (!isCancelled) setResolvedMedia(null)
        } finally {
          if (!isCancelled) setIsLoading(false)
        }
      }

      fetchMedia()
      return () => {
        isCancelled = true
      }
    }

    setResolvedMedia(null)
    setIsLoading(false)
  }, [formState, currentLocale])

  const extension = useMemo(() => {
    return getFileExtension(resolvedMedia?.filename, resolvedMedia?.mimeType)
  }, [resolvedMedia])

  const formattedSize = useMemo(() => {
    return resolvedMedia?.filesize ? formatBytes(resolvedMedia.filesize, 1) : null
  }, [resolvedMedia])

  const isAudio = useMemo(() => {
    return Boolean(
      resolvedMedia?.mimeType?.startsWith('audio/') ||
      ['MP3', 'M4A', 'WAV', 'OGG', 'OPUS'].includes(extension)
    )
  }, [resolvedMedia, extension])

  // If no media is uploaded yet
  if (!resolvedMedia) {
    return (
      <div
        style={{
          marginTop: '0.5rem',
          marginBottom: '1rem',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          border: '1px dashed #334155',
          backgroundColor: '#090D16',
          color: '#94A3B8',
          fontSize: '0.75rem',
          lineHeight: '1.4',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '1rem', opacity: 0.6 }}>ℹ</span>
        <span>
          {isLoading
            ? 'Resolving attached file metadata...'
            : customLabel
              ? `No ${customLabel.toLowerCase()} uploaded yet. Upload a file above to enable one-click admin download.`
              : 'No file uploaded yet. Attach a podcast audio or document above to enable one-click admin verification.'}
        </span>
      </div>
    )
  }

  const downloadUrl = resolvedMedia.url.startsWith('http') || resolvedMedia.url.startsWith('/')
    ? resolvedMedia.url
    : `/${resolvedMedia.url}`

  return (
    <div
      style={{
        marginTop: '0.5rem',
        marginBottom: '1.25rem',
        padding: '0.875rem 1rem',
        borderRadius: '10px',
        border: '1px solid #1E293B',
        backgroundColor: '#020617',
        color: '#F8FAFC',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.45)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header with Title & Verification Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.625rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid #1E293B',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: isAudio ? '#FF5500' : '#2451BF',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 'bold',
            }}
          >
            {isAudio ? '▶' : '📄'}
          </span>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F1F5F9' }}>
            {customLabel || (isAudio ? 'Verified Podcast Audio File' : 'Verified Downloadable Attachment')}
          </span>
        </div>
        <span
          style={{
            fontSize: '0.6875rem',
            padding: '2px 8px',
            borderRadius: '12px',
            backgroundColor: '#064E3B',
            color: '#34D399',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          READY ✓
        </span>
      </div>

      {/* Metadata Row: File Name + Badges */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            color: '#CBD5E1',
            fontFamily: 'monospace',
            backgroundColor: '#0F172A',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid #1E293B',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={resolvedMedia.filename}
        >
          {resolvedMedia.filename}
        </span>

        {/* Extension Pill Badge */}
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: '#1E3A8A',
            color: '#93C5FD',
            border: '1px solid #2451BF',
            letterSpacing: '0.05em',
            fontFamily: 'monospace',
          }}
        >
          {extension}
        </span>

        {/* File Size Badge */}
        {formattedSize && (
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: '#1E293B',
              color: '#E2E8F0',
              fontFamily: 'monospace',
            }}
          >
            {formattedSize}
          </span>
        )}
      </div>

      {/* Embedded Audio Preview (If Audio/Podcast) */}
      {isAudio && (
        <div style={{ marginBottom: '0.75rem' }}>
          <audio
            controls
            preload="none"
            src={downloadUrl}
            style={{
              width: '100%',
              height: '32px',
              borderRadius: '6px',
              filter: 'invert(0.9) hue-rotate(180deg)',
            }}
          />
        </div>
      )}

      {/* Action Buttons Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Primary Download Button */}
        <a
          href={downloadUrl}
          download={resolvedMedia.filename || true}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            borderRadius: '6px',
            backgroundColor: '#FF5500',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(255, 85, 0, 0.35)',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
        >
          <span>Download File</span>
          <span>⬇</span>
        </a>

        {/* Preview in New Tab Link */}
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            backgroundColor: '#0F172A',
            color: '#94A3B8',
            border: '1px solid #1E293B',
            fontSize: '0.75rem',
            fontWeight: 500,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <span>Preview ↗</span>
        </a>
      </div>
    </div>
  )
}
