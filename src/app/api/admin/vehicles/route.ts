import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { slugify } from "@/lib/data";
import { revalidateVehiclePages } from "@/lib/revalidate-vehicles";
import { createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey } from "@/lib/supabase/env";

async function adminDb() {
  if (getSupabaseServiceKey()) return createServiceClient();
  return null;
}

export async function POST(request: Request) {
  const auth = await requireAdmin({ requireWrite: true });
  if ("error" in auth && auth.error) return auth.error;

  const body = await request.json();
  const slug =
    body.slug ||
    slugify(`${body.brand}-${body.model}-${body.year || Date.now()}`);

  const db = (await adminDb()) ?? auth.supabase!;
  const { data, error } = await db
    .from("vehicles")
    .insert({ ...body, slug })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateVehiclePages(data.slug);
  return NextResponse.json(data);
}

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth && auth.error) return auth.error;

  const db = (await adminDb()) ?? auth.supabase!;
  const { data, error } = await db
    .from("vehicles")
    .select("id, title, brand, model, status, price, featured, published, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
