import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function AdminAuthLayout({
  children,
  requireSuperAdmin = false,
}: {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-md rounded-sm border border-border bg-surface p-8 text-center">
          <p className="font-semibold text-gold">Supabase nicht konfiguriert</p>
          <p className="mt-4 text-sm text-muted">
            Bitte Supabase-Umgebungsvariablen in .env setzen.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/admin/login");

  if (requireSuperAdmin && profile.role !== "super_admin") {
    redirect("/admin");
  }

  return (
    <>
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </>
  );
}
