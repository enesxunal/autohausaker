import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey } from "@/lib/supabase/env";
import AdminUsersPageClient from "@/components/admin/AdminUsersPageClient";

export default async function AdminUsersPage() {
  if (!getSupabaseServiceKey()) redirect("/admin");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const service = await createServiceClient();
  const { data: profile } = await service
    .from("admin_profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "super_admin") redirect("/admin");

  return <AdminUsersPageClient />;
}
