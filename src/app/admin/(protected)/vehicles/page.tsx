import Link from "next/link";
import { fetchAdminVehiclesList } from "@/lib/admin-vehicles";
import AdminVehiclesList from "@/components/admin/AdminVehiclesList";

export default async function AdminVehiclesPage() {
  const vehicles = await fetchAdminVehiclesList();

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
