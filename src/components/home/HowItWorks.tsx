import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Search, CheckCircle, Package, Car } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function HowItWorks() {
  const t = await getTranslations("howItWorks");

  const steps = [
    { key: "1", icon: Search },
    { key: "2", icon: CheckCircle },
    { key: "3", icon: Package },
    { key: "4", icon: Car },
  ] as const;

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent md:block" />

          {steps.map(({ key, icon: Icon }, i) => (
            <div key={key} className="relative text-center">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-gold/20 bg-black" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gold/20 to-transparent" />
                <Icon className="relative text-gold-light" size={28} strokeWidth={1.5} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full gold-gradient-bg text-[10px] font-bold text-black">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(`steps.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/fahrzeuge" className="btn-primary">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
