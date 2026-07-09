const SERVICES = [
  {
    no: "01", name: "Residential Construction",
    desc: "Custom villas, independent homes, and multi-storey residences built to IS code. Full turnkey delivery across Shivamogga and Karnataka — foundation to handover.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75"
  },
  {
    no: "02", name: "Commercial Fit-Outs",
    desc: "Office spaces, retail outlets, showrooms, and hospitality interiors. Designed for performance, built for longevity, delivered on time.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=75"
  },
  {
    no: "03", name: "Structural & Civil Works",
    desc: "Foundation engineering, RCC framing, load analysis, and civil infrastructure executed with precision and full IS code compliance.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=75"
  },
  {
    no: "04", name: "Architecture & Design",
    desc: "Concept design, working drawings, 3D visualisation, and BBMP/BDA plan submission handled end-to-end by our licensed architects.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=75"
  },
  {
    no: "05", name: "Project Management",
    desc: "BOQ preparation, contractor coordination, timeline management, quality audits, and milestone-based client reporting throughout the build.",
    img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&q=75"
  },
  {
    no: "06", name: "Renovation & Restoration",
    desc: "Structural strengthening, full interior makeovers, façade upgrades, and MEP overhauls for existing residential and commercial buildings.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=75"
  }
];

const Services = () => (
  <section className="section section-white" id="services">
    <div className="container">
      <div className="svc-header reveal">
        <div>
          <div className="s-eye">01 — What we deliver</div>
          <h2 className="s-heading">Our <em>Services</em></h2>
        </div>
        <a href="#contact" className="btn-ghost" style={{ fontSize: "12px" }}>
          Request a consultation →
        </a>
      </div>
      <div className="svc-grid reveal">
        {SERVICES.map((s) => (
          <div className="svc-card" key={s.no}>
            <div className="svc-img">
              <img src={s.img} alt={s.name} loading="lazy" />
            </div>
            <span className="svc-no">{s.no}</span>
            <div className="svc-name">{s.name}</div>
            <div className="svc-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
