import { createClient, createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { AdminProfile } from "@/lib/types";
import { getSupabaseServiceKey } from "@/lib/supabase/env";

export async function requireAdmin(options?: { requireWrite?: boolean; requireSuperAdmin?: boolean }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  let profile: AdminProfile | null = null;

  if (getSupabaseServiceKey()) {
    const serviceClient = await createServiceClient();
    const { data } = await serviceClient
      .from("admin_profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    profile = data as AdminProfile | null;
  } else {
    const { data } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    profile = data as AdminProfile | null;
  }

  if (!profile) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  const p = profile;

  if (options?.requireSuperAdmin && p.role !== "super_admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  if (options?.requireWrite && p.role === "viewer") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { supabase, user, profile: p };
}
