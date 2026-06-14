"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminLocaleProvider";
import { adminMessages } from "@/lib/admin-messages";
import type { SellRequest } from "@/lib/types";

interface Props {
  initialRequests: SellRequest[];
  loadError: string | null;
}

type AdminT = (key: keyof typeof adminMessages.de) => string;

function statusLabel(status: SellRequest["status"], t: AdminT) {
  if (status === "new") return t("statusNew");
  if (status === "contacted") return t("statusContacted");
  return t("statusClosed");
}

function statusClass(status: SellRequest["status"]) {
  if (status === "new") return "bg-gold/10 text-gold";
  if (status === "contacted") return "bg-blue-500/10 text-blue-400";
  return "bg-muted/20 text-muted";
}

export default function AdminSellRequestsList({ initialRequests, loadError }: Props) {
  const { t } = useAdminLocale();
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setActionError(null);
    const res = await fetch("/api/admin/sell-requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setActionError(t("updateError"));
      return;
    }
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
      {actionError && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {actionError}
        </p>
      )}

      {requests.map((r) => {
        const expanded = expandedId === r.id;

        return (
          <div key={r.id} className="card overflow-hidden">
            <button
              type="button"
              onClick={() => setExpandedId(expanded ? null : r.id)}
              className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-surface-elevated/40"
              aria-expanded={expanded}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{r.name}</p>
                  <span className={`rounded-sm px-2 py-0.5 text-xs ${statusClass(r.status)}`}>
                    {statusLabel(r.status, t)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {r.email} · {r.phone}
                </p>
                <p className="mt-2 text-gold">
                  {r.brand} {r.model}
                  {r.year ? ` (${r.year})` : ""}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {new Date(r.created_at).toLocaleString("de-DE")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-xs text-gold">
                <span className="hidden sm:inline">{expanded ? t("closeDetails") : t("openDetails")}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {expanded && (
              <div className="border-t border-border px-6 pb-6 pt-4">
                <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("name")}</dt>
                    <dd className="mt-1">{r.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("email")}</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${r.email}`} className="text-gold hover:underline">
                        {r.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("phone")}</dt>
                    <dd className="mt-1">
                      <a href={`tel:${r.phone.replace(/\s/g, "")}`} className="text-gold hover:underline">
                        {r.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("brand")}</dt>
                    <dd className="mt-1">{r.brand}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("model")}</dt>
                    <dd className="mt-1">{r.model}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("year")}</dt>
                    <dd className="mt-1">{r.year ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("mileage")}</dt>
                    <dd className="mt-1">
                      {r.mileage != null ? `${r.mileage.toLocaleString("de-DE")} km` : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("transmission")}</dt>
                    <dd className="mt-1">{r.transmission ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("fuel")}</dt>
                    <dd className="mt-1">{r.fuel_type ?? "—"}</dd>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <dt className="text-xs uppercase tracking-wider text-muted">{t("description")}</dt>
                    <dd className="mt-1 whitespace-pre-wrap text-muted">
                      {r.description?.trim() || "—"}
                    </dd>
                  </div>
                </dl>

                {r.image_url && (
                  <div className="mt-6">
                    <p className="mb-3 text-xs uppercase tracking-wider text-muted">{t("photo")}</p>
                    <a
                      href={r.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block overflow-hidden rounded-sm border border-border"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.image_url}
                        alt={`${r.brand} ${r.model}`}
                        className="max-h-72 w-auto object-contain"
                      />
                    </a>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:${r.phone.replace(/\s/g, "")}`}
                    className="btn-outline inline-flex items-center gap-2 text-sm"
                  >
                    <Phone size={14} />
                    {t("call")}
                  </a>
                  <a
                    href={`mailto:${r.email}?subject=${encodeURIComponent(`Verkaufsanfrage: ${r.brand} ${r.model}`)}`}
                    className="btn-outline inline-flex items-center gap-2 text-sm"
                  >
                    <Mail size={14} />
                    {t("writeEmail")}
                  </a>
                  {r.status === "new" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(r.id, "contacted")}
                      className="btn-primary text-sm"
                    >
                      {t("markContacted")}
                    </button>
                  )}
                  {r.status !== "closed" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(r.id, "closed")}
                      className="btn-outline text-sm"
                    >
                      {t("markClosed")}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
