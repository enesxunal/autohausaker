import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { SiteSettings } from "@/lib/types";
import { phoneLink } from "@/lib/data";
import { LUXURY_BRANDS } from "@/data/brands";
import BrandLogo from "@/components/ui/BrandLogo";

interface FooterProps {
  settings: SiteSettings;
}

export default async function Footer({ settings }: FooterProps) {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tLegal = await getTranslations("legal");

  const navLinks = [
    { href: "/fahrzeuge" as const, label: tNav("vehicles") },
    { href: "/ueber-uns" as const, label: tNav("about") },
    { href: "/service" as const, label: tNav("service") },
    { href: "/faq" as const, label: tNav("faq") },
    { href: "/kontakt" as const, label: tNav("contact") },
    { href: "/verkaufen" as const, label: tNav("sell") },
  ];

  const legalLinks = [
    { href: "/impressum" as const, label: tLegal("impressum") },
    { href: "/datenschutz" as const, label: tLegal("privacy") },
    { href: "/agb" as const, label: tLegal("terms") },
  ];

  return (
    <footer className="relative border-t border-gold/20 bg-surface">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Brand logo strip */}
      <div className="border-b border-gold/10 py-8">
        <div className="container-narrow flex flex-wrap items-center justify-center gap-8 px-4 opacity-50 md:gap-12">
          {LUXURY_BRANDS.slice(0, 6).map((brand) => (
            <BrandLogo
              key={brand.id}
              src={brand.file}
              alt={brand.name}
              width={56}
              height={36}
              variant="footer"
              className="h-8 w-auto"
            />
          ))}
        </div>
      </div>

      <div className="container-narrow section-padding grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold uppercase tracking-[0.15em] gold-gradient-text">
            Autohaus AKER
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted">Luxury Cars</p>
          <p className="mt-5 text-sm leading-relaxed text-muted">{t("tagline")}</p>
        </div>

        <div>
          <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] gold-gradient-text">
            {t("navigation")}
          </h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] gold-gradient-text">
            {t("legal")}
          </h3>
          <ul className="space-y-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] gold-gradient-text">
            {t("contact")}
          </h3>
          <address className="not-italic space-y-2 text-sm text-muted">
            <p className="font-medium text-foreground">{settings.company_name}</p>
            <p>{settings.address}</p>
            <p>
              <a href={phoneLink(settings.phone)} className="transition-colors hover:text-gold-light">
                {settings.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${settings.email}`} className="transition-colors hover:text-gold-light">
                {settings.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-gold/10 px-4 py-8 md:px-8">
        <div className="container-narrow flex flex-col items-center justify-between gap-4 text-center text-[11px] text-muted md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} {settings.company_name}. {t("rights")}</p>
          <p>{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
