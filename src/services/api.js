import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true
});

export const submitEnquiry = async (formData) => API.post("/api/enquiry", formData);

export const trackPageview = async () =>
  API.post("/api/track/pageview", { page: window.location.pathname, referrer: document.referrer }).catch(() => {});

export default API;
