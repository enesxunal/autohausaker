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
              src="/images/storefront.png"
              alt="Autohaus AKER"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
          </div>

          <div className="gold-v-frame relative px-8 py-16 text-center md:px-20 md:py-24">
            <p className="text-[10px] font-bold uppercase tracking-[0.45em] gold-gradient-text">
              An & Verkauf
            </p>
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-4xl font-semibold uppercase tracking-wide md:text-5xl">
              <span className="gold-gradient-text">{t("title")}</span>
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl text-lg text-muted">
              {t("subtitle")}
            </p>
            <Link href="/verkaufen" className="btn-primary relative mt-10">
              {t("button")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
