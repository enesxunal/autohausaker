import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { AdminProfile } from "@/lib/types";

export async function requireAdmin(options?: { requireWrite?: boolean; requireSuperAdmin?: boolean }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  const p = profile as AdminProfile;

  if (options?.requireSuperAdmin && p.role !== "super_admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  if (options?.requireWrite && p.role === "viewer") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { supabase, user, profile: p };
}
