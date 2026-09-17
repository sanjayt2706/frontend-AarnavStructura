import { useEffect, useState } from "react";
import { getTeam, resolveAssetUrl } from "../services/api";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const TeamDetailModal = ({ member, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="team-modal-backdrop" onClick={onClose}>
      <div className="team-modal" onClick={(e) => e.stopPropagation()}>
        <div className="team-modal-header">
          <img
            src={resolveAssetUrl(member.photo)}
            alt={member.name}
            className="team-modal-photo"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/100";
            }}
          />
          <div className="team-modal-title-group">
            <div className="team-modal-name">{member.name}</div>
            <div className="team-modal-role">{member.role || member.designation}</div>
          </div>
          <button className="team-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="team-modal-content">
          {member.experience && (
            <div className="team-detail-item">
              <span className="team-detail-label">Experience</span>
              <div className="team-detail-val">{member.experience}</div>
            </div>
          )}
          {member.email && (
            <div className="team-detail-item">
              <span className="team-detail-label">Email</span>
              <div className="team-detail-val">{member.email}</div>
            </div>
          )}
          {member.phone && (
            <div className="team-detail-item">
              <span className="team-detail-label">Phone</span>
              <div className="team-detail-val">{member.phone}</div>
            </div>
          )}
          {member.bio && (
            <div className="team-detail-item">
              <span className="team-detail-label">Biography</span>
              <div className="team-detail-val" style={{ whiteSpace: "pre-wrap" }}>{member.bio}</div>
            </div>
          )}

          <div className="team-social-links">
            {member.linkedin_url && (
              <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="team-social-link" title="LinkedIn">
                <FaLinkedin />
              </a>
            )}
            {member.instagram && (
              <a href={member.instagram.startsWith("http") ? member.instagram : `https://instagram.com/${member.instagram}`} target="_blank" rel="noopener noreferrer" className="team-social-link" title="Instagram">
                <FaInstagram />
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} className="team-social-link" title="Email">
                <FaEnvelope />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Engineers = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getTeam()
      .then((data) => {
        if (isMounted) {
          const activeMembers = data.filter(
            (m) => m.is_active !== false && m.active !== false
          );
          setTeam(activeMembers);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching team:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section section-white" id="team">
      <div className="container">
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "0" }}
        >
          <div
            className="s-eye"
            style={{ justifyContent: "center" }}
          >
            05 — Our people
          </div>

          <h2 className="s-heading">
            Meet the <em>Team</em>
          </h2>

          <p
            style={{
              marginTop: "14px",
              fontSize: "14px",
              color: "var(--muted)",
              fontWeight: 300,
              maxWidth: "480px",
              margin: "14px auto 0"
            }}
          >
            Specialists across structural engineering, architecture, project execution,
            and IS-compliant RCC design — collaborating under one roof.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
            <div
              style={{
                display: "inline-block",
                width: 24,
                height: 24,
                border: "2px solid var(--gold)",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                marginBottom: 12
              }}
            />
            <p style={{ fontSize: "14px", fontWeight: 300 }}>Loading team…</p>
          </div>
        ) : team.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 24px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px dashed var(--border)",
              borderRadius: "4px",
              marginTop: "48px"
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>👷‍♂️</div>
            <h3 style={{ fontSize: "18px", color: "var(--ink)", fontWeight: 500, marginBottom: "8px" }}>
              Engineering Roster Under Review
            </h3>
            <p style={{ color: "var(--muted", fontSize: "14px", maxWidth: "460px", margin: "0 auto 20px" }}>
              Our licensed engineers and lead architects are currently being profiled. Add or manage personnel via the administrative console.
            </p>
            <a href="#contact" className="btn-ghost" style={{ fontSize: "12px" }}>
              Get in touch with our engineers →
            </a>
          </div>
        ) : (
          <div className="engineers-grid reveal">
            {team.map((m, i) => {
              const photoUrl = resolveAssetUrl(m.photo || m.img);
              const role = m.role || m.designation || "Civil & Structural Engineer";
              const bio = m.bio || m.experience || "";
              const initials = m.name
                ? m.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "AS";

              return (
                <div className="eng-card" key={m._id || m.id || i} onClick={() => setSelectedMember(m)} style={{ cursor: "pointer" }}>
                  <div className="eng-photo">
                    {photoUrl ? (
                      <img src={photoUrl} alt={m.name} loading="lazy" />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(180deg, #181b26 0%, #0d0e14 100%)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--gold)"
                        }}
                      >
                        <div
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            border: "1px solid rgba(217, 166, 60, 0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "22px",
                            fontFamily: "'Bebas Neue', sans-serif",
                            letterSpacing: "1px"
                          }}
                        >
                          {initials}
                        </div>
                        <span style={{ fontSize: "11px", letterSpacing: "1px", color: "var(--muted)", marginTop: 10, textTransform: "uppercase" }}>
                          Aarnav Team
                        </span}
                      </div>
                    )}
                  </div>

                  <div className="eng-body">
                    <div className="eng-name">{m.name}</div>
                    <div className="eng-role">{role}</div>
                    {bio && <div className="eng-bio">{bio}</div>}

                    <div className="eng-social-mini">
                      {m.linkedin_url && (
                        <a href={m.linkedin_url} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                          <FaLinkedin />
                        </a>
                      )}
                      {m.instagram && (
                        <a href={m.instagram.startsWith("http") ? m.instagram : `https://instagram.com/${m.instagram}`} target="_blank" rel="noopener noreferrer" title="Instagram">
                          <FaInstagram />
                        </a>
                      )}
                      {m.email && (
                        <a href={`mailto:${m.email}`} title="Email">
                          <FaEnvelope />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedMember && (
          <TeamDetailModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Engineers;