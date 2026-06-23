import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

export default async function SellCta() {
  const t = await getTranslations("sellCta");

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="relative overflow-hidden gold-gradient-border">
          <div className="absolute inset-0">
            <Image
              src="/images/storefront.jpg"
              alt="Autohaus AKER"
              fill
              className="object-cover opacity-55 saturate-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />
          </div>

          <div className="gold-v-frame relative px-5 py-12 text-center sm:px-8 md:px-20 md:py-24">
            <p className="text-[9px] font-bold uppercase tracking-[0.35em] gold-gradient-text md:text-[10px] md:tracking-[0.45em]">
              Vermittlung
            </p>
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-2xl font-semibold uppercase tracking-wide sm:text-3xl md:text-5xl">
              <span className="gold-gradient-text">{t("title")}</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-muted md:mt-6 md:text-lg">
              {t("subtitle")}
            </p>
            <Link href="/verkaufen" className="btn-primary relative mt-8 w-full sm:mt-10 sm:w-auto">
              {t("button")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
