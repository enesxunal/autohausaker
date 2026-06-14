import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import type { Vehicle } from "@/lib/types";
import { formatMileage, formatPrice } from "@/lib/data";
import StatusBadge from "@/components/vehicles/StatusBadge";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default async function VehicleCard({ vehicle }: VehicleCardProps) {
  const t = await getTranslations("vehicle");
  const locale = await getLocale();
  const price = formatPrice(vehicle.price, locale as "de" | "en" | "tr");
  const image = vehicle.images[0] || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80";

  return (
    <Link href={`/fahrzeuge/${vehicle.slug}`} className="card group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={vehicle.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <StatusBadge status={vehicle.status} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] gold-gradient-text">
            {vehicle.brand}
          </p>
        </div>
      </div>
      <div className="border-t border-gold/10 p-6">
        <h3 className="font-display text-xl font-medium leading-snug transition-colors group-hover:gold-gradient-text">
          {vehicle.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-4 text-[11px] uppercase tracking-wider text-muted">
          {vehicle.year && <span>{vehicle.year}</span>}
          {vehicle.mileage && (
            <>
              <span className="text-gold/30">|</span>
              <span>{formatMileage(vehicle.mileage, locale as "de" | "en" | "tr")}</span>
            </>
          )}
        </div>
        <div className="gold-line-h my-4" />
        <p className="font-display text-2xl font-semibold gold-gradient-text">
          {price ?? t("priceOnRequest")}
        </p>
      </div>
    </Link>
  );
}
