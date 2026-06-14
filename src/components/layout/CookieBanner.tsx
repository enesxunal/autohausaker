"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/20 bg-black/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-6 lg:bottom-auto lg:pb-4">
      <div className="gold-line-h absolute left-0 right-0 top-0" />
      <div className="container-narrow flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted">{t("message")}</p>
        <div className="flex shrink-0 gap-3">
          <button onClick={decline} className="btn-outline py-2.5 text-[10px]">
            {t("decline")}
          </button>
          <button onClick={accept} className="btn-primary py-2.5 text-[10px]">
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
