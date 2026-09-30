import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane, FaWhatsapp, FaUserTie, FaCheckCircle } from "react-icons/fa";
import { consultAi, handoffAi } from "../services/api";
import { ConcentricRing } from "./ui/ConcentricRing";
import { TextShimmer } from "./ui/TextShimmer";

const INITIAL_MESSAGES = [
  {
    sender: "bot",
    text: "Hello. I'm the Aarnav Structura Project Assistant. I can help you understand our services, prepare a preliminary project estimate, and connect you with our engineering team.",
    actions: ["Estimate Project Cost", "Understand Our Services", "Request a Site Visit", "Speak to an Engineer"]
  }
];

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHandoffModal, setShowHandoffModal] = useState(false);
  const [handoffForm, setHandoffForm] = useState({ fullName: "", phoneNumber: "", email: "", location: "" });
  const [handoffStatus, setHandoffStatus] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const [loadingText, setLoadingText] = useState("Consultant is reviewing project parameters...");

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMessages = [...messages, { sender: "user", text: query }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setLoadingText("Consultant is evaluating specifications...");

    const qLower = query.toLowerCase();

    if (query === "Speak to an Engineer" || qLower.includes("speak to an engineer") || qLower.includes("callback") || qLower.includes("talk to engineer")) {
      setTimeout(() => {
        setLoading(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "I can connect you directly with our engineering team. You can message us on WhatsApp or request a direct callback.",
            isHandoff: true
          }
        ]);
      }, 1000);
      return;
    }

    // Step sequence for thinking loader
    const t1 = setTimeout(() => setLoadingText("Referencing Karnataka civil & structural codes..."), 600);
    const t2 = setTimeout(() => setLoadingText("Formulating project response..."), 1200);

    const startTime = Date.now();

    try {
      const res = await consultAi(query, newMessages);
      const elapsedTime = Date.now() - startTime;
      const minDelay = Math.max(0, 1400 - elapsedTime);

      setTimeout(() => {
        if (res.success && res.reply) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: res.reply,
              actions: ["Estimate Project Cost", "Understand Our Services", "Request a Site Visit", "Speak to an Engineer"]
            }
          ]);
        } else {
          throw new Error("Invalid response");
        }
        setLoading(false);
      }, minDelay);
    } catch (err) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "I'm having trouble retrieving full details right now. Please try again, or contact the Aarnav Structura engineering desk directly."
          }
        ]);
        setLoading(false);
      }, 1000);
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
    }
  };

  const handleHandoffSubmit = async (e) => {
    e.preventDefault();
    if (!handoffForm.fullName || !handoffForm.phoneNumber) return;

    setLoading(true);
    try {
      const summary = messages.map((m) => `${m.sender}: ${m.text}`).join("\n");
      await handoffAi({ ...handoffForm, conversationSummary: summary });
      setHandoffStatus("success");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Thank you, ${handoffForm.fullName}. Your project enquiry has been submitted. An engineer from Aarnav Structura will contact you at ${handoffForm.phoneNumber}.`
        }
      ]);
      setTimeout(() => {
        setShowHandoffModal(false);
        setHandoffStatus(null);
      }, 2500);
    } catch (err) {
      setHandoffStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const whatsappText = encodeURIComponent("Hello Aarnav Structura! I was using the Project Assistant on your website and would like to speak with an engineer.");

  return (
    <>
      {/* Subtle Floating Trigger */}
      <button
        type="button"
        className="ai-trigger-fab"
        onClick={() => setIsOpen(true)}
        aria-label="Chat with Assistant"
      >
        <span className="ai-pulse-dot" />
        <span>Chat with Assistant →</span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="ai-modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="ai-chat-card" onClick={(e) => e.stopPropagation()}>
            {/* Minimalist Header */}
            <div className="ai-chat-header">
              <div className="ai-header-title">
                <div className="logo-mark" style={{ width: "26px", height: "26px", fontSize: "11px" }}>AS</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600" }}>Aarnav Structura</div>
                  <div style={{ fontSize: "11px", opacity: 0.85 }}>Project Assistant</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{ color: "inherit", fontSize: "16px", padding: "4px" }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat-body">
              {messages.map((m, idx) => (
                <div key={idx} className={`ai-msg ${m.sender}`}>
                  <div style={{ whiteSpace: "pre-line" }}>{m.text}</div>

                  {m.actions && m.actions.length > 0 && (
                    <div className="ai-prompt-chips">
                      {m.actions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          className="ai-chip-btn"
                          onClick={() => handleSend(act)}
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.isHandoff && (
                    <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <a
                        href={`https://wa.me/917760376348?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-accent"
                        style={{ fontSize: "13px", padding: "8px 12px", justifyContent: "center" }}
                      >
                        <FaWhatsapp /> Chat on WhatsApp
                      </a>
                      <button
                        type="button"
                        className="btn-ghost"
                        style={{ fontSize: "13px", padding: "8px 12px" }}
                        onClick={() => setShowHandoffModal(true)}
                      >
                        <FaUserTie /> Request Engineer Callback
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="ai-msg bot" style={{ fontSize: "13px", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <ConcentricRing style={{ width: "16px", height: "16px", color: "var(--color-accent)" }} />
                  <TextShimmer duration={1.8} baseColor="var(--color-text-secondary)" shimmerColor="var(--color-accent)">
                    {loadingText}
                  </TextShimmer>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Input Footer */}
            <form
              className="ai-chat-footer"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                className="ai-input"
                placeholder="Ask about project requirements, pricing, site visits..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: "0 14px" }}>
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Callback Modal */}
      {showHandoffModal && (
        <div className="ai-modal-backdrop" onClick={() => setShowHandoffModal(false)} style={{ zIndex: 350 }}>
          <div
            className="contact-form"
            style={{ maxWidth: "440px", width: "100%", margin: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", color: "var(--color-text)", fontWeight: "600" }}>Request Engineer Callback</h3>
              <button type="button" onClick={() => setShowHandoffModal(false)}>
                <FaTimes style={{ fontSize: "16px", color: "var(--color-text-muted)" }} />
              </button>
            </div>

            {handoffStatus === "success" ? (
              <div className="toast-feedback toast-success">
                <FaCheckCircle /> Request submitted successfully.
              </div>
            ) : (
              <form onSubmit={handleHandoffSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Ramesh Gowda"
                    value={handoffForm.fullName}
                    onChange={(e) => setHandoffForm({ ...handoffForm, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    placeholder="e.g. +91 98765 43210"
                    value={handoffForm.phoneNumber}
                    onChange={(e) => setHandoffForm({ ...handoffForm, phoneNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Location / City</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Shivamogga"
                    value={handoffForm.location}
                    onChange={(e) => setHandoffForm({ ...handoffForm, location: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-accent"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  {loading ? "Submitting..." : "Request Callback"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
