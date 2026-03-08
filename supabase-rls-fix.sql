-- À exécuter dans Supabase > SQL Editor
-- Corrige le problème RLS qui bloque la service_role

-- 1. Supprimer les policies existantes si elles existent
DROP POLICY IF EXISTS "service_role_all" ON registrations;
DROP POLICY IF EXISTS "anon_insert" ON registrations;
DROP POLICY IF EXISTS "anon_select" ON registrations;

-- 2. S'assurer que RLS est activé
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- 3. Policy : accès total pour la service_role (admin/API)
CREATE POLICY "service_role_all" ON registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Policy : insertion publique (formulaire d'inscription)
CREATE POLICY "anon_insert" ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. Policy : lecture publique (check-in)
CREATE POLICY "anon_select" ON registrations
  FOR SELECT
  TO anon
  USING (true);
