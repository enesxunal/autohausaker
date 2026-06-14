import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey } from "@/lib/supabase/env";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "loginError" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || "loginError" },
        { status: 401 }
      );
    }

    if (!getSupabaseServiceKey()) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY eksik. Vercel env kontrol edin." },
        { status: 500 }
      );
    }

    const serviceClient = await createServiceClient();
    const { data: profile } = await serviceClient
      .from("admin_profiles")
      .select("id")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (!profile) {
      await supabase.auth.signOut();
      return NextResponse.json({ error: "profileMissing" }, { status: 403 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "loginError" }, { status: 500 });
  }
}
