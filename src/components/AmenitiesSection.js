"use client";

import { useState, useEffect, useRef } from "react";

const AMENITIES = [
  { key: "area",      label: "30 m² površina",        delay: 0.08 },
  { key: "breakfast", label: "Doručak",                delay: 0.14 },
  { key: "parking",   label: "Besplatan parking",      delay: 0.20 },
  { key: "wifi",      label: "Besplatan WiFi",         delay: 0.26 },
  { key: "family",    label: "Porodične sobe",         delay: 0.32 },
  { key: "ac",        label: "Klima-uređaj",           delay: 0.38 },
  { key: "kitchen",   label: "Opremljena kuhinja",     delay: 0.44 },
  { key: "tv",        label: "Flat-screen TV",         delay: 0.50 },
  { key: "balcony",   label: "Balkon",                 delay: 0.56 },
  { key: "terrace",   label: "Terasa",                 delay: 0.62 },
  { key: "bathroom",  label: "Sopstveno kupatilo",     delay: 0.68 },
  { key: "bbq",       label: "Roštilj",                delay: 0.74 },
  { key: "horse",     label: "Jahanje konja",          delay: 0.80 },
  { key: "bicycle",   label: "Iznajmljivanje bicikala", delay: 0.86 },
  { key: "fishing",   label: "Flyfishing",             delay: 0.92 },
];

function AmenityIcon({ type }) {
  const icons = {
    area: (
      <>
        <polyline points="15,3 21,3 21,9" />
        <polyline points="9,21 3,21 3,15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </>
    ),
    breakfast: (
      <>
        <path d="M17 8h1a4 4 0 010 8h-1" />
        <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4z" />
        <line x1="6" y1="2" x2="6" y2="5" />
        <line x1="10" y1="2" x2="10" y2="5" />
        <line x1="14" y1="2" x2="14" y2="5" />
      </>
    ),
    parking: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9 17V7h4a3 3 0 010 6H9" />
      </>
    ),
    wifi: (
      <>
        <path d="M5 12.55a11 11 0 0114.08 0" />
        <path d="M1.42 9a16 16 0 0121.16 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" />
        <circle cx="12" cy="20" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
    family: (
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </>
    ),
    balcony: (
      <>
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
      </>
    ),
    ac: (
      <>
        <path d="M17.7 7.7a2.5 2.5 0 111.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1111 8H2" />
        <path d="M12.6 19.4A2 2 0 1014 16H2" />
      </>
    ),
    terrace: (
      <>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </>
    ),
    bathroom: (
      <>
        <path d="M4 12h16a1 1 0 010 2l-1 4H5l-1-4a1 1 0 010-2z" />
        <path d="M6 12V6a2 2 0 012-2h1" />
        <circle cx="9" cy="4.5" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
    kitchen: (
      <>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
        <path d="M7 2v11" />
        <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </>
    ),
    tv: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    ),
    bbq: (
      <>
        <path d="M4 8h16" />
        <path d="M6 8a6 6 0 0012 0" />
        <path d="M12 14v2" />
        <path d="M9 20l1.5-4h3L15 20" />
        <line x1="9" y1="4" x2="9" y2="2" />
        <line x1="12" y1="4" x2="12" y2="2" />
        <line x1="15" y1="4" x2="15" y2="2" />
      </>
    ),
    horse: (
      <>
        <path d="M4 16c0 2 1.5 4 4 4h8c2.5 0 4-2 4-4V9c0-1-.5-2-1.5-2.5L17 5l-1-3h-3l.5 2.5L12 6H9L7 4.5 7.5 2H4.5L4 5 2.5 6.5C1.5 7.5 1 8.5 1 9.5V12c0 1 .5 2 1.5 2.5L4 16z" />
        <circle cx="8" cy="9" r="1" fill="currentColor" stroke="none" />
        <path d="M14 16v4" />
        <path d="M10 16v4" />
      </>
    ),
    bicycle: (
      <>
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5L8 9l4-2 2 4.5h4" />
        <path d="M5.5 17.5L10 9" />
      </>
    ),
    fishing: (
      <>
        <path d="M3 3l4 4" />
        <path d="M7 7c5-3 10 1 10 6 0 3-2 5-5 5-2 0-4-1-5-3" />
        <path d="M14 14l4 4" />
        <circle cx="18" cy="18" r="2" />
        <path d="M7 7L4 18" />
        <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[type]}
    </svg>
  );
}

export default function AmenitiesSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pogodnosti"
      ref={ref}
      className={`amenities-section scroll-mt-24${inView ? " amenities-visible" : ""}`}
    >
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <p className="amenity-kicker">Smještaj</p>
        <h2 className="amenity-heading">Sve što vam treba</h2>

        <div className="amenity-featured mt-10">
          <div className="amenity-featured-icon-wrap">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
          </div>
          <div className="amenity-featured-body">
            <p className="amenity-featured-title">Cijeli smještaj samo za vas</p>
            <p className="amenity-featured-desc">
              Puna privatnost &mdash; ne dijelite prostor s drugim gostima.
            </p>
          </div>
          <div className="amenity-featured-badge">&#10003;&nbsp;Privatno</div>
        </div>

        <div className="amenity-grid mt-6">
          {AMENITIES.map(({ key, label, delay }) => (
            <div
              key={key}
              className="amenity-card"
              style={{ animationDelay: inView ? `${delay}s` : "0s" }}
            >
              <div className="amenity-icon-wrap">
                <AmenityIcon type={key} />
              </div>
              <span className="amenity-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
