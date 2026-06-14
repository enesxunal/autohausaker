import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import {
  getVehicleBySlug,
  getVehicles,
  getVehicleDescription,
  formatMileage,
  formatPrice,
  whatsappLink,
  phoneLink,
} from "@/lib/data";
import { getSettings } from "@/lib/data";
import StatusBadge from "@/components/vehicles/StatusBadge";
import VehicleCard from "@/components/vehicles/VehicleCard";
import { MessageCircle, Phone } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Not Found" };
  return { title: `${vehicle.title} | Autohaus AKER` };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const t = await getTranslations("vehicle");
  const tTrans = await getTranslations("transmission");
  const tFuel = await getTranslations("fuel");
  const locale = await getLocale();
  const settings = await getSettings();
  const description = getVehicleDescription(vehicle, locale as "de" | "en" | "tr");
  const price = formatPrice(vehicle.price, locale as "de" | "en" | "tr");
  const similar = (await getVehicles({ brand: vehicle.brand }))
    .filter((v) => v.id !== vehicle.id)
    .slice(0, 3);

  const waMessage = `${vehicle.title} - ${t("contact")}`;

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border">
              <Image
                src={vehicle.images[0] || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80"}
                alt={vehicle.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {vehicle.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {vehicle.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-sm border border-border">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <StatusBadge status={vehicle.status} />
            <p className="mt-4 text-sm uppercase tracking-wider text-gold">{vehicle.brand}</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">{vehicle.title}</h1>
            <p className="mt-6 text-3xl font-bold text-gold">
              {price ?? t("priceOnRequest")}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-6">
              {vehicle.year && (
                <>
                  <dt className="text-sm text-muted">{t("year")}</dt>
                  <dd className="font-medium">{vehicle.year}</dd>
                </>
              )}
              {vehicle.mileage && (
                <>
                  <dt className="text-sm text-muted">{t("mileage")}</dt>
                  <dd className="font-medium">{formatMileage(vehicle.mileage, locale as "de" | "en" | "tr")}</dd>
                </>
              )}
              {vehicle.transmission && (
                <>
                  <dt className="text-sm text-muted">{t("transmission")}</dt>
                  <dd className="font-medium">{tTrans(vehicle.transmission)}</dd>
                </>
              )}
              {vehicle.fuel_type && (
                <>
                  <dt className="text-sm text-muted">{t("fuel")}</dt>
                  <dd className="font-medium">{tFuel(vehicle.fuel_type)}</dd>
                </>
              )}
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappLink(settings.whatsapp, waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={18} />
                {t("whatsapp")}
              </a>
              <a href={phoneLink(settings.phone)} className="btn-outline">
                <Phone size={18} />
                {t("call")}
              </a>
            </div>

            {description && (
              <div className="mt-10">
                <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-gold">
                  {t("description")}
                </h2>
                <p className="text-muted leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            )}
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-2xl font-bold uppercase tracking-wider">{t("similar")}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
