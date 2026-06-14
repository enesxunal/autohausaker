import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const auth = await requireAdmin({ requireSuperAdmin: true });
  if ("error" in auth && auth.error) return auth.error;

  const { email, password, name, role, permissions } = await request.json();

  const serviceClient = await createServiceClient();
  const { data: newUser, error: createError } = await serviceClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError || !newUser.user) {
    return NextResponse.json({ error: createError?.message || "Failed" }, { status: 500 });
  }

  const { error: profileError } = await serviceClient.from("admin_profiles").insert({
    id: newUser.user.id,
    email,
    name,
    role: role || "editor",
    permissions: permissions || { vehicles: true, settings: false, sell_requests: true, users: false },
    created_by: auth.user!.id,
  });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const auth = await requireAdmin({ requireSuperAdmin: true });
  if ("error" in auth && auth.error) return auth.error;

  const { data, error } = await auth.supabase!.from("admin_profiles").select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
