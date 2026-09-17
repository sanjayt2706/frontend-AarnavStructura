import { useEffect, useState } from "react";
import { getProjects, resolveAssetUrl } from "../services/api";

const ProjectDetailModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "plan", label: "Detailed Plan" },
    { id: "media", label: "Media Gallery" },
    { id: "docs", label: "Documents" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="project-detail-section">
            <span className="project-detail-label">Project Brief</span>
            <p className="project-detail-text">
              {project.brief || project.description || "No brief available for this project."}
            </p>
          </div>
        );
      case "plan":
        return (
          <div className="project-detail-section">
            <span className="project-detail-label">Engineering & Structural Plan</span>
            <p className="project-detail-text" style={{ whiteSpace: "pre-wrap" }}>
              {project.detailed_plan || "Detailed structural specifications are available upon request."}
            </p>
          </div>
        );
      case "media":
        return (
          <div className="project-detail-section">
            <span className="project-detail-label">Project Media</span>
            {project.video_url && (
              <div className="video-responsive">
                {project.video_url.includes("youtube.com") || project.video_url.includes("youtu.be") ? (
                  <iframe
                    src={project.video_url.replace("watch?v=", "embed/")}
                    title="Project Video"
                    allowFullScreen
                  />
                ) : (
                  <video src={project.video_url} controls autoPlay muted loop />
                )}
              </div>
            )}
            <div className="media-gallery-grid">
              {(project.media || []).map((m, i) => (
                <div className="media-item" key={i}>
                  {m.type === "video" ? (
                    <video src={resolveAssetUrl(m.url)} muted loop onMouseEnter={(e) => e.target.play()} onMouseLeave={(e) => e.target.pause()} />
                  ) : (
                    <img src={resolveAssetUrl(m.url)} alt={m.name || "Project media"} />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case "docs":
        return (
          <div className="project-detail-section">
            <span className="project-detail-label">Project Documents</span>
            <div className="document-list">
              {(project.documents || []).length > 0 ? (
                project.documents.map((doc, i) => (
                  <a
                    key={i}
                    href={resolveAssetUrl(doc.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-chip"
                  >
                    <div className="document-chip-info">
                      <span className="document-chip-icon">📄</span>
                      <div>
                        <span className="document-chip-name">{doc.name}</span>
                        <span className="document-chip-size">{doc.size}</span>
                      </div>
                    </div>
                    <span className="document-chip-btn">Download</span>
                  </a>
                ))
              ) : (
                <p className="project-detail-text">No downloadable documents available.</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-header">
          <div>
            <h2 className="project-modal-title">{project.title}</h2>
            <div className="project-modal-meta">
              <span className="project-modal-badge">{project.category}</span>
              <span className="project-modal-badge">📍 {project.location}</span>
              <span className="project-modal-badge">📅 {project.year}</span>
              <span className="project-modal-badge">📐 {project.area_sqft} sqft</span>
            </div>
          </div>
          <button className="project-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="project-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`project-tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="project-tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        if (isMounted) {
          const published = data.filter(
            (p) => !p.status || p.status.toLowerCase() === "published"
          );
          setProjects(published);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section section-surface" id="portfolio">
      <div className="container">
        <div className="port-header reveal">
          <div>
            <div className="s-eye">04 — Selected work</div>
            <h2 className="s-heading">
              Our <em>Projects</em>
            </h2>
          </div>
          <a href="#contact" className="btn-ghost" style={{ fontSize: "12px" }}>
            Work with us →
          </a>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <div style={{ display: "inline-block", width: 24, height: 24, border: "2px solid var(--gold)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginBottom: 12 }} />
            <p style={{ fontSize: "14px", fontWeight: 300 }}>Loading project portfolio…</p>
          </div>
        ) : projects.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 24px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px dashed var(--border)",
              borderRadius: "4px",
              marginTop: "24px"
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>🏛️</div>
            <h3 style={{ fontSize: "18px", color: "var(--ink)", fontWeight: 500, marginBottom: "8px" }}>
              Projects Being Curated
            </h3>
            <p style={{ color: "var(--muted)", fontSize: "14px", maxWidth: "460px", margin: "0 auto 20px" }}>
              Our project repository is currently being updated via the administrative portal. Contact our office directly to receive our full engineering and construction dossier.
            </p>
            <a href="#contact" className="btn-primary" style={{ fontSize: "13px" }}>
              Request Project Portfolio
            </a>
          </div>
        ) : (
          <div className="port-grid reveal">
            {projects.map((p, i) => {
              const imageSrc = resolveAssetUrl(p.cover_image || p.image);
              const title = p.title || p.name || "Untitled Project";
              const category = p.category || p.type || "Engineering";
              const location = p.location || p.loc || "Karnataka, India";

              return (
                <div className="port-card" key={p._id || p.id || i} onClick={() => setSelectedProject(p)}>
                  {imageSrc ? (
                    <img src={imageSrc} alt={title} loading="lazy" />
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        minHeight: "260px",
                        background: "linear-gradient(135deg, #13151F 0%, #07080B 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--muted)",
                        fontSize: "13px"
                      }}
                    >
                      Aarnav Structura
                    </div>
                  )}
                  <div className="port-overlay">
                    <div className="port-type">{category}</div>
                    <div className="port-name">{title}</div>
                    <div className="port-loc">📍 {location}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
