import { useEffect, useState } from "react";
import { getProjects, resolveAssetUrl } from "../services/api";

const DEFAULT_PROJECTS = [
  {
    _id: "p1",
    title: "Sahyadri Contemporary Villa",
    category: "Residential Architecture",
    location: "Shivamogga, Karnataka",
    area_sqft: "4,200",
    cover_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    scope: "Architectural Planning • Structural Engineering • Turnkey Build",
    brief: "Contemporary 4,200 sq.ft residential home constructed with IS 456 RCC framing, teakwood louvers, double-height living spaces, and rainwater harvesting."
  },
  {
    _id: "p2",
    title: "Malnad Commercial Complex",
    category: "Commercial Infrastructure",
    location: "Shivamogga, Karnataka",
    area_sqft: "12,500",
    cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
    scope: "Structural Engineering • SUDA Approvals • Construction",
    brief: "G+4 commercial showroom and corporate office complex featuring post-tensioned beam design and high-span column layouts."
  },
  {
    _id: "p3",
    title: "Heritage Green Duplex",
    category: "Turnkey Residential",
    location: "Shivamogga, Karnataka",
    area_sqft: "2,850",
    cover_image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
    scope: "Vastu Design • Structural Framing • Interior Handover",
    brief: "Turnkey duplex home featuring Vastu-compliant layout, modular kitchen, solar rooftop integration, and landscaped terrace."
  }
];

const ProjectDetailModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-header">
          <div>
            <h2 className="project-modal-title">{project.title}</h2>
            <div style={{ fontSize: "13.5px", color: "var(--color-text-muted)", marginTop: "4px" }}>
              📍 {project.location || "Karnataka, India"} • {project.area_sqft ? `${project.area_sqft} sq.ft` : "Custom Area"}
            </div>
          </div>
          <button type="button" className="project-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <img
            src={resolveAssetUrl(project.cover_image || project.image) || DEFAULT_PROJECTS[0].cover_image}
            alt={project.title || "Aarnav Structura Project"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_PROJECTS[0].cover_image;
            }}
            style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "var(--radius-sm)" }}
          />
        </div>

        <div className="project-detail-section">
          <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--color-text)", marginBottom: "6px" }}>Project Scope</h4>
          <p style={{ fontSize: "14px", color: "var(--color-accent)", fontWeight: "500", marginBottom: "16px" }}>
            {project.scope || project.category || "Architectural Planning & Structural Construction"}
          </p>

          <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--color-text)", marginBottom: "6px" }}>Overview &amp; Execution</h4>
          <p style={{ lineHeight: "1.65" }}>
            {project.brief || project.description || "Executed with IS 456 structural standards and complete milestone verification."}
          </p>
        </div>

        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "flex-end" }}>
          <a
            href="https://wa.me/917760376348?text=Hello%20Aarnav%20Structura%2C%20I%20am%20interested%20in%20discussing%20a%20project%20similar%20to%20your%20portfolio."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent"
          >
            Inquire About Similar Project →
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            const published = data.filter((p) => !p.status || p.status.toLowerCase() === "published");
            setProjects(published.length > 0 ? published : DEFAULT_PROJECTS);
          } else {
            setProjects(DEFAULT_PROJECTS);
          }
        }
      })
      .catch(() => {
        if (isMounted) setProjects(DEFAULT_PROJECTS);
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="s-header">
          <div className="s-label">PORTFOLIO CASE STUDIES</div>
          <h2 className="s-heading">Featured Projects</h2>
          <p className="s-sub">
            Residential and commercial architectural engineering projects delivered across Karnataka.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => {
            const imageSrc = resolveAssetUrl(p.cover_image || p.image) || DEFAULT_PROJECTS[i % DEFAULT_PROJECTS.length].cover_image;
            const title = p.title || p.name || "Aarnav Structura Project";
            const category = p.category || p.type || "Residential Architecture";
            const location = p.location || "Shivamogga, Karnataka";
            const area = p.area_sqft || "3,000";

            return (
              <div
                className="project-card"
                key={p._id || p.id || i}
                onClick={() => setSelectedProject(p)}
              >
                <div className="project-img-wrapper">
                  <img
                    src={imageSrc}
                    alt={title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_PROJECTS[i % DEFAULT_PROJECTS.length].cover_image;
                    }}
                  />
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    {category} • {area} SQ.FT
                  </div>
                  <h3 className="project-title">{title}</h3>
                  <div className="project-loc">📍 {location}</div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
