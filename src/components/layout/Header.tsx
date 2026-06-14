"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/fahrzeuge" as const, label: t("vehicles") },
    { href: "/ueber-uns" as const, label: t("about") },
    { href: "/service" as const, label: t("service") },
    { href: "/faq" as const, label: t("faq") },
    { href: "/kontakt" as const, label: t("contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/20 bg-black/95 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-gold/10 bg-black/70 backdrop-blur-md"
      }`}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container-narrow flex items-center justify-between px-4 py-3 md:px-8 md:py-5">
        <Link href="/" className="group flex items-center gap-2 md:gap-3" onClick={() => setOpen(false)}>
          <div className="hidden h-10 w-px gold-gradient-bg md:block" />
          <div>
            <span className="block font-display text-lg font-semibold uppercase tracking-[0.2em] gold-gradient-text md:text-2xl md:tracking-[0.25em]">
              Autohaus
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.45em] text-foreground/90 md:text-[10px] md:tracking-[0.55em]">
              AKER
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          <Link href="/verkaufen" className="btn-primary py-2.5 text-[10px]">
            {t("sell")}
          </Link>
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="rounded-sm border border-gold/20 p-2 text-gold"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 top-[57px] z-40 bg-black/60 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav className="fixed left-0 right-0 top-[57px] z-50 max-h-[calc(100vh-57px)] overflow-y-auto border-t border-gold/15 bg-black px-4 py-6 lg:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-gold/5 py-4 text-sm uppercase tracking-[0.12em] text-muted hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/verkaufen"
              onClick={() => setOpen(false)}
              className="btn-primary mt-6 w-full text-[10px]"
            >
              {t("sell")}
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}
