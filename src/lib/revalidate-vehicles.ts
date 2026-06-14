import { revalidatePath } from "next/cache";
import { routing } from "@/i18n/routing";

/** Admin araç değişikliklerinden sonra public sayfaları yenile */
export function revalidateVehiclePages(slug?: string) {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/fahrzeuge`);
    if (slug) revalidatePath(`/${locale}/fahrzeuge/${slug}`);
  }
}
