const STEPS = [
  { num: "01", name: "Discovery", desc: "Site visit, requirement mapping, and feasibility analysis. We understand the full scope before we design." },
  { num: "02", name: "Design & Quote", desc: "Architecture, 3D walkthroughs, detailed BOQ, and a fully transparent, fixed project quote." },
  { num: "03", name: "Approvals", desc: "BBMP/BDA plan sanction, SUDA approvals, and all statutory clearances handled for you." },
  { num: "04", name: "Build", desc: "Supervised construction with weekly reports and live access to your client project portal." },
  { num: "05", name: "Handover", desc: "Quality audit, punch-list clearance, full documentation package, and 1-year defect liability." }
];

const Process = () => (
  <section className="section-sm section-dark" id="process">
    <div className="container">
      <div className="process-header reveal">
        <div className="s-eye">03 — How we work</div>
        <h2 className="s-heading s-heading-light">Our <em>Process</em></h2>
      </div>
      <div className="process-steps reveal">
        {STEPS.map((s) => (
          <div className="p-step" key={s.num}>
            <div className="p-num">{s.num}</div>
            <div className="p-name">{s.name}</div>
            <div className="p-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
