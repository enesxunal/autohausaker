-- Mevcut site_settings kaydındaki telefon ve WhatsApp numarasını güncelle
UPDATE site_settings
SET
  phone = '+49 1522 1597074',
  whatsapp = '+49 1522 1597074',
  updated_at = NOW()
WHERE id = '00000000-0000-0000-0000-000000000001';
