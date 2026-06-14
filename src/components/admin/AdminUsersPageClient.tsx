"use client";

import { useEffect, useState } from "react";
import { useAdminLocale } from "@/components/admin/AdminLocaleProvider";
import type { AdminProfile } from "@/lib/types";

export default function AdminUsersPageClient() {
  const { t } = useAdminLocale();
  const [users, setUsers] = useState<AdminProfile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = () =>
    fetch("/api/admin/users")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");
        if (!Array.isArray(data)) throw new Error("Invalid response");
        setUsers(data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : t("noData")));

  useEffect(() => {
    loadUsers().finally(() => setLoading(false));
  }, []);

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
        name: form.get("name"),
        role: form.get("role"),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setShowForm(false);
      await loadUsers();
    } else {
      setError(data.error || "Error");
    }
  };

  if (loading) {
    return <p className="animate-pulse text-muted">...</p>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gold">{t("users")}</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
          + {t("createUser")}
        </button>
      </div>

      {showForm && (
        <form onSubmit={createUser} className="card mb-8 max-w-md space-y-4 p-6">
          <input name="name" placeholder={t("userName")} required className="input-field" />
          <input name="email" type="email" placeholder={t("email")} required className="input-field" />
          <input name="password" type="password" placeholder={t("password")} required className="input-field" />
          <select name="role" className="input-field">
            <option value="editor">{t("editor")}</option>
            <option value="viewer">{t("viewer")}</option>
            <option value="super_admin">{t("superAdmin")}</option>
          </select>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="btn-primary">{t("save")}</button>
        </form>
      )}

      {error && !showForm && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="card flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-muted">{u.email}</p>
            </div>
            <span className="rounded-sm bg-gold/10 px-2 py-1 text-xs text-gold">{u.role}</span>
          </div>
        ))}
        {users.length === 0 && !error && <p className="text-muted">{t("noData")}</p>}
      </div>
    </div>
  );
}
