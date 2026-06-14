"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { CAR_MAKES } from "@/data/car-makes-models";

interface VehicleFiltersProps {
  initialBrand?: string;
  initialStatus?: string;
  initialQuery?: string;
}

export default function VehicleFilters({
  initialBrand = "",
  initialStatus = "",
  initialQuery = "",
}: VehicleFiltersProps) {
  const t = useTranslations("search");
  const tStatus = useTranslations("status");
  const tVehicle = useTranslations("vehicle");
  const router = useRouter();

  const update = (key: string, value: string) => {
    const params = new URLSearchParams();
    const brand = key === "brand" ? value : initialBrand;
    const status = key === "status" ? value : initialStatus;
    const q = key === "q" ? value : initialQuery;
    if (brand) params.set("brand", brand);
    if (status) params.set("status", status);
    if (q) params.set("q", q);
    router.push(`/fahrzeuge?${params.toString()}`);
  };

  return (
    <div className="grid gap-4 rounded-sm border border-border bg-surface p-4 md:grid-cols-4">
      <p className="col-span-full text-sm font-semibold uppercase tracking-wider text-gold">
        {tVehicle("filters")}
      </p>
      <select
        value={initialBrand}
        onChange={(e) => update("brand", e.target.value)}
        className="input-field"
      >
        <option value="">{t("allBrands")}</option>
        {CAR_MAKES.map((make) => (
          <option key={make} value={make}>{make}</option>
        ))}
      </select>
      <select
        value={initialStatus}
        onChange={(e) => update("status", e.target.value)}
        className="input-field"
      >
        <option value="">{t("allStatus")}</option>
        <option value="available">{tStatus("available")}</option>
        <option value="in_transit">{tStatus("in_transit")}</option>
      </select>
      <input
        type="text"
        defaultValue={initialQuery}
        placeholder={t("placeholder")}
        onChange={(e) => {
          if (e.target.value.length === 0 || e.target.value.length > 2) {
            update("q", e.target.value);
          }
        }}
        className="input-field md:col-span-2"
      />
    </div>
  );
}
