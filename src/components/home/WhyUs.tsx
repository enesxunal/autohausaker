import { getTranslations } from "next-intl/server";
import { Shield, Ship, FileCheck, BadgeEuro } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function WhyUs() {
  const t = await getTranslations("whyUs");

  const items = [
    { key: "check", icon: Shield },
    { key: "shipping", icon: Ship },
    { key: "customs", icon: FileCheck },
    { key: "price", icon: BadgeEuro },
  ] as const;

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.07),transparent_60%)]" />

      <div className="container-narrow relative">
        <SectionHeading label="Autohaus AKER" title={t("title")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              className="premium-panel group relative p-8 transition-all duration-500 hover:border-gold/40"
            >
              <span className="font-display absolute right-6 top-6 text-5xl font-bold text-gold/10 transition-colors group-hover:text-gold/20">
                0{i + 1}
              </span>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm border border-gold/30 bg-gradient-to-br from-gold/15 to-transparent">
                <Icon className="text-gold-light" size={26} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`items.${key}.desc`)}
              </p>
              <div className="gold-line-h mt-6 w-12 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
