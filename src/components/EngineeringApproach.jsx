const APPROACH_ITEMS = [
  { title: "Structural Design", desc: "Analysis and RCC detailing referenced against Indian Standard codes (IS 456 for concrete, IS 1893 for seismic resistance)." },
  { title: "Site Assessment", desc: "Inspection of plot orientation, ground levels, access roads, and soil load-bearing considerations." },
  { title: "Material Specifications", desc: "Defined schedules for steel reinforcement grades, cement specifications, and masonry blocks." },
  { title: "Quality Checks", desc: "Routine verification of concrete mixes, reinforcement placement, and alignment before casting." },
  { title: "Construction Documentation", desc: "Maintained working drawings, structural layouts, and quantity bills available to the client." },
  { title: "Progress Verification", desc: "Stage-wise physical verification prior to progressing to subsequent structural phases." }
];

const EngineeringApproach = () => {
  return (
    <section className="section section-alt" id="engineering-approach">
      <div className="container">
        <div className="s-header">
          <div className="s-label">ENGINEERING APPROACH</div>
          <h2 className="s-heading">Technical Rigor &amp; Documentation</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {APPROACH_ITEMS.map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: "var(--color-surface)",
                padding: "24px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)"
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-text)", marginBottom: "8px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringApproach;
