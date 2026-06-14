import { getTranslations, getLocale } from "next-intl/server";
import { getSettings, phoneLink } from "@/lib/data";
import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return { title: `${t("title")} | Autohaus AKER` };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const settings = await getSettings();
  const hours = settings.opening_hours[locale] || settings.opening_hours.de;

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wider md:text-4xl">{t("title")}</h1>
          <p className="mt-4 text-muted">{t("subtitle")}</p>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="shrink-0 text-gold" size={24} />
              <div>
                <p className="font-semibold text-gold">{t("address")}</p>
                <p className="mt-1 text-muted">{settings.company_name}</p>
                <p className="text-muted">{settings.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="shrink-0 text-gold" size={24} />
              <div>
                <p className="font-semibold text-gold">{t("phone_label")}</p>
                <a href={phoneLink(settings.phone)} className="text-muted hover:text-gold">
                  {settings.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="shrink-0 text-gold" size={24} />
              <div>
                <p className="font-semibold text-gold">{t("email_label")}</p>
                <a href={`mailto:${settings.email}`} className="text-muted hover:text-gold">
                  {settings.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="shrink-0 text-gold" size={24} />
              <div>
                <p className="font-semibold text-gold">{t("hours")}</p>
                <p className="text-muted">{hours}</p>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-border bg-surface p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
