import { createContext, useContext, useEffect, useState } from "react";
import { getContent, getProjects, getServices, getTeam, getTestimonials, getGallery, resolveAssetUrl } from "../services/api";
import { CONTENT_DEFAULTS, GALLERY_DEFAULTS, mergeWithDefaults } from "./defaults";

const SiteContext = createContext(null);

const fallbackContent = () =>
  Object.fromEntries(Object.keys(CONTENT_DEFAULTS).map((k) => [k, CONTENT_DEFAULTS[k]]));

export function SiteContentProvider({ children }) {
  const [state, setState] = useState({
    ready: false,
    content: fallbackContent(),
    projects: [],
    services: [],
    team: [],
    testimonials: [],
    gallery: GALLERY_DEFAULTS
  });

  useEffect(() => {
    let alive = true;
    const safe = (p) => p.catch(() => null);

    Promise.all([safe(getContent()), safe(getProjects()), safe(getServices()), safe(getTeam()), safe(getTestimonials()), safe(getGallery())]).then(
      ([content, projects, services, team, testimonials, gallery]) => {
        if (!alive) return;
        const merged = fallbackContent();
        if (content) for (const k of Object.keys(merged)) merged[k] = mergeWithDefaults(CONTENT_DEFAULTS[k], content[k]);
        setState({
          ready: true,
          content: merged,
          projects: projects || [],
          services: services || [],
          // true only when the API could not be reached (then the site shows built-in samples)
          servicesFailed: services === null,
          team: team || [],
          testimonials: testimonials || [],
          // API down → built-in gallery; API up → exactly what the dashboard holds
          gallery: gallery || GALLERY_DEFAULTS
        });
      }
    );
    return () => {
      alive = false;
    };
  }, []);

  // Keep favicon and default <title>/<meta description> in sync with the dashboard
  useEffect(() => {
    if (!state.ready) return;
    const { brand, seo } = state.content;
    if (brand?.favicon) {
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = resolveAssetUrl(brand.favicon);
    }
    if (seo?.description) document.querySelector("meta[name='description']")?.setAttribute("content", seo.description);
  }, [state.ready, state.content]);

  return <SiteContext.Provider value={state}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteContentProvider");
  return ctx;
}
