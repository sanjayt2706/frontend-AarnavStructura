import { useEffect, useRef, useState } from "react";

// Fixed, page-wide ambient layer: animated SVG grid lines, corner accents,
// floating gold particles, a soft glow that follows the cursor, and a
// subtle ripple on click. Purely decorative — pointer-events are disabled
// throughout except where the ripple/gradient explicitly need coordinates.
const EffectsLayer = () => {
  const [mouse, setMouse] = useState({ left: "0px", top: "0px", opacity: 0 });
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);

  useEffect(() => {
    const move = (e) => setMouse({ left: `${e.clientX}px`, top: `${e.clientY}px`, opacity: 1 });
    const leave = () => setMouse((m) => ({ ...m, opacity: 0 }));
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  useEffect(() => {
    const click = (e) => {
      const id = ++rippleId.current;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 900);
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);

  return (
    <>
      <svg className="fx-layer" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <line x1="0" y1="20%" x2="100%" y2="20%" className="fx-grid-line" style={{ animationDelay: "0.3s" }} />
        <line x1="0" y1="80%" x2="100%" y2="80%" className="fx-grid-line" style={{ animationDelay: "0.6s" }} />
        <line x1="20%" y1="0" x2="20%" y2="100%" className="fx-grid-line" style={{ animationDelay: "0.9s" }} />
        <line x1="80%" y1="0" x2="80%" y2="100%" className="fx-grid-line" style={{ animationDelay: "1.2s" }} />
        <line x1="50%" y1="0" x2="50%" y2="100%" className="fx-grid-line" style={{ animationDelay: "1.5s", opacity: 0.06 }} />
        <circle cx="20%" cy="20%" r="2" className="fx-dot" style={{ animationDelay: "1.8s" }} />
        <circle cx="80%" cy="20%" r="2" className="fx-dot" style={{ animationDelay: "2s" }} />
        <circle cx="20%" cy="80%" r="2" className="fx-dot" style={{ animationDelay: "2.2s" }} />
        <circle cx="80%" cy="80%" r="2" className="fx-dot" style={{ animationDelay: "2.4s" }} />
      </svg>

      <div className="fx-corner" style={{ top: 16, left: 16, borderWidth: "1px 0 0 1px", animationDelay: "2.4s" }} />
      <div className="fx-corner" style={{ top: 16, right: 16, borderWidth: "1px 1px 0 0", animationDelay: "2.5s" }} />
      <div className="fx-corner" style={{ bottom: 16, left: 16, borderWidth: "0 0 1px 1px", animationDelay: "2.6s" }} />
      <div className="fx-corner" style={{ bottom: 16, right: 16, borderWidth: "0 1px 1px 0", animationDelay: "2.7s" }} />

      <div className="fx-particle" style={{ top: "22%", left: "12%", animationDelay: "0.4s" }} />
      <div className="fx-particle" style={{ top: "58%", left: "88%", animationDelay: "1s" }} />
      <div className="fx-particle" style={{ top: "38%", left: "8%", animationDelay: "1.6s" }} />
      <div className="fx-particle" style={{ top: "74%", left: "92%", animationDelay: "2.1s" }} />
      <div className="fx-particle" style={{ top: "12%", left: "60%", animationDelay: "2.6s" }} />

      <div id="fx-mouse-gradient" style={mouse} />

      {ripples.map((r) => (
        <div key={r.id} className="fx-ripple" style={{ left: r.x, top: r.y }} />
      ))}
    </>
  );
};

export default EffectsLayer;
