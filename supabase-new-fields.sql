-- Migration : ajout des champs conditionnels par rôle
-- À exécuter dans Supabase → SQL Editor

-- ⚠️ IMPORTANT : Mettre à jour la contrainte participant_type
-- Supprimer l'ancienne contrainte
ALTER TABLE registrations DROP CONSTRAINT IF EXISTS registrations_participant_type_check;

-- Recréer avec les nouveaux types
ALTER TABLE registrations ADD CONSTRAINT registrations_participant_type_check
  CHECK (participant_type IN ('visitor', 'press', 'exposant_msme', 'paneliste'));

-- Champs Exposant MSME
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS sector TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS region_origin TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS stand_needs TEXT;

-- Champs Panéliste
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS institution TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS topic TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS bio TEXT;

-- Champs Presse
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS media_name TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS media_type TEXT;

