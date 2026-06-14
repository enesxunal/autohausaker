# Autohaus AKER

Premium araç ithalat ve satış sitesi — [autohausaker.de](https://autohausaker.de)

## Teknoloji

- **Next.js 16** (App Router)
- **Supabase** (Veritabanı + Auth)
- **Vercel Blob** (Görsel depolama)
- **Resend** (E-posta)
- **next-intl** (DE / EN / TR)

## Kurulum

```bash
npm install
cp .env.example .env.local
# .env.local dosyasını doldurun
npm run dev
```

Site: http://localhost:3000/de  
Admin: http://localhost:3000/admin

## Supabase Kurulumu

1. [supabase.com](https://supabase.com) üzerinde proje oluşturun
2. SQL Editor'da `supabase/schema.sql` dosyasını çalıştırın
3. İsteğe bağlı: `supabase/seed.sql` ile örnek araçları yükleyin
4. Authentication > Users > yeni kullanıcı ekleyin
5. Kullanıcı UUID'si ile `admin_profiles` tablosuna super_admin kaydı ekleyin (seed.sql'deki yorum satırına bakın)
6. `.env.local` dosyasına Supabase URL ve anahtarlarını ekleyin

## Vercel Deploy

1. GitHub reposunu Vercel'e bağlayın: https://github.com/enesxunal/autohausaker
2. Environment variables ekleyin (.env.example'daki tüm değerler)
3. Deploy edin
4. Domain: autohausaker.de → Vercel DNS ayarları

## Sayfalar

| Sayfa | URL |
|-------|-----|
| Anasayfa | /de, /en, /tr |
| Araç kataloğu | /de/fahrzeuge |
| İlan detay | /de/fahrzeuge/[slug] |
| Aracını sat | /de/verkaufen |
| Hakkımızda | /de/ueber-uns |
| Hizmetler | /de/service |
| SSS | /de/faq |
| İletişim | /de/kontakt |
| Impressum | /de/impressum |
| Datenschutz | /de/datenschutz |
| AGB | /de/agb |
| Admin | /admin |

## Admin Panel

- **Diller:** Almanca + Türkçe
- **Roller:** super_admin, editor, viewer
- **Özellikler:** İlan yönetimi, site ayarları, satış talepleri, kullanıcı yönetimi

## Not

Supabase yapılandırılmadan site seed (örnek) verilerle çalışır. Production için Supabase zorunludur.
