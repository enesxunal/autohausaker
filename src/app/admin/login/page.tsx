"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAdminLocale } from "@/components/admin/AdminLocaleProvider";

export default function AdminLoginPage() {
  const { t } = useAdminLocale();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const supabase = createClient();
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        setError(authError.message || t("loginError"));
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError(t("loginError"));
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("admin_profiles")
        .select("id")
        .eq("id", authData.user.id)
        .maybeSingle();

      if (!profile) {
        await supabase.auth.signOut();
        setError(t("profileMissing"));
        setLoading(false);
        return;
      }

      window.location.href = "/admin";
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Supabase bağlantısı kurulamadı. Vercel ortam değişkenlerini kontrol edin."
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="w-full max-w-md rounded-sm border border-border bg-surface p-8">
        <h1 className="mb-2 text-2xl font-bold uppercase tracking-wider text-gold">
          Autohaus AKER
        </h1>
        <p className="mb-8 text-sm text-muted">Admin Panel</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-muted">{t("email")}</label>
            <input name="email" type="email" required className="input-field" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">{t("password")}</label>
            <input name="password" type="password" required className="input-field" />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "..." : t("login")}
          </button>
        </form>
      </div>
    </div>
  );
}
