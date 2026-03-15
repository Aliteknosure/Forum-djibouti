-- ============================================================
-- Forum BOOST 2026 — Ajout colonne session_choice
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- 1. Ajouter la colonne session_choice à la table registrations
ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS session_choice TEXT DEFAULT NULL;

-- 2. Commentaire explicatif
COMMENT ON COLUMN registrations.session_choice IS
  'Session choisie pour Masterclasse (mc1-mc4) ou Panel (p1-p5). NULL pour les autres types.';

-- 3. Vérification
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'registrations'
  AND column_name = 'session_choice';
