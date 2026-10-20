import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

/**
 * PontLook Supabase Database Hardening Script
 * 
 * Objectives:
 * 1. Enable Row-Level Security (RLS) on all existing tables in the `public` schema.
 * 2. Create an Event Trigger to automatically enable RLS on any future tables.
 * 3. Revoke direct table permissions from the Supabase `anon` role on `public`.
 * 4. Verify 100% coverage and confirm Payload CMS database access remains uninterrupted.
 */

function getDatabaseUri(): string {
  if (process.env.DATABASE_URI) {
    return process.env.DATABASE_URI;
  }

  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const filePath = path.resolve(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('DATABASE_URI=')) {
          return trimmed.substring('DATABASE_URI='.length).replace(/^["']|["']$/g, '');
        }
      }
    }
  }

  throw new Error('DATABASE_URI not found in environment or .env.local / .env');
}

async function main() {
  console.log('🔒 Starting PontLook Supabase Database Hardening Protocol...');

  const connectionString = getDatabaseUri();
  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('supabase') ? { rejectUnauthorized: false } : undefined,
    max: 2,
  });

  const client = await pool.connect();

  try {
    // --------------------------------------------------------------------------
    // 1. Initial State Check
    // --------------------------------------------------------------------------
    console.log('\n📊 Step 1: Checking current public tables and RLS status...');
    const initialCheck = await client.query<{ tablename: string; rowsecurity: boolean }>(
      "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;"
    );
    const unhardenedCount = initialCheck.rows.filter((r) => !r.rowsecurity).length;
    console.log(`Found ${initialCheck.rows.length} total public tables (${unhardenedCount} with RLS disabled).`);

    // --------------------------------------------------------------------------
    // 2. Enable RLS on All Existing Public Tables
    // --------------------------------------------------------------------------
    console.log('\n🛡️ Step 2: Enabling Row-Level Security on all public tables...');
    await client.query(`
      DO $$
      DECLARE
          r RECORD;
      BEGIN
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
              EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', r.tablename);
          END LOOP;
      END $$;
    `);
    console.log('✅ RLS successfully enabled on all existing public tables.');

    // --------------------------------------------------------------------------
    // 3. Install Automatic DDL Event Trigger for Future Tables
    // --------------------------------------------------------------------------
    console.log('\n⚙️ Step 3: Installing automatic DDL Event Trigger for future tables...');
    await client.query(`
      CREATE OR REPLACE FUNCTION public.auto_enable_rls()
      RETURNS event_trigger
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
          obj record;
      BEGIN
          FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands() WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS')
          LOOP
              IF obj.schema_name = 'public' THEN
                  EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY;', obj.object_identity);
              END IF;
          END LOOP;
      END;
      $$;
    `);

    await client.query(`
      DROP EVENT TRIGGER IF EXISTS ensure_rls_on_new_tables;
      CREATE EVENT TRIGGER ensure_rls_on_new_tables
      ON ddl_command_end
      WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS')
      EXECUTE FUNCTION public.auto_enable_rls();
    `);
    console.log('✅ Event trigger "ensure_rls_on_new_tables" installed successfully.');

    // --------------------------------------------------------------------------
    // 4. Revoke Direct Privileges from anon (Defense-in-Depth)
    // --------------------------------------------------------------------------
    console.log('\n🚫 Step 4: Revoking direct table privileges from anon role...');
    await client.query(`
      REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
      ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon;
    `);
    console.log('✅ Direct privileges revoked from anon and default privileges restricted.');

    // --------------------------------------------------------------------------
    // 5. Verification: Audit all tables
    // --------------------------------------------------------------------------
    console.log('\n🔍 Step 5: Verifying all public tables rowsecurity flag...');
    const verifyCheck = await client.query<{ tablename: string; rowsecurity: boolean }>(
      "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;"
    );

    console.table(verifyCheck.rows);

    const stillDisabled = verifyCheck.rows.filter((r) => !r.rowsecurity);
    if (stillDisabled.length > 0) {
      console.error('❌ Failure: The following tables still do not have RLS enabled:');
      console.error(stillDisabled.map((t) => t.tablename).join(', '));
      process.exit(1);
    }
    console.log(`✅ All ${verifyCheck.rows.length} public tables have rowsecurity = true.`);

    // --------------------------------------------------------------------------
    // 6. Test Event Trigger with a new test table
    // --------------------------------------------------------------------------
    console.log('\n🧪 Step 6: Testing DDL event trigger with a temporary table...');
    const testTableName = '__rls_event_trigger_test__';
    await client.query(`DROP TABLE IF EXISTS public.${testTableName};`);
    await client.query(`CREATE TABLE public.${testTableName} (id serial primary key, name text);`);

    const testCheck = await client.query<{ tablename: string; rowsecurity: boolean }>(
      `SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = $1;`,
      [testTableName]
    );

    if (testCheck.rows[0]?.rowsecurity) {
      console.log(`✅ Automatic DDL trigger verified: "${testTableName}" was created with rowsecurity = true.`);
    } else {
      console.error(`❌ Automatic DDL trigger failed: "${testTableName}" was created with rowsecurity = false.`);
      process.exit(1);
    }

    await client.query(`DROP TABLE public.${testTableName};`);
    console.log(`🧹 Cleaned up temporary test table "${testTableName}".`);

    // --------------------------------------------------------------------------
    // 7. Verify Payload CMS queries still succeed
    // --------------------------------------------------------------------------
    console.log('\n📦 Step 7: Verifying Payload CMS tables accessible via superuser connection...');
    const userCountRes = await client.query<{ count: string }>('SELECT count(*) FROM public.users;');
    console.log(`✅ Successfully queried users table: ${userCountRes.rows[0].count} users.`);

    const articlesCountRes = await client.query<{ count: string }>('SELECT count(*) FROM public.articles;');
    console.log(`✅ Successfully queried articles table: ${articlesCountRes.rows[0].count} articles.`);

    console.log('\n🎉 Supabase PostgreSQL Database Hardening Completed Successfully!');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error('\n❌ Database hardening script failed:', err);
  process.exit(1);
});
