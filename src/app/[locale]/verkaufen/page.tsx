import { getTranslations } from "next-intl/server";
import SellCarForm from "@/components/forms/SellCarForm";

export async function generateMetadata() {
  const t = await getTranslations("sell");
  return { title: `${t("title")} | Autohaus AKER` };
}

export default async function SellPage() {
  const t = await getTranslations("sell");

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wider md:text-4xl">{t("title")}</h1>
          <p className="mt-4 text-muted">{t("subtitle")}</p>
        </div>
        <SellCarForm />
      </div>
    </div>
  );
}
