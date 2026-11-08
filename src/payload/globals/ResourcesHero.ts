import type { GlobalConfig } from 'payload'
import { isEditorOrAdmin } from '../access'
import { revalidateResourcesHero } from '../hooks/revalidate'

export const ResourcesHero: GlobalConfig = {
  slug: 'resources-hero',
  label: 'Resources Hero',
  access: {
    read: () => true,
    update: isEditorOrAdmin,
  },
  hooks: {
    afterChange: [revalidateResourcesHero],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Headline',
          description: 'Main typographic pitch and headline for the dark hero section',
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
                description: 'Main hero headline (e.g. L&D Resource Hub)',
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
        },
        {
          label: '3D Carousel Cards',
          description:
            'Choose which published blog articles appear in each of the 4 depth cards in the 3D Hero Carousel. If unselected, slots automatically fallback to latest articles or curated briefs.',
          fields: [
            {
              name: 'card1Article',
              type: 'relationship',
              relationTo: 'articles',
              label: 'Card 01 Blog Post (Front Active Card)',
              required: false,
              admin: {
                description:
                  'Select the blog article to feature on Card 01 (front active position). If empty, defaults to the latest published article.',
              },
            },
            {
              name: 'card2Article',
              type: 'relationship',
              relationTo: 'articles',
              label: 'Card 02 Blog Post (Second Depth Card)',
              required: false,
              admin: {
                description:
                  'Select the blog article to feature on Card 02 (second position).',
              },
            },
            {
              name: 'card3Article',
              type: 'relationship',
              relationTo: 'articles',
              label: 'Card 03 Blog Post (Third Depth Card)',
              required: false,
              admin: {
                description:
                  'Select the blog article to feature on Card 03 (third position).',
              },
            },
            {
              name: 'card4Article',
              type: 'relationship',
              relationTo: 'articles',
              label: 'Card 04 Blog Post (Fourth Background Card)',
              required: false,
              admin: {
                description:
                  'Select the blog article to feature on Card 04 (fourth position).',
              },
            },
          ],
        },
      ],
    },
  ],
}
