"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const languages = [
  { code: "me", name: "Crnogorski", flagSrc: "/flags/flag-me.svg" },
  { code: "en", name: "English", flagSrc: "/flags/flag-en.svg" }
];

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const activeLanguage = languages.find((item) => item.code === language);
  const activeFlagSrc = activeLanguage?.flagSrc ?? languages[0].flagSrc;

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-10 w-12 items-center justify-center rounded-md border border-white/30 bg-white/5 transition hover:border-white hover:bg-white/10"
        aria-label="Promijeni jezik"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <FlagIcon src={activeFlagSrc} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 mt-2 w-16 overflow-hidden rounded-md border border-white/15 bg-stone-950/95 p-1 shadow-lg backdrop-blur">
          {languages.map((item) => {
            const isActive = language === item.code;

            return (
              <button
                key={item.code}
                type="button"
                className={`flex h-10 w-full items-center justify-center rounded transition ${
                  isActive ? "bg-white/15" : "hover:bg-white/10"
                }`}
                aria-label={item.name}
                aria-pressed={isActive}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
              >
                <FlagIcon src={item.flagSrc} />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function FlagIcon({ src }) {
  return (
    <Image
      src={src}
      alt=""
      width={36}
      height={24}
      unoptimized
      className="h-6 w-9 rounded-sm shadow-sm"
      aria-hidden="true"
    />
  );
}
