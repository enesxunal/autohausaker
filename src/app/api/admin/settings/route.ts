import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";

export async function PUT(request: Request) {
  const auth = await requireAdmin({ requireWrite: true });
  if ("error" in auth && auth.error) return auth.error;

  const body = await request.json();

  const { error } = await auth.supabase!
    .from("site_settings")
    .update(body)
    .eq("id", "00000000-0000-0000-0000-000000000001");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
