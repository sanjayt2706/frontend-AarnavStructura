import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../styles/loader.css";

// Stepped-tower elevation, drawn as a single closed blueprint path.
// viewBox 0 0 240 320 — apex at (120,40), symmetric setbacks, ground line included via Z-close.
const TOWER_PATH =
  "M70,300 L70,170 L95,170 L95,100 L120,100 L120,40 L145,100 L170,100 L170,170 L195,170 L195,300 Z";

// Floor lines per tier, drawn after the outline settles.
const FLOOR_LINES = [
  { x1: 71, x2: 194, y: 285 },
  { x1: 71, x2: 194, y: 250 },
  { x1: 71, x2: 194, y: 215 },
  { x1: 71, x2: 194, y: 185 },
  { x1: 96, x2: 169, y: 155 },
  { x1: 96, x2: 169, y: 128 },
  { x1: 121, x2: 144, y: 90 },
  { x1: 121, x2: 144, y: 65 },
];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function Loader({ onFinish }) {
  const [percent, setPercent] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduce-motion: reduce), (prefers-reduced-motion: reduce)").matches
  ).current;

  // Crawl toward 92% on its own — the last stretch waits for the real page.
  useEffect(() => {
    const start = performance.now();
    const crawlMs = reducedMotion ? 400 : 2200;
    let raf;

    const tick = (now) => {
      const t = Math.min((now - start) / crawlMs, 1);
      setPercent((p) => Math.max(p, Math.round(easeOutCubic(t) * 92)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  // Track the real page load, independent of the brand animation.
  useEffect(() => {
    if (document.readyState === "complete") {
      setPageLoaded(true);
      return;
    }
    const handleLoad = () => setPageLoaded(true);
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Once the page is actually ready, finish the last stretch and exit.
  useEffect(() => {
    if (!pageLoaded) return;
    const start = performance.now();
    const from = percent;
    const finishMs = 350;
    let raf;

    const tick = (now) => {
      const t = Math.min((now - start) / finishMs, 1);
      setPercent(Math.round(from + (100 - from) * easeOutCubic(t)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        const exitDelay = setTimeout(() => setExiting(true), 300);
        return () => clearTimeout(exitDelay);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageLoaded]);

  // Call onFinish once the exit transition has actually played out.
  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onFinish?.(), 700);
    return () => clearTimeout(t);
  }, [exiting, onFinish]);

  return (
    <motion.div
      className="loader"
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.03 : 1 }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="loader__grid" />

      <div className="loader__reg loader__reg--tl" />
      <div className="loader__reg loader__reg--tr" />
      <div className="loader__reg loader__reg--bl" />
      <div className="loader__reg loader__reg--br" />

      <div className="loader__stage">
        <svg className="loader__blueprint" viewBox="0 0 240 320" fill="none">
          <motion.path
            d={TOWER_PATH}
            stroke="var(--gold)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.4 : 1.5, ease: [0.65, 0, 0.35, 1] }}
          />
          {FLOOR_LINES.map((l, i) => (
            <motion.line
              key={i}
              x1={l.x1}
              x2={l.x2}
              y1={l.y}
              y2={l.y}
              stroke="var(--gold-dim)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: reducedMotion ? 0.2 : 1.1 + i * 0.09,
                ease: "easeOut",
              }}
            />
          ))}
          {/* foundation hatching beneath the ground line */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <motion.line
              key={`hatch-${i}`}
              x1={40 + i * 16}
              y1={300}
              x2={32 + i * 16}
              y2={310}
              stroke="var(--gold-dim)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: reducedMotion ? 0.2 : 1.6 + i * 0.02 }}
            />
          ))}
        </svg>

        <motion.div
          className="loader__mark"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reducedMotion ? 0.3 : 1.9, ease: "easeOut" }}
        >
          <span className="loader__logotype">AS</span>
          <span className="loader__tagline">Built on Trust — Delivered with Precision</span>
        </motion.div>

        <motion.div
          className="loader__scale"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reducedMotion ? 0.4 : 2.1 }}
        >
          <div className="loader__scale-track">
            <div className="loader__scale-ticks">
              {Array.from({ length: 21 }).map((_, i) => (
                <span key={i} className={i % 5 === 0 ? "tick tick--major" : "tick"} />
              ))}
            </div>
            <motion.div
              className="loader__scale-marker"
              style={{ left: `${percent}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            />
          </div>
          <div className="loader__percent">
            <span>{String(percent).padStart(2, "0")}</span>
            <span className="loader__percent-sign">%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}