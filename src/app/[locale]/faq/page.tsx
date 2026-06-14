import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("faq");
  return { title: `${t("title")} | Autohaus AKER` };
}

export default async function FaqPage() {
  const t = await getTranslations("faq");
  const keys = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl">
        <h1 className="mb-12 text-3xl font-bold uppercase tracking-wider md:text-4xl">
          {t("title")}
        </h1>
        <div className="space-y-4">
          {keys.map((key) => (
            <details
              key={key}
              className="group rounded-sm border border-border bg-surface open:border-gold/50"
            >
              <summary className="cursor-pointer p-6 font-semibold marker:content-none list-none flex justify-between items-center">
                {t(`items.${key}.q`)}
                <span className="text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="border-t border-border px-6 pb-6 pt-4 text-muted leading-relaxed">
                {t(`items.${key}.a`)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
