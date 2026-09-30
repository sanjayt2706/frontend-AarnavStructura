import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Left Content */}
          <div className="hero-content">
            <div className="hero-label">
              CIVIL • STRUCTURAL • ARCHITECTURAL
            </div>

            <h1 className="hero-h1">
              Construction and engineering,<br className="desktop-only" /> clearly planned from the start.
            </h1>

            <p className="hero-body">
              Aarnav Structura provides architectural planning, structural engineering and construction services for residential and commercial projects.
            </p>

            <div style={{ fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "24px", fontWeight: "500" }}>
              📍 Shivamogga, Karnataka
            </div>

            <div className="hero-actions">
              <a href="#contact" className="btn-accent">
                Start a Project <FaArrowRight style={{ fontSize: "12px" }} />
              </a>
              <a href="#portfolio" className="btn-ghost">
                View Projects
              </a>
            </div>
          </div>

          {/* Right Image Frame - Single Real Project Image */}
          <div className="hero-image-frame">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
              alt="Aarnav Structura Architecture & Construction Project"
              className="hero-img"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;