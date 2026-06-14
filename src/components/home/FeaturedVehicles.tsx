import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getVehicles } from "@/lib/data";
import VehicleCard from "@/components/vehicles/VehicleCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";

export default async function FeaturedVehicles() {
  const t = await getTranslations("featured");
  let vehicles = await getVehicles({ featured: true });
  if (vehicles.length === 0) {
    vehicles = await getVehicles({});
  }

  if (vehicles.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label="Exklusiv"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.slice(0, 4).map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/fahrzeuge" className="btn-outline">
            {t("viewAll")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
