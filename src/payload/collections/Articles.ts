import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAdmin, isPublishedOrAuthenticated } from '../access'
import { revalidateArticleChange, revalidateArticleDelete } from '../hooks/revalidate'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Blog / Article',
    plural: 'Blog Posts & Articles',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'updatedAt'],
    group: 'Resources & Content',
  },
  access: {
    read: isPublishedOrAuthenticated,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [revalidateArticleChange],
    afterDelete: [revalidateArticleDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier for the article',
      },
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      defaultValue: 'leadership',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Select the primary PontLook category for this resource/article.',
      },
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Learning & Development', value: 'learning-and-development' },
        { label: 'Workforce Development', value: 'workforce-development' },
        { label: 'AI & Digital Skills', value: 'ai-and-digital-skills' },
        { label: 'Onboarding & Retention', value: 'onboarding-and-retention' },
        { label: 'Nationalization', value: 'nationalization' },
        { label: 'Training ROI', value: 'training-roi' },
        { label: 'Corporate Culture', value: 'corporate-culture' },
      ],
    },
    {
      name: 'readTime',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Estimated read time (e.g. 12 min read)',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: false,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      required: false,
      admin: {
        description: 'Summary of the article displayed in cards and previews',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      required: false,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'mediaAttachments',
      type: 'group',
      label: 'Podcast & Downloadable Media',
      admin: {
        position: 'sidebar',
        description:
          'Attach executive podcast audio briefings (.mp3, .wav) and downloadable toolkits (.pdf, .zip) to this article.',
      },
      fields: [
        {
          name: 'podcastAudio',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description:
              'Upload a podcast episode or 4-minute executive audio summary (.mp3, .m4a, .wav). Automatically renders the audio player + download button on the blog post.',
          },
        },
        {
          name: 'podcastDownloadButton',
          type: 'ui',
          admin: {
            components: {
              Field: '@/components/payload/AdminMediaDownloadButton#AdminMediaDownloadButton',
            },
            custom: {
              targetField: 'mediaAttachments.podcastAudio',
              label: 'Podcast Audio File',
              kind: 'podcast',
            },
          },
        },
        {
          name: 'podcastTitle',
          type: 'text',
          localized: true,
          required: false,
          admin: {
            description:
              'Optional custom title for the audio bar; defaults to the blog post title if left blank.',
          },
        },
        {
          name: 'podcastDuration',
          type: 'text',
          required: false,
          admin: {
            description: 'Episode duration (e.g. "04:15" or "14 mins").',
          },
        },
        {
          name: 'downloadableAttachment',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description:
              'Attach an E-Book PDF, checklist, or toolkit file. Automatically renders the sleek Download Card & Button on the blog post.',
          },
        },
        {
          name: 'attachmentDownloadButton',
          type: 'ui',
          admin: {
            components: {
              Field: '@/components/payload/AdminMediaDownloadButton#AdminMediaDownloadButton',
            },
            custom: {
              targetField: 'mediaAttachments.downloadableAttachment',
              label: 'Downloadable Toolkit File',
              kind: 'attachment',
            },
          },
        },
        {
          name: 'downloadButtonLabel',
          type: 'text',
          localized: true,
          required: false,
          admin: {
            description:
              'Optional custom CTA label (falls back to localized default "Download Executive Toolkit" / "تحميل الملف المرفق").',
          },
        },
      ],
    },
    {
      name: 'sidebarDownloads',
      label: 'Sticky Sidebar Downloads',
      type: 'relationship',
      relationTo: 'downloads',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description:
          'Select downloadable toolkits uploaded in the Downloads page to showcase in the sticky right sidebar as the reader scrolls.',
      },
    },
    {
      name: 'endOfPostDownload',
      label: 'End-of-Post Featured Download',
      type: 'relationship',
      relationTo: 'downloads',
      hasMany: false,
      admin: {
        position: 'sidebar',
        description:
          'Select the primary toolkit/resource to feature at the bottom of the article before the consultation banner.',
      },
    },
    {
      name: 'sidebarWidgets',
      type: 'group',
      label: 'Sidebar Widgets & CTAs',
      admin: {
        position: 'sidebar',
        description: 'Control interactive widgets displayed alongside the article.',
      },
      fields: [
        {
          name: 'showLeadForm',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display the interactive "Training Consultation" lead intake form in the sidebar.',
          },
        },
        {
          name: 'showFeatureCard',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display the PontLook Feature Blueprint Card (Application A/B) in the sidebar.',
          },
        },
        {
          name: 'featureCardCustomTitle',
          type: 'text',
          localized: true,
          required: false,
          admin: {
            description: 'Optional custom headline for the sidebar feature card.',
          },
        },
      ],
    },
    {
      name: 'seoEditor',
      type: 'ui',
      admin: {
        disableListColumn: true,
        components: {
          Field: '@/components/payload/SEOEditor/SEOEditor#SEOEditor',
        },
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO Metadata',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: false,
          admin: {
            description: 'Custom browser tab & OG title (leave empty to use article title)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: false,
          admin: {
            description: 'Search engine description (leave empty to use excerpt)',
          },
        },
        {
          name: 'focusKeyword',
          type: 'text',
          localized: true,
          required: false,
          admin: {
            description: 'Primary target search phrase for real-time SEO scoring',
          },
        },
        {
          name: 'secondaryKeywords',
          type: 'text',
          localized: true,
          required: false,
          admin: {
            description: 'Secondary keywords separated by commas',
          },
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          required: false,
          admin: {
            description: 'Canonical URL if this article was originally published elsewhere',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Disallow search engines from indexing this article (robots: noindex)',
          },
        },
        {
          name: 'noFollow',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Disallow search engines from following links on this article (robots: nofollow)',
          },
        },
        {
          name: 'ogTitle',
          type: 'text',
          localized: true,
          required: false,
          admin: {
            description: 'Custom Open Graph social title (leave empty to use SEO title)',
          },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          localized: true,
          required: false,
          admin: {
            description: 'Custom Open Graph social description (leave empty to use SEO description)',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Custom social share card image (leave empty to use featured image)',
          },
        },
      ],
    },
  ],
}
