import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Img, EASE } from "./primitives";

export default function PageHero({ title, image, lede, crumbs = [] }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section className="phero" ref={ref}>
      <motion.div className="phero__bg" style={{ y: reduce ? 0 : y }} initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: EASE }}>
        <Img src={image} alt="" eager />
      </motion.div>
      <div className="phero__shade" />
      <div className="wrap phero__in">
        <motion.div className="phero__crumbs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              {" / "}
              {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
            </span>
          ))}
        </motion.div>
        <h1 style={{ overflow: "hidden" }}>
          <motion.span style={{ display: "inline-block" }} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}>
            {title}
          </motion.span>
        </h1>
        {lede && (
          <motion.p className="phero__lede" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease: EASE }}>
            {lede}
          </motion.p>
        )}
      </div>
    </section>
  );
}
