import { createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey, isSupabaseConfigured } from "@/lib/supabase/env";
import type { Vehicle } from "@/lib/types";

const LIST_COLUMNS =
  "id, title, brand, model, status, price, featured, published, created_at";

export async function fetchAdminVehiclesList(): Promise<Vehicle[]> {
  if (!isSupabaseConfigured() || !getSupabaseServiceKey()) return [];

  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select(LIST_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchAdminVehiclesList:", error.message);
    return [];
  }

  return (data ?? []) as Vehicle[];
}

export async function fetchAdminVehicle(id: string): Promise<Vehicle | null> {
  if (!isSupabaseConfigured() || !getSupabaseServiceKey()) return null;

  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("fetchAdminVehicle:", error.message);
    return null;
  }

  return data as Vehicle | null;
}
