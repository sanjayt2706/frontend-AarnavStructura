// Replace image URLs with actual project photos before launch.
// Unsplash images used as high-quality placeholders.
const PROJECTS = [
  {
    type: "Residential",
    name: "Riverside Villa",
    loc: "Shivamogga, Karnataka",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80"
  },
  {
    type: "Commercial",
    name: "Tech Park Fit-Out",
    loc: "Bengaluru, Karnataka",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80"
  },
  {
    type: "Civil Works",
    name: "Bridge Approach Road",
    loc: "Sagara, Karnataka",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"
  },
  {
    type: "Renovation",
    name: "Heritage Building Restoration",
    loc: "Shivamogga, Karnataka",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=80"
  },
  {
    type: "Residential",
    name: "Hilltop Duplex",
    loc: "Thirthahalli, Karnataka",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80"
  }
];

const Projects = () => (
  <section className="section section-surface" id="portfolio">
    <div className="container">
      <div className="port-header reveal">
        <div>
          <div className="s-eye">04 — Selected work</div>
          <h2 className="s-heading">Our <em>Projects</em></h2>
        </div>
        <a href="#contact" className="btn-ghost" style={{ fontSize: "12px" }}>Work with us →</a>
      </div>

      <div className="port-grid reveal">
        {PROJECTS.map((p, i) => (
          <div className="port-card" key={i}>
            <img src={p.img} alt={p.name} loading="lazy" />
            <div className="port-overlay">
              <div className="port-type">{p.type}</div>
              <div className="port-name">{p.name}</div>
              <div className="port-loc">📍 {p.loc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
