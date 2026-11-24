import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion, animate } from "framer-motion";
import { resolveAssetUrl } from "../services/api";

export const EASE = [0.22, 1, 0.36, 1];

/** Image that resolves dashboard ids/paths and fades in once loaded. */
export function Img({ src, alt = "", className = "", eager = false, ...rest }) {
  const [loaded, setLoaded] = useState(false);
  const url = resolveAssetUrl(src);
  if (!url) return null;
  return (
    <img
      src={url}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
      onLoad={() => setLoaded(true)}
      ref={(el) => el?.complete && el.naturalWidth && !loaded && setLoaded(true)}
      className={`img-fade ${loaded ? "is-loaded" : ""} ${className}`}
      {...rest}
    />
  );
}

/** Fade + rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 40, as = "div", className, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Image inside a frame that drifts slightly against the scroll. */
export function Parallax({ src, alt, className, amount = 12 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, "0%"]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y, height: "100%" }}>
        <Img src={src} alt={alt} style={{ width: "100%", height: `${100 + amount}%`, objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}

/** Counts up from 0 when visible. Keeps non-numeric values as-is. */
export function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const target = parseFloat(String(value).replace(/,/g, ""));
  const isNum = Number.isFinite(target);
  const [shown, setShown] = useState(isNum ? 0 : value);

  useEffect(() => {
    if (!inView || !isNum) return;
    const c = animate(0, target, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setShown(Number.isInteger(target) ? Math.round(v).toLocaleString("en-IN") : v.toFixed(1))
    });
    return () => c.stop();
  }, [inView, isNum, target]);

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

/** Large statement whose words light up as you scroll past it. */
export function ScrollStatement({ text, className = "statement" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = String(text || "").split(/\s+/).filter(Boolean);
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={reduce}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, still }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span className="w" style={{ opacity: still ? 1 : opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}

export const Arrow = ({ size = 16, dir = "right" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M2 10h15M11 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
  </svg>
);

/** Section header: eyebrow + big title on the left, optional action on the right. */
export function SectionHead({ eyebrow, title, children, titleClass = "h-lg" }) {
  return (
    <div className="sec-head">
      <Reveal>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className={titleClass}>{title}</h2>
      </Reveal>
      {children && <Reveal delay={0.1}>{children}</Reveal>}
    </div>
  );
}
