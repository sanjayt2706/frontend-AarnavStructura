import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const Footer = () => (
  <footer className="hook-footer">
    <div className="container">
      <div className="footer-grid">
        {/* Brand Column */}
        <div>
          <div className="logo" style={{ marginBottom: "18px" }}>
            <div className="hook-logo-mark">AS</div>
            <div>
              <span className="logo-name" style={{ color: "#FFFFFF", fontSize: "18px" }}>Aarnav Structura</span>
              <span className="logo-sub" style={{ color: "#A1A1AA" }}>Civil &amp; Architectural Engineering</span>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <FaPhoneAlt style={{ color: "#D4FD52", flexShrink: 0 }} />
              <a href="tel:+917760376348" style={{ color: "#FFFFFF", fontWeight: "600", fontSize: "15px" }}>+91 77603 76348</a>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <FaMapMarkerAlt style={{ color: "#D4FD52", marginTop: "4px", flexShrink: 0 }} />
              <span style={{ color: "#E4E4E7", fontSize: "14px" }}>Shivamogga, Karnataka 577201</span>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <FaWhatsapp style={{ color: "#D4FD52", flexShrink: 0 }} />
              <a href="https://wa.me/917760376348" target="_blank" rel="noopener noreferrer" style={{ color: "#D4FD52", fontSize: "14px", fontWeight: "500" }}>
                Chat on WhatsApp →
              </a>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <div className="hook-footer-heading">COMPANY</div>
          <ul className="footer-links">
            <li><a href="#about">About Our Firm</a></li>
            <li><a href="#process">Our Process</a></li>
            <li><a href="#portfolio">Selected Work</a></li>
            <li><a href="#testimonials">Client Expectations</a></li>
            <li><a href="#contact">Contact Desk</a></li>
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <div className="hook-footer-heading">SERVICES</div>
          <ul className="footer-links">
            <li><a href="#services">Architectural Planning</a></li>
            <li><a href="#services">Structural RCC Design</a></li>
            <li><a href="#services">Turnkey Construction</a></li>
            <li><a href="#services">Project Management</a></li>
            <li><a href="#services">Structural Strengthening</a></li>
          </ul>
        </div>

        {/* Quick Resource & Project Updates Form */}
        <div>
          <div className="hook-footer-heading">PROJECT INQUIRIES</div>
          <p style={{ fontSize: "13.5px", color: "#A1A1AA", marginBottom: "14px", lineHeight: "1.5" }}>
            Sign up for preliminary project guidelines or request a callback from our civil desk.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you. Our engineering desk will be in touch shortly.");
            }}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              style={{
                padding: "11px 14px",
                background: "#18181B",
                border: "1px solid #27272A",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontSize: "14px",
                outline: "none"
              }}
            />
            <button
              type="submit"
              className="hook-btn-lime"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Sign Up Now!
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} Aarnav Structura. All Rights Reserved. Built to IS 456 / IS 1893 standards.
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <span>Shivamogga</span>
          <span>•</span>
          <span>Karnataka, India</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
