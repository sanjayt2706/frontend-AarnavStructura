import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useScroll, useTransform, animate, useReducedMotion } from "framer-motion";
import { useSite } from "../content/SiteContent";
import { Img, Reveal, Counter, ScrollStatement, Parallax, SectionHead, Arrow, EASE } from "./primitives";

const isInternal = (href = "") => href.startsWith("/");
export function SmartLink({ to = "", className, children }) {
  return isInternal(to) ? (
    <Link to={to} className={className}>{children}</Link>
  ) : (
    <a href={to || "#"} className={className} target="_blank" rel="noreferrer">{children}</a>
  );
}

const FALLBACK_SERVICES = [
  { title: "Architectural Planning & 3D Design", description: "Custom floor plans, elevations, sanction drawings and 3D walkthroughs." },
  { title: "Structural Engineering & RCC Detailing", description: "IS 456 / IS 1893 seismic framing, slab and beam design, stability certificates." },
  { title: "Turnkey Construction & Execution", description: "End-to-end construction from excavation to handover with milestone billing." },
  { title: "Project Management & BOQ Estimation", description: "Itemised BOQs, site supervision, cube testing and progress reports." }
];

/** Services from the dashboard, each with an image (its own, or a fallback). */
export function useServices() {
  const { services, servicesFailed, content } = useSite();
  // Show exactly what the dashboard holds; samples only if the API is unreachable
  const list = servicesFailed ? FALLBACK_SERVICES : services;
  const fb = content.whatWeDo.fallbackImages || [];
  return list.map((s, i) => ({ ...s, img: s.image || (fb.length ? fb[i % fb.length] : "") }));
}

/* ---------------- Intro + stats ---------------- */
export function Intro({ showStats = true }) {
  const { content } = useSite();
  const { intro, stats } = content;
  return (
    <section className="section">
      <div className="wrap">
        <div className="intro">
          <div>
            <Reveal><span className="eyebrow">{intro.eyebrow}</span></Reveal>
            <ScrollStatement text={intro.statement} />
          </div>
          <div className="intro__side">
            <Reveal delay={0.1}>
              <p className="lede">{intro.body}</p>
              {intro.linkLabel && (
                <div style={{ marginTop: 28 }}>
                  <SmartLink to={intro.linkHref} className="link-arrow">{intro.linkLabel} <Arrow /></SmartLink>
                </div>
              )}
            </Reveal>
            {intro.image && (
              <Reveal delay={0.2}>
                <Parallax src={intro.image} alt="" className="intro__img" />
              </Reveal>
            )}
          </div>
        </div>
        {showStats && <Stats items={stats.items} />}
      </div>
    </section>
  );
}

export function Stats({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="stats">
      {items.map((s, i) => (
        <Reveal key={i} className="stat" delay={i * 0.08}>
          <div className="stat__num"><Counter value={s.value} suffix={s.suffix} /></div>
          <div className="stat__label">{s.label}</div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------- Services cards ---------------- */
export function ServicesGrid() {
  const { content } = useSite();
  const services = useServices();
  const w = content.whatWeDo;
  if (!services.length) return null;
  return (
    <section className="section section--ink">
      <div className="wrap">
        <SectionHead eyebrow={w.eyebrow} title={w.heading}>
          <p className="lede" style={{ marginBottom: 20 }}>{w.intro}</p>
          <Link to="/what-we-do" className="link-arrow">All services <Arrow /></Link>
        </SectionHead>
        <div className="svc-grid">
          {services.slice(0, 4).map((s, i) => (
            <Reveal key={s._id || i} delay={(i % 2) * 0.12}>
              <Link to="/what-we-do" className="svc">
                <div className="svc__media"><Img src={s.img} alt={s.title} /></div>
                <div className="svc__body">
                  <span className="svc__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="svc__title">{s.title}</h3>
                  <p className="svc__text">{s.description}</p>
                </div>
                <span className="svc__bar" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sectors (hover list + sticky image) ---------------- */
export function Sectors() {
  const { content } = useSite();
  const { sectors } = content;
  const items = sectors.items || [];
  const [active, setActive] = useState(0);
  if (!items.length) return null;
  const cur = items[Math.min(active, items.length - 1)];
  return (
    <section className="section section--ink" id="sectors" style={{ borderTop: "1px solid var(--line-light)" }}>
      <div className="wrap">
        <SectionHead eyebrow={sectors.eyebrow} title={sectors.heading} />
        <div className="sectors">
          <div className="sectors__list">
            {items.map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <button
                  className={`sectors__item ${i === active ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  <span>{s.name}</span>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="sectors__visual">
            <div className="sectors__frame">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ clipPath: "inset(0 0 0 100%)" }}
                  animate={{ clipPath: "inset(0 0 0 0%)" }}
                  exit={{ opacity: 0.999 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <motion.div style={{ height: "100%" }} initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: EASE }}>
                    <Img src={cur.image} alt={cur.name} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={active} className="sectors__caption" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                {cur.text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Project card + draggable carousel ---------------- */
export function ProjectCard({ p, onClickCapture }) {
  const id = p._id || p.id;
  return (
    <Link to={`/projects/${id}`} className="pcard" onClickCapture={onClickCapture} draggable="false">
      <div className="pcard__media">
        {p.category && <span className="pcard__tag">{p.category}</span>}
        <Img src={p.cover_image || p.image} alt={p.title} />
      </div>
      <div className="pcard__meta">
        <span>{p.location}</span>
        <span>{p.area_sqft ? `${p.area_sqft} sq.ft` : p.year}</span>
      </div>
      <h3 className="pcard__title">{p.title}</h3>
    </Link>
  );
}

export function ProjectsCarousel() {
  const { projects, content } = useSite();
  const ps = content.projectsSection;
  const featured = projects.filter((p) => p.is_featured || p.featured);
  const list = (featured.length >= 3 ? featured : projects).slice(0, 10);

  const viewport = useRef(null);
  const track = useRef(null);
  const x = useMotionValue(0);
  const [max, setMax] = useState(0);
  const [pos, setPos] = useState(0);
  const dragged = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setMax(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [list.length]);

  useEffect(() => x.on("change", (v) => setPos(max ? Math.min(1, Math.max(0, -v / max)) : 0)), [x, max]);

  const step = (dir) => {
    const card = track.current?.firstChild;
    const by = card ? card.getBoundingClientRect().width + 24 : 400;
    const next = Math.min(0, Math.max(-max, x.get() - dir * by));
    animate(x, next, { duration: 0.8, ease: EASE });
  };

  if (!list.length) return null;

  return (
    <section className="section" style={{ overflow: "hidden" }}>
      <div className="wrap">
        <SectionHead eyebrow={ps.eyebrow} title={ps.heading}>
          <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
            <div className="carousel__nav">
              <button className="sq-btn" onClick={() => step(-1)} disabled={pos <= 0.001} aria-label="Previous projects"><Arrow dir="left" /></button>
              <button className="sq-btn" onClick={() => step(1)} disabled={pos >= 0.999 || !max} aria-label="Next projects"><Arrow /></button>
            </div>
            <Link to={ps.linkHref || "/projects"} className="link-arrow">{ps.linkLabel} <Arrow /></Link>
          </div>
        </SectionHead>
        <div className="carousel" ref={viewport}>
          <motion.div
            className="carousel__track"
            ref={track}
            style={{ x }}
            drag={max ? "x" : false}
            dragConstraints={{ left: -max, right: 0 }}
            dragElastic={0.08}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={() => setTimeout(() => (dragged.current = false), 50)}
          >
            {list.map((p, i) => (
              <Reveal key={p._id || i} delay={Math.min(i, 3) * 0.08}>
                <ProjectCard p={p} onClickCapture={(e) => dragged.current && e.preventDefault()} />
              </Reveal>
            ))}
          </motion.div>
        </div>
        {max > 0 && (
          <div className="carousel__progress" aria-hidden="true">
            <span style={{ width: `${Math.max(8, pos * 100)}%` }} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Process (line draws on scroll) ---------------- */
export function Process() {
  const { content } = useSite();
  const { process } = content;
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const steps = process.steps || [];
  if (!steps.length) return null;
  const vertical = typeof window !== "undefined" && window.innerWidth <= 900;
  return (
    <section className="section section--ink">
      <div className="wrap">
        <SectionHead eyebrow={process.eyebrow} title={process.heading} />
        <div className="process" ref={ref} style={{ "--n": steps.length }}>
          <div className="process__line">
            <motion.span style={reduce ? undefined : vertical ? { scaleY: scale } : { scaleX: scale }} />
          </div>
          {steps.map((s, i) => (
            <Reveal key={i} className="process__step" delay={i * 0.08}>
              <div className="process__n">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="h-sm">{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About split ---------------- */
export function AboutSplit({ showValues = true }) {
  const { content } = useSite();
  const { about } = content;
  return (
    <section className="section">
      <div className="wrap">
        <div className="split">
          <Reveal><Parallax src={about.image} alt="" className="split__media" amount={14} /></Reveal>
          <div>
            <Reveal><span className="eyebrow">{about.eyebrow}</span></Reveal>
            <Reveal delay={0.08}><h2 className="h-lg">{about.heading}</h2></Reveal>
            <Reveal delay={0.16} className="prose">
              {String(about.body || "").split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)}
            </Reveal>
          </div>
        </div>
        {showValues && (about.values || []).length > 0 && (
          <div className="values">
            {about.values.map((v, i) => (
              <Reveal key={i} className="value" delay={i * 0.08}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <h3 className="h-sm">{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const { testimonials } = useSite();
  const [i, setI] = useState(0);
  if (!testimonials.length) return null;
  const t = testimonials[i % testimonials.length];
  const n = testimonials.length;
  return (
    <section className="section section--paper2">
      <div className="wrap">
        <Reveal><span className="eyebrow">Client voices</span></Reveal>
        <div className="quote" style={{ marginTop: 40 }}>
          <div className="quote__mark" aria-hidden="true">“</div>
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: EASE }}>
                <blockquote>{t.review}</blockquote>
                <div className="quote__who">
                  {t.image && <Img src={t.image} alt="" />}
                  <div>
                    <strong>{t.clientName}</strong>
                    <span>{[t.designation, t.company].filter(Boolean).join(", ")}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            {n > 1 && (
              <div className="quote__nav">
                <button className="sq-btn" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous testimonial"><Arrow dir="left" /></button>
                <button className="sq-btn" onClick={() => setI((i + 1) % n)} aria-label="Next testimonial"><Arrow /></button>
                <small>{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA band ---------------- */
export function CtaBand() {
  const { content } = useSite();
  const { cta } = content;
  return (
    <section className="cta">
      {cta.image && <div className="cta__bg"><Img src={cta.image} alt="" /></div>}
      <div className="wrap cta__in">
        <div>
          <Reveal><h2 className="h-xl">{cta.heading}</h2></Reveal>
          {cta.text && <Reveal delay={0.1}><p>{cta.text}</p></Reveal>}
        </div>
        {cta.buttonLabel && (
          <Reveal delay={0.2}>
            <SmartLink to={cta.buttonLink} className="btn-block">{cta.buttonLabel}</SmartLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
