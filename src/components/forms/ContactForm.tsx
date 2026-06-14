"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-sm border border-emerald-500/30 bg-emerald-900/20 p-8 text-center">
        <p className="text-emerald-400">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm text-muted">{t("name")} *</label>
        <input name="name" required className="input-field" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted">{t("email")} *</label>
        <input name="email" type="email" required className="input-field" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted">{t("phone")}</label>
        <input name="phone" type="tel" className="input-field" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted">{t("message")} *</label>
        <textarea name="message" required rows={5} className="input-field" />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">{t("error")}</p>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? "..." : t("submit")}
      </button>
    </form>
  );
}
