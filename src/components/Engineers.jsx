import { useEffect, useState } from "react";
import { getTeam, resolveAssetUrl } from "../services/api";
import { FaLinkedin, FaEnvelope, FaPhoneAlt, FaHardHat } from "react-icons/fa";

const CURATED_DEFAULT_TEAM = [
  {
    _id: "t1",
    name: "Er. Aarnav Gowda",
    role: "Principal Structural Engineer",
    designation: "M.Tech (Structures), MIE, Chartered Engineer",
    experience: "14+ Years in RCC & High-Rise Design",
    email: "aarnav.structura@gmail.com",
    phone: "+91 77603 76348",
    bio: "Specializes in IS 456 / IS 1893 seismic structural framing, post-tensioned slab systems, and government structural stability certifications across Karnataka.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80"
  },
  {
    _id: "t2",
    name: "Ar. Priya Kulkarni",
    role: "Lead Architect & Planner",
    designation: "B.Arch, Registered COA Architect",
    experience: "10+ Years in Sustainable & Vastu Architecture",
    email: "priya.arch@aarnavstructura.com",
    phone: "+91 87623 98728",
    bio: "Directs concept planning, 3D visualization, SUDA/BBMP sanction drawings, and contemporary tropical residential design.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
  },
  {
    _id: "t3",
    name: "Er. Karthik Hegde",
    role: "Head of Project Execution & Quality",
    designation: "B.E. (Civil), Senior Site Engineer",
    experience: "9+ Years in Turnkey Site Delivery",
    email: "karthik.execution@aarnavstructura.com",
    phone: "+91 77603 76348",
    bio: "Supervises on-site RCC batching, cube test verifications, contractor coordination, and milestone handover inspections.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
  },
  {
    _id: "t4",
    name: "Er. Manjunath Shetty",
    role: "MEP & Infrastructure Lead",
    designation: "B.Tech (Electrical & MEP Engineering)",
    experience: "8+ Years in Commercial MEP & Automation",
    email: "manjunath.mep@aarnavstructura.com",
    phone: "+91 87623 98728",
    bio: "Leads electrical load calculations, plumbing conduits, fire protection layouts, and solar grid installations.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80"
  }
];

const Engineers = () => {
  const [team, setTeam] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getTeam()
      .then((data) => {
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            const active = data.filter((m) => m.is_active !== false && m.active !== false);
            setTeam(active.length > 0 ? active : CURATED_DEFAULT_TEAM);
          } else {
            setTeam(CURATED_DEFAULT_TEAM);
          }
        }
      })
      .catch(() => {
        if (isMounted) setTeam(CURATED_DEFAULT_TEAM);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section section-alt" id="team">
      <div className="container">
        <div className="s-header center">
          <div className="s-eye">
            <FaHardHat /> Technical Leadership
          </div>
          <h2 className="s-heading">
            Our Licensed <em>Engineers &amp; Architects</em>
          </h2>
          <p className="s-sub">
            Chartered structural engineers, COA architects, and certified site supervisors collaborating seamlessly under one roof in Shivamogga.
          </p>
        </div>

        <div className="engineers-grid">
          {team.map((m, i) => {
            const photoUrl = resolveAssetUrl(m.photo || m.img) || CURATED_DEFAULT_TEAM[i % CURATED_DEFAULT_TEAM.length].photo;
            const role = m.role || m.designation || "Civil & Structural Engineer";
            const bio = m.bio || m.experience || "Dedicated civil engineer delivering IS-compliant structural execution.";

            return (
              <div
                className="eng-card"
                key={m._id || m.id || i}
                onClick={() => setSelectedMember(m)}
                style={{ cursor: "pointer" }}
              >
                <div className="eng-photo">
                  <img
                    src={photoUrl}
                    alt={m.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = CURATED_DEFAULT_TEAM[i % CURATED_DEFAULT_TEAM.length].photo;
                    }}
                  />
                </div>

                <div className="eng-body">
                  <h3 className="eng-name">{m.name}</h3>
                  <div className="eng-role">{role}</div>
                  <p className="eng-bio">{bio}</p>

                  <div className="eng-social-mini">
                    <a
                      href="https://wa.me/917760376348"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Direct Contact"
                      style={{ fontSize: "13px", fontWeight: "600", color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      Consult Engineer →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedMember && (
          <div className="team-modal-backdrop" onClick={() => setSelectedMember(null)}>
            <div className="team-modal" onClick={(e) => e.stopPropagation()}>
              <div className="team-modal-header">
                <div>
                  <h3 className="team-modal-name">{selectedMember.name}</h3>
                  <div style={{ fontSize: "13px", color: "var(--gold)", fontWeight: "600", marginTop: "2px" }}>
                    {selectedMember.role || selectedMember.designation}
                  </div>
                </div>
                <button type="button" className="team-modal-close" onClick={() => setSelectedMember(null)}>&times;</button>
              </div>

              <div style={{ fontSize: "14.5px", color: "var(--ink-secondary)", lineHeight: "1.7" }}>
                <p style={{ marginBottom: "16px" }}>{selectedMember.bio}</p>
                {selectedMember.experience && (
                  <p style={{ marginBottom: "8px" }}>
                    <strong>Experience:</strong> {selectedMember.experience}
                  </p>
                )}
                {selectedMember.phone && (
                  <p style={{ marginBottom: "8px" }}>
                    <strong>Direct:</strong> <a href={`tel:${selectedMember.phone}`} style={{ color: "var(--gold)" }}>{selectedMember.phone}</a>
                  </p>
                )}
              </div>

              <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
                <a
                  href={`https://wa.me/917760376348?text=Hello%20Aarnav%20Structura%2C%20I%20would%20like%20to%20consult%20with%20${encodeURIComponent(selectedMember.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ fontSize: "13px" }}
                >
                  Message on WhatsApp →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Engineers;