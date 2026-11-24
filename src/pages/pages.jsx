import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useSite } from "../content/SiteContent";
import { getProject, resolveAssetUrl } from "../services/api";
import Hero from "../components/Hero";
import PageHero from "../components/PageHero";
import ContactForm from "../components/ContactForm";
import { Img, Reveal, Parallax, SectionHead, Arrow, EASE } from "../components/primitives";
import {
  Intro, Stats, ServicesGrid, Sectors, ProjectsCarousel, ProjectCard, Process, AboutSplit, Testimonials, CtaBand, useServices
} from "../components/sections";
import { GalleryPreview, VideosStrip, VideoTile, Lightbox, useGallery } from "../components/gallery";

const SITE_ORIGIN = "https://aarnavstructura.in";

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/**
 * Per-page title, description, canonical URL and social-share preview.
 * Text comes from the dashboard content, so it stays in sync with the page.
 */
function useTitle(title, description, image) {
  const { content } = useSite();
  const { pathname } = useLocation();
  useEffect(() => {
    const brand = content.brand.companyName;
    const fullTitle = title ? `${title} — ${brand}` : content.seo.title;
    const desc = String(description || content.seo.description || "").replace(/\s+/g, " ").trim().slice(0, 160);
    const url = SITE_ORIGIN + (pathname === "/" ? "/" : pathname.replace(/\/$/, ""));
    const img = image ? resolveAssetUrl(image) : "/brand/og-image.jpg";
    const absImg = img.startsWith("http") ? img : SITE_ORIGIN + img;

    document.title = fullTitle;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", absImg);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", absImg);
    let canon = document.head.querySelector("link[rel='canonical']");
    if (!canon) {
      canon = document.createElement("link");
      canon.rel = "canonical";
      document.head.appendChild(canon);
    }
    canon.href = url;
    setMeta("name", "robots", title === "Page not found" ? "noindex" : "index, follow");
  }, [title, description, image, pathname, content]);
}

/* ---------------- Home ---------------- */
export function Home() {
  useTitle("");
  return (
    <>
      <Hero />
      <Intro />
      <ServicesGrid />
      <ProjectsCarousel />
      <GalleryPreview />
      <VideosStrip />
      <Sectors />
      <AboutSplit showValues={false} />
      <Process />
      <Testimonials />
      <CtaBand />
    </>
  );
}

/* ---------------- About ---------------- */
export function About() {
  const { content, team } = useSite();
  const h = content.pageHeaders;
  useTitle(h.aboutTitle, content.about.body || content.intro.body, h.aboutImage);
  return (
    <>
      <PageHero title={h.aboutTitle} image={h.aboutImage} lede={content.intro.body} crumbs={[{ label: h.aboutTitle }]} />
      <AboutSplit />
      <section className="section section--ink">
        <div className="wrap">
          <Reveal><span className="eyebrow">By the numbers</span></Reveal>
          <Stats items={content.stats.items} />
        </div>
      </section>
      <Process />
      {team.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead eyebrow="Leadership" title="The people responsible">
              <Link to="/team" className="link-arrow">Full team <Arrow /></Link>
            </SectionHead>
            <TeamGrid members={team.slice(0, 4)} />
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}

/* ---------------- What we do ---------------- */
export function WhatWeDo() {
  const { content } = useSite();
  const services = useServices();
  const h = content.pageHeaders;
  const w = content.whatWeDo;
  useTitle(h.whatWeDoTitle, `${w.heading}. ${w.intro}`, h.whatWeDoImage);
  useEffect(() => {
    if (window.location.hash === "#sectors") setTimeout(() => document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" }), 400);
  }, []);
  return (
    <>
      <PageHero title={h.whatWeDoTitle} image={h.whatWeDoImage} lede={w.intro} crumbs={[{ label: h.whatWeDoTitle }]} />
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={w.eyebrow} title={w.heading} />
          {!services.length && <p className="lede">Our services will be listed here soon.</p>}
          <div className="svc-rows">
            {services.map((s, i) => (
              <div className="svc-row" key={s._id || i}>
                <Reveal><Parallax src={s.img} alt={s.title} className="svc-row__media" /></Reveal>
                <Reveal delay={0.1}>
                  <span className="svc-row__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="h-lg">{s.title}</h3>
                  <p className="lede">{s.description}</p>
                  <div style={{ marginTop: 32 }}>
                    <Link to="/contact" className="link-arrow">Discuss your project <Arrow /></Link>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Sectors />
      <Process />
      <CtaBand />
    </>
  );
}

/* ---------------- Projects list ---------------- */
export function Projects() {
  const { content, projects, ready } = useSite();
  const h = content.pageHeaders;
  useTitle(h.projectsTitle, `Residential and commercial projects designed and built by ${content.brand.companyName} across Karnataka.`, h.projectsImage);
  const cats = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))], [projects]);
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  return (
    <>
      <PageHero title={h.projectsTitle} image={h.projectsImage} crumbs={[{ label: h.projectsTitle }]} />
      <section className="section">
        <div className="wrap">
          {cats.length > 2 && (
            <div className="filters" role="tablist">
              {cats.map((c) => (
                <button key={c} className={`chip ${c === cat ? "is-active" : ""}`} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
          )}
          {ready && !list.length && <p className="lede">Projects will appear here soon.</p>}
          <motion.div className="pgrid" layout>
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.div key={p._id || p.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.6, ease: EASE }}>
                  <ProjectCard p={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ---------------- Project detail ---------------- */
export function ProjectDetail() {
  const { id } = useParams();
  const { projects, content } = useSite();
  const [p, setP] = useState(() => projects.find((x) => (x._id || x.id) === id) || null);
  const [missing, setMissing] = useState(false);
  const [lb, setLb] = useState(-1);
  useTitle(p?.title || "Project", p ? [p.brief || p.description, p.location, p.category].filter(Boolean).join(" · ") : "", p?.cover_image || p?.image);

  useEffect(() => {
    let alive = true;
    setMissing(false);
    getProject(id)
      .then((d) => alive && (d ? setP(d) : setMissing(true)))
      .catch(() => alive && setMissing(true));
    return () => { alive = false; };
  }, [id]);

  const media = useMemo(() => (p?.media || []).filter((m) => m?.url), [p]);

  useEffect(() => {
    if (lb < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLb(-1);
      if (e.key === "ArrowRight") setLb((v) => (v + 1) % media.length);
      if (e.key === "ArrowLeft") setLb((v) => (v - 1 + media.length) % media.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => { window.removeEventListener("keydown", onKey); document.body.classList.remove("no-scroll"); };
  }, [lb, media.length]);

  if (missing && !p) return <NotFound />;
  if (!p) return <div style={{ minHeight: "100vh", background: "var(--ink)" }} />;

  const idx = projects.findIndex((x) => (x._id || x.id) === id);
  const next = projects.length > 1 ? projects[(idx + 1) % projects.length] : null;
  const meta = [["Location", p.location], ["Category", p.category], ["Area", p.area_sqft && `${p.area_sqft} sq.ft`], ["Year", p.year]].filter(([, v]) => v);
  const videoEmbed = toEmbed(p.video_url);

  return (
    <>
      <PageHero title={p.title} image={p.cover_image || p.image || content.pageHeaders.projectsImage} crumbs={[{ label: "Projects", to: "/projects" }, { label: p.title }]} />
      <section className="section">
        <div className="wrap">
          {meta.length > 0 && (
            <Reveal className="pd-meta" style={{ gridTemplateColumns: `repeat(${Math.min(meta.length, 4)}, 1fr)` }}>
              {meta.map(([k, v]) => <div key={k}><small>{k}</small><strong>{v}</strong></div>)}
            </Reveal>
          )}
          <div className="pd-body">
            <Reveal>
              <span className="eyebrow">Overview</span>
              {p.brief && <p className="lede" style={{ marginTop: 20 }}>{p.brief}</p>}
            </Reveal>
            <Reveal delay={0.1} className="prose">
              {p.description && p.description !== p.brief && <p>{p.description}</p>}
              {p.detailed_plan && <p>{p.detailed_plan}</p>}
            </Reveal>
          </div>

          {videoEmbed && (
            <Reveal style={{ marginTop: 80, aspectRatio: "16/9" }}>
              {videoEmbed.type === "iframe" ? (
                <iframe src={videoEmbed.src} title={p.title} style={{ width: "100%", height: "100%", border: 0 }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              ) : (
                <video src={videoEmbed.src} controls style={{ width: "100%", height: "100%", background: "#000" }} />
              )}
            </Reveal>
          )}

          {media.length > 0 && (
            <div style={{ marginTop: "clamp(64px, 8vw, 120px)" }}>
              <SectionHead eyebrow="Gallery" title="On site" titleClass="h-md" />
              <div className="gallery">
                {media.map((m, i) => (
                  <Reveal key={i} className="gallery__item" delay={(i % 3) * 0.06} onClick={() => setLb(i)}>
                    {m.type === "video" ? <video src={resolveAssetUrl(m.url)} muted playsInline preload="metadata" /> : <Img src={m.url} alt={m.name || p.title} />}
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {(p.documents || []).length > 0 && (
            <div style={{ marginTop: 96, maxWidth: 760 }}>
              <span className="eyebrow">Documents</span>
              <div className="docs" style={{ marginTop: 24 }}>
                {p.documents.map((d, i) => (
                  <a key={i} href={resolveAssetUrl(d.url)} target="_blank" rel="noreferrer">
                    <span>{d.name || `Document ${i + 1}`}</span><span>{d.size} ↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {next && (next._id || next.id) !== id && (
            <Reveal style={{ marginTop: 120, borderTop: "1px solid var(--line)", paddingTop: 40, display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", alignItems: "end" }}>
              <div>
                <span className="eyebrow">Next project</span>
                <h3 className="h-lg" style={{ marginTop: 14 }}>{next.title}</h3>
              </div>
              <Link className="btn-block btn-block--maroon btn-block--sm" to={`/projects/${next._id || next.id}`}>View project</Link>
            </Reveal>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lb >= 0 && media[lb] && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLb(-1)}>
            <button className="icon-square lightbox__close" aria-label="Close"><FiX size={22} /></button>
            {media.length > 1 && (
              <>
                <button className="sq-btn lightbox__prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + media.length) % media.length); }}><Arrow dir="left" /></button>
                <button className="sq-btn lightbox__next" aria-label="Next" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % media.length); }}><Arrow /></button>
              </>
            )}
            <motion.div key={lb} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} onClick={(e) => e.stopPropagation()}>
              {media[lb].type === "video" ? <video src={resolveAssetUrl(media[lb].url)} controls autoPlay /> : <img src={resolveAssetUrl(media[lb].url)} alt="" />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <CtaBand />
    </>
  );
}

function toEmbed(url) {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { type: "iframe", src: `https://www.youtube-nocookie.com/embed/${yt[1]}` };
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return { type: "iframe", src: `https://player.vimeo.com/video/${vm[1]}` };
  return { type: "video", src: resolveAssetUrl(url) };
}

/* ---------------- Gallery ---------------- */
export function GalleryPage() {
  const { content, ready } = useSite();
  const h = content.pageHeaders;
  const g = content.gallerySection;
  useTitle(h.galleryTitle, `${g.heading}. ${g.intro}`, h.galleryImage);
  const { photos, videos } = useGallery();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "videos" && videos.length ? "videos" : "photos";
  const cats = useMemo(() => ["All", ...Array.from(new Set(photos.map((p) => p.category).filter(Boolean)))], [photos]);
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? photos : photos.filter((p) => p.category === cat);
  const [open, setOpen] = useState(-1);
  const list = tab === "videos" ? videos : shown;

  return (
    <>
      <PageHero title={h.galleryTitle} image={h.galleryImage} lede={g.intro} crumbs={[{ label: h.galleryTitle }]} />
      <section className="section">
        <div className="wrap">
          <div className="gtabs" role="tablist">
            <button role="tab" aria-selected={tab === "photos"} className={tab === "photos" ? "is-active" : ""} onClick={() => { setOpen(-1); setParams({}); }}>
              Photos <small>{photos.length}</small>
            </button>
            {videos.length > 0 && (
              <button role="tab" aria-selected={tab === "videos"} className={tab === "videos" ? "is-active" : ""} onClick={() => { setOpen(-1); setParams({ tab: "videos" }); }}>
                Videos <small>{videos.length}</small>
              </button>
            )}
          </div>

          {tab === "photos" ? (
            <>
              {cats.length > 2 && (
                <div className="filters">
                  {cats.map((c) => (
                    <button key={c} className={`chip ${c === cat ? "is-active" : ""}`} onClick={() => setCat(c)}>{c}</button>
                  ))}
                </div>
              )}
              {ready && !shown.length && <p className="lede">Photos will appear here soon.</p>}
              <div className="masonry">
                {shown.map((p, i) => (
                  <Reveal key={p._id || p.image} className="masonry__item" delay={(i % 3) * 0.06} y={30}>
                    <button type="button" onClick={() => setOpen(i)}>
                      <Img src={p.image} alt="" sizes="(max-width: 700px) 100vw, 33vw" />
                      <span className="masonry__cap">{p.title}</span>
                    </button>
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="vgrid">
              {videos.map((v, i) => (
                <Reveal key={v._id || v.image} delay={(i % 4) * 0.06}>
                  <VideoTile item={v} onOpen={() => setOpen(i)} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <AnimatePresence>{open >= 0 && <Lightbox items={list} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}</AnimatePresence>
      <CtaBand />
    </>
  );
}

/* ---------------- Team ---------------- */
function TeamGrid({ members }) {
  return (
    <div className="team">
      {members.map((m, i) => (
        <Reveal key={m._id || i} className="member" delay={(i % 4) * 0.08}>
          <div className="member__photo"><Img src={m.photo} alt={m.name} sizes="(max-width: 520px) 100vw, 25vw" /></div>
          <h3 className="h-sm">{m.name}</h3>
          <div className="member__role">{m.role}</div>
          {(() => {
            // the backend copies role into designation when it's left empty — don't repeat it
            const info = [m.designation !== m.role ? m.designation : "", m.experience].filter(Boolean).join(" · ");
            return info ? <p className="member__info">{info}</p> : null;
          })()}
        </Reveal>
      ))}
    </div>
  );
}

export function Team() {
  const { content, team, ready } = useSite();
  const h = content.pageHeaders;
  useTitle(h.teamTitle, `Meet the engineers and architects behind ${content.brand.companyName}.`, h.teamImage);
  return (
    <>
      <PageHero title={h.teamTitle} image={h.teamImage} crumbs={[{ label: h.teamTitle }]} />
      <section className="section">
        <div className="wrap">
          {ready && !team.length ? <p className="lede">Team profiles coming soon.</p> : <TeamGrid members={team} />}
          {team.some((m) => m.bio) && (
            <div className="values" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              {team.filter((m) => m.bio).map((m, i) => (
                <Reveal key={i} className="value" delay={i * 0.06}>
                  <b>{m.name}</b>
                  <p style={{ marginTop: 10 }}>{m.bio}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const { content } = useSite();
  const c = content.contact;
  const h = content.pageHeaders;
  useTitle(h.contactTitle, `${c.text} ${[c.phone, c.email, c.address].filter(Boolean).join(" · ")}`, h.contactImage);
  const tel = (c.phone || "").replace(/\s/g, "");
  const wa = (c.whatsapp || "").replace(/\D/g, "");
  return (
    <>
      <PageHero title={h.contactTitle} image={h.contactImage} lede={c.text} crumbs={[{ label: h.contactTitle }]} />
      <section className="section">
        <div className="wrap">
          <div className="contact">
            <Reveal>
              <span className="eyebrow">Reach us</span>
              <h2 className="h-lg" style={{ marginTop: 18 }}>{c.heading}</h2>
              <div className="contact__list">
                {c.phone && <div><small>Phone</small><a href={`tel:${tel}`}>{c.phone}</a></div>}
                {wa && <div><small>WhatsApp</small><a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">{c.whatsapp}</a></div>}
                {c.email && <div><small>Email</small><a href={`mailto:${c.email}`}>{c.email}</a></div>}
                {c.address && <div><small>Office</small><p>{c.address}</p></div>}
                {c.hours && <div><small>Hours</small><p>{c.hours}</p></div>}
              </div>
            </Reveal>
            <Reveal delay={0.1}><ContactForm /></Reveal>
          </div>
          {c.mapEmbedUrl && <MapEmbed url={c.mapEmbedUrl} address={c.address} />}
        </div>
      </section>
    </>
  );
}

/** Google Map that loads only when asked: keeps ~300 KB of Google scripts (and tracking) off the page until needed. */
function MapEmbed({ url, address }) {
  const [show, setShow] = useState(false);
  if (show) return <iframe className="map" src={url} title="Office location" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />;
  const search = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || "")}`;
  return (
    <div className="map map-facade">
      <div className="map-facade__in">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.6" /></svg>
        {address && <p>{address}</p>}
        <div className="map-facade__actions">
          <button type="button" className="btn-block btn-block--maroon btn-block--sm" onClick={() => setShow(true)}>Show map</button>
          {address && <a className="link-arrow" href={search} target="_blank" rel="noreferrer">Open in Google Maps <Arrow /></a>}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 404 ---------------- */
export function NotFound() {
  useTitle("Page not found");
  return (
    <section className="section--ink notfound">
      <div>
        <div className="h-xl" style={{ color: "var(--maroon-bright)" }}>404</div>
        <p className="lede" style={{ margin: "20px auto 40px" }}>This page doesn't exist — it may have moved.</p>
        <Link to="/" className="btn-block btn-block--sm">Back to home</Link>
      </div>
    </section>
  );
}
