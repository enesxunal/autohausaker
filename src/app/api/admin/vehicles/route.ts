import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { slugify } from "@/lib/data";

export async function POST(request: Request) {
  const auth = await requireAdmin({ requireWrite: true });
  if ("error" in auth && auth.error) return auth.error;

  const body = await request.json();
  const slug =
    body.slug ||
    slugify(`${body.brand}-${body.model}-${body.year || Date.now()}`);

  const { data, error } = await auth.supabase!
    .from("vehicles")
    .insert({ ...body, slug })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth && auth.error) return auth.error;

  const { data, error } = await auth.supabase!
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
