import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: API_BASE,
});

export const resolveAssetUrl = (path) => {
  if (!path) return null;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const cleanBase = API_BASE.replace(/\/$/, "");
  return `${cleanBase}${path.startsWith("/") ? "" : "/"}${path}`;
};

export const getProjects = async () => {
  try {
    const res = await API.get("/api/projects");
    return Array.isArray(res.data?.data)
      ? res.data.data
      : Array.isArray(res.data?.rows)
      ? res.data.rows
      : Array.isArray(res.data)
      ? res.data
      : [];
  } catch (err) {
    console.warn("Could not load projects from API:", err);
    return [];
  }
};

export const getTeam = async () => {
  try {
    const res = await API.get("/api/team");
    return Array.isArray(res.data?.data)
      ? res.data.data
      : Array.isArray(res.data?.rows)
      ? res.data.rows
      : Array.isArray(res.data)
      ? res.data
      : [];
  } catch (err) {
    console.warn("Could not load team from API:", err);
    return [];
  }
};

export const submitEnquiry = async (formData) =>
  API.post("/api/enquiry", formData);

export const trackPageview = async () =>
  API.post("/api/track/pageview", {
    page: window.location.pathname,
    referrer: document.referrer,
  }).catch(() => {});

export default API;