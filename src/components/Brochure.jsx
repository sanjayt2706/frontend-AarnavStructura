// SETUP: Place your brochure PDF at /public/aarnav-structura-brochure.pdf
// When Vite builds, anything in /public/ is served at the root URL.
// So the download link below will just work once you drop the PDF in.
const BROCHURE_URL = "/aarnav-structura-brochure.pdf";

const Brochure = () => (
  <section className="brochure-wrap" id="brochure">
    <div className="brochure-inner">
      <div className="brochure-left reveal">
        <div className="brochure-tag">07 — Company resources</div>
        <h2 className="brochure-title">Download our<br />Company Brochure</h2>
        <p className="brochure-desc">
          Everything you need to know about Aarnav Structura — our services,
          process, team credentials, past projects, and what to expect when
          you work with us. 8 pages, print-ready PDF.
        </p>
      </div>

      <div className="brochure-right reveal">
        <a
          href={"https://drive.google.com/file/d/16CTTtaOIfeLomfDBjm7liNxN1B3gETKR/view"}
          download="Aarnav-Structura-Brochure.pdf"
          className="btn-download"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Brochure (PDF)
        </a>
        <span className="brochure-note">
          PDF · ~2MB · No signup required
        </span>
      </div>
    </div>
  </section>
);

export default Brochure;
