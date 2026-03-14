-- ============================================================
-- PHOTO UPLOAD — Supabase Storage + colonne photo_url
-- À exécuter dans Supabase → SQL Editor
-- ============================================================

-- 1. Créer le bucket 'avatars' (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152, -- 2 Mo max
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Policy : upload public (anonyme)
CREATE POLICY "avatars_public_upload" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'avatars');

-- 3. Policy : lecture publique
CREATE POLICY "avatars_public_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'avatars');

-- 4. Ajouter la colonne photo_url dans la table registrations
ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS photo_url TEXT DEFAULT NULL;
