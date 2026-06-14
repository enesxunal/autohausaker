import { createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey, isSupabaseConfigured } from "@/lib/supabase/env";
import { SEED_VEHICLES } from "@/data/seed-vehicles";
import { unstable_noStore as noStore } from "next/cache";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  noStore();
  let vehicleCount = SEED_VEHICLES.length;
  let featuredCount = SEED_VEHICLES.filter((v) => v.featured).length;
  let newRequests = 0;

  if (isSupabaseConfigured() && getSupabaseServiceKey()) {
    const supabase = await createServiceClient();
    const [vehicles, featured, requests] = await Promise.all([
      supabase.from("vehicles").select("*", { count: "exact", head: true }),
      supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("featured", true),
      supabase
        .from("sell_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
    ]);

    if (vehicles.count !== null) vehicleCount = vehicles.count;
    if (featured.count !== null) featuredCount = featured.count;
    if (requests.count !== null) newRequests = requests.count;
  }

  return (
    <AdminDashboard
      stats={{ vehicleCount, featuredCount, newRequests }}
    />
  );
}
