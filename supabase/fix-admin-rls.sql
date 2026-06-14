-- Admin profili var ama giriş "profil yok" diyorsa bu RLS düzeltmesini çalıştırın.
-- Supabase SQL Editor → Run

DROP POLICY IF EXISTS "Users can read own admin profile" ON admin_profiles;

CREATE POLICY "Users can read own admin profile" ON admin_profiles
  FOR SELECT USING (auth.uid() = id);
