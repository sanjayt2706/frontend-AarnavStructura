import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSite } from "../content/SiteContent";
import { resolveAssetUrl } from "../services/api";
import { Img, EASE } from "./primitives";

const isInternal = (href = "") => href.startsWith("/");

export default function Hero() {
  const { content } = useSite();
  const { hero, brand } = content;
  const slides = (hero.slides || []).filter((s) => s && (s.image || s.video || s.title));
  const duration = Math.max(3, Number(hero.intervalSeconds) || 7);
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabsRef = useRef(null);

  const go = useCallback((i) => setIndex(((i % slides.length) + slides.length) % slides.length), [slides.length]);

  // Auto-advance; pause while the tab is hidden
  useEffect(() => {
    if (slides.length < 2 || paused || reduce) return;
    const t = setTimeout(() => go(index + 1), duration * 1000);
    return () => clearTimeout(t);
  }, [index, paused, duration, slides.length, go, reduce]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Keep the active tab visible on small screens
  useEffect(() => {
    const el = tabsRef.current?.children[index];
    if (el && tabsRef.current.scrollWidth > tabsRef.current.clientWidth) {
      tabsRef.current.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
    }
  }, [index]);

  // Preload the next background
  useEffect(() => {
    const next = slides[(index + 1) % slides.length];
    if (next?.image) new Image().src = resolveAssetUrl(next.image);
  }, [index, slides]);

  if (!slides.length) return null;
  const s = slides[index];
  const lines = String(s.title || "").split(/\n|\|/).filter(Boolean);
  const Button = isInternal(s.buttonLink) ? Link : "a";
  const btnProps = isInternal(s.buttonLink) ? { to: s.buttonLink } : { href: s.buttonLink || "#", target: "_blank", rel: "noreferrer" };

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Highlights">
      <div className="hero__bg">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <motion.div
              style={{ position: "absolute", inset: 0 }}
              initial={reduce ? false : { scale: 1.14 }}
              animate={{ scale: 1 }}
              transition={{ duration: duration + 2, ease: "linear" }}
            >
              {s.video ? (
                <video src={resolveAssetUrl(s.video)} poster={resolveAssetUrl(s.image) || undefined} autoPlay muted loop playsInline />
              ) : (
                <Img src={s.image} alt="" eager />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="hero__shade" />
      </div>

      <div className="hero__count" aria-hidden="true">
        <b>{String(index + 1).padStart(2, "0")}</b> / {String(slides.length).padStart(2, "0")}
      </div>

      <div className="wrap hero__content">
        <AnimatePresence mode="wait">
          <motion.div key={index} exit={{ opacity: 0, y: -24, transition: { duration: 0.35, ease: "easeIn" } }}>
            <h1 className="hero__title">
              {lines.map((ln, i) => (
                <span className="ln" key={i}>
                  <motion.span initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.1 }}>
                    {ln}
                  </motion.span>
                </span>
              ))}
            </h1>
            {s.subtitle && (
              <motion.p className="hero__sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}>
                {s.subtitle}
              </motion.p>
            )}
            {s.buttonLabel && (
              <motion.div className="hero__cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}>
                <Button className="btn-block" {...btnProps}>
                  {s.buttonLabel}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <div className="hero__tabs">
          <div className="wrap">
            <div className="hero__tabs-in" ref={tabsRef} role="tablist">
              {slides.map((sl, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  className={`hero__tab ${sl.isBrandTab ? "hero__tab--brand" : ""} ${i === index ? "is-active" : ""}`}
                  onClick={() => go(i)}
                  onMouseEnter={() => i === index && setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  {i === index && (
                    <span className="hero__bar">
                      <motion.span
                        key={`${index}-${paused}`}
                        initial={{ scaleX: paused || reduce ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: paused || reduce ? 0 : duration, ease: "linear" }}
                      />
                    </span>
                  )}
                  {sl.isBrandTab ? <Img src="/brand/mark-white.png" alt={sl.tab || brand.companyName} /> : sl.tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
