const About = () => (
  <section className="section" id="about">
    <div className="container">
      <div className="about-grid" style={{ alignItems: "center" }}>
        {/* Image Frame */}
        <div className="hero-image-frame">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80"
            alt="Aarnav Structura engineering & site coordination"
            style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "var(--radius-sm)" }}
            loading="lazy"
          />
        </div>

        {/* Text Content */}
        <div>
          <div className="s-label">ABOUT AARNAV STRUCTURA</div>
          <h2 className="s-heading" style={{ fontSize: "28px", lineHeight: "1.4", marginBottom: "20px" }}>
            Architecture and engineering need to work together from the beginning of a project. We focus on coordinating the design, structural requirements and execution so that decisions made on paper can be carried through on site.
          </h2>

          <div style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "14px" }}>
            <p>
              Based in Shivamogga, Aarnav Structura is a civil engineering and architectural firm serving clients across Karnataka. We handle architectural planning, structural design, turnkey construction, and project management under one roof.
            </p>
            <p>
              By combining architectural design with structural engineering from day one, we eliminate discrepancies between drawings and site execution, keeping projects on schedule and within documented estimates.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
