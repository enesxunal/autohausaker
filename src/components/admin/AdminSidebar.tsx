"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAdminLocale } from "./AdminLocaleProvider";
import {
  LayoutDashboard,
  Car,
  Settings,
  MessageSquare,
  Users,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, key: "dashboard" as const },
  { href: "/admin/vehicles", icon: Car, key: "vehicles" as const },
  { href: "/admin/sell-requests", icon: MessageSquare, key: "sellRequests" as const },
  { href: "/admin/settings", icon: Settings, key: "settings" as const },
  { href: "/admin/users", icon: Users, key: "users" as const },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, locale, setLocale } = useAdminLocale();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="border-b border-border p-6">
        <Link href="/admin" className="text-lg font-bold uppercase tracking-wider text-gold">
          AKER Admin
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ href, icon: Icon, key }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-sm px-4 py-3 text-sm transition-colors ${
              pathname === href || (href !== "/admin" && pathname.startsWith(href))
                ? "bg-gold/10 text-gold"
                : "text-muted hover:bg-surface-elevated hover:text-foreground"
            }`}
          >
            <Icon size={18} />
            {t(key)}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border p-4 space-y-2">
        <div className="flex gap-1 rounded-sm border border-border p-0.5">
          {(["de", "tr"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`flex-1 rounded-sm py-1 text-xs uppercase ${
                locale === l ? "bg-gold text-black" : "text-muted"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm text-muted hover:text-red-400"
        >
          <LogOut size={18} />
          {t("logout")}
        </button>
      </div>
    </aside>
  );
}
