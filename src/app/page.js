"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
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
          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <article className="review-card">
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

            <article className="review-card">
              <div className="review-quote-mark">&ldquo;</div>
              <blockquote className="review-copy">
                Колибе су удаљене около 8 км од Андријевице, али мир и приватност чине пут вредним.
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

            <article className="review-card">
              <div className="review-quote-mark">&ldquo;</div>
              <blockquote className="review-copy">
                Було је одлично! Домаћини су били веома љубазни, стан је уредан, а поглед на нетакнуту природу оставља без даха!
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

          </div>
        </div>
      </section>

      <section
        id="galerija"
        className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:px-10"
      >
        <h2 className="text-3xl font-bold tracking-tight text-stone-950">
          {t.sections.galleryTitle}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {galleryImages.map((src, index) => (
            <div
              key={src}
              role="button"
              tabIndex={0}
              className="gallery-item relative overflow-hidden rounded-lg border border-stone-300 bg-white/70 aspect-[4/3]"
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => openImageByIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  openImageByIndex(index);
                }
              }}
            >
              <Image
                src={src}
                alt={`${t.sections.galleryTitle} ${index + 1}`}
                fill
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
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
        className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:px-10"
      >
        <h2 className="text-3xl font-bold tracking-tight text-stone-950">
          {t.sections.contactTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-700">
          {t.sections.contactText}
        </p>
      </section>
    </main>
  );
}
