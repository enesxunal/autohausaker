import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { slugify } from "@/lib/data";
import { createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey } from "@/lib/supabase/env";

interface RouteParams {
  params: Promise<{ id: string }>;
}

async function adminDb() {
  if (getSupabaseServiceKey()) return createServiceClient();
  return null;
}

export async function PUT(request: Request, { params }: RouteParams) {
  const auth = await requireAdmin({ requireWrite: true });
  if ("error" in auth && auth.error) return auth.error;

  const { id } = await params;
  const body = await request.json();

  const { id: _id, created_at, slug: _slug, ...fields } = body;
  const slug = slugify(
    `${fields.brand}-${fields.model}-${fields.year || Date.now()}`
  );

  const db = (await adminDb()) ?? auth.supabase!;
  const { data, error } = await db
    .from("vehicles")
    .update({ ...fields, slug })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const auth = await requireAdmin({ requireWrite: true });
  if ("error" in auth && auth.error) return auth.error;

  const { id } = await params;
  const db = (await adminDb()) ?? auth.supabase!;
  const { error } = await db.from("vehicles").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
