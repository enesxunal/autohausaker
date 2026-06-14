"use client";

import Link from "next/link";
import { useAdminLocale } from "./AdminLocaleProvider";
import type { Vehicle } from "@/lib/types";

export default function AdminVehiclesList({ vehicles }: { vehicles: Vehicle[] }) {
  const { t } = useAdminLocale();

  if (vehicles.length === 0) {
    return <p className="text-muted">{t("noData")}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-surface-elevated">
          <tr>
            <th className="px-4 py-3 text-left text-muted">{t("title")}</th>
            <th className="px-4 py-3 text-left text-muted">{t("brand")}</th>
            <th className="px-4 py-3 text-left text-muted">{t("status")}</th>
            <th className="px-4 py-3 text-left text-muted">{t("price")}</th>
            <th className="px-4 py-3 text-left text-muted">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} className="border-b border-border hover:bg-surface-elevated">
              <td className="px-4 py-3">{v.title}</td>
              <td className="px-4 py-3 text-muted">{v.brand}</td>
              <td className="px-4 py-3">
                <span className={v.status === "available" ? "badge-available" : "badge-transit"}>
                  {v.status === "available" ? t("available") : t("inTransit")}
                </span>
              </td>
              <td className="px-4 py-3 text-gold">
                {v.price ? `€${v.price.toLocaleString()}` : "—"}
              </td>
              <td className="px-4 py-3">
                <Link href={`/admin/vehicles/${v.id}`} className="text-gold hover:underline">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
