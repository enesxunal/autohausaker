"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminLocale } from "@/components/admin/AdminLocaleProvider";
import type { SiteSettings } from "@/lib/types";

export default function AdminSettingsForm({ settings }: { settings: SiteSettings }) {
  const { t } = useAdminLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    router.refresh();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      <div>
        <label className="mb-2 block text-sm text-muted">{t("phone")}</label>
        <input name="phone" defaultValue={settings.phone} className="input-field" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted">{t("whatsapp")}</label>
        <input name="whatsapp" defaultValue={settings.whatsapp} className="input-field" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted">E-Mail</label>
        <input name="email" defaultValue={settings.email} className="input-field" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted">{t("address")}</label>
        <input name="address" defaultValue={settings.address} className="input-field" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "..." : t("save")}
      </button>
    </form>
  );
}
