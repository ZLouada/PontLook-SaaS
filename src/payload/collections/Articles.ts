import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAdmin, isPublishedOrAuthenticated } from '../access'
import { revalidateArticleChange, revalidateArticleDelete } from '../hooks/revalidate'

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
          name: 'seoEditor',
          type: 'ui',
          admin: {
            components: {
              Field: '@/components/payload/SEOEditor/SEOEditor#SEOEditor',
            },
          },
        },
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
