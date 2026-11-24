import { createContext, useContext, useEffect, useState } from "react";
import { getContent, getProjects, getServices, getTeam, getTestimonials, getGallery, resolveAssetUrl } from "../services/api";
import { CONTENT_DEFAULTS, GALLERY_DEFAULTS, mergeWithDefaults } from "./defaults";

const SiteContext = createContext(null);

const CACHE_KEY = "as_site_cache_v1";
// How long a first-time visitor sees the splash before we fall back to defaults
// (the backend can take up to a minute to wake up on Render's free plan).
const SPLASH_MAX_MS = 2500;

const mergeContent = (content) => {
  const out = {};
  for (const k of Object.keys(CONTENT_DEFAULTS)) out[k] = mergeWithDefaults(CONTENT_DEFAULTS[k], content?.[k]);
  return out;
};

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw);
    return c && c.content ? c : null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ...data, at: Date.now() }));
  } catch {
    /* storage full or blocked — the site still works without it */
  }
}

/** Try once, and once more after a short pause (covers a backend that is still waking up). */
async function withRetry(fn) {
  try {
    return await fn();
  } catch {
    await new Promise((r) => setTimeout(r, 2000));
    try {
      return await fn();
    } catch {
      return null;
    }
  }
}

function initialState() {
  const cached = readCache();
  if (cached) {
    // Returning visitor: show the last content we saw from the dashboard right away
    return {
      ready: false,
      hasData: true,
      content: mergeContent(cached.content),
      projects: cached.projects || [],
      services: cached.services || [],
      servicesFailed: false,
      team: cached.team || [],
      testimonials: cached.testimonials || [],
      gallery: cached.gallery || GALLERY_DEFAULTS
    };
  }
  return {
    ready: false,
    hasData: false,
    content: mergeContent(null),
    projects: [],
    services: [],
    servicesFailed: false,
    team: [],
    testimonials: [],
    gallery: GALLERY_DEFAULTS
  };
}

export function SiteContentProvider({ children }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let alive = true;
    let loading = false;
    let lastLoad = 0;
    let lastJson = "";
    let retryTimer = null;
    let retries = 0;

    // First visit with a slow backend: stop the splash and show defaults until data arrives
    const splashTimer = setTimeout(() => alive && setState((s) => (s.hasData ? s : { ...s, hasData: true })), SPLASH_MAX_MS);

    const load = async (isRefresh) => {
      if (loading) return;
      loading = true;
      const [content, projects, services, team, testimonials, gallery] = await Promise.all(
        [getContent, getProjects, getServices, getTeam, getTestimonials, getGallery].map(withRetry)
      );
      loading = false;
      if (!alive) return;
      // Couldn't reach the server (asleep, network hiccup): keep trying for ~2 minutes
      if (!content && retries < 8) {
        retries += 1;
        clearTimeout(retryTimer);
        retryTimer = setTimeout(() => load(true), 15000);
      }
      if (content) retries = 0;
      // A background refresh that couldn't reach the server keeps what is on screen
      if (isRefresh && !content) return;
      lastLoad = Date.now();
      clearTimeout(splashTimer);

      const data = {
        projects: projects || [],
        services: services || [],
        team: team || [],
        testimonials: testimonials || [],
        // API down → built-in gallery; API up → exactly what the dashboard holds
        gallery: gallery || GALLERY_DEFAULTS
      };
      const json = JSON.stringify([content, data]);
      if (isRefresh && json === lastJson) return; // nothing changed in the dashboard
      lastJson = json;

      setState({
        ready: true,
        hasData: true,
        content: mergeContent(content),
        ...data,
        // true only when the API could not be reached (then the site shows built-in samples)
        servicesFailed: services === null
      });
      // Remember what the dashboard currently says, for an instant next visit
      if (content) writeCache({ content, ...data });
    };

    load(false);

    // Coming back to this tab (e.g. after editing in the dashboard) re-checks for changes
    const onVisible = () => {
      if (document.visibilityState === "visible" && Date.now() - lastLoad > 5000) load(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);

    return () => {
      alive = false;
      clearTimeout(splashTimer);
      clearTimeout(retryTimer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, []);

  // Keep favicon and default <title>/<meta description> in sync with the dashboard
  useEffect(() => {
    if (!state.hasData) return;
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
  }, [state.hasData, state.content]);

  return <SiteContext.Provider value={state}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteContentProvider");
  return ctx;
}
