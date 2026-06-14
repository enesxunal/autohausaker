import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SEED_VEHICLES } from "@/data/seed-vehicles";
import VehicleForm from "@/components/admin/VehicleForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditVehiclePage({ params }: Props) {
  const { id } = await params;
  let vehicle = SEED_VEHICLES.find((v) => v.id === id);

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const { data } = await supabase.from("vehicles").select("*").eq("id", id).single();
    if (data) vehicle = data;
  }

  if (!vehicle) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gold">{vehicle.title}</h1>
      <VehicleForm vehicle={vehicle} />
    </div>
  );
}
