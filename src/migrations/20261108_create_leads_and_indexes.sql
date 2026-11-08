-- ==============================================================================
-- PontLook SaaS - Migration: Add Leads Collection, Enums, and Performance Indexes
-- ==============================================================================

-- 1. Extend Existing Status Enums with 'archived'
DO $$ BEGIN
    ALTER TYPE enum_articles_status ADD VALUE IF NOT EXISTS 'archived';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TYPE enum_downloads_status ADD VALUE IF NOT EXISTS 'archived';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TYPE enum_events_status ADD VALUE IF NOT EXISTS 'archived';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TYPE enum_podcasts_status ADD VALUE IF NOT EXISTS 'archived';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Enums for Leads Collection
DO $$ BEGIN
    CREATE TYPE enum_leads_role AS ENUM ('buyer', 'provider');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enum_leads_tier AS ENUM ('HOT', 'WARM', 'QUALIFIED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enum_leads_status AS ENUM (
        'new',
        'contacted',
        'in_qualification',
        'proposals_sent',
        'won',
        'lost',
        'disqualified'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Create Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id serial PRIMARY KEY,
    lead_id varchar NOT NULL,
    full_name varchar NOT NULL,
    work_email varchar NOT NULL,
    job_title varchar,
    organization_name varchar NOT NULL,
    country varchar NOT NULL,
    phone_number varchar,
    role enum_leads_role DEFAULT 'buyer',
    tier enum_leads_tier NOT NULL DEFAULT 'QUALIFIED',
    score numeric NOT NULL DEFAULT 0,
    status enum_leads_status NOT NULL DEFAULT 'new',
    training_domains varchar,
    delivery_mode varchar,
    city varchar,
    language varchar,
    customization varchar,
    cohort_size varchar,
    timeline varchar,
    budget_band varchar,
    currency varchar DEFAULT 'USD',
    headcount varchar,
    additional_context varchar,
    notes varchar,
    dispatch_status_email_sent boolean DEFAULT false,
    dispatch_status_slack_sent boolean DEFAULT false,
    dispatch_status_crm_sent boolean DEFAULT false,
    checklist jsonb,
    source_ip varchar,
    updated_at timestamptz DEFAULT now() NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- 4. Create Indexes for Leads
CREATE UNIQUE INDEX IF NOT EXISTS leads_lead_id_idx ON public.leads (lead_id);
CREATE INDEX IF NOT EXISTS leads_work_email_idx ON public.leads (work_email);
CREATE INDEX IF NOT EXISTS leads_organization_name_idx ON public.leads (organization_name);
CREATE INDEX IF NOT EXISTS leads_country_idx ON public.leads (country);
CREATE INDEX IF NOT EXISTS leads_tier_idx ON public.leads (tier);
CREATE INDEX IF NOT EXISTS leads_score_idx ON public.leads (score);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_updated_at_idx ON public.leads (updated_at);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at);

-- 5. Performance Indexes on Existing Content Collections
CREATE INDEX IF NOT EXISTS articles_status_idx ON public.articles (status);
CREATE INDEX IF NOT EXISTS articles_published_at_idx ON public.articles (published_at DESC);
CREATE INDEX IF NOT EXISTS downloads_status_idx ON public.downloads (status);
CREATE INDEX IF NOT EXISTS events_status_idx ON public.events (status);
CREATE INDEX IF NOT EXISTS events_date_idx ON public.events (date);
CREATE INDEX IF NOT EXISTS podcasts_status_idx ON public.podcasts (status);
