import { useState } from "react";
import { submitEnquiry } from "../services/api";
import { useServices } from "./sections";

const EMPTY = { fullName: "", phoneNumber: "", email: "", location: "", projectType: "", budget: "", projectBrief: "" };

export default function ContactForm() {
  const services = useServices();
  const [f, setF] = useState(EMPTY);
  const [state, setState] = useState({ status: "idle", msg: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState({ status: "sending", msg: "" });
    try {
      await submitEnquiry(f);
      setF(EMPTY);
      setState({ status: "ok", msg: "Thank you — your enquiry has reached our engineers. We'll call you within one working day." });
    } catch (err) {
      const errs = err.response?.data?.errors;
      setState({
        status: "err",
        msg: errs?.length ? errs.map((x) => x.msg).join(". ") : err.response?.data?.message || "Something went wrong. Please call us or try again."
      });
    }
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="cf-name">Full name <i>*</i></label>
        <input id="cf-name" required value={f.fullName} onChange={set("fullName")} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="cf-phone">Phone <i>*</i></label>
        <input id="cf-phone" required type="tel" value={f.phoneNumber} onChange={set("phoneNumber")} autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" type="email" value={f.email} onChange={set("email")} autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="cf-loc">Site location</label>
        <input id="cf-loc" value={f.location} onChange={set("location")} placeholder="Town / area" />
      </div>
      <div className="field">
        <label htmlFor="cf-type">Project type</label>
        <select id="cf-type" value={f.projectType} onChange={set("projectType")}>
          <option value="">Select…</option>
          {services.map((s) => <option key={s.title}>{s.title}</option>)}
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-budget">Approximate budget</label>
        <select id="cf-budget" value={f.budget} onChange={set("budget")}>
          <option value="">Select…</option>
          <option>Under ₹25 lakh</option>
          <option>₹25 – 50 lakh</option>
          <option>₹50 lakh – 1 crore</option>
          <option>Above ₹1 crore</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div className="field full">
        <label htmlFor="cf-brief">Tell us about the project</label>
        <textarea id="cf-brief" rows={4} value={f.projectBrief} onChange={set("projectBrief")} placeholder="Plot size, number of floors, timeline…" />
      </div>
      {state.msg && <div className={`full form__msg form__msg--${state.status === "ok" ? "ok" : "err"}`} role="status">{state.msg}</div>}
      <div className="full" style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <button className="btn-block btn-block--maroon btn-block--sm" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <span className="form__note">We never share your details.</span>
      </div>
    </form>
  );
}
