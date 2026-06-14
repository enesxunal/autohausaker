import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey } from "@/lib/supabase/env";

async function adminDb() {
  if (getSupabaseServiceKey()) return createServiceClient();
  return null;
}

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth && auth.error) return auth.error;

  const db = (await adminDb()) ?? auth.supabase!;
  const { data, error } = await db
    .from("sell_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin({ requireWrite: true });
  if ("error" in auth && auth.error) return auth.error;

  const { id, status } = await request.json();
  const db = (await adminDb()) ?? auth.supabase!;
  const { error } = await db.from("sell_requests").update({ status }).eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
