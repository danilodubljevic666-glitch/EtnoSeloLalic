const footerLinks = [
  { label: "Početna",    href: "#pocetna" },
  { label: "O nama",     href: "#o-nama" },
  { label: "Utisci",     href: "#utisci" },
  { label: "Galerija",   href: "#galerija" },
  { label: "Pogodnosti", href: "#pogodnosti" },
  { label: "Kontakt",    href: "#kontakt" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <a href="#pocetna" className="footer-logo">Etno Selo Lalić</a>
          <p className="footer-tagline">
            Autentičan smještaj u srcu prirode Crne Gore — mir, planine i toplo gostoprimstvo.
          </p>
          <a
            href="https://www.booking.com/hotel/me/gazdinstvo-lalic.sr.html"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-booking-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Booking.com
          </a>
        </div>

        <nav className="footer-nav" aria-label="Footer navigacija">
          <p className="footer-col-title">Navigacija</p>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="footer-nav-link">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-contact">
          <p className="footer-col-title">Lokacija</p>
          <address className="footer-address">
            <span>Cecune</span>
            <span>84320 Andrijevica</span>
            <span>Crna Gora</span>
          </address>
          <div className="footer-distances">
            <span>8 km od Andrijevice</span>
            <span>31 km od Plavskog jezera</span>
            <span>41 km od NP Prokletije</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Etno Selo Lalić. Sva prava zadržana.</p>
        <p className="footer-score">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          9.8 / 10 na Booking.com
        </p>
      </div>
    </footer>
  );
}
