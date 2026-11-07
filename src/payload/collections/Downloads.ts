import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAdmin, isPublishedOrAuthenticated } from '../access'
import { revalidateDownloadChange, revalidateDownloadDelete } from '../hooks/revalidate'
import { formatSlug } from '../utilities/formatSlug'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: {
    singular: 'Downloadable Toolkit',
    plural: 'Downloadable Resources (Toolkits)',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'contentType', 'format', 'fileSize', 'status', 'updatedAt'],
    group: 'Resources & Content',
  },
  lockDocuments: false,
  access: {
    read: isPublishedOrAuthenticated,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  hooks: {
    afterChange: [revalidateDownloadChange],
    afterDelete: [revalidateDownloadDelete],
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
        description: 'Unique slug for the downloadable resource (auto-generated from title if left blank)',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'category',
      label: 'Topic / Category',
      type: 'select',
      required: true,
      defaultValue: 'leadership',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Select the primary PontLook category/topic for this resource.',
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
      name: 'contentType',
      label: 'Content Type',
      type: 'select',
      required: true,
      defaultValue: 'guide',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Format/type of content (e.g. Ebook, Guide, Template, Tool).',
      },
      options: [
        { label: 'Ebook', value: 'ebook' },
        { label: 'Guide', value: 'guide' },
        { label: 'Kit', value: 'kit' },
        { label: 'Partner Contribution', value: 'partner-contribution' },
        { label: 'Quiz/Game', value: 'quiz-game' },
        { label: 'Template', value: 'template' },
        { label: 'Tool', value: 'tool' },
        { label: 'Webinar', value: 'webinar' },
      ],
    },
    {
      name: 'format',
      label: 'File Format',
      type: 'select',
      required: true,
      defaultValue: 'PDF',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'File delivery format (e.g. PDF, Excel, Google Sheets).',
      },
      options: [
        { label: 'PDF', value: 'PDF' },
        { label: 'Excel', value: 'Excel' },
        { label: 'Google Sheets', value: 'Google Sheets' },
        { label: 'Word', value: 'Word' },
        { label: 'Powerpoint', value: 'Powerpoint' },
        { label: 'Google Docs', value: 'Google Docs' },
        { label: 'Google Slides', value: 'Google Slides' },
      ],
    },
    {
      name: 'image',
      label: 'Resource Image / Thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Card cover / preview image displayed on the Resource Library and in blog sidebars.',
      },
    },
    {
      name: 'fileSize',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'File size label (e.g. 1.8 MB)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: false,
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      required: false,
      admin: {
        description: 'List of key features or included tools',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'fileDownloadPreview',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/payload/AdminMediaDownloadButton#AdminMediaDownloadButton',
        },
        custom: {
          targetField: 'file',
          label: 'Attached Toolkit File',
          kind: 'attachment',
        },
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
  ],
}
