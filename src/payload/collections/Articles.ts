import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAdmin, isPublishedOrAuthenticated } from '../access'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: isPublishedOrAuthenticated,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isAdmin,
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
      type: 'text',
      localized: true,
      required: false,
      admin: {
        description: 'Category name (e.g. L&D STRATEGIES)',
      },
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
            description: 'Custom browser tab & OG title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: false,
          admin: {
            description: 'Search engine description',
          },
        },
      ],
    },
  ],
}
