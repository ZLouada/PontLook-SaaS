import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAdmin, isPublishedOrAuthenticated } from '../access'
import { revalidatePodcastChange, revalidatePodcastDelete } from '../hooks/revalidate'

export const Podcasts: CollectionConfig = {
  slug: 'podcasts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'guest', 'duration', 'status', 'updatedAt'],
  },
  access: {
    read: isPublishedOrAuthenticated,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [revalidatePodcastChange],
    afterDelete: [revalidatePodcastDelete],
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
        description: 'Unique slug for the podcast episode',
      },
    },
    {
      name: 'guest',
      type: 'text',
      localized: true,
      required: false,
      admin: {
        description: 'Interview guest name and title',
      },
    },
    {
      name: 'duration',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Episode duration (e.g. 42 mins)',
      },
    },
    {
      name: 'date',
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
      name: 'description',
      type: 'textarea',
      localized: true,
      required: false,
    },
    {
      name: 'tag',
      type: 'text',
      localized: true,
      required: false,
      admin: {
        description: 'Topic badge or tag (e.g. Leadership, L&D Strategy)',
      },
    },
    {
      name: 'audioUrl',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Streaming audio URL (e.g. Spotify, Apple Podcasts, or MP3 stream)',
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
