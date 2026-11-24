import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useSite } from "../content/SiteContent";

const PAGES = [
  { kind: "Page", title: "About Us", to: "/about", text: "company history values" },
  { kind: "Page", title: "What We Do", to: "/what-we-do", text: "services architecture structural turnkey" },
  { kind: "Page", title: "Projects", to: "/projects", text: "portfolio work" },
  { kind: "Page", title: "Team", to: "/team", text: "engineers people" },
  { kind: "Page", title: "Contact", to: "/contact", text: "enquiry quote phone email address" }
];

export default function SearchOverlay({ onClose }) {
  const { projects, services, content } = useSite();
  const [q, setQ] = useState("");
  const input = useRef(null);

  useEffect(() => {
    input.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const index = useMemo(
    () => [
      ...PAGES,
      ...projects.map((p) => ({ kind: "Project", title: p.title, to: `/projects/${p._id || p.id}`, text: `${p.category} ${p.location} ${p.brief || p.description || ""}` })),
      ...services.map((s) => ({ kind: "Service", title: s.title, to: "/what-we-do", text: s.description || "" })),
      ...(content.sectors?.items || []).map((s) => ({ kind: "Sector", title: s.name, to: "/what-we-do#sectors", text: s.text || "" }))
    ],
    [projects, services, content]
  );

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return index.filter((r) => `${r.title} ${r.text}`.toLowerCase().includes(t)).slice(0, 12);
  }, [q, index]);

  return (
    <motion.div className="search" role="dialog" aria-label="Search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <button className="icon-square search__close" onClick={onClose} aria-label="Close search">
        <FiX size={22} />
      </button>
      <div className="wrap" style={{ padding: 0 }}>
        <input ref={input} className="search__input" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the site" />
        {q && results.length === 0 && <p className="search__empty">Nothing matches “{q}”. Try a project name, a town or a service.</p>}
        <div className="search__results">
          {results.map((r, i) => (
            <Link key={i} to={r.to} onClick={onClose}>
              <small>{r.kind}</small>
              <strong>{r.title}</strong>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
