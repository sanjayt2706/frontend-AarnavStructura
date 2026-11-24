import axios from "axios";

const isLocal = typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);

/**
 * Where the backend lives.
 * - Deployed site: same domain ("/api/..."). vercel.json forwards /api/* to the
 *   Render backend, so browsers and privacy blockers (e.g. Brave Shields) see a
 *   first-party request and there is no cross-domain (CORS) step to fail.
 * - Local development: the backend on localhost:5000, or VITE_API_URL if set.
 */
export const API_BASE = (isLocal ? import.meta.env.VITE_API_URL || "http://localhost:5000" : "").replace(/\/$/, "");

// Generous timeout: on Render's free plan a sleeping backend can take ~60s to wake up
const API = axios.create({ baseURL: API_BASE, timeout: 90000 });

/**
 * Turns whatever the admin stored into a usable URL:
 *   - full URLs are used as-is
 *   - a 24-char id is a file uploaded through the dashboard (GridFS)
 *   - /api/... and /uploads/... live on the backend
 *   - any other /path is a file shipped with this website (public/)
 */
export const resolveAssetUrl = (path) => {
  if (!path || typeof path !== "string") return "";
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  if (/^[0-9a-fA-F]{24}$/.test(path)) return `${API_BASE}/api/files/${path}`;
  if (path.startsWith("/api/") || path.startsWith("/uploads/")) return `${API_BASE}${path}`;
  if (path.startsWith("/")) return path;
  return `${API_BASE}/api/files/${path}`;
};

const asList = (res) =>
  Array.isArray(res?.data?.data) ? res.data.data : Array.isArray(res?.data?.rows) ? res.data.rows : Array.isArray(res?.data) ? res.data : [];

const isPublished = (s) => !s || String(s).toLowerCase() === "published";

export const getContent = async () => (await API.get("/api/content")).data.data;

export const getProjects = async () => {
  const rows = asList(await API.get("/api/projects", { params: { limit: 200 } }));
  return rows
    .filter((p) => isPublished(p.status))
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
};

export const getProject = async (id) => (await API.get(`/api/projects/${id}`)).data.data;

export const getServices = async () =>
  asList(await API.get("/api/services"))
    .filter((s) => isPublished(s.status))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

export const getTeam = async () =>
  asList(await API.get("/api/team"))
    .filter((m) => m.is_active !== false && m.active !== false)
    .sort((a, b) => (a.display_order || a.order || 0) - (b.display_order || b.order || 0));

export const getTestimonials = async () =>
  asList(await API.get("/api/testimonials"))
    .filter((t) => isPublished(t.status))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

export const getGallery = async () =>
  asList(await API.get("/api/gallery", { params: { limit: 500 } })).sort(
    (a, b) => (a.display_order || 0) - (b.display_order || 0)
  );

export const submitEnquiry = (formData) => API.post("/api/enquiry", formData);

export const consultAi = async (message, messages = []) => (await API.post("/api/ai/consult", { message, messages })).data;

export const handoffAi = async (handoffData) => (await API.post("/api/ai/handoff", handoffData)).data;

export const trackPageview = (page) =>
  API.post("/api/track/pageview", { page: page || window.location.pathname, referrer: document.referrer }).catch(() => {});

export default API;
