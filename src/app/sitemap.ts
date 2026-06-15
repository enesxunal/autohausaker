import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";

const PUBLIC_PATHS = [
  "",
  "/fahrzeuge",
  "/ueber-uns",
  "/service",
  "/faq",
  "/kontakt",
  "/verkaufen",
  "/impressum",
  "/datenschutz",
  "/agb",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    PUBLIC_PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/fahrzeuge" ? 0.9 : 0.7,
    }))
  );
}
