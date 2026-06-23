import type { Metadata } from "next";

export const SITE_URL = "https://autohausaker.de";
export const DEFAULT_PHONE = "+49 1522 1597074";
export const GOOGLE_SITE_VERIFICATION = "EDqrupOD6fEwuRmdgifHwQ5NzB0iI6vmg-NfbSyKN10";

const OG_TITLE = "Autohaus AKER | Premium Fahrzeugimport";
const OG_DESCRIPTION =
  "Autohaus AKER – Ihr Berater und Vermittler für Premium-Fahrzeugimport. Wir begleiten Sie bei Ihrem persönlichen Importprozess. Niederkassel bei Köln.";

export function siteMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: OG_TITLE,
      template: "%s | Autohaus AKER",
    },
    description: OG_DESCRIPTION,
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: SITE_URL,
      siteName: "Autohaus AKER",
      title: OG_TITLE,
      description: OG_DESCRIPTION,
      images: [
        {
          url: "/images/autohausaker-banner.jpg",
          width: 1920,
          height: 1080,
          alt: "Autohaus AKER – Premium Fahrzeugimport",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: OG_TITLE,
      description: OG_DESCRIPTION,
      images: ["/images/autohausaker-banner.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    ...overrides,
  };
}
