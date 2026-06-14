"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminLocale } from "@/components/admin/AdminLocaleProvider";
import type { SellRequest } from "@/lib/types";

interface Props {
  initialRequests: SellRequest[];
  loadError: string | null;
}

export default function AdminSellRequestsList({ initialRequests, loadError }: Props) {
  const { t } = useAdminLocale();
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/admin/sell-requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) return;
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: status as SellRequest["status"] } : r))
    );
    router.refresh();
  };

  if (loadError) {
    return (
      <div className="rounded-sm border border-red-500/30 bg-red-500/10 p-6">
        <p className="font-medium text-red-400">Veritabanı hatası</p>
        <p className="mt-2 text-sm text-muted">{loadError}</p>
        {loadError.includes("sell_requests") || loadError.includes("42P01") ? (
          <p className="mt-4 text-sm text-gold">
            Supabase → SQL Editor → supabase/schema.sql veya fix-sell-requests.sql çalıştırın
          </p>
        ) : null}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-sm border border-border bg-surface p-8 text-center">
        <p className="text-muted">{t("noData")}</p>
        <p className="mt-2 text-sm text-muted">
          Eski mailler panelde görünmez. Deploy sonrası siteden yeni talep gönderin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((r) => (
        <div key={r.id} className="card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{r.name}</p>
              <p className="text-sm text-muted">
                {r.email} · {r.phone}
              </p>
              <p className="mt-2 text-gold">
                {r.brand} {r.model} {r.year && `(${r.year})`}
              </p>
              {r.description && <p className="mt-2 text-sm text-muted">{r.description}</p>}
              {r.image_url && (
                <a
                  href={r.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-gold hover:underline"
                >
                  Foto
                </a>
              )}
              <p className="mt-1 text-xs text-muted">
                {new Date(r.created_at).toLocaleString("de-DE")}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`rounded-sm px-2 py-1 text-xs ${
                  r.status === "new"
                    ? "bg-gold/10 text-gold"
                    : r.status === "contacted"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-muted/20 text-muted"
                }`}
              >
                {r.status}
              </span>
              <div className="flex gap-2">
                {r.status === "new" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(r.id, "contacted")}
                    className="btn-outline text-xs"
                  >
                    {t("markContacted")}
                  </button>
                )}
                {r.status !== "closed" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(r.id, "closed")}
                    className="btn-outline text-xs"
                  >
                    {t("markClosed")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
