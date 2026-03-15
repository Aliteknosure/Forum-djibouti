-- ============================================================
-- Forum BOOST 2026 — Ajout Masterclasse + Panel + session_choice
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- 1. Supprimer l'ancienne contrainte CHECK sur participant_type
ALTER TABLE registrations
DROP CONSTRAINT IF EXISTS registrations_participant_type_check;

-- 2. Recréer la contrainte avec les nouveaux types
ALTER TABLE registrations
ADD CONSTRAINT registrations_participant_type_check
CHECK (participant_type IN (
  'speaker',
  'investor',
  'startup_msme',
  'exhibitor',
  'ecosystem_leader',
  'partner',
  'visitor',
  'masterclasse',
  'panel'
));

-- 3. Ajouter la colonne session_choice si elle n'existe pas déjà
ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS session_choice TEXT DEFAULT NULL;

-- 4. Commentaire explicatif
COMMENT ON COLUMN registrations.session_choice IS
  'Session choisie pour Masterclasse (mc1-mc4) ou Panel (p1-p5). NULL pour les autres types.';

-- 5. Vérification — types acceptés
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'registrations'::regclass
  AND conname = 'registrations_participant_type_check';

-- 6. Vérification — colonne session_choice
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'registrations'
  AND column_name = 'session_choice';
