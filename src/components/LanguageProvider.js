"use client";

import { createContext, useContext, useMemo, useState } from "react";

const translations = {
  me: {
    nav: {
      home: "Početna",
      about: "O nama",
      gallery: "Galerija",
      contact: "Kontakt",
      openMenu: "Otvori meni",
      closeMenu: "Zatvori meni"
    },
    hero: {
      title: "Etno selo Lalić",
      description:
        "Uživajte u domaćoj atmosferi, prirodnom ambijentu i toplini sela koje čuva autentičan duh Andrijevice.",
      aboutButton: "O nama",
      contactButton: "Kontakt"
    },
    sections: {
      aboutTitle: "O nama",
      aboutKicker: "Planinski odmor u prirodi",
      aboutText: [
        "Objekat Mountain retreat Lalic udaljen je oko 41 km od Nacionalnog parka Prokletije i u ponudi ima smještaj sa terasom i balkonom, kao i pogledom na planinu.",
        "Objekat se nalazi na 31 km od Plavskog jezera, nudi vrt i besplatan privatni parking. Klimatizovani smještaj ima dnevni boravak, potpuno opremljenu kuhinju sa frižiderom, 1 spavaću sobu i kupatilo sa tušem i fenom za kosu.",
        "U vikendici su obezbijeđeni peškiri i posteljina, a Aerodrom Podgorica udaljen je 94 km."
      ],
      aboutCardTitle: "Brze informacije",
      aboutStats: [
        { value: "41 km", label: "od Nacionalnog parka Prokletije" },
        { value: "31 km", label: "od Plavskog jezera" },
        { value: "94 km", label: "od Aerodroma Podgorica" },
        { value: "1 soba", label: "klimatizovana vikendica sa kuhinjom" }
      ],
      galleryTitle: "Galerija",
      contactTitle: "Kontakt",
      contactText: "Dodajte telefon, adresu, email i mapu za posjetioce."
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About us",
      gallery: "Gallery",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu"
    },
    hero: {
      title: "Etno Village Lalić",
      description:
        "Enjoy a warm local atmosphere, a natural setting, and the spirit of a village that preserves the authentic charm of Andrijevica.",
      aboutButton: "About us",
      contactButton: "Contact"
    },
    sections: {
      aboutTitle: "About us",
      aboutKicker: "A mountain retreat in nature",
      aboutText: [
        "Mountain retreat Lalic is located about 41 km from Prokletije National Park and offers accommodation with a terrace and balcony, along with mountain views.",
        "The property is 31 km from Plav Lake and offers a garden and free private parking. The air-conditioned accommodation includes a living room, a fully equipped kitchen with a refrigerator, 1 bedroom, and a bathroom with a shower and hairdryer.",
        "Towels and bed linen are provided in the holiday home, while Podgorica Airport is 94 km away."
      ],
      aboutCardTitle: "Quick details",
      aboutStats: [
        { value: "41 km", label: "from Prokletije National Park" },
        { value: "31 km", label: "from Plav Lake" },
        { value: "94 km", label: "from Podgorica Airport" },
        { value: "1 bedroom", label: "air-conditioned cabin with kitchen" }
      ],
      galleryTitle: "Gallery",
      contactTitle: "Contact",
      contactText: "Add a phone number, address, email, and map for visitors."
    }
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("me");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language]
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
