import type { GlobalConfig } from 'payload'
import { isEditorOrAdmin } from '../access'

export const ResourcesHero: GlobalConfig = {
  slug: 'resources-hero',
  label: 'Resources Hero',
  access: {
    read: () => true,
    update: isEditorOrAdmin,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      required: false,
      admin: {
        description: 'Small badge or category eyebrow above the main headline',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Main hero headline (e.g. The PontLook L&D resource hub)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: false,
      admin: {
        description: 'Hero subtitle or value proposition paragraph',
      },
    },
  ],
}
