import { getTranslations, getLocale } from "next-intl/server";
import { getVehicles } from "@/lib/data";
import VehicleCard from "@/components/vehicles/VehicleCard";
import VehicleFilters from "@/components/vehicles/VehicleFilters";

interface PageProps {
  searchParams: Promise<{ brand?: string; status?: string; q?: string }>;
}

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: `${t("vehicles")} | Autohaus AKER` };
}

export default async function VehiclesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const t = await getTranslations("vehicle");
  const locale = await getLocale();

  const vehicles = await getVehicles({
    brand: params.brand,
    status: params.status as "available" | "in_transit" | undefined,
    search: params.q,
  });

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="mb-8 text-3xl font-bold uppercase tracking-wider md:text-4xl">
          {locale === "tr" ? "Araç Kataloğu" : locale === "en" ? "Vehicle Catalog" : "Fahrzeugkatalog"}
        </h1>
        <VehicleFilters
          initialBrand={params.brand}
          initialStatus={params.status}
          initialQuery={params.q}
        />
        {vehicles.length === 0 ? (
          <p className="mt-12 text-center text-muted">{t("noResults")}</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
