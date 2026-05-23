import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Etno Selo Lalic",
  description: "Next.js i Tailwind CSS projekat za Etno Selo Lalic"
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body>
        <LanguageProvider>
          <Nav />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
