import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Articles } from './payload/collections/Articles'
import { Downloads } from './payload/collections/Downloads'
import { Events } from './payload/collections/Events'
import { Leads } from './payload/collections/Leads'
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
    Leads,
  ],
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || process.env.SUPABASE_STORAGE_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.SUPABASE_S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.SUPABASE_S3_SECRET_KEY || '',
        },
        region: process.env.S3_REGION || process.env.SUPABASE_S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || process.env.SUPABASE_S3_ENDPOINT,
        forcePathStyle: true,
      },
      enabled: Boolean(
        (process.env.S3_BUCKET || process.env.SUPABASE_STORAGE_BUCKET) &&
          (process.env.S3_ACCESS_KEY_ID || process.env.SUPABASE_S3_ACCESS_KEY)
      ),
    }),
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
  debug: process.env.NODE_ENV !== 'production' || process.env.PAYLOAD_DEBUG === 'true',
  hooks: {
    afterError: [
      ({ error, collection }) => {
        const collectionPrefix = collection ? `[${collection.slug}] ` : ''
        console.error(
          `[Payload Error] ${collectionPrefix}${error?.message || error}`,
          error
        )
        const errorMessage = error?.message || 'Operation failed. Please try again.'
        return {
          response: {
            errors: [
              {
                message: errorMessage,
              },
            ],
          },
        }
      },
    ],
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: process.env.DATABASE_URI?.includes('supabase')
        ? { rejectUnauthorized: false }
        : undefined,
      max:
        process.env.NEXT_PHASE === 'phase-production-build' ||
        process.env.npm_lifecycle_event === 'build'
          ? 2
          : 8,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    },
    push: false,
  }),
})
