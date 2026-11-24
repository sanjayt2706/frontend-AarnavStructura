import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiPlay } from "react-icons/fi";
import { useSite } from "../content/SiteContent";
import { resolveAssetUrl } from "../services/api";
import { Img, Reveal, SectionHead, Arrow, EASE } from "./primitives";

export const isVideo = (g) => g?.mediaType === "video" || /\.(mp4|webm|mov)(\?|$)/i.test(g?.image || "");

export function useGallery() {
  const { gallery } = useSite();
  return useMemo(() => {
    const items = (gallery || []).filter((g) => g && g.image);
    return { photos: items.filter((g) => !isVideo(g)), videos: items.filter(isVideo) };
  }, [gallery]);
}

/* ---------- full-screen viewer for photos and videos ---------- */
export function Lightbox({ items, index, onClose, onIndex }) {
  const n = items.length;
  const cur = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && n > 1) onIndex((index + 1) % n);
      if (e.key === "ArrowLeft" && n > 1) onIndex((index - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [index, n, onClose, onIndex]);

  if (!cur) return null;
  return (
    <motion.div className="lightbox" role="dialog" aria-label={cur.title || "Media viewer"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button className="icon-square lightbox__close" aria-label="Close" onClick={onClose}><FiX size={22} /></button>
      {n > 1 && (
        <>
          <button className="sq-btn lightbox__prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + n) % n); }}><Arrow dir="left" /></button>
          <button className="sq-btn lightbox__next" aria-label="Next" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % n); }}><Arrow /></button>
        </>
      )}
      <motion.figure key={index} className="lightbox__fig" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: EASE }} onClick={(e) => e.stopPropagation()}>
        {isVideo(cur) ? (
          <video src={resolveAssetUrl(cur.image)} poster={resolveAssetUrl(cur.poster) || undefined} controls autoPlay playsInline loop />
        ) : (
          <img src={resolveAssetUrl(cur.image)} alt={cur.title || ""} />
        )}
        <figcaption>
          <span>{cur.title}</span>
          <small>{String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</small>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

/* ---------- vertical video tile: plays muted while on screen ---------- */
export function VideoTile({ item, onOpen }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <button type="button" className="vtile" onClick={onOpen} aria-label={`Play ${item.title || "video"}`}>
      <video ref={ref} src={resolveAssetUrl(item.image)} poster={resolveAssetUrl(item.poster) || undefined} muted loop playsInline preload="metadata" />
      <span className="vtile__shade" />
      <span className="vtile__play"><FiPlay size={18} /></span>
      <span className="vtile__title">{item.title}</span>
    </button>
  );
}

/* ---------- home: photo mosaic ---------- */
export function GalleryPreview() {
  const { content } = useSite();
  const g = content.gallerySection;
  const { photos } = useGallery();
  const [open, setOpen] = useState(-1);
  const featured = photos.filter((p) => p.featured);
  const list = (featured.length >= 5 ? featured : photos).slice(0, 5);
  if (list.length < 3) return null;

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={g.eyebrow} title={g.heading}>
          {g.intro && <p className="lede" style={{ marginBottom: 20 }}>{g.intro}</p>}
          <Link to="/gallery" className="link-arrow">{g.linkLabel || "Open the gallery"} <Arrow /></Link>
        </SectionHead>
        <div className={`mosaic mosaic--${list.length}`}>
          {list.map((p, i) => (
            <Reveal key={p._id || p.image} delay={i * 0.07} className="mosaic__item">
              <button type="button" onClick={() => setOpen(i)}>
                <Img src={p.image} alt="" sizes="(max-width: 760px) 100vw, 50vw" />
                <span className="mosaic__cap">{p.category}<b>{p.title}</b></span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>{open >= 0 && <Lightbox items={list} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}</AnimatePresence>
    </section>
  );
}

/* ---------- home: walkthrough videos row ---------- */
export function VideosStrip() {
  const { content } = useSite();
  const g = content.gallerySection;
  const { videos } = useGallery();
  const [open, setOpen] = useState(-1);
  if (!videos.length) return null;
  return (
    <section className="section section--ink">
      <div className="wrap">
        <SectionHead eyebrow={g.videosEyebrow} title={g.videosHeading}>
          {g.videosIntro && <p className="lede" style={{ marginBottom: 20 }}>{g.videosIntro}</p>}
          <Link to="/gallery?tab=videos" className="link-arrow">All videos <Arrow /></Link>
        </SectionHead>
        <div className="vrow">
          {videos.slice(0, 4).map((v, i) => (
            <Reveal key={v._id || v.image} delay={i * 0.08}>
              <VideoTile item={v} onOpen={() => setOpen(i)} />
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>{open >= 0 && <Lightbox items={videos} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}</AnimatePresence>
    </section>
  );
}
