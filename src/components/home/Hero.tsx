import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Phone } from "lucide-react";
import { LUXURY_BRANDS } from "@/data/brands";
import BrandLogo from "@/components/ui/BrandLogo";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1614162692292-7a56aaa85057?w=1920&q=80";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Ferrari 488 GTB"
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/88 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/45 to-black/65" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(154,123,79,0.1),transparent_60%)]" />

      <div className="absolute left-0 top-0 h-32 w-32 border-l-2 border-t-2 border-gold/30" />
      <div className="absolute bottom-0 right-0 h-32 w-32 border-b-2 border-r-2 border-gold/30" />

      <div className="container-narrow relative flex min-h-[92vh] flex-col justify-center px-4 py-28 md:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-5 md:gap-8">
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

        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.5em] gold-gradient-text">
          Autohaus AKER · Luxury Cars
        </p>

        <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[1.05] tracking-wide md:text-7xl lg:text-8xl">
          <span className="gold-gradient-text">{t("title")}</span>
        </h1>

        <p className="mt-8 max-w-xl border-l-2 border-gold/40 pl-6 text-lg leading-relaxed text-muted md:text-xl">
          {t("subtitle")}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-5">
          <Link href="/fahrzeuge" className="btn-primary">
            {t("cta")}
            <ArrowRight size={16} />
          </Link>
          <Link href="/kontakt" className="btn-outline">
            {t("ctaSecondary")}
          </Link>
        </div>

        <div className="mt-16 inline-flex flex-wrap items-center gap-6 border border-gold/15 bg-black/45 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted">Hotline</p>
              <p className="font-semibold gold-gradient-text">+49 176 32510469</p>
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
