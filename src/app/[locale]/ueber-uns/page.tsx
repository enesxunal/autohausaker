import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return { title: `${t("title")} | Autohaus AKER` };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <SectionHeading label="Autohaus AKER" title={t("title")} align="left" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-3 gold-gradient-border opacity-50" />
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/storefront.png"
                alt="Autohaus AKER Showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>

          <div>
            <p className="text-lg leading-relaxed text-muted">{t("intro")}</p>

            <h2 className="font-display mt-12 text-2xl font-semibold uppercase tracking-wide gold-gradient-text">
              {t("mission")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{t("missionText")}</p>
          </div>
        </div>

        <h2 className="font-display mt-20 text-2xl font-semibold uppercase tracking-wide gold-gradient-text">
          {t("values")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {(["quality", "trust", "service"] as const).map((key) => (
            <div key={key} className="premium-panel p-8">
              <div className="gold-line-h mb-6 w-12" />
              <p className="leading-relaxed text-muted">{t(`valuesItems.${key}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
