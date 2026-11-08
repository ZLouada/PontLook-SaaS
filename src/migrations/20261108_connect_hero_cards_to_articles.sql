-- ==============================================================================
-- PontLook SaaS - Migration: Connect Resources Hero 3D Cards to Articles Collection
-- ==============================================================================

-- 1. Add Card 01 - 04 Article Foreign Keys to resources_hero Global
DO $$ BEGIN
    ALTER TABLE public.resources_hero
    ADD COLUMN IF NOT EXISTS card1_article_id integer REFERENCES public.articles(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS card2_article_id integer REFERENCES public.articles(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS card3_article_id integer REFERENCES public.articles(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS card4_article_id integer REFERENCES public.articles(id) ON DELETE SET NULL;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- 2. Add featured_in_hero Flag to Articles Collection
DO $$ BEGIN
    ALTER TABLE public.articles
    ADD COLUMN IF NOT EXISTS featured_in_hero boolean DEFAULT false;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- 3. Add doc_type (e.g. Q2 REPORT, TREND STUDY) to articles_locales
DO $$ BEGIN
    ALTER TABLE public.articles_locales
    ADD COLUMN IF NOT EXISTS doc_type varchar;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- 4. Create Performance Indexes for Fast Foreign Key Lookups
CREATE INDEX IF NOT EXISTS resources_hero_card1_article_idx ON public.resources_hero (card1_article_id);
CREATE INDEX IF NOT EXISTS resources_hero_card2_article_idx ON public.resources_hero (card2_article_id);
CREATE INDEX IF NOT EXISTS resources_hero_card3_article_idx ON public.resources_hero (card3_article_id);
CREATE INDEX IF NOT EXISTS resources_hero_card4_article_idx ON public.resources_hero (card4_article_id);
CREATE INDEX IF NOT EXISTS articles_featured_in_hero_idx ON public.articles (featured_in_hero);
