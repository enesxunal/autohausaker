import { createClient } from "@/lib/supabase/server";
import { SEED_VEHICLES } from "@/data/seed-vehicles";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminDashboardPage() {
  let vehicleCount = SEED_VEHICLES.length;
  let featuredCount = SEED_VEHICLES.filter((v) => v.featured).length;
  let newRequests = 0;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const { count: vCount } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true });
    const { count: fCount } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .eq("featured", true);
    const { count: rCount } = await supabase
      .from("sell_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");

    if (vCount !== null) vehicleCount = vCount;
    if (fCount !== null) featuredCount = fCount;
    if (rCount !== null) newRequests = rCount;
  }

  return (
    <AdminDashboard
      stats={{ vehicleCount, featuredCount, newRequests }}
    />
  );
}
