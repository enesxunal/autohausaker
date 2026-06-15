import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Phone } from "lucide-react";
import { LUXURY_BRANDS } from "@/data/brands";
import BrandLogo from "@/components/ui/BrandLogo";
import { getSettings, phoneLink } from "@/lib/data";

const HERO_IMAGE = "/images/autohausaker-banner.jpg?v=3";

export default async function Hero() {
  const t = await getTranslations("hero");
  const settings = await getSettings();

  return (
    <section className="relative min-h-[78vh] overflow-hidden md:min-h-[92vh]">
      <Image
        src={HERO_IMAGE}
        alt="Autohaus AKER Premium Fahrzeuge"
        fill
        priority
        unoptimized
        className="object-cover object-[center_30%] brightness-105 contrast-105 saturate-110 md:object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent md:via-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/20" />

      <div className="absolute left-0 top-0 hidden h-32 w-32 border-l-2 border-t-2 border-gold/30 md:block" />
      <div className="absolute bottom-0 right-0 hidden h-32 w-32 border-b-2 border-r-2 border-gold/30 md:block" />

      <div className="container-narrow relative flex min-h-[78vh] flex-col justify-center px-4 py-20 md:min-h-[92vh] md:px-8 md:py-28">
        <div className="mb-6 hidden flex-wrap items-center gap-4 sm:flex md:mb-8 md:gap-8">
          {LUXURY_BRANDS.slice(0, 5).map((brand) => (
            <BrandLogo
              key={brand.id}
              src={brand.file}
              alt={brand.name}
              width={72}
              height={44}
              variant="hero"
            />
          ))}
        </div>

        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.35em] gold-gradient-text md:mb-3 md:text-[10px] md:tracking-[0.5em]">
          Autohaus AKER · Luxury Cars
        </p>

        <h1 className="font-display max-w-4xl text-[2rem] font-semibold leading-[1.08] tracking-wide sm:text-5xl md:text-7xl lg:text-8xl">
          <span className="gold-gradient-text">{t("title")}</span>
        </h1>

        <p className="mt-5 max-w-xl border-l-2 border-gold/40 pl-4 text-base leading-relaxed text-muted md:mt-8 md:pl-6 md:text-xl">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 md:mt-12">
          <Link href="/fahrzeuge" className="btn-primary w-full sm:w-auto">
            {t("cta")}
            <ArrowRight size={16} />
          </Link>
          <Link href="/kontakt" className="btn-outline w-full sm:w-auto">
            {t("ctaSecondary")}
          </Link>
        </div>

        <div className="mt-10 grid w-full gap-4 border border-gold/15 bg-black/45 p-4 backdrop-blur-sm sm:mt-16 sm:inline-flex sm:flex-wrap sm:items-center sm:gap-6 sm:px-6 sm:py-4 md:mt-16">
          <div className="flex items-center gap-3">
            <Phone size={18} className="shrink-0 text-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted">Hotline</p>
              <a href={phoneLink(settings.phone)} className="font-semibold gold-gradient-text">
                {settings.phone}
              </a>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-gold/15 md:block" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">Standort</p>
            <p className="text-sm text-foreground">Niederkassel · Köln</p>
          </div>
          <div className="hidden h-8 w-px bg-gold/15 md:block" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">Import</p>
            <p className="text-sm gold-gradient-text">Korea → Deutschland</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}
