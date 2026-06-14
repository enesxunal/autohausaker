"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Search } from "lucide-react";
import { CAR_MAKES } from "@/data/car-makes-models";

export default function VehicleSearch() {
  const t = useTranslations("search");
  const tStatus = useTranslations("status");
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (status) params.set("status", status);
    if (query) params.set("q", query);
    router.push(`/fahrzeuge?${params.toString()}`);
  };

  return (
    <section className="relative section-padding">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.04),transparent_70%)]" />
      <div className="container-narrow relative">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] gold-gradient-text">
            Premium Selection
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-wider md:text-4xl">
            {t("title")}
          </h2>
        </div>

        <form
          onSubmit={handleSearch}
          className="premium-panel mx-auto grid max-w-5xl gap-5 p-8 md:grid-cols-4 md:p-10"
        >
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">
              {t("brand")}
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="input-field"
            >
              <option value="">{t("allBrands")}</option>
              {CAR_MAKES.map((make) => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">
              {t("status")}
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field"
            >
              <option value="">{t("allStatus")}</option>
              <option value="available">{tStatus("available")}</option>
              <option value="in_transit">{tStatus("in_transit")}</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">
              &nbsp;
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("placeholder")}
              className="input-field"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">
              &nbsp;
            </label>
            <button type="submit" className="btn-primary w-full">
              <Search size={14} />
              {t("search")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
