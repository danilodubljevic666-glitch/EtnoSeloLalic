import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";

export const metadata = {
  title: "Etno Selo Lalić",
  description: "Etno Selo Lalić — autentičan smještaj u srcu prirode Crne Gore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <head>
        <link rel="preload" href="/hero-section.webp" as="image" />
      </head>
      <body>
        <Preloader />
        <LanguageProvider>
          <Nav />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
