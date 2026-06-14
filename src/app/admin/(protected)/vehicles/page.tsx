import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SEED_VEHICLES } from "@/data/seed-vehicles";
import AdminVehiclesList from "@/components/admin/AdminVehiclesList";

export default async function AdminVehiclesPage() {
  let vehicles = SEED_VEHICLES;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data && data.length > 0) vehicles = data;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gold">Fahrzeuge / Araçlar</h1>
        <Link href="/admin/vehicles/new" className="btn-primary text-sm">
          + Neu / Yeni
        </Link>
      </div>
      <AdminVehiclesList vehicles={vehicles} />
    </div>
  );
}
