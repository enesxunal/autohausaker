"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAdminLocale } from "./AdminLocaleProvider";
import type { Vehicle } from "@/lib/types";

export default function AdminVehiclesList({ vehicles }: { vehicles: Vehicle[] }) {
  const { t } = useAdminLocale();
  const router = useRouter();
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");

  const importSeed = async () => {
    setImporting(true);
    setImportError("");
    try {
      const res = await fetch("/api/admin/vehicles/import-seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setImportError(data.error || t("importError"));
        return;
      }
      router.refresh();
    } catch {
      setImportError(t("importError"));
    } finally {
      setImporting(false);
    }
  };

  if (vehicles.length === 0) {
    return (
      <div className="rounded-sm border border-border bg-surface p-8 text-center">
        <p className="text-muted">{t("emptyVehiclesHint")}</p>
        {importError && (
          <p className="mt-4 text-sm text-red-400">{importError}</p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={importSeed}
            disabled={importing}
            className="btn-primary text-sm"
          >
            {importing ? "..." : t("importSeedVehicles")}
          </button>
          <Link href="/admin/vehicles/new" className="btn-outline text-sm">
            + {t("addVehicle")}
          </Link>
        </div>
      </div>
    );
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
