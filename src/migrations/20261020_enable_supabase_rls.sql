-- ==============================================================================
-- PontLook SaaS - Supabase Database Hardening Migration
-- Objective: Lock down the public schema against unauthenticated PostgREST access
-- ==============================================================================

-- 1. Enable Row-Level Security (RLS) on all existing public tables
-- Without any permissive CREATE POLICY statements, this enforces a strict
-- Deny-All posture for PostgREST anon & authenticated roles, while allowing
-- the postgres bypassrls superuser (used by Payload CMS) to operate seamlessly.
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', r.tablename);
    END LOOP;
END $$;

-- 2. Create an event trigger function to automatically enable RLS on any future table
-- Whenever Payload CMS adds collections, localization tables, or relationship joins,
-- this trigger guarantees RLS is enabled instantly upon creation.
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

-- 3. Bind the event trigger to DDL execution
DROP EVENT TRIGGER IF EXISTS ensure_rls_on_new_tables;
CREATE EVENT TRIGGER ensure_rls_on_new_tables
ON ddl_command_end
WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS')
EXECUTE FUNCTION public.auto_enable_rls();

-- 4. Defense-in-depth: Revoke direct table privileges from anon role on public schema
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon;
