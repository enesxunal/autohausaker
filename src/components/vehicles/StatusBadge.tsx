import { getTranslations } from "next-intl/server";
import type { VehicleStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: VehicleStatus;
}

export default async function StatusBadge({ status }: StatusBadgeProps) {
  const t = await getTranslations("status");
  const isAvailable = status === "available";

  return (
    <span className={isAvailable ? "badge-available" : "badge-transit"}>
      {t(status)}
    </span>
  );
}
