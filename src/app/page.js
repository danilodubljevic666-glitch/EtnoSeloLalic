"use client";

import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();
  const [aboutInView, setAboutInView] = useState(false);
  const [reviewsInView, setReviewsInView] = useState(false);
  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);

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
              {aboutStats.map((item, index) => (
                <div
                  key={item.label}
                  className="about-stat-row"
                  style={{ animationDelay: `${0.35 + index * 0.12}s` }}
                >
                  <span className="about-stat-value">{item.value}</span>
                  <span className="about-stat-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={reviewsRef}
        className={`mx-auto max-w-5xl px-6 pb-16 sm:px-10${reviewsInView ? " reviews-visible" : ""}`}
      >
        <h2 className="review-heading text-3xl font-bold tracking-tight text-stone-950">
          Utisci gostiju
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="review-card rounded-lg border border-stone-200 bg-white/80 p-6 shadow-[0_18px_45px_rgb(80_60_35_/_0.12)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-800 text-lg font-bold text-white shadow-md">
                M
              </div>
              <div>
                <h3 className="review-author text-lg font-bold text-stone-950">Miki</h3>
                <p className="review-location text-sm font-semibold text-stone-500">
                  Crna Gora
                </p>
              </div>
            </div>
            <blockquote className="review-copy mt-5 text-lg leading-8 text-stone-700">
              “Prije svega srdacan docek vlasnika gazdinstva, mir i priroda
              uticu opustajuce.”
            </blockquote>
          </article>

          <article className="review-card rounded-lg border border-stone-200 bg-white/80 p-6 shadow-[0_18px_45px_rgb(80_60_35_/_0.12)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-800 text-lg font-bold text-white shadow-md">
                M
              </div>
              <div>
                <h3 className="review-author text-lg font-bold text-stone-950">Monika</h3>
                <p className="review-location text-sm font-semibold text-stone-500">
                  Slovačka
                </p>
              </div>
            </div>
            <blockquote className="review-copy mt-5 text-lg leading-8 text-stone-700">
              “Колибе су удаљене око 8 км од Андријевице, али мир и приватност
              чине пут вредним.”
            </blockquote>
          </article>

          <article className="review-card rounded-lg border border-stone-200 bg-white/80 p-6 shadow-[0_18px_45px_rgb(80_60_35_/_0.12)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-800 text-lg font-bold text-white shadow-md">
                V
              </div>
              <div>
                <h3 className="review-author text-lg font-bold text-stone-950">Vera</h3>
                <p className="review-location text-sm font-semibold text-stone-500">
                  Severna Makedonija
                </p>
              </div>
            </div>
            <blockquote className="review-copy mt-5 text-lg leading-8 text-stone-700">
              “Било је одлично! Домаћини су били веома љубазни, стан је уредан,
              а поглед на нетакнуту природу оставља без даха!”
            </blockquote>
          </article>
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
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="aspect-[4/3] rounded-lg border border-stone-300 bg-white/70"
            />
          ))}
        </div>
      </section>

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
