import type { GlobalConfig } from 'payload'
import { isEditorOrAdmin } from '../access'
import { revalidateNavbar } from '../hooks/revalidate'

export const NavbarResourcesCard: GlobalConfig = {
  slug: 'navbar-resources-card',
  label: 'Navbar Resources Card',
  access: {
    read: () => true,
    update: isEditorOrAdmin,
  },
  hooks: {
    afterChange: [revalidateNavbar],
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable / Show Card in Resources Dropdown',
      defaultValue: true,
      admin: {
        description: 'Toggle this card on or off in the navbar. When unchecked, the card is removed from the dropdown and the remaining links expand cleanly.',
      },
    },
    {
      name: 'postType',
      type: 'select',
      label: 'Post Type',
      defaultValue: 'article',
      options: [
        { label: 'Article (Blog Post)', value: 'article' },
        { label: 'Event / Conference', value: 'event' },
      ],
      admin: {
        description: 'Choose whether you want to feature an Article (Blog Post) or an Event.',
      },
    },
    {
      name: 'selectedArticle',
      type: 'relationship',
      relationTo: 'articles',
      label: 'Select Existing Article',
      required: false,
      admin: {
        condition: (data) => !data?.postType || data?.postType === 'article',
        description: 'Pick an existing article from your published posts. The title, excerpt, category badge, cover image, and link are all pulled automatically.',
      },
    },
    {
      name: 'selectedEvent',
      type: 'relationship',
      relationTo: 'events',
      label: 'Select Existing Event',
      required: false,
      admin: {
        condition: (data) => data?.postType === 'event',
        description: 'Pick an existing event. The title, description, location/date badge, and RSVP link are pulled automatically.',
      },
    },
    {
      name: 'customBadge',
      type: 'text',
      label: 'Custom Badge (Optional Override)',
      localized: true,
      required: false,
      admin: {
        description: 'Leave empty to automatically use the post category or event date/location.',
      },
    },
    {
      name: 'customImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Custom Cover Image (Optional Override)',
      required: false,
      admin: {
        description: 'Leave empty to automatically use the featured image from the selected post.',
      },
    },
  ],
}
