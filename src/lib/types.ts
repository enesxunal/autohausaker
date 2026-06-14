export type Transmission = "automatic" | "manual";
export type FuelType = "petrol" | "diesel" | "electric" | "hybrid" | "plugin_hybrid";
export type VehicleStatus = "available" | "in_transit";
export type AdminRole = "super_admin" | "editor" | "viewer";

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  title: string;
  year: number | null;
  mileage: number | null;
  transmission: Transmission | null;
  fuel_type: FuelType | null;
  price: number | null;
  status: VehicleStatus;
  description_de: string | null;
  description_en: string | null;
  description_tr: string | null;
  images: string[];
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  company_name: string;
  managing_director: string;
  vat_id: string;
  opening_hours: Record<string, string>;
  social_instagram: string | null;
  social_facebook: string | null;
  import_weeks_min: number;
  import_weeks_max: number;
  updated_at: string;
}

export interface SellRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  brand: string;
  model: string;
  year: number | null;
  mileage: number | null;
  transmission: string | null;
  fuel_type: string | null;
  description: string | null;
  image_url: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface AdminProfile {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: {
    vehicles?: boolean;
    settings?: boolean;
    sell_requests?: boolean;
    users?: boolean;
  };
  created_at: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  id: "00000000-0000-0000-0000-000000000001",
  phone: "+49 176 32510469",
  whatsapp: "+49 176 32510469",
  email: "info@autohausaker.de",
  address: "Grandkaule 7, 53859 Niederkassel",
  company_name: "Autohaus AKER",
  managing_director: "Can Aker",
  vat_id: "DE450759875",
  opening_hours: {
    de: "Mo–Fr: 09:00–18:00, Sa: 10:00–14:00",
    en: "Mon–Fri: 09:00–18:00, Sat: 10:00–14:00",
    tr: "Pzt–Cum: 09:00–18:00, Cmt: 10:00–14:00",
  },
  social_instagram: null,
  social_facebook: null,
  import_weeks_min: 8,
  import_weeks_max: 12,
  updated_at: new Date().toISOString(),
};
