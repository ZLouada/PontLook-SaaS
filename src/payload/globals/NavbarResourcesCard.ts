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
      name: 'badge',
      type: 'text',
      label: 'Date / Location Pill Badge',
      localized: true,
      required: false,
      admin: {
        description: 'Small badge overlaid on the image (e.g. "RIYADH · DEC 2026" or "مؤتمر الرياض · ٢٠٢٦")',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Card Title',
      localized: true,
      required: true,
      admin: {
        description: 'Main title of the featured card (e.g. "ATD Saudi Arabia Conference | 7 – 8 Dec")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
      required: false,
      admin: {
        description: 'Short teaser text under the title (e.g. "Premier annual talent development & executive conference in Riyadh")',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image (Media Upload)',
      required: false,
      admin: {
        description: 'Uploaded image file from the Media library. If left empty, the fallback image URL or default conference image will be used.',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Custom Image URL / Path (Fallback)',
      required: false,
      admin: {
        description: 'Optional path or external image URL (e.g. /executive_training_room.jpg) if no media upload is selected.',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Target Destination Link / URL',
      required: false,
      admin: {
        description: 'Destination URL (e.g. "/resources/events" or an external link like "https://atdksa.com"). Defaults to "/resources/events".',
      },
    },
    {
      name: 'linkText',
      type: 'text',
      label: 'Link CTA Text',
      localized: true,
      required: false,
      admin: {
        description: 'Label on the bottom link (e.g. "Conference details" or "تفاصيل المؤتمر").',
      },
    },
  ],
}
