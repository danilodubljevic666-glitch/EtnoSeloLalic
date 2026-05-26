"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    let fadeTimer;

    const dismiss = () => {
      fadeTimer = setTimeout(() => {
        setPhase("fading");
        setTimeout(() => setPhase("gone"), 700);
      }, 250);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      const fallback = setTimeout(dismiss, 4000);
      return () => {
        window.removeEventListener("load", dismiss);
        clearTimeout(fallback);
        clearTimeout(fadeTimer);
      };
    }

    return () => clearTimeout(fadeTimer);
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`preloader${phase === "fading" ? " preloader-out" : ""}`} aria-hidden="true">
      <div className="preloader-leaf-wrap">
        <svg viewBox="-18 -28 36 56" width="72" height="72">
          <path
            d="M0,-24 C11,-16 17,-3 13,10 C9,20 4,24 0,24 C-4,24 -10,16 -13,5 C-16,-7 -9,-18 0,-24Z"
            fill="rgba(100,168,48,0.95)"
          />
          <path
            d="M0,-24 C0.6,-9 0.6,8 0,24"
            stroke="rgba(255,255,255,0.40)"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M0,0 C6,-6 12,-10 13,10"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="preloader-title">Etno Selo Lalić</p>

      <div className="preloader-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
