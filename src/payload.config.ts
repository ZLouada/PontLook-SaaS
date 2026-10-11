import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    admin: '/payload-admin',
  },
  collections: [],
  globals: [],
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
  secret: process.env.PAYLOAD_SECRET || 'temporary_secret_key_at_least_32_characters_long_for_build',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})
