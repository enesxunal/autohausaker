"use client";

import { useEffect, useState } from "react";
import { useAdminLocale } from "@/components/admin/AdminLocaleProvider";
import type { SellRequest } from "@/lib/types";

export default function AdminSellRequestsList() {
  const { t } = useAdminLocale();
  const [requests, setRequests] = useState<SellRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/sell-requests")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        if (!Array.isArray(data)) throw new Error("Invalid response");
        setRequests(data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : t("noData")))
      .finally(() => setLoading(false));
  }, [t]);

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
  };

  if (loading) {
    return <p className="animate-pulse text-muted">...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  if (requests.length === 0) {
    return <p className="text-muted">{t("noData")}</p>;
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
            </div>
            <div className="flex gap-2">
              {r.status === "new" && (
                <button
                  onClick={() => updateStatus(r.id, "contacted")}
                  className="btn-outline text-xs"
                >
                  {t("markContacted")}
                </button>
              )}
              {r.status !== "closed" && (
                <button
                  onClick={() => updateStatus(r.id, "closed")}
                  className="btn-outline text-xs"
                >
                  {t("markClosed")}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
