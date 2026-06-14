import type { Locale } from "@/i18n/routing";
import type { FuelType, SiteSettings, Transmission, Vehicle, VehicleStatus } from "./types";
import { DEFAULT_SETTINGS } from "./types";
import { SEED_VEHICLES } from "@/data/seed-vehicles";
import { unstable_noStore as noStore } from "next/cache";

import { isSupabaseConfigured, getSupabaseServiceKey } from "@/lib/supabase/env";

async function getCatalogClient() {
  if (getSupabaseServiceKey()) {
    const { createServiceClient } = await import("./supabase/server");
    return createServiceClient();
  }
  const { createPublicClient } = await import("./supabase/public");
  return createPublicClient();
}

export async function getSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) return DEFAULT_SETTINGS;

  try {
    const { createClient } = await import("./supabase/server");
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    return data ?? DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export interface VehicleFilters {
  brand?: string;
  status?: VehicleStatus;
  transmission?: Transmission;
  fuel_type?: FuelType;
  search?: string;
  featured?: boolean;
}

export async function getVehicles(filters: VehicleFilters = {}): Promise<Vehicle[]> {
  const supabaseConfigured = isSupabaseConfigured();

  if (supabaseConfigured) {
    noStore();
    try {
      const supabase = await getCatalogClient();
      let query = supabase.from("vehicles").select("*").eq("published", true);

      if (filters.brand) query = query.eq("brand", filters.brand);
      if (filters.status) query = query.eq("status", filters.status);
      if (filters.transmission) query = query.eq("transmission", filters.transmission);
      if (filters.fuel_type) query = query.eq("fuel_type", filters.fuel_type);
      if (filters.featured) query = query.eq("featured", true);
      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,model.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) console.error("getVehicles:", error.message);
      return (data ?? []) as Vehicle[];
    } catch (err) {
      console.error("getVehicles:", err);
      return [];
    }
  }

  return SEED_VEHICLES.filter((v) => {
      if (filters.brand && v.brand !== filters.brand) return false;
      if (filters.status && v.status !== filters.status) return false;
      if (filters.transmission && v.transmission !== filters.transmission) return false;
      if (filters.fuel_type && v.fuel_type !== filters.fuel_type) return false;
      if (filters.featured && !v.featured) return false;
      if (filters.search) {
        const s = filters.search.toLowerCase();
        return (
          v.title.toLowerCase().includes(s) ||
          v.brand.toLowerCase().includes(s) ||
          v.model.toLowerCase().includes(s)
        );
      }
      return true;
    });
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  if (isSupabaseConfigured()) {
    noStore();
    try {
      const supabase = await getCatalogClient();
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      if (error) console.error("getVehicleBySlug:", error.message);
      return (data as Vehicle) ?? null;
    } catch (err) {
      console.error("getVehicleBySlug:", err);
      return null;
    }
  }

  return SEED_VEHICLES.find((v) => v.slug === slug) ?? null;
}

export function getVehicleDescription(vehicle: Vehicle, locale: Locale): string {
  const map: Record<Locale, keyof Vehicle> = {
    de: "description_de",
    en: "description_en",
    tr: "description_tr",
  };
  const key = map[locale];
  const desc = vehicle[key] as string | null;
  if (desc) return desc;
  return vehicle.description_de || vehicle.description_en || vehicle.description_tr || "";
}

export function formatPrice(price: number | null, locale: Locale): string | null {
  if (price === null || price === undefined) return null;
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : locale === "en" ? "en-DE" : "de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number | null, locale: Locale): string {
  if (mileage === null) return "—";
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "de-DE").format(mileage) + " km";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/[ß]/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function whatsappLink(number: string, message?: string): string {
  const clean = number.replace(/\D/g, "");
  const base = `https://wa.me/${clean}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function phoneLink(number: string): string {
  return `tel:${number.replace(/\s/g, "")}`;
}
