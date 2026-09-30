const STEPS = [
  { num: "01", name: "DISCUSS", desc: "Understand the site, requirements, budget and intended use." },
  { num: "02", name: "ASSESS", desc: "Review the site conditions, measurements and project constraints." },
  { num: "03", name: "PLAN", desc: "Develop the architectural and structural requirements." },
  { num: "04", name: "ESTIMATE", desc: "Prepare quantities, specifications and a preliminary cost." },
  { num: "05", name: "EXECUTE", desc: "Coordinate construction and monitor progress." },
  { num: "06", name: "HANDOVER", desc: "Complete the work, documentation and final inspection." }
];

const Process = () => (
  <section className="section" id="process">
    <div className="container">
      <div className="s-header">
        <div className="s-label">PROCESS</div>
        <h2 className="s-heading">How We Work</h2>
      </div>
      <div className="process-steps">
        {STEPS.map((s) => (
          <div className="p-step" key={s.num}>
            <div className="p-num">{s.num}</div>
            <h3 className="p-name">{s.name}</h3>
            <p className="p-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
