import type { GlobalConfig } from 'payload'
import { isEditorOrAdmin } from '../access'

export const ResourcesFeatured: GlobalConfig = {
  slug: 'resources-featured',
  label: 'Resources Featured',
  access: {
    read: () => true,
    update: isEditorOrAdmin,
  },
  fields: [
    {
      name: 'spotlightArticle',
      type: 'relationship',
      relationTo: 'articles',
      required: false,
      admin: {
        description: 'Main spotlight article highlighted at the top of the Resources hub',
      },
    },
    {
      name: 'featuredEvent',
      type: 'relationship',
      relationTo: 'events',
      required: false,
      admin: {
        description: "Featured event highlighted in the editor's pick section",
      },
    },
    {
      name: 'featuredDownload',
      type: 'relationship',
      relationTo: 'downloads',
      required: false,
      admin: {
        description: "Featured download toolkit highlighted in the editor's pick section",
      },
    },
    {
      name: 'featuredPodcast',
      type: 'relationship',
      relationTo: 'podcasts',
      required: false,
      admin: {
        description: 'Featured podcast episode',
      },
    },
  ],
}
