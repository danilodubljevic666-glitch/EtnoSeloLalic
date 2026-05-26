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

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#o-nama"
              className="inline-flex min-w-44 justify-center rounded-md bg-emerald-700 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgb(0_0_0_/_0.32)] transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-[0_18px_38px_rgb(0_0_0_/_0.38)]"
            >
              {t.hero.aboutButton}
            </a>
            <a
              href="#kontakt"
              className="inline-flex min-w-44 justify-center rounded-md border border-white/70 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgb(0_0_0_/_0.28)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-stone-950 hover:shadow-[0_18px_38px_rgb(0_0_0_/_0.36)]"
            >
              {t.hero.contactButton}
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
      {LEAVES.map(({ id, left, fall, sway, delay, swayX, size, rot, type, fill }) => {
        const { body, vein } = LEAF_PATHS[type];
        return (
          <div
            key={id}
            className="hero-leaf-outer"
            style={{ left, "--leaf-fall": fall, "--leaf-sway": sway, "--leaf-delay": delay, "--leaf-sway-x": swayX }}
          >
            <div className="hero-leaf-inner">
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
      <g transform="translate(83 254) rotate(-30)">
        <path
          d="M0 0C20-30 58-38 84-12C57 4 24 8 0 0Z"
          fill="url(#leftLeaf)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4-1C28-8 53-10 78-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
      </g>
      <g transform="translate(119 209) rotate(-42) scale(.88)">
        <path
          d="M0 0C18-27 52-34 76-11C51 3 23 7 0 0Z"
          fill="url(#leftLeafSoft)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4-1C27-7 50-9 70-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.65" />
      </g>
      <g transform="translate(29 214) rotate(54) scale(.86)">
        <path
          d="M0 0C19-29 56-36 80-10C54 3 24 7 0 0Z"
          fill="url(#leftLeafDark)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4-1C27-7 52-10 74-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58" />
      </g>
      <g transform="translate(63 318) rotate(-20) scale(.95)">
        <path
          d="M0 0C22-33 65-40 92-11C62 5 28 9 0 0Z"
          fill="url(#leftLeafSoft)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M5-1C32-8 60-10 86-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.62" />
      </g>
      <g transform="translate(42 104) rotate(-9) scale(.82)">
        <path
          d="M0 0C23-31 66-35 91-5C60 9 26 10 0 0Z"
          fill="url(#leftLeaf)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4 0C31-5 58-5 84-5" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
      </g>
      <g transform="translate(125 63) rotate(-32) scale(.72)">
        <path
          d="M0 0C18-25 51-30 72-8C48 5 22 7 0 0Z"
          fill="url(#leftLeafDark)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4-1C25-6 48-8 66-8" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58" />
      </g>
      <circle cx="65" cy="246" r="3" fill="#f3d06a" fillOpacity="0.75" />
      <circle cx="76" cy="286" r="2.4" fill="#f3d06a" fillOpacity="0.62" />
      <circle cx="42" cy="141" r="2.6" fill="#f3d06a" fillOpacity="0.68" />
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
      <g transform="translate(209 248) scale(-1 1) rotate(-31)">
        <path
          d="M0 0C21-31 60-38 87-11C58 5 25 9 0 0Z"
          fill="url(#rightLeaf)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4-1C30-8 56-10 80-11" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
      </g>
      <g transform="translate(164 205) scale(-.9 .9) rotate(-44)">
        <path
          d="M0 0C18-27 52-34 77-10C51 4 23 7 0 0Z"
          fill="url(#rightLeafSoft)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4-1C27-7 51-9 71-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.65" />
      </g>
      <g transform="translate(272 215) scale(-.86 .86) rotate(55)">
        <path
          d="M0 0C20-30 57-36 82-10C55 4 24 8 0 0Z"
          fill="url(#rightLeafDark)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4-1C28-7 53-10 76-10" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58" />
      </g>
      <g transform="translate(224 326) scale(-.96 .96) rotate(-18)">
        <path
          d="M0 0C22-33 65-40 92-11C62 5 28 9 0 0Z"
          fill="url(#rightLeafSoft)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M5-1C32-8 60-10 86-12" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.62" />
      </g>
      <g transform="translate(259 88) scale(-.83 .83) rotate(-8)">
        <path
          d="M0 0C23-31 66-35 91-5C60 9 26 10 0 0Z"
          fill="url(#rightLeaf)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4 0C31-5 58-5 84-5" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
      </g>
      <g transform="translate(170 55) scale(-.72 .72) rotate(-32)">
        <path
          d="M0 0C18-25 51-30 72-8C48 5 22 7 0 0Z"
          fill="url(#rightLeafDark)"
          stroke="#d6c782"
          strokeWidth="1.3"
        />
        <path d="M4-1C25-6 48-8 66-8" stroke="#fff3ba" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.58" />
      </g>
      <circle cx="230" cy="244" r="3" fill="#f3d06a" fillOpacity="0.75" />
      <circle cx="219" cy="285" r="2.4" fill="#f3d06a" fillOpacity="0.62" />
      <circle cx="259" cy="131" r="2.6" fill="#f3d06a" fillOpacity="0.68" />
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
