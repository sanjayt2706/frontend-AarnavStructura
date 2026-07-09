// Replace image URLs and details with actual team member photos and bios.
const TEAM = [
  {
    name: "Aarnav Kumar",
    role: "Founder & Structural Engineer",
    bio: "15+ years in civil and structural engineering. Specialises in RCC design and IS code compliance across Karnataka.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
  },
  {
    name: "Priya Nair",
    role: "Lead Architect",
    bio: "Licensed architect with expertise in residential and commercial design, BBMP/BDA submissions, and 3D visualisation.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
  },
  {
    name: "Rajan Hegde",
    role: "Project Manager",
    bio: "Oversees timeline, contractor coordination, and milestone billing across all active project sites.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
  },
  {
    name: "Sneha Kulkarni",
    role: "Interior Designer",
    bio: "Transforms raw spaces into functional, elegant interiors for residential, hospitality, and retail clients.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
  }
];

const Engineers = () => (
  <section className="section section-white" id="team">
    <div className="container">
      <div className="reveal" style={{ textAlign: "center", marginBottom: "0" }}>
        <div className="s-eye" style={{ justifyContent: "center" }}>05 — Our people</div>
        <h2 className="s-heading">Meet the <em>Team</em></h2>
        <p style={{ marginTop: "14px", fontSize: "14px", color: "var(--muted)", fontWeight: 300, maxWidth: "480px", margin: "14px auto 0" }}>
          10 specialists across every domain — architecture, structure, MEP,
          interiors, and project management — all under one roof.
        </p>
      </div>

      <div className="engineers-grid reveal">
        {TEAM.map((m) => (
          <div className="eng-card" key={m.name}>
            <div className="eng-photo">
              <img src={m.img} alt={m.name} loading="lazy" />
            </div>
            <div className="eng-body">
              <div className="eng-name">{m.name}</div>
              <div className="eng-role">{m.role}</div>
              <div className="eng-bio">{m.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Engineers;
