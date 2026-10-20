import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Articles } from './payload/collections/Articles'
import { Downloads } from './payload/collections/Downloads'
import { Events } from './payload/collections/Events'
import { Media } from './payload/collections/Media'
import { Podcasts } from './payload/collections/Podcasts'
import { Users } from './payload/collections/Users'
import { NavbarResourcesCard } from './payload/globals/NavbarResourcesCard'
import { ResourcesFeatured } from './payload/globals/ResourcesFeatured'
import { ResourcesHero } from './payload/globals/ResourcesHero'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    admin: '/payload-admin',
    api: '/payload-api',
    graphQL: '/payload-api/graphql',
  },
  collections: [
    Articles,
    Downloads,
    Events,
    Podcasts,
    Media,
    Users,
  ],
  globals: [
    ResourcesHero,
    ResourcesFeatured,
    NavbarResourcesCard,
  ],
  localization: {
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'ar',
        label: 'Arabic (العربية)',
        rtl: true,
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'temporary_secret_key_at_least_32_characters_long_for_build',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: process.env.DATABASE_URI?.includes('supabase')
        ? { rejectUnauthorized: false }
        : undefined,
      max: 2,
      idleTimeoutMillis: 5000,
    },
    push: false,
  }),
})
