"use client";

import { useState } from "react";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/components/LanguageProvider";

const linkKeys = [
  { key: "home", href: "#pocetna" },
  { key: "about", href: "#o-nama" },
  { key: "gallery", href: "#galerija" },
  { key: "contact", href: "#kontakt" }
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-stone-950/95 text-white shadow-sm backdrop-blur">
      <nav
        className="relative flex items-center px-6 py-4 sm:px-10"
        aria-label="Glavna navigacija"
      >
        <a
          href="#pocetna"
          className="text-lg font-bold tracking-tight text-white transition hover:text-emerald-100"
          onClick={() => setIsOpen(false)}
        >
          Etno Selo Lalic
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
          {linkKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative px-3 py-2 text-sm font-semibold text-white transition hover:text-emerald-100"
            >
              <span
                className="absolute inset-0 rounded-md border border-white/70 opacity-0 scale-x-75 scale-y-50 transition duration-300 group-hover:opacity-100 group-hover:scale-100"
                aria-hidden="true"
              />
              <span className="relative">{t.nav[link.key]}</span>
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 md:hidden">
          <LanguageSwitch />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/50 text-white transition hover:border-white hover:bg-white/10"
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="sr-only">
              {isOpen ? t.nav.closeMenu : t.nav.openMenu}
            </span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span
                className={`h-0.5 rounded-full bg-current transition ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 rounded-full bg-current transition ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 rounded-full bg-current transition ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 sm:right-10 md:block">
        <LanguageSwitch />
      </div>

      {isOpen ? (
        <div className="border-t border-white/15 bg-stone-950/80 px-6 py-4 shadow-sm backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {linkKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-md px-3 py-3 text-base font-semibold text-white transition hover:text-emerald-100"
                onClick={() => setIsOpen(false)}
              >
                <span
                  className="absolute inset-0 rounded-md border border-white/60 opacity-0 scale-x-75 scale-y-50 transition duration-300 group-hover:opacity-100 group-hover:scale-100"
                  aria-hidden="true"
                />
                <span className="relative">{t.nav[link.key]}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
