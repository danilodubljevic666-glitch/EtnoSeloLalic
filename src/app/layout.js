import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  metadataBase: new URL("https://etnoselo-lalic.me"),
  title: {
    default: "Etno Selo Lalić — Planinski Odmor u Andrijevici, Crna Gora",
    template: "%s | Etno Selo Lalić"
  },
  description:
    "Etno Selo Lalić nudi autentičan planinski smještaj kod Andrijevice, Crna Gora. Mountain retreat Lalic — komforne vikendice u srcu divlje prirode, 41 km od NP Prokletije. Rezervišite direktno.",
  keywords: [
    "etno selo lalic",
    "etno selo andrijevica",
    "mountain retreat lalic",
    "smještaj andrijevica",
    "vikendice crna gora",
    "planinski odmor crna gora",
    "gazdinstvo lalic",
    "etno selo crna gora",
    "odmor u prirodi andrijevica",
    "Cecune smještaj"
  ],
  authors: [{ name: "Etno Selo Lalić" }],
  creator: "Etno Selo Lalić",
  openGraph: {
    title: "Etno Selo Lalić — Planinski Odmor u Andrijevici, Crna Gora",
    description:
      "Autentičan planinski smještaj kod Andrijevice, Crna Gora. Mountain retreat Lalic — komforne vikendice u srcu divlje prirode.",
    siteName: "Etno Selo Lalić",
    locale: "sr_ME",
    type: "website",
    images: [
      {
        url: "/slike/602192199.jpg",
        width: 1200,
        height: 800,
        alt: "Etno Selo Lalić — planinski smještaj kod Andrijevice, Crna Gora"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Etno Selo Lalić — Mountain Retreat Andrijevica",
    description:
      "Autentičan planinski smještaj kod Andrijevice, Crna Gora. Komforne vikendice u srcu divlje prirode."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large"
    }
  },
  icons: {
    icon: "/favicon.svg"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Etno Selo Lalić",
  alternateName: [
    "Mountain Retreat Lalic",
    "Etno Selo Andrijevica",
    "Gazdinstvo Lalic"
  ],
  description:
    "Autentičan planinski smještaj u blizini Andrijevice, Crna Gora. Komforne vikendice u srcu divlje prirode, 41 km od Nacionalnog parka Prokletije.",
  telephone: "+38269660293",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cecune bb",
    postalCode: "84320",
    addressLocality: "Andrijevica",
    addressCountry: "ME"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.6707153,
    longitude: 19.776887
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Terasa", value: true },
    { "@type": "LocationFeatureSpecification", name: "Balkon", value: true },
    { "@type": "LocationFeatureSpecification", name: "Privatno parkiranje", value: true },
    { "@type": "LocationFeatureSpecification", name: "Klimatizacija", value: true },
    { "@type": "LocationFeatureSpecification", name: "Kuhinja", value: true }
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "9.8",
    reviewCount: "6",
    bestRating: "10",
    worstRating: "1"
  },
  sameAs: [
    "https://www.booking.com/hotel/me/gazdinstvo-lalic.sr.html"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <head>
        <link rel="preload" href="/hero-section.webp" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Preloader />
        <LanguageProvider>
          <Nav />
          {children}
          <Footer />
        </LanguageProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
