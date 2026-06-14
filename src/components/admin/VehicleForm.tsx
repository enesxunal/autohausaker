"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CAR_MAKES, getModelsForMake } from "@/data/car-makes-models";
import { useAdminLocale } from "./AdminLocaleProvider";
import type { Vehicle } from "@/lib/types";

interface VehicleFormProps {
  vehicle?: Vehicle;
}

export default function VehicleForm({ vehicle }: VehicleFormProps) {
  const { t } = useAdminLocale();
  const router = useRouter();
  const [brand, setBrand] = useState(vehicle?.brand || "");
  const [images, setImages] = useState<string[]>(vehicle?.images || []);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Upload failed");
    const { url } = await res.json();
    setImages((prev) => [...prev, url]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const payload = {
      title: form.get("title"),
      brand: form.get("brand"),
      model: form.get("model"),
      year: form.get("year") ? Number(form.get("year")) : null,
      mileage: form.get("mileage") ? Number(form.get("mileage")) : null,
      transmission: form.get("transmission") || null,
      fuel_type: form.get("fuel_type") || null,
      price: form.get("price") ? Number(form.get("price")) : null,
      status: form.get("status"),
      description_de: form.get("description_de"),
      description_en: form.get("description_en"),
      description_tr: form.get("description_tr"),
      featured: form.get("featured") === "on",
      published: form.get("published") === "on",
      images,
    };

    const url = vehicle ? `/api/admin/vehicles/${vehicle.id}` : "/api/admin/vehicles";
    const method = vehicle ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/vehicles");
      router.refresh();
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!vehicle || !confirm(t("confirmDelete"))) return;
    await fetch(`/api/admin/vehicles/${vehicle.id}`, { method: "DELETE" });
    router.push("/admin/vehicles");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-muted">{t("title")} *</label>
          <input name="title" required defaultValue={vehicle?.title} className="input-field" />
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
            {CAR_MAKES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("model")} *</label>
          <select name="model" required defaultValue={vehicle?.model} className="input-field">
            <option value="">—</option>
            {getModelsForMake(brand).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("year")}</label>
          <input name="year" type="number" defaultValue={vehicle?.year ?? ""} className="input-field" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("mileage")}</label>
          <input name="mileage" type="number" defaultValue={vehicle?.mileage ?? ""} className="input-field" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("transmission")}</label>
          <select name="transmission" defaultValue={vehicle?.transmission ?? ""} className="input-field">
            <option value="">—</option>
            <option value="automatic">Automatik / Otomatik</option>
            <option value="manual">Schaltgetriebe / Manuel</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("fuel")}</label>
          <select name="fuel_type" defaultValue={vehicle?.fuel_type ?? ""} className="input-field">
            <option value="">—</option>
            <option value="petrol">Benzin</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Elektro</option>
            <option value="hybrid">Hybrid</option>
            <option value="plugin_hybrid">Plug-in Hybrid</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("price")}</label>
          <input name="price" type="number" defaultValue={vehicle?.price ?? ""} className="input-field" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-muted">{t("status")}</label>
          <select name="status" defaultValue={vehicle?.status ?? "available"} className="input-field">
            <option value="available">{t("available")}</option>
            <option value="in_transit">{t("inTransit")}</option>
          </select>
        </div>
      </div>

      {(["de", "en", "tr"] as const).map((lang) => (
        <div key={lang}>
          <label className="mb-2 block text-sm text-muted">{t("description")} ({lang.toUpperCase()})</label>
          <textarea
            name={`description_${lang}`}
            rows={3}
            defaultValue={vehicle?.[`description_${lang}`] ?? ""}
            className="input-field"
          />
        </div>
      ))}

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={vehicle?.featured} />
          {t("featured")}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={vehicle?.published ?? true} />
          {t("published")}
        </label>
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted">{t("images")}</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) await uploadImage(file);
          }}
          className="input-field"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {images.map((url, i) => (
            <div key={i} className="relative">
              <img src={url} alt="" className="h-20 w-28 rounded-sm object-cover" />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                className="absolute -right-2 -top-2 rounded-full bg-red-600 px-1.5 text-xs text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "..." : t("save")}
        </button>
        {vehicle && (
          <button type="button" onClick={handleDelete} className="btn-outline border-red-500 text-red-400">
            {t("delete")}
          </button>
        )}
      </div>
    </form>
  );
}
