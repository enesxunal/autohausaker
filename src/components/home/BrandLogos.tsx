import { getTranslations } from "next-intl/server";
import { LUXURY_BRANDS } from "@/data/brands";
import BrandLogo from "@/components/ui/BrandLogo";

export default async function BrandLogos() {
  const t = await getTranslations("brands");
  const doubled = [...LUXURY_BRANDS, ...LUXURY_BRANDS];

  return (
    <section className="relative overflow-hidden border-y border-gold/12 bg-surface py-10 md:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(154,123,79,0.05),transparent_70%)]" />

      <div className="container-narrow relative mb-8 px-4 text-center md:mb-10 md:px-8">
        <p className="text-[9px] font-bold uppercase tracking-[0.35em] gold-gradient-text md:text-[10px] md:tracking-[0.45em]">
          {t("title")}
        </p>
        <p className="mt-2 font-display text-xl uppercase tracking-[0.15em] text-foreground/80 md:text-3xl md:tracking-[0.2em]">
          Luxury Cars
        </p>
        <div className="gold-line-h mx-auto mt-5 w-24 md:mt-6 md:w-32" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-surface to-transparent md:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-surface to-transparent md:w-24" />

        <div className="flex animate-marquee gap-8 md:gap-20">
          {doubled.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="group flex shrink-0 flex-col items-center gap-2 md:gap-3"
            >
              <div className="flex h-14 w-[88px] items-center justify-center rounded-sm border border-gold/8 bg-black/40 px-3 transition-all duration-300 group-hover:border-gold/25 md:h-[72px] md:w-[120px] md:px-4">
                <BrandLogo
                  src={brand.file}
                  alt={brand.name}
                  width={96}
                  height={52}
                  className="max-h-8 w-auto md:max-h-12"
                />
              </div>
              <span className="hidden text-[9px] uppercase tracking-[0.2em] text-muted/50 group-hover:text-gold/70 sm:block">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
