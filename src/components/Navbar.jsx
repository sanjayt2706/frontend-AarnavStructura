import { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaChevronDown, FaBars, FaTimes, FaDesktop, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const SERVICES_DROPDOWN = [
  { href: "#services", label: "Architectural Planning", desc: "Working drawings, 3D elevations & sanction layouts" },
  { href: "#services", label: "Structural Engineering", desc: "RCC framing design, IS code compliance & stability" },
  { href: "#services", label: "Turnkey Construction", desc: "Execution from excavation to final handover" },
  { href: "#services", label: "Project Management", desc: "BOQ estimation, quality auditing & progress tracking" },
  { href: "#services", label: "Structural Retrofitting", desc: "Assessment, repairs & modification for existing builds" }
];

const ABOUT_DROPDOWN = [
  { href: "#about", label: "About Our Firm", desc: "Engineering science & architectural coordination" },
  { href: "#process", label: "Our Process", desc: "6-stage structured delivery workflow" },
  { href: "#portfolio", label: "Selected Work", desc: "Residential & commercial case studies" },
  { href: "#testimonials", label: "Client Expectations", desc: "Transparency & defined project commitments" }
];

const Navbar = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) {
      document.body.classList.add("mobile-menu-active");
    } else {
      document.body.classList.remove("mobile-menu-active");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-active");
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const cycleTheme = () => {
    if (themeMode === "system") setThemeMode("dark");
    else if (themeMode === "dark") setThemeMode("light");
    else setThemeMode("system");
  };

  const getThemeIcon = () => {
    if (themeMode === "system") return <FaDesktop title="System Theme (Auto)" />;
    if (themeMode === "dark") return <FaMoon title="Dark Theme" />;
    return <FaSun title="Light Theme" />;
  };

  return (
    <nav className="hook-navbar">
      <div className="container nav-container">
        {/* Logo + Brand */}
        <a href="#home" className="logo" onClick={closeMenu}>
          <div className="hook-logo-mark">AS</div>
          <div>
            <span className="logo-name" style={{ color: "#FFFFFF" }}>Aarnav Structura</span>
            <span className="logo-sub" style={{ color: "#A1A1AA" }}>Civil &amp; Architectural Engineering</span>
          </div>
        </a>

        {/* Center Navigation Links with Dropdowns */}
        <ul className="nav-links" ref={dropdownRef}>
          <li
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a href="#services" className="nav-dropdown-trigger">
              Services <FaChevronDown style={{ fontSize: "10px", marginLeft: "4px" }} />
            </a>

            {activeDropdown === "services" && (
              <div className="nav-dropdown-menu">
                {SERVICES_DROPDOWN.map((s, idx) => (
                  <a key={idx} href={s.href} onClick={closeMenu} className="dropdown-item-card">
                    <div className="dropdown-item-title">{s.label}</div>
                    <div className="dropdown-item-desc">{s.desc}</div>
                  </a>
                ))}
              </div>
            )}
          </li>

          <li
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown("about")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a href="#about" className="nav-dropdown-trigger">
              About <FaChevronDown style={{ fontSize: "10px", marginLeft: "4px" }} />
            </a>

            {activeDropdown === "about" && (
              <div className="nav-dropdown-menu">
                {ABOUT_DROPDOWN.map((a, idx) => (
                  <a key={idx} href={a.href} onClick={closeMenu} className="dropdown-item-card">
                    <div className="dropdown-item-title">{a.label}</div>
                    <div className="dropdown-item-desc">{a.desc}</div>
                  </a>
                ))}
              </div>
            )}
          </li>

          <li>
            <a href="#portfolio">Projects</a>
          </li>
          <li>
            <a href="#estimator">Estimator</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Right Group: Phone, Compact Theme Button, Lime Yellow CTA */}
        <div className="nav-right-group">
          <a href="tel:+917760376348" className="nav-phone-link desktop-only" title="Call Engineering Desk">
            <FaPhoneAlt style={{ fontSize: "13px", color: "#D4FD52" }} />
            <span>+91 77603 76348</span>
          </a>

          {/* Compact Theme Cycle Button */}
          <button
            type="button"
            onClick={cycleTheme}
            className="compact-theme-btn"
            aria-label="Toggle Theme Mode"
            title={`Current: ${themeMode} theme. Click to switch.`}
          >
            {getThemeIcon()}
          </button>

          <a href="#contact" className="hook-btn-lime desktop-only">
            Get a Quote
          </a>

          <button
            type="button"
            className="nav-burger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FaTimes style={{ fontSize: "22px", color: "#FFFFFF" }} /> : <FaBars style={{ fontSize: "22px", color: "#FFFFFF" }} />}
          </button>
        </div>
      </div>

      {/* Solid Opaque Mobile Drawer */}
      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        <ul className="nav-mobile-links">
          <li><a href="#services" onClick={closeMenu}>Services</a></li>
          <li><a href="#portfolio" onClick={closeMenu}>Projects</a></li>
          <li><a href="#about" onClick={closeMenu}>About Us</a></li>
          <li><a href="#process" onClick={closeMenu}>Our Process</a></li>
          <li><a href="#estimator" onClick={closeMenu}>Cost Estimator</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "24px" }}>
          {/* Segmented Pill Theme Switcher */}
          <div className="mobile-theme-segmented">
            <button
              type="button"
              className={`mobile-theme-pill ${themeMode === "system" ? "active" : ""}`}
              onClick={() => setThemeMode("system")}
            >
              <FaDesktop style={{ fontSize: "12px" }} /> System
            </button>
            <button
              type="button"
              className={`mobile-theme-pill ${themeMode === "light" ? "active" : ""}`}
              onClick={() => setThemeMode("light")}
            >
              <FaSun style={{ fontSize: "12px" }} /> Light
            </button>
            <button
              type="button"
              className={`mobile-theme-pill ${themeMode === "dark" ? "active" : ""}`}
              onClick={() => setThemeMode("dark")}
            >
              <FaMoon style={{ fontSize: "12px" }} /> Dark
            </button>
          </div>

          <a href="tel:+917760376348" className="btn-ghost" style={{ justifyContent: "center", color: "#FFFFFF", borderColor: "#333333", width: "100%" }}>
            <FaPhoneAlt style={{ color: "#D4FD52" }} /> Call +91 77603 76348
          </a>

          <a href="#contact" className="hook-btn-lime" style={{ textAlign: "center", justifyContent: "center", width: "100%" }} onClick={closeMenu}>
            Get a Quote
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
