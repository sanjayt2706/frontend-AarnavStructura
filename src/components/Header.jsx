import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useSite } from "../content/SiteContent";
import { Img, EASE } from "./primitives";
import SearchOverlay from "./SearchOverlay";

export const NAV = [
  { to: "/about", label: "About Us" },
  { to: "/what-we-do", label: "What We Do" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" }
];

export default function Header() {
  const { content } = useSite();
  const { brand, contact } = content;
  const { pathname } = useLocation();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 80);
      setHidden(y > 400 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menu || search);
  }, [menu, search]);

  const tel = (contact.phone || "").replace(/\s/g, "");

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className={`header ${solid ? "is-solid" : ""} ${hidden && !menu ? "is-hidden" : ""}`}>
        <div className="wrap header__in">
          <Link to="/" className="header__logo" aria-label={`${brand.companyName} home`}>
            <Img src={brand.logoLight} alt={brand.companyName} eager />
          </Link>

          <nav className="header__nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? "active" : "")}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="header__tools">
            <button className="icon-square" onClick={() => setSearch(true)} aria-label="Search">
              <FiSearch size={22} />
            </button>
            {tel && (
              <a className="header__call" href={`tel:${tel}`}>
                {contact.phone}
              </a>
            )}
            <button className="icon-square header__burger" onClick={() => setMenu(true)} aria-label="Open menu">
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="mnav"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="mnav__top">
              <Img src={brand.logoLight} alt={brand.companyName} />
              <button className="icon-square" onClick={() => setMenu(false)} aria-label="Close menu">
                <FiX size={22} />
              </button>
            </div>
            <nav className="mnav__links">
              {[{ to: "/", label: "Home" }, ...NAV].map((n, i) => (
                <motion.div key={n.to} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE }}>
                  <Link to={n.to}>
                    <small>0{i + 1}</small>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mnav__foot">
              {contact.phone && <a href={`tel:${tel}`}>{contact.phone}</a>}
              {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
              <span>{contact.address}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{search && <SearchOverlay onClose={() => setSearch(false)} />}</AnimatePresence>
    </>
  );
}
