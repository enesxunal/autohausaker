import { notFound } from "next/navigation";
import { fetchAdminVehicle } from "@/lib/admin-vehicles";
import VehicleForm from "@/components/admin/VehicleForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditVehiclePage({ params }: Props) {
  const { id } = await params;
  const vehicle = await fetchAdminVehicle(id);

  if (!vehicle) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gold">{vehicle.title}</h1>
      <VehicleForm vehicle={vehicle} />
    </div>
  );
}
