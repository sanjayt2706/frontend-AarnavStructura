import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { submitEnquiry } from "../services/api";
import { ConcentricRing } from "./ui/ConcentricRing";
import { TextShimmer } from "./ui/TextShimmer";

const PROJECT_TYPES = [
  "Residential Turnkey Construction",
  "Commercial Fit-out & Construction",
  "Structural RCC Design & Approvals",
  "Architectural Planning & 3D Elevation",
  "Renovation & Retrofitting",
  "Project Management Consultancy (PMC)"
];

const BUDGETS = [
  "Under ₹25 Lakhs",
  "₹25 Lakhs – ₹50 Lakhs",
  "₹50 Lakhs – ₹1 Crore",
  "₹1 Crore – ₹3 Crores",
  "Above ₹3 Crores"
];

const INIT = {
  fullName: "",
  phoneNumber: "",
  email: "",
  location: "",
  projectType: PROJECT_TYPES[0],
  budget: BUDGETS[1],
  projectBrief: ""
};

const Contact = () => {
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", msg: "Submitting project details..." });

    try {
      await submitEnquiry(form);
      setStatus({
        state: "ok",
        msg: "✓ Request received. Our engineering desk will contact you within 24 hours."
      });
      setForm(INIT);
      setTimeout(() => setStatus({ state: "idle", msg: "" }), 6000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Unable to send enquiry right now. Please message us directly on WhatsApp or call our office.";
      setStatus({ state: "err", msg: errorMsg });
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Office Info */}
          <div className="contact-info">
            <div className="s-label">CONTACT</div>
            <h2 className="s-heading">Have a Project in Mind?</h2>
            <p style={{ marginTop: "14px", lineHeight: "1.6" }}>
              Tell us about the site, project type and what you are planning to build.
            </p>

            <div className="contact-item">
              <div className="contact-icon"><FaMapMarkerAlt /></div>
              <div>
                <div className="contact-label">Office Address</div>
                <div className="contact-val">Shivamogga, Karnataka 577201</div>
                <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                  Serving Shivamogga, Bengaluru, Mangaluru &amp; surrounding districts
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><FaPhoneAlt /></div>
              <div>
                <div className="contact-label">Direct Lines</div>
                <div className="contact-val">
                  <a href="tel:+917760376348">+91 77603 76348</a> / <a href="tel:+918762398728">+91 87623 98728</a>
                </div>
                <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                  Monday – Saturday: 9:00 AM – 7:00 PM IST
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><FaWhatsapp /></div>
              <div>
                <div className="contact-label">WhatsApp Channel</div>
                <div className="contact-val">
                  <a
                    href="https://wa.me/917760376348?text=Hello%20Aarnav%20Structura%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Direct Message to Engineering Desk →
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><FaEnvelope /></div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-val" style={{ fontSize: "14px" }}>
                  anrcreativecivilarchitecture@gmail.com
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form">
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "6px" }}>
              Request a Project Consultation
            </h3>
            <p style={{ fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "20px" }}>
              Fill out the details below for a preliminary engineering response.
            </p>

            {status.state === "ok" && (
              <div className="toast-feedback toast-success">
                <FaCheckCircle /> {status.msg}
              </div>
            )}

            {status.state === "err" && (
              <div className="toast-feedback toast-error">
                <FaExclamationCircle /> {status.msg}
              </div>
            )}

            <form onSubmit={submit}>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Ramesh Gowda"
                    value={form.fullName}
                    onChange={change}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={form.phoneNumber}
                    onChange={change}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={change}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Project Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Shivamogga, Kuvempu Nagar"
                    value={form.location}
                    onChange={change}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Project Type</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={change}
                    className="form-select"
                  >
                    {PROJECT_TYPES.map((pt) => (
                      <option key={pt} value={pt}>{pt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Anticipated Budget</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={change}
                    className="form-select"
                  >
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Project Brief &amp; Dimensions</label>
                <textarea
                  name="projectBrief"
                  rows="3"
                  placeholder="Provide site dimensions (e.g. 30x40 site, G+2 floor requirement, SUDA sanction required)..."
                  value={form.projectBrief}
                  onChange={change}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status.state === "sending"}
                className="btn-accent"
                style={{ width: "100%", marginTop: "8px", justifyContent: "center", gap: "10px" }}
              >
                {status.state === "sending" ? (
                  <>
                    <ConcentricRing style={{ width: "16px", height: "16px", color: "#000000" }} />
                    <TextShimmer baseColor="#000000" shimmerColor="#555555">
                      Submitting Enquiry...
                    </TextShimmer>
                  </>
                ) : (
                  "Request Site Consultation"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
