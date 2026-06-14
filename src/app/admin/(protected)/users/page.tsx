import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminUsersPageClient from "@/components/admin/AdminUsersPageClient";

export default async function AdminUsersPage() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("role")
      .eq("id", user!.id)
      .single();

    if (profile?.role !== "super_admin") redirect("/admin");
  }

  return <AdminUsersPageClient />;
}
