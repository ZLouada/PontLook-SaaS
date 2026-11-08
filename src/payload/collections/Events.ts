import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAdmin, isPublishedOrAuthenticated } from '../access'
import { revalidateEventChange, revalidateEventDelete } from '../hooks/revalidate'
import { formatSlug } from '../utilities/formatSlug'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'status', 'updatedAt'],
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
    afterChange: [revalidateEventChange],
    afterDelete: [revalidateEventDelete],
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
        description: 'Unique slug for the event (auto-generated from title if left blank)',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'time',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Formatted time display (e.g. 10:00 AM AST)',
      },
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      required: false,
      admin: {
        description: 'Location or virtual venue (e.g. Riyadh & Online)',
      },
    },
    {
      name: 'type',
      type: 'text',
      localized: true,
      required: false,
      admin: {
        description: 'Event format badge (e.g. Executive Roundtable, Webinar)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: false,
    },
    {
      name: 'spotsLeft',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Available seats counter (optional)',
      },
    },
    {
      name: 'rsvpLink',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'External or internal registration URL',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
