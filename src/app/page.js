"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import { useLanguage } from "@/components/LanguageProvider";

const galleryImages = [
  "/slike/602192199.jpg",
  "/slike/602192236.jpg",
  "/slike/602192245.jpg",
  "/slike/602192251.jpg",
  "/slike/602192253.jpg",
  "/slike/602192256.jpg",
  "/slike/602192259.jpg",
  "/slike/602192264.jpg",
  "/slike/634471352.jpg",
  "/slike/634471476.jpg",
  "/slike/634471679.jpg",
  "/slike/724153849.jpg",
  "/slike/724154011.jpg"
];

function parseCountValue(value) {
  const match = /^\s*(\d+)\s*(.*)$/u.exec(value);
  if (!match) {
    return { target: null, suffix: value };
  }

  return {
    target: Number(match[1]),
    suffix: match[2] ? ` ${match[2].trim()}` : ""
  };
}

function CountUpValue({ target, suffix, active }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active || target == null) {
      setCount(0);
      return;
    }

    const duration = 2400;
    const startTime = performance.now();

    const step = (time) => {
      const elapsed = Math.min(time - startTime, duration);
      const progress = elapsed / duration;
      const value = Math.round(target * progress);
      setCount(value);

      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [active, target]);

  return <span className="about-stat-value">{target == null ? suffix : `${count}${suffix}`}</span>;
}

export default function Home() {
  const { t } = useLanguage();
  const [aboutInView, setAboutInView] = useState(false);
  const [reviewsInView, setReviewsInView] = useState(false);
  const [openImageIndex, setOpenImageIndex] = useState(null);
  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);

  const openImage = openImageIndex !== null ? galleryImages[openImageIndex] : null;
  const hasPrevImage = openImageIndex !== null && openImageIndex > 0;
  const hasNextImage = openImageIndex !== null && openImageIndex < galleryImages.length - 1;

  const openImageByIndex = (index) => setOpenImageIndex(index);
  const closeLightbox = () => setOpenImageIndex(null);
  const showPrevImage = () => setOpenImageIndex((current) => (current > 0 ? current - 1 : current));
  const showNextImage = () => setOpenImageIndex((current) => (current < galleryImages.length - 1 ? current + 1 : current));

  const aboutText = Array.isArray(t.sections.aboutText)
    ? t.sections.aboutText
    : [t.sections.aboutText].filter(Boolean);
  const aboutStats = Array.isArray(t.sections.aboutStats)
    ? t.sections.aboutStats
    : [];

  useEffect(() => {
    if (!aboutRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!reviewsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReviewsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(reviewsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection />

      <section
        id="o-nama"
        ref={aboutRef}
        className={`about-section relative isolate scroll-mt-24 overflow-hidden px-6 py-20 sm:px-10${aboutInView ? " about-visible" : ""}`}
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="about-copy">
            <p className="about-kicker">{t.sections.aboutKicker}</p>
            <h2 className="about-heading">{t.sections.aboutTitle}</h2>
            <div className="mt-6 max-w-3xl space-y-5 text-lg leading-8 text-stone-700">
              {aboutText.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className="about-paragraph"
                  style={{ animationDelay: `${0.18 + index * 0.14}s` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="about-stats" aria-label={t.sections.aboutCardTitle}>
            <p className="about-stats-title">{t.sections.aboutCardTitle}</p>
            <div className="mt-5 space-y-3">
              {aboutStats.map((item, index) => {
                const { target, suffix } = parseCountValue(item.value);
                return (
                  <div
                    key={item.label}
                    className="about-stat-row"
                    style={{ animationDelay: `${0.35 + index * 0.12}s` }}
                  >
                    <CountUpValue
                      target={target}
                      suffix={suffix || item.value}
                      active={aboutInView && target != null}
                    />
                    <span className="about-stat-label">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="utisci"
        ref={reviewsRef}
        className={`reviews-section scroll-mt-24${reviewsInView ? " reviews-visible" : ""}`}
      >
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
          <p className="reviews-kicker">Utisci gostiju</p>
          <h2 className="review-heading">Šta kažu naši gosti</h2>

          <div className="reviews-score-wrap">
            <div className="reviews-score-main">
              <span className="reviews-score-number">9.8</span>
              <span className="reviews-score-label">Izuzetno</span>
            </div>
            <div className="reviews-score-divider" />
            <div className="reviews-score-cats">
              {[
                ["Osoblje", "10"],
                ["Čistoća", "10"],
                ["Udobnost", "10"],
                ["Lokacija", "10"],
                ["Vrijednost", "10"],
                ["Sadržaji", "9.2"],
              ].map(([label, val]) => (
                <div key={label} className="reviews-score-cat">
                  <span>{label}</span>
                  <span className="reviews-score-cat-val">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <article className="review-card" style={{ animationDelay: "0.18s" }}>
              <div className="review-quote-mark">&ldquo;</div>
              <blockquote className="review-copy">
                Prije svega srdačan doček vlasnika gazdinstva, mir i priroda utiču opuštajuće.
              </blockquote>
              <div className="review-stars">★★★★★</div>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: "#2d6a42" }}>M</div>
                <div>
                  <p className="review-name">Miki</p>
                  <p className="review-location">Crna Gora</p>
                </div>
              </div>
            </article>

            <article className="review-card" style={{ animationDelay: "0.28s" }}>
              <div className="review-quote-mark">&ldquo;</div>
              <blockquote className="review-copy">
                Kolibe su udaljene oko 8 km od Andrijevice, ali mir i privatnost čine put vrijednim.
              </blockquote>
              <div className="review-stars">★★★★★</div>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: "#4a5568" }}>M</div>
                <div>
                  <p className="review-name">Monika</p>
                  <p className="review-location">Slovačka</p>
                </div>
              </div>
            </article>

            <article className="review-card" style={{ animationDelay: "0.38s" }}>
              <div className="review-quote-mark">&ldquo;</div>
              <blockquote className="review-copy">
                Bilo je odlično! Domaćini su bili veoma ljubazni, stan je uredan, a pogled na netaknutu prirodu ostavlja bez daha!
              </blockquote>
              <div className="review-stars">★★★★★</div>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: "#92400e" }}>V</div>
                <div>
                  <p className="review-name">Vera</p>
                  <p className="review-location">Severna Makedonija</p>
                </div>
              </div>
            </article>

            <article className="review-card" style={{ animationDelay: "0.48s" }}>
              <div className="review-quote-mark">&ldquo;</div>
              <blockquote className="review-copy">
                Super ljubazan domaćin koji je bio toliko pažljiv da nas dođe da pokupi zbog lošeg vremena. Lijep smještaj, mirna okolina, predivno mjesto.
              </blockquote>
              <div className="review-stars">★★★★★</div>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: "#5b6b7c" }}>T</div>
                <div>
                  <p className="review-name">Tessa</p>
                  <p className="review-location">Holandija</p>
                </div>
              </div>
            </article>

            <article className="review-card" style={{ animationDelay: "0.58s" }}>
              <div className="review-quote-mark">&ldquo;</div>
              <blockquote className="review-copy">
                Lokacija u prirodi, za sve koji traže mir i odmor od svakodnevice. Domaćin uvijek dostupan i brine se za sve što gostu treba. Preporučujem svima.
              </blockquote>
              <div className="review-stars">★★★★★</div>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: "#1a6b4a" }}>J</div>
                <div>
                  <p className="review-name">Jani</p>
                  <p className="review-location">Slovenija</p>
                </div>
              </div>
            </article>

            <article className="review-card" style={{ animationDelay: "0.68s" }}>
              <div className="review-quote-mark">&ldquo;</div>
              <blockquote className="review-copy">
                Beautiful, comfortable place in nature with an excellent, kind host. A destination worth reaching.
              </blockquote>
              <div className="review-stars">★★★★★</div>
              <div className="review-author-row">
                <div className="review-avatar" style={{ background: "#3b4a6b" }}>J</div>
                <div>
                  <p className="review-name">Jeffrey</p>
                  <p className="review-location">SAD</p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      <section id="galerija" className="kucice-section scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
          <p className="kucice-kicker">Smještaj</p>
          <h2 className="kucice-heading">Naše Kućice</h2>

          <div className="kucice-featured">
            <div
              className="kucice-main"
              role="button"
              tabIndex={0}
              onClick={() => openImageByIndex(0)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openImageByIndex(0)}
            >
              <Image
                src={galleryImages[0]}
                alt="Kućica 1"
                fill
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="kucice-side">
              {galleryImages.slice(1, 5).map((src, i) => (
                <div
                  key={src}
                  className="kucice-thumb"
                  role="button"
                  tabIndex={0}
                  onClick={() => openImageByIndex(i + 1)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openImageByIndex(i + 1)}
                >
                  <Image
                    src={src}
                    alt={`Kućica ${i + 2}`}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  {i === 3 && galleryImages.length > 5 && (
                    <div className="kucice-overlay">
                      <span>+{galleryImages.length - 5} slika</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="kucice-rest">
            {galleryImages.slice(5).map((src, i) => (
              <div
                key={src}
                className="kucice-rest-item"
                role="button"
                tabIndex={0}
                onClick={() => openImageByIndex(i + 5)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openImageByIndex(i + 5)}
              >
                <Image
                  src={src}
                  alt={`Kućica ${i + 6}`}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="booking-cta-wrap">
        <div className="booking-cta-inner">
          <p className="booking-cta-kicker">Dostupnost</p>
          <h2 className="booking-cta-heading">Rezervišite odmah</h2>
          <p className="booking-cta-sub">Provjerite slobodne termine i rezervišite direktno putem Booking.com</p>
          <a
            href="https://www.booking.com/hotel/me/gazdinstvo-lalic.sr.html"
            target="_blank"
            rel="noopener noreferrer"
            className="booking-cta-btn"
          >
            Rezervišite na Booking.com
          </a>
        </div>
      </div>

      <AmenitiesSection />

      <section className="rules-section scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
          <p className="rules-kicker">Boravak</p>
          <h2 className="rules-heading">Kućni red</h2>

          <div className="rules-times">
            <div className="rules-time-block">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="rules-time-label">Prijava</span>
              <span className="rules-time-value">15:00 – 18:00</span>
            </div>
            <div className="rules-time-divider" />
            <div className="rules-time-block">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 8 14"/></svg>
              <span className="rules-time-label">Odjava</span>
              <span className="rules-time-value">08:00 – 12:00</span>
            </div>
          </div>

          <div className="rules-items">
            <div className="rules-item rules-item--ok">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              <span className="rules-item-label">Djeca</span>
              <span className="rules-item-sub">Dobrodošla, krevetac besplatno (0–2 god.)</span>
            </div>
            <div className="rules-item rules-item--no">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
              <span className="rules-item-label">Pušenje</span>
              <span className="rules-item-sub">Nije dozvoljeno</span>
            </div>
            <div className="rules-item rules-item--no">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="5.5" r="1.5" fill="currentColor" stroke="none"/><circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><path d="M12 22c-4.5 0-7-2.2-7-5.8 0-2.6 1.6-4.6 4-5.4.6-.2 1.3-.3 2-.3h2c.7 0 1.4.1 2 .3 2.4.8 4 2.8 4 5.4 0 3.6-2.5 5.8-7 5.8z"/></svg>
              <span className="rules-item-label">Kućni ljubimci</span>
              <span className="rules-item-sub">Nisu dozvoljeni</span>
            </div>
            <div className="rules-item rules-item--no rules-item--last">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
              <span className="rules-item-label">Zabave</span>
              <span className="rules-item-sub">Nisu dozvoljene</span>
            </div>
          </div>
        </div>
      </section>

      {openImage && (
        <div
          className="gallery-lightbox-backdrop"
          onClick={closeLightbox}
          onKeyDown={(event) => {
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") showPrevImage();
            if (event.key === "ArrowRight") showNextImage();
          }}
          tabIndex={-1}
        >
          <div className="gallery-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image preview"
            >
              ×
            </button>
            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-nav-left"
              onClick={showPrevImage}
              disabled={!hasPrevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-nav-right"
              onClick={showNextImage}
              disabled={!hasNextImage}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="gallery-lightbox-image">
              <Image
                src={openImage}
                alt={`${t.sections.galleryTitle} preview`}
                fill
                className="object-contain"
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>
          </div>
        </div>
      )}

      <section
        id="kontakt"
        className="contact-section scroll-mt-24"
      >
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
          <div className="contact-grid">
            <div>
              <p className="contact-kicker">Rezervacija</p>
              <h2 className="contact-heading">{t.sections.contactTitle}</h2>
              <p className="contact-desc">{t.sections.contactText}</p>
              <div className="contact-btns">
                <a
                  href="tel:+38269660293"
                  className="contact-phone-btn"
                  aria-label="Pozovite Etno Selo Lalić za direktnu rezervaciju"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  +382 69 660 293
                </a>
                <a
                  href="https://www.booking.com/hotel/me/gazdinstvo-lalic.sr.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-booking-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Rezerviši na Booking.com
                </a>
              </div>
            </div>

            <div className="contact-distances">
              <p className="contact-distances-title">Udaljenosti</p>
              {[
                { name: "Andrijevica (centar)", km: "8 km" },
                { name: "Plavsko jezero", km: "31 km" },
                { name: "NP Prokletije", km: "41 km" },
                { name: "Aerodrom Podgorica", km: "94 km" },
              ].map(({ name, km }) => (
                <div key={name} className="contact-dist-row">
                  <span className="contact-dist-name">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {name}
                  </span>
                  <span className="contact-dist-km">{km}</span>
                </div>
              ))}
              <p className="mt-2 text-xs text-stone-400">Cecune, 84320 Andrijevica, Crna Gora</p>
            </div>
          </div>

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.558272200864!2d19.776886996789546!3d42.67071530000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13528817c9acb205%3A0x8566ccb0c985ff0c!2sGazdinstvo%20Lalic!5e0!3m2!1sen!2s!4v1779844276309!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokacija Etno Sela Lalić"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
