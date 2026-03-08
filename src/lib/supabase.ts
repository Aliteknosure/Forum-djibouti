import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Valeurs par défaut pour éviter l'erreur au build (sans vraies clés)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnonKey

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

export const SUPABASE_SCHEMA = `
-- Table des inscriptions
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  organization TEXT,
  job_title TEXT,
  participant_type TEXT NOT NULL CHECK (participant_type IN ('visitor', 'speaker', 'press', 'vip', 'student')),
  country TEXT NOT NULL,
  photo_url TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  badge_sent BOOLEAN DEFAULT FALSE,
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_participant_type ON registrations(participant_type);

-- Activer RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy : la service_role a un accès total (bypass RLS)
CREATE POLICY "service_role_all" ON registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy : accès en insertion pour les anonymes (inscription publique)
CREATE POLICY "anon_insert" ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy : accès en lecture pour les anonymes (check-in public)
CREATE POLICY "anon_select" ON registrations
  FOR SELECT
  TO anon
  USING (true);
`
