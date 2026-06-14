"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  tr: "TR",
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-0.5 rounded-sm border border-gold/25 bg-black/50 p-0.5">
      {routing.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => router.replace(pathname, { locale })}
          className="rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted transition-all hover:text-gold-light"
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
