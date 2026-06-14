-- İlk admin kullanıcısını bağlamak için (Supabase SQL Editor'da çalıştırın)
--
-- 1. Supabase → Authentication → Users → kullanıcının UUID'sini kopyalayın
-- 2. Aşağıdaki USER_UUID yerine yapıştırın
-- 3. Run

INSERT INTO admin_profiles (id, email, name, role, permissions)
VALUES (
  'USER_UUID',
  'admin@autohausaker.de',
  'Can Aker',
  'super_admin',
  '{"vehicles":true,"settings":true,"sell_requests":true,"users":true}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  permissions = EXCLUDED.permissions;
