import founder from "../assets/engineers/founder.png";
import engineer1 from "../assets/engineers/engineer1.png";
import placeholder from "../assets/engineers/local.webp";

const TEAM = [
  {
    name: "Satvik R",
    role: "Founder & Structural Engineer",
    bio: "5+ years in civil and structural engineering. Specialises in RCC design and IS code compliance across Karnataka.",
    img: founder,
  },
  {
    name: "Prajwal GH",
    role: "Lead Architect",
    bio: "Licensed architect with expertise in residential and commercial design, BBMP/BDA submissions, and 3D visualisation.",
    img: engineer1,
  },
  {
    name: "Rajan Hegde",
    role: "Project Manager",
    bio: "Oversees timeline, contractor coordination, and milestone billing across all active project sites.",
    img: placeholder,
  },
  {
    name: "Sneha Kulkarni",
    role: "Interior Designer",
    bio: "Transforms raw spaces into functional, elegant interiors for residential, hospitality, and retail clients.",
    img: placeholder,
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
