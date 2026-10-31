/**
 * File size and format utility helpers for PontLook media attachments.
 * Used across Payload CMS admin and Next.js frontend components.
 */

export function formatBytes(bytes?: number | null, decimals: number = 1): string {
  if (bytes === undefined || bytes === null || isNaN(bytes) || bytes <= 0) {
    return '0 B';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const index = Math.min(i, sizes.length - 1);
  const value = parseFloat((bytes / Math.pow(k, index)).toFixed(dm));

  return `${value} ${sizes[index]}`;
}

export function getFileExtension(filename?: string | null, mimeType?: string | null): string {
  if (filename && filename.includes('.')) {
    const ext = filename.split('.').pop()?.trim().toUpperCase();
    if (ext && ext.length <= 5) {
      return ext;
    }
  }

  if (mimeType) {
    const lower = mimeType.toLowerCase();
    if (lower.includes('audio/mpeg') || lower.includes('audio/mp3')) return 'MP3';
    if (lower.includes('audio/x-m4a') || lower.includes('audio/m4a') || lower.includes('audio/mp4')) return 'M4A';
    if (lower.includes('audio/wav') || lower.includes('audio/x-wav')) return 'WAV';
    if (lower.includes('audio/opus')) return 'OPUS';
    if (lower.includes('audio/ogg')) return 'OGG';
    if (lower.includes('application/pdf')) return 'PDF';
    if (lower.includes('zip')) return 'ZIP';
    if (lower.includes('presentationml') || lower.includes('powerpoint')) return 'PPTX';
    if (lower.includes('wordprocessingml') || lower.includes('msword')) return 'DOCX';
    if (lower.includes('spreadsheetml') || lower.includes('excel')) return 'XLSX';
  }

  return 'FILE';
}

/**
 * Returns formatted file badge combining extension and human-readable size.
 * Example output: "MP3 • 4.2 MB" or "PDF • 2.8 MB"
 */
export function formatFileBadge(
  filesize?: number | null,
  filename?: string | null,
  mimeType?: string | null
): string {
  const ext = getFileExtension(filename, mimeType);
  if (!filesize || filesize <= 0) {
    return ext;
  }
  const sizeStr = formatBytes(filesize, 1);
  return `${ext} • ${sizeStr}`;
}

/**
 * Formats duration in seconds into MM:SS format for audio players.
 * Example: 255 -> "04:15"
 */
export function formatAudioDuration(seconds?: number | null): string {
  if (!seconds || isNaN(seconds) || seconds <= 0) {
    return '00:00';
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
  return `${formattedMins}:${formattedSecs}`;
}
