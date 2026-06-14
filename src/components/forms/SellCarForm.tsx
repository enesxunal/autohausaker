"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CAR_MAKES, getModelsForMake } from "@/data/car-makes-models";

export default function SellCarForm() {
  const t = useTranslations("sell");
  const tTrans = useTranslations("transmission");
  const tFuel = useTranslations("fuel");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/sell-request", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
      setBrand("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-sm border border-emerald-500/30 bg-emerald-900/20 p-8 text-center">
        <p className="text-emerald-400">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-muted">{t("name")} *</label>
          <input name="name" required className="input-field" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("email")} *</label>
          <input name="email" type="email" required className="input-field" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("phone")} *</label>
          <input name="phone" type="tel" required className="input-field" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("brand")} *</label>
          <select
            name="brand"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="input-field"
          >
            <option value="">—</option>
            {CAR_MAKES.map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("model")} *</label>
          <select name="model" required className="input-field" disabled={!brand}>
            <option value="">—</option>
            {getModelsForMake(brand).map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("year")}</label>
          <input name="year" type="number" min="1990" max="2030" className="input-field" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("mileage")}</label>
          <input name="mileage" type="number" min="0" className="input-field" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("transmission")}</label>
          <select name="transmission" className="input-field">
            <option value="">—</option>
            <option value="automatic">{tTrans("automatic")}</option>
            <option value="manual">{tTrans("manual")}</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("fuel")}</label>
          <select name="fuel_type" className="input-field">
            <option value="">—</option>
            <option value="petrol">{tFuel("petrol")}</option>
            <option value="diesel">{tFuel("diesel")}</option>
            <option value="electric">{tFuel("electric")}</option>
            <option value="hybrid">{tFuel("hybrid")}</option>
            <option value="plugin_hybrid">{tFuel("plugin_hybrid")}</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted">{t("description")}</label>
        <textarea name="description" rows={4} className="input-field" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted">{t("photo")}</label>
        <input name="photo" type="file" accept="image/*" className="input-field" />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">{t("error")}</p>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? "..." : t("submit")}
      </button>
    </form>
  );
}
