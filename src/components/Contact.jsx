import { useState } from "react";
import { submitEnquiry } from "../services/api";

const PROJECT_TYPES = [
  "Residential construction", "Commercial fit-out", "Structural / civil works",
  "Architecture & design", "Interior design", "Renovation & restoration",
  "Project management consultancy"
];

const BUDGETS = [
  "Under ₹20 Lakhs", "₹20L – ₹50L", "₹50L – ₹1 Crore",
  "₹1 Cr – ₹5 Cr", "Above ₹5 Crore"
];

const INIT = {
  fullName: "", phoneNumber: "", email: "", location: "",
  projectType: "", budget: "", projectBrief: ""
};

const Contact = () => {
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", msg: "" });
    try {
      await submitEnquiry(form);
      setStatus({ state: "ok", msg: "✓ Received — we'll call you within 24 hours" });
      setForm(INIT);
      setTimeout(() => setStatus({ state: "idle", msg: "" }), 6000);
    } catch {
      setStatus({ state: "err", msg: "Something went wrong. Please call us directly." });
    }
  };

  return (
    <section className="section section-surface" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="s-eye">08 — Get in touch</div>
            <h2 className="s-heading">Let's build<br />something <em>great.</em></h2>
            <p>Tell us about your project. We respond within 24 hours and arrange a site visit at your convenience.</p>

            <div className="cdetail">
              <div className="cicon">📍</div>
              <div>
                <div className="clabel">Our office</div>
                <div className="cval">Shivamogga, Karnataka</div>
                <div className="csub">Serving all of Karnataka</div>
              </div>
            </div>
            <div className="cdetail">
              <div className="cicon">📞</div>
              <div>
                <div className="clabel">Call us</div>
                <div className="cval">+91 77603 76348 / +91 87623 98728</div>
                <div className="csub">Mon – Sat, 9 am – 7 pm IST</div>
              </div>
            </div>
            <div className="cdetail">
              <div className="cicon">✉️</div>
              <div>
                <div className="clabel">Email</div>
                <div className="cval">satvikrajgowda282@gmail.com</div>
                <div className="csub">Response within 24 hours</div>
              </div>
            </div>
            <div className="cdetail">
              <div className="cicon">💬</div>
              <div>
                <div className="clabel">WhatsApp</div>
                <div className="cval">
                  <a href="https://wa.me/918762398728" style={{ color: "var(--gold)" }}>
                    +91 87623 98728
                  </a>
                </div>
                <div className="csub">Send your brief directly on WhatsApp</div>
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="form-box">
              <div className="form-title">Start Your Project</div>
              <div className="form-sub">Fill in the details and we'll get back within 24 hours.</div>
              <form onSubmit={submit}>
                <div className="f-grid">
                  <div className="fg">
                    <label className="fl">Full name *</label>
                    <input className="fi" name="fullName" value={form.fullName} onChange={change} placeholder="Your full name" required />
                  </div>
                  <div className="fg">
                    <label className="fl">Phone number *</label>
                    <input className="fi" name="phoneNumber" type="tel" value={form.phoneNumber} onChange={change} placeholder="+91 XXXXX XXXXX" required />
                  </div>
                  <div className="fg">
                    <label className="fl">Email address</label>
                    <input className="fi" name="email" type="email" value={form.email} onChange={change} placeholder="you@email.com" />
                  </div>
                  <div className="fg">
                    <label className="fl">Project location</label>
                    <input className="fi" name="location" value={form.location} onChange={change} placeholder="City or area in Karnataka" />
                  </div>
                  <div className="fg full">
                    <label className="fl">Project type</label>
                    <select className="fsel" name="projectType" value={form.projectType} onChange={change}>
                      <option value="">Select project type</option>
                      {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="fg full">
                    <label className="fl">Approximate budget</label>
                    <select className="fsel" name="budget" value={form.budget} onChange={change}>
                      <option value="">Select budget range</option>
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="fg full">
                    <label className="fl">Project brief</label>
                    <textarea className="fta" name="projectBrief" value={form.projectBrief} onChange={change} placeholder="Describe your vision, site area, timeline, and any specific requirements..." />
                  </div>
                </div>
                <button
                  type="submit"
                  className="f-submit"
                  disabled={status.state === "sending" || status.state === "ok"}
                >
                  {status.state === "sending" ? "Sending..." : status.state === "ok" ? status.msg : "Send Project Brief"}
                </button>
                {status.state === "err" && <div className="f-error">{status.msg}</div>}
                <div className="f-note">🔒 Your details are private and secure. We do not share your information.</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
