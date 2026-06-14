import { getTranslations } from "next-intl/server";
import { LUXURY_BRANDS } from "@/data/brands";
import BrandLogo from "@/components/ui/BrandLogo";

export default async function BrandLogos() {
  const t = await getTranslations("brands");
  const doubled = [...LUXURY_BRANDS, ...LUXURY_BRANDS];

  return (
    <section className="relative overflow-hidden border-y border-gold/12 bg-surface py-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(154,123,79,0.05),transparent_70%)]" />

      <div className="container-narrow relative mb-10 px-4 text-center md:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.45em] gold-gradient-text">
          {t("title")}
        </p>
        <p className="mt-2 font-display text-2xl uppercase tracking-[0.2em] text-foreground/80 md:text-3xl">
          Luxury Cars
        </p>
        <div className="gold-line-h mx-auto mt-6 w-32" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-surface to-transparent" />

        <div className="flex animate-marquee gap-12 md:gap-20">
          {doubled.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="group flex shrink-0 flex-col items-center gap-3"
            >
              <div className="flex h-[72px] w-[120px] items-center justify-center rounded-sm border border-gold/8 bg-black/40 px-4 transition-all duration-300 group-hover:border-gold/25 group-hover:bg-black/60">
                <BrandLogo
                  src={brand.file}
                  alt={brand.name}
                  width={96}
                  height={52}
                  className="max-h-11 w-auto md:max-h-12"
                />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted/50 group-hover:text-gold/70">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
