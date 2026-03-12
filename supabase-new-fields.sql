-- Migration : ajout des champs conditionnels par rôle + mise à jour des types participants
-- À exécuter dans Supabase → SQL Editor

-- ÉTAPE 1 : Supprimer l'ancienne contrainte
ALTER TABLE registrations DROP CONSTRAINT IF EXISTS registrations_participant_type_check;

-- ÉTAPE 2 : Migrer les anciennes valeurs vers les nouveaux types
UPDATE registrations SET participant_type = 'speaker'      WHERE participant_type = 'paneliste';
UPDATE registrations SET participant_type = 'exhibitor'    WHERE participant_type = 'exposant_msme';
UPDATE registrations SET participant_type = 'visitor'      WHERE participant_type = 'press';

-- ÉTAPE 3 : Appliquer la nouvelle contrainte (maintenant toutes les lignes sont conformes)
ALTER TABLE registrations ADD CONSTRAINT registrations_participant_type_check
  CHECK (participant_type IN ('speaker', 'investor', 'startup_msme', 'exhibitor', 'ecosystem_leader', 'partner', 'visitor'));

-- ÉTAPE 4 : Colonnes conditionnelles (idempotent — IF NOT EXISTS)
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS sector TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS region_origin TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS stand_needs TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS institution TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS topic TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS media_name TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS media_type TEXT;
