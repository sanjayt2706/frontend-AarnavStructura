const SERVICES = [
  {
    no: "01",
    title: "ARCHITECTURAL PLANNING",
    desc: "Planning, working drawings, elevations and documentation for residential and commercial projects."
  },
  {
    no: "02",
    title: "STRUCTURAL ENGINEERING",
    desc: "Structural analysis, RCC design, detailing and engineering documentation for new construction and alterations."
  },
  {
    no: "03",
    title: "CONSTRUCTION",
    desc: "Execution and site coordination from foundation work through finishing and handover."
  },
  {
    no: "04",
    title: "PROJECT MANAGEMENT",
    desc: "BOQ preparation, contractor coordination, quality checks and progress tracking."
  },
  {
    no: "05",
    title: "RENOVATION & STRENGTHENING",
    desc: "Assessment and execution for existing structures, repairs, retrofitting and modifications."
  }
];

const Services = () => (
  <section className="section" id="services">
    <div className="container">
      <div className="s-header">
        <div className="s-label">SERVICES</div>
        <h2 className="s-heading">Core Disciplines</h2>
      </div>

      <div className="services-list">
        {SERVICES.map((s) => (
          <div className="service-row" key={s.no}>
            <div className="service-num">{s.no}</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
