"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { adminMessages, type AdminLocale } from "@/lib/admin-messages";

interface AdminLocaleContextType {
  locale: AdminLocale;
  setLocale: (l: AdminLocale) => void;
  t: (key: keyof typeof adminMessages.de) => string;
}

const AdminLocaleContext = createContext<AdminLocaleContextType | null>(null);

export function AdminLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AdminLocale>("de");

  useEffect(() => {
    const saved = localStorage.getItem("admin-locale") as AdminLocale;
    if (saved === "de" || saved === "tr") setLocaleState(saved);
  }, []);

  const setLocale = (l: AdminLocale) => {
    setLocaleState(l);
    localStorage.setItem("admin-locale", l);
  };

  const t = (key: keyof typeof adminMessages.de) => adminMessages[locale][key];

  return (
    <AdminLocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </AdminLocaleContext.Provider>
  );
}

export function useAdminLocale() {
  const ctx = useContext(AdminLocaleContext);
  if (!ctx) throw new Error("useAdminLocale must be used within AdminLocaleProvider");
  return ctx;
}
