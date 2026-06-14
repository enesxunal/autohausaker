import { getTranslations } from "next-intl/server";
import { Ship, Search, FileCheck, Truck, Handshake, Sparkles } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations("service");
  return { title: `${t("title")} | Autohaus AKER` };
}

export default async function ServicePage() {
  const t = await getTranslations("service");

  const services = [
    { key: "import", icon: Ship },
    { key: "check", icon: Search },
    { key: "customs", icon: FileCheck },
    { key: "delivery", icon: Truck },
    { key: "buySell", icon: Handshake },
    { key: "detailing", icon: Sparkles },
  ] as const;

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <div className="mb-16 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wider md:text-4xl">{t("title")}</h1>
          <p className="mt-4 text-muted">{t("subtitle")}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, icon: Icon }) => (
            <div key={key} className="card p-8">
              <Icon className="mb-4 text-gold" size={32} />
              <h2 className="text-xl font-semibold">{t(`${key}.title`)}</h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">{t(`${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
