"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="pocetna"
      className="relative isolate min-h-screen scroll-mt-24 overflow-hidden"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <Image
          src="/hero-section.webp"
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/75 via-stone-950/45 to-stone-950/10"
        aria-hidden="true"
      />

      <HeroSideOrnamentLeft />
      <HeroSideOrnamentRight />
      <FloatingLeaves />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 pb-20 pt-28 sm:px-10">
        <div className="hero-content max-w-4xl text-center text-white">
          <h1 className="hero-title text-6xl font-bold tracking-normal sm:text-8xl lg:text-9xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-2xl leading-9 text-stone-100 sm:text-3xl sm:leading-10">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#o-nama" className="hero-btn hero-btn-primary">
              {t.hero.aboutButton}
              <svg className="hero-btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a href="#kontakt" className="hero-btn hero-btn-outline">
              {t.hero.contactButton}
              <svg className="hero-btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const LEAF_PATHS = {
  a: {
    body: "M0,-20 C9,-13 14,-2 11,9 C8,18 3,22 0,22 C-3,22 -8,18 -11,9 C-14,-2 -9,-13 0,-20Z",
    vein: "M0,-20 C0.5,-7 0.5,7 0,22",
  },
  b: {
    body: "M0,-18 C11,-11 16,2 13,13 C10,21 5,24 0,24 C-5,24 -10,21 -13,13 C-16,2 -11,-11 0,-18Z",
    vein: "M0,-18 C0.5,-5 0.5,8 0,24",
  },
  c: {
    body: "M0,-22 C10,-15 16,-3 12,9 C8,18 3,22 0,22 C-4,22 -10,14 -12,4 C-14,-7 -8,-16 0,-22Z",
    vein: "M0,-22 C0.5,-8 0.5,7 0,22",
  },
};

const LEAVES = [
  { id:1,  left:"5%",  fall:"15s", sway:"4.0s", delay:"-4s",  swayX:"20px", size:18, rot:-20, type:"a", fill:"rgba(80,140,40,0.60)" },
  { id:2,  left:"14%", fall:"11s", sway:"3.2s", delay:"-9s",  swayX:"16px", size:13, rot: 30, type:"b", fill:"rgba(44,96,28,0.52)" },
  { id:3,  left:"25%", fall:"17s", sway:"4.6s", delay:"-2s",  swayX:"28px", size:22, rot:-12, type:"c", fill:"rgba(112,172,52,0.56)" },
  { id:4,  left:"38%", fall:"12s", sway:"2.8s", delay:"-8s",  swayX:"14px", size:15, rot: 45, type:"a", fill:"rgba(48,84,28,0.58)" },
  { id:5,  left:"50%", fall:"16s", sway:"4.2s", delay:"-1s",  swayX:"26px", size:20, rot:-35, type:"b", fill:"rgba(100,164,44,0.54)" },
  { id:6,  left:"62%", fall:"13s", sway:"3.5s", delay:"-11s", swayX:"18px", size:16, rot: 18, type:"c", fill:"rgba(60,112,32,0.60)" },
  { id:7,  left:"72%", fall:"18s", sway:"5.0s", delay:"-5s",  swayX:"30px", size:23, rot:-48, type:"a", fill:"rgba(124,184,60,0.52)" },
  { id:8,  left:"80%", fall:"10s", sway:"3.0s", delay:"-14s", swayX:"13px", size:12, rot: 58, type:"b", fill:"rgba(48,92,28,0.56)" },
  { id:9,  left:"88%", fall:"14s", sway:"3.8s", delay:"-7s",  swayX:"22px", size:19, rot:-22, type:"c", fill:"rgba(88,148,40,0.60)" },
  { id:10, left:"93%", fall:"12s", sway:"2.6s", delay:"-3s",  swayX:"16px", size:14, rot: 38, type:"a", fill:"rgba(52,96,28,0.58)" },
];

function FloatingLeaves() {
  return (
    <div className="hero-leaves" aria-hidden="true">
      {LEAVES.map(({ id, left, fall, delay, swayX, size, rot, type, fill }) => {
        const { body, vein } = LEAF_PATHS[type];
        return (
          <div
            key={id}
            className="hero-leaf"
            style={{
              left,
              animationDuration: fall,
              animationDelay: delay,
              "--sx-neg": `-${swayX}`,
              "--sx-pos": swayX,
            }}
          >
            <svg
              viewBox="-16 -24 32 50"
              width={size}
              height={size}
              style={{ transform: `rotate(${rot}deg)` }}
            >
              <path d={body} fill={fill} />
              <path d={vein} stroke="rgba(255,255,255,0.26)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

function HeroSideOrnamentLeft() {
  return (
    <svg
      className="hero-side-art hero-side-art-left"
      viewBox="0 0 280 420"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M56 414C75 354 82 298 75 247C68 195 47 154 34 103"
        stroke="url(#leftBranch)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M77 259C116 239 149 208 174 164"
        stroke="url(#leftBranch)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M70 306C40 284 24 251 24 211"
        stroke="url(#leftBranch)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M35 104C75 101 110 84 139 53"
        stroke="url(#leftBranch)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* trunk – donja sekcija */}
      <g transform="translate(72 372) rotate(-28) scale(.80)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#leftLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.70"/></g>
      <g transform="translate(84 328) rotate(155) scale(.74)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#leftLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.60"/></g>
      {/* desna grana */}
      <g transform="translate(102 248) rotate(-50) scale(.78)"><path d="M0 0C19-29 56-36 80-10C54 3 24 7 0 0Z" fill="url(#leftLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 52-10 74-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <g transform="translate(121 232) rotate(22) scale(.72)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#leftLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.70"/></g>
      <g transform="translate(140 213) rotate(-58) scale(.70)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#leftLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.62"/></g>
      <g transform="translate(158 190) rotate(18) scale(.65)"><path d="M0 0C22-33 65-40 92-11C62 5 28 9 0 0Z" fill="url(#leftLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M5-1C32-8 60-10 86-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <g transform="translate(166 163) rotate(-40) scale(.76)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#leftLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.70"/></g>
      {/* lijeva grana */}
      <g transform="translate(52 291) rotate(-112) scale(.78)"><path d="M0 0C19-29 56-36 80-10C54 3 24 7 0 0Z" fill="url(#leftLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 52-10 74-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <g transform="translate(36 267) rotate(-128) scale(.72)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#leftLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.62"/></g>
      <g transform="translate(26 243) rotate(-108) scale(.66)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#leftLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.70"/></g>
      <g transform="translate(16 214) rotate(-124) scale(.62)"><path d="M0 0C22-33 65-40 92-11C62 5 28 9 0 0Z" fill="url(#leftLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M5-1C32-8 60-10 86-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.60"/></g>
      {/* trunk – između grana */}
      <g transform="translate(68 249) rotate(-35) scale(.72)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#leftLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <g transform="translate(60 200) rotate(148) scale(.68)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#leftLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.65"/></g>
      {/* gornja grana */}
      <g transform="translate(62 101) rotate(-82) scale(.75)"><path d="M0 0C19-29 56-36 80-10C54 3 24 7 0 0Z" fill="url(#leftLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 52-10 74-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <g transform="translate(88 91) rotate(-16) scale(.70)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#leftLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.62"/></g>
      <g transform="translate(113 76) rotate(-78) scale(.66)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#leftLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.70"/></g>
      <g transform="translate(130 57) rotate(-40) scale(.62)"><path d="M0 0C22-33 65-40 92-11C62 5 28 9 0 0Z" fill="url(#leftLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M5-1C32-8 60-10 86-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.60"/></g>
      <g transform="translate(120 46) rotate(-66) scale(.58)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#leftLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      {/* trunk – gornji dio */}
      <g transform="translate(50 155) rotate(-42) scale(.65)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#leftLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.65"/></g>
      <g transform="translate(56 130) rotate(145) scale(.62)"><path d="M0 0C19-29 56-36 80-10C54 3 24 7 0 0Z" fill="url(#leftLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 52-10 74-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <circle cx="78" cy="259" r="2.8" fill="#f3d06a" fillOpacity="0.72" />
      <circle cx="70" cy="307" r="2.2" fill="#f3d06a" fillOpacity="0.60" />
      <circle cx="37" cy="106" r="2.4" fill="#f3d06a" fillOpacity="0.65" />
      <circle cx="162" cy="166" r="1.8" fill="#f3d06a" fillOpacity="0.55" />
      <defs>
        <linearGradient
          id="leftBranch"
          x1="34"
          y1="54"
          x2="88"
          y2="414"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c38b4c" />
          <stop offset="0.48" stopColor="#7a4a27" />
          <stop offset="1" stopColor="#f0d184" stopOpacity="0.78" />
        </linearGradient>
        <linearGradient id="leftLeaf" x1="0" y1="-26" x2="86" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8d98d" />
          <stop offset="0.45" stopColor="#8da545" />
          <stop offset="1" stopColor="#36572e" />
        </linearGradient>
        <linearGradient id="leftLeafSoft" x1="0" y1="-28" x2="92" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff0aa" />
          <stop offset="0.5" stopColor="#9ab252" />
          <stop offset="1" stopColor="#496d38" />
        </linearGradient>
        <linearGradient id="leftLeafDark" x1="0" y1="-26" x2="80" y2="2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d8c86c" />
          <stop offset="0.58" stopColor="#6f8a3c" />
          <stop offset="1" stopColor="#294424" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeroSideOrnamentRight() {
  return (
    <svg
      className="hero-side-art hero-side-art-right"
      viewBox="0 0 300 420"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M242 405C219 347 209 292 215 240C221 188 247 143 268 86"
        stroke="url(#rightBranch)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M216 251C170 235 132 205 101 160"
        stroke="url(#rightBranch)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M226 313C259 289 276 254 276 212"
        stroke="url(#rightBranch)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M268 87C229 90 193 77 162 49"
        stroke="url(#rightBranch)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* trunk – donja sekcija */}
      <g transform="translate(232 378) scale(-.78 .78) rotate(28)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#rightLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.70"/></g>
      <g transform="translate(225 335) scale(-.72 .72) rotate(-150)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#rightLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.62"/></g>
      {/* lijeva grana */}
      <g transform="translate(189 240) scale(-.76 .76) rotate(-38)"><path d="M0 0C19-29 56-36 80-10C54 3 24 7 0 0Z" fill="url(#rightLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 52-10 74-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.60"/></g>
      <g transform="translate(177 233) scale(-.70 .70) rotate(20)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#rightLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.68"/></g>
      <g transform="translate(165 225) scale(-.68 .68) rotate(-52)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#rightLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.62"/></g>
      <g transform="translate(142 207) scale(-.64 .64) rotate(24)"><path d="M0 0C22-33 65-40 92-11C62 5 28 9 0 0Z" fill="url(#rightLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M5-1C32-8 60-10 86-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <g transform="translate(120 185) scale(-.60 .60) rotate(-46)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#rightLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.65"/></g>
      {/* desna grana */}
      <g transform="translate(248 293) scale(-.76 .76) rotate(55)"><path d="M0 0C19-29 56-36 80-10C54 3 24 7 0 0Z" fill="url(#rightLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 52-10 74-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.60"/></g>
      <g transform="translate(263 269) scale(-.70 .70) rotate(-22)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#rightLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <g transform="translate(273 242) scale(-.66 .66) rotate(60)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#rightLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.70"/></g>
      <g transform="translate(276 212) scale(-.74 .74) rotate(48)"><path d="M0 0C22-33 65-40 92-11C62 5 28 9 0 0Z" fill="url(#rightLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M5-1C32-8 60-10 86-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.62"/></g>
      {/* trunk – između grana */}
      <g transform="translate(220 252) scale(-.70 .70) rotate(-32)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#rightLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <g transform="translate(230 202) scale(-.66 .66) rotate(145)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#rightLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.65"/></g>
      {/* gornja grana */}
      <g transform="translate(239 86) scale(-.72 .72) rotate(-10)"><path d="M0 0C19-29 56-36 80-10C54 3 24 7 0 0Z" fill="url(#rightLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 52-10 74-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.60"/></g>
      <g transform="translate(212 80) scale(-.68 .68) rotate(30)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#rightLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.62"/></g>
      <g transform="translate(186 67) scale(-.64 .64) rotate(-45)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#rightLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.70"/></g>
      <g transform="translate(162 49) scale(-.70 .70) rotate(-28)"><path d="M0 0C22-33 65-40 92-11C62 5 28 9 0 0Z" fill="url(#rightLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M5-1C32-8 60-10 86-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.60"/></g>
      <g transform="translate(173 56) scale(-.60 .60) rotate(22)"><path d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z" fill="url(#rightLeafDark)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      {/* trunk – gornji dio */}
      <g transform="translate(252 157) scale(-.63 .63) rotate(-40)"><path d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z" fill="url(#rightLeaf)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.65"/></g>
      <g transform="translate(258 130) scale(-.60 .60) rotate(142)"><path d="M0 0C19-29 56-36 80-10C54 3 24 7 0 0Z" fill="url(#rightLeafSoft)" stroke="#d6c782" strokeWidth="1.3"/><path d="M4-1C27-7 52-10 74-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58"/></g>
      <circle cx="216" cy="251" r="2.8" fill="#f3d06a" fillOpacity="0.72" />
      <circle cx="226" cy="313" r="2.2" fill="#f3d06a" fillOpacity="0.60" />
      <circle cx="268" cy="87" r="2.4" fill="#f3d06a" fillOpacity="0.65" />
      <circle cx="101" cy="160" r="1.8" fill="#f3d06a" fillOpacity="0.55" />
      <defs>
        <linearGradient
          id="rightBranch"
          x1="266"
          y1="48"
          x2="216"
          y2="405"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c38b4c" />
          <stop offset="0.48" stopColor="#7a4a27" />
          <stop offset="1" stopColor="#f0d184" stopOpacity="0.78" />
        </linearGradient>
        <linearGradient id="rightLeaf" x1="0" y1="-26" x2="86" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8d98d" />
          <stop offset="0.45" stopColor="#8da545" />
          <stop offset="1" stopColor="#36572e" />
        </linearGradient>
        <linearGradient id="rightLeafSoft" x1="0" y1="-28" x2="92" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff0aa" />
          <stop offset="0.5" stopColor="#9ab252" />
          <stop offset="1" stopColor="#496d38" />
        </linearGradient>
        <linearGradient id="rightLeafDark" x1="0" y1="-26" x2="80" y2="2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d8c86c" />
          <stop offset="0.58" stopColor="#6f8a3c" />
          <stop offset="1" stopColor="#294424" />
        </linearGradient>
      </defs>
    </svg>
  );
}
