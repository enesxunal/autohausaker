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
    <section className="relative min-h-[78vh] overflow-hidden md:min-h-[92vh]">
      <Image
        src={HERO_IMAGE}
        alt="Ferrari 488 GTB"
        fill
        priority
        className="object-cover object-[center_30%] md:object-center md:scale-105"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/92 to-black/50 md:via-black/88 md:to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/55 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(154,123,79,0.1),transparent_60%)]" />

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
              <a href="tel:+4917632510469" className="font-semibold gold-gradient-text">
                +49 176 32510469
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
