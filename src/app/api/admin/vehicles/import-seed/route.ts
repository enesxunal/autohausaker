import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { SEED_VEHICLES } from "@/data/seed-vehicles";
import { createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey } from "@/lib/supabase/env";

export async function POST() {
  const auth = await requireAdmin({ requireWrite: true });
  if ("error" in auth && auth.error) return auth.error;

  if (!getSupabaseServiceKey()) {
    return NextResponse.json({ error: "Supabase service key missing" }, { status: 500 });
  }

  const supabase = await createServiceClient();
  let imported = 0;

  for (const vehicle of SEED_VEHICLES) {
    const { id: _id, created_at: _c, updated_at: _u, ...row } = vehicle;
    const { error } = await supabase
      .from("vehicles")
      .upsert(row, { onConflict: "slug", ignoreDuplicates: true });

    if (!error) imported++;
  }

  const { count } = await supabase
    .from("vehicles")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ imported, total: count ?? 0 });
}
