import { useState, useEffect } from "react";
import useNavBehavior from "../hooks/useNavBehavior";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#portfolio", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#brochure", label: "Brochure" },
];

const Navbar = () => {
  const { hidden, scrolled } = useNavBehavior();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isHidden = hidden && !menuOpen;

  const cls = [
    isHidden ? "hidden" : "",
    scrolled ? "scrolled" : "",
    menuOpen ? "menu-open" : ""
  ].filter(Boolean).join(" ");

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={cls}>
      <div className="logo" onClick={closeMenu}>
        <div className="logo-mark"><span>AS</span></div>
        <div>
          <span className="logo-name">Aarnav Structura</span>
          <span className="logo-sub">Construction &amp; Civil Engineering</span>
        </div>
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <a href="#contact" className="nav-btn">Start a Project</a>
      </div>

      <button
        className={`nav-burger ${menuOpen ? "open" : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        <ul className="nav-mobile-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={closeMenu}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-btn nav-mobile-btn" onClick={closeMenu}>
          Start a Project
        </a>
      </div>

      {menuOpen && <div className="nav-backdrop" onClick={closeMenu} />}
    </nav>
  );
};

export default Navbar;
