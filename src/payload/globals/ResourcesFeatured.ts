import type { GlobalConfig } from 'payload'
import { isEditorOrAdmin } from '../access'
import { revalidateResourcesFeatured } from '../hooks/revalidate'

export const ResourcesFeatured: GlobalConfig = {
  slug: 'resources-featured',
  label: 'Resources Featured',
  access: {
    read: () => true,
    update: isEditorOrAdmin,
  },
  hooks: {
    afterChange: [revalidateResourcesFeatured],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Featured Spotlight',
          description: 'Main spotlight article highlighted at the top of the Resources hub',
          fields: [
            {
              name: 'spotlightArticle',
              type: 'relationship',
              relationTo: 'articles',
              label: 'Spotlight Article',
              required: false,
              admin: {
                description:
                  'Select a published article to feature as the main spotlight card on the left. The title, excerpt, category, read time, and featured image are loaded directly from Payload CMS. If none is selected, no mock content will be displayed.',
              },
            },
          ],
        },
        {
          label: 'Executive Toolkits & Media',
          description: 'Featured resources displayed in the right-side cards of the Resources hub',
          fields: [
            {
              name: 'featuredDownload',
              type: 'relationship',
              relationTo: 'downloads',
              label: 'Featured Toolkit (Download)',
              required: false,
              admin: {
                description:
                  'Select an accredited downloadable toolkit from the Downloads collection to feature in Executive Toolkits & Media.',
              },
            },
            {
              name: 'featuredPodcast',
              type: 'relationship',
              relationTo: 'podcasts',
              label: 'Featured Podcast / Audio Briefing',
              required: false,
              admin: {
                description:
                  'Select an executive podcast episode from the Podcasts collection to feature in Executive Toolkits & Media.',
              },
            },
            {
              name: 'featuredEvent',
              type: 'relationship',
              relationTo: 'events',
              label: 'Featured Event (Optional Alternative)',
              required: false,
              admin: {
                description:
                  'Optionally select an upcoming verified event from the Events collection to feature in Executive Toolkits & Media.',
              },
            },
          ],
        },
      ],
    },
  ],
}
