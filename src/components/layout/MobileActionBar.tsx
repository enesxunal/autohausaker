import { getSettings, phoneLink, whatsappLink } from "@/lib/data";
import { Phone, MessageCircle } from "lucide-react";

export default async function MobileActionBar() {
  const settings = await getSettings();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gold/20 bg-black/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="grid grid-cols-2 divide-x divide-gold/15">
        <a
          href={phoneLink(settings.phone)}
          className="flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold uppercase tracking-wider text-gold-light"
        >
          <Phone size={16} />
          Anrufen
        </a>
        <a
          href={whatsappLink(settings.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold uppercase tracking-wider text-gold-light"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
