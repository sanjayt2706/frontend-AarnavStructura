const EXPECTATIONS = [
  { title: "Clear scope", desc: "Detailed project requirements and architectural drawings before work begins." },
  { title: "Documented estimates", desc: "Itemized BOQ breaking down quantities, material specs, and preliminary costs." },
  { title: "Regular project updates", desc: "Structured progress reporting at key structural and milestone stages." },
  { title: "Defined responsibilities", desc: "Single-point engineering accountability across design, approvals, and construction." },
  { title: "Site coordination", desc: "Supervised execution ensuring structural drawings are accurately followed." },
  { title: "Direct communication", desc: "Open access to project engineers and architects throughout the timeline." }
];

const Testimonials = () => (
  <section className="section" id="testimonials">
    <div className="container">
      <div className="s-header">
        <div className="s-label">CLIENT EXPERIENCE</div>
        <h2 className="s-heading">What Clients Can Expect</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {EXPECTATIONS.map((exp) => (
          <div
            key={exp.title}
            style={{
              backgroundColor: "var(--color-surface)",
              padding: "24px",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)"
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-text)", marginBottom: "8px" }}>
              {exp.title}
            </h3>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
              {exp.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
