"use client";

import Link from "next/link";
import { useAdminLocale } from "./AdminLocaleProvider";
import { Car, Star, MessageSquare } from "lucide-react";

interface Props {
  stats: {
    vehicleCount: number;
    featuredCount: number;
    newRequests: number;
  };
}

export default function AdminDashboard({ stats }: Props) {
  const { t } = useAdminLocale();

  const cards = [
    { label: t("totalVehicles"), value: stats.vehicleCount, icon: Car, href: "/admin/vehicles" },
    { label: t("featuredCount"), value: stats.featuredCount, icon: Star, href: "/admin/vehicles" },
    { label: t("newRequests"), value: stats.newRequests, icon: MessageSquare, href: "/admin/sell-requests" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gold">{t("welcome")}</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="card flex items-center gap-4 p-6 hover:border-gold"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gold/10">
              <Icon className="text-gold" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
