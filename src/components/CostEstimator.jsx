import { useState } from "react";
import { FaCalculator, FaWhatsapp } from "react-icons/fa";

const FINISH_LEVELS = [
  {
    id: "standard",
    name: "Standard RCC",
    rate: 1750,
    desc: "IS 456 compliant RCC framing, Tata/JSW steel, solid block masonry, standard vitrified flooring & CP fittings."
  },
  {
    id: "premium",
    name: "Premium Turnkey",
    rate: 2150,
    desc: "Teakwood doors, 4x2 vitrified tiles, Jaguar sanitaryware, Asian Royale paint & modular kitchen framework."
  },
  {
    id: "luxury",
    name: "Luxury Architectural",
    rate: 2750,
    desc: "Custom architect design, Italian marble flooring, Kohler/Grohe fittings & smart electrical automation."
  }
];

const CostEstimator = () => {
  const [area, setArea] = useState(1500);
  const [floors, setFloors] = useState("G+1");
  const [finishLevel, setFinishLevel] = useState(FINISH_LEVELS[1]);

  const multiplier = floors === "Ground Floor" ? 1 : floors === "G+1" ? 1.9 : 2.8;
  const totalBuiltUp = Math.round(area * multiplier);
  const totalCost = totalBuiltUp * finishLevel.rate;

  const formattedCost = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Aarnav Structura! I generated a project estimate on your website:\n• Plot Footprint: ${area} sq.ft\n• Floor Plan: ${floors}\n• Total Built-up: ~${totalBuiltUp} sq.ft\n• Package: ${finishLevel.name} (@ ₹${finishLevel.rate}/sq.ft)\n• Estimated Budget: ${formattedCost(totalCost)}\n\nI would like to request a detailed site BOQ.`
  );

  return (
    <section className="section" id="estimator">
      <div className="container">
        <div className="s-header">
          <div className="s-label">BUDGET ESTIMATION</div>
          <h2 className="s-heading">Planning Your Project?</h2>
          <p className="s-sub" style={{ maxWidth: "600px" }}>
            Use the estimator to get an indicative range based on your area, floors and construction requirements.
          </p>
        </div>

        <div className="estimator-container">
          <div className="estimator-layout">
            {/* Input Controls */}
            <div>
              <div className="est-group">
                <div className="est-header-row">
                  <span>Base Footprint Area</span>
                  <strong style={{ color: "var(--color-accent)" }}>{area.toLocaleString("en-IN")} sq.ft</strong>
                </div>
                <input
                  type="range"
                  min="600"
                  max="6000"
                  step="50"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="est-slider-input"
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--color-text-muted)", marginTop: "6px" }}>
                  <span>600 sq.ft</span>
                  <span>2,400 sq.ft (40x60)</span>
                  <span>6,000 sq.ft</span>
                </div>
              </div>

              <div className="est-group">
                <div className="est-header-row">
                  <span>Number of Floors</span>
                  <span style={{ color: "var(--color-text-muted)" }}>Built-up: ~{totalBuiltUp.toLocaleString("en-IN")} sq.ft</span>
                </div>
                <div className="est-btn-grid">
                  {["Ground Floor", "G+1", "G+2"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      className={`est-select-btn ${floors === f ? "active" : ""}`}
                      onClick={() => setFloors(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="est-group">
                <div className="est-header-row">
                  <span>Finish Level / Specification</span>
                </div>
                <div className="est-btn-grid">
                  {FINISH_LEVELS.map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      className={`est-select-btn ${finishLevel.id === lvl.id ? "active" : ""}`}
                      onClick={() => setFinishLevel(lvl)}
                    >
                      <div>{lvl.name}</div>
                      <div style={{ fontSize: "11.5px", opacity: 0.8, marginTop: "2px" }}>₹{lvl.rate}/sq.ft</div>
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "12px", lineHeight: "1.5" }}>
                  {finishLevel.desc}
                </p>
              </div>
            </div>

            {/* Results Panel */}
            <div className="est-result-card">
              <div className="est-result-title">Indicative Construction Range</div>
              <div className="est-result-price">{formattedCost(totalCost)}</div>

              <div style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
                Estimated Rate: <strong>₹{finishLevel.rate} / sq.ft</strong> for ~{totalBuiltUp.toLocaleString("en-IN")} sq.ft total area.
              </div>

              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href={`https://wa.me/917760376348?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <FaWhatsapp /> Request Detailed BOQ on WhatsApp
                </a>
                <a
                  href="#contact"
                  className="btn-ghost"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Book Technical Site Visit
                </a>
              </div>

              <div className="est-disclaimer">
                * Indicative estimate. Final pricing depends on site conditions, drawings, structural specifications and material selection.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
