import HERO_BG from "../assets/hero-logo.png";
import useCounter from "../hooks/useCounter";

const Stat = ({ target, suffix, label }) => {
  const { ref, value } = useCounter(target);

  return (
    <div className="hstat">
      <div className="hstat-n" ref={ref}>
        {value}
        {value >= target ? suffix : ""}
      </div>

      <div className="hstat-l">{label}</div>
    </div>
  );
};

const Word = ({ children, delay, gold }) => (
  <span
    className={`word-animate${gold ? " word-gold" : ""}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </span>
);

const Hero = () => {
  return (
    <section className="hero" id="home">
      {/* LEFT */}
      <div className="hero-l">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-check">✓</span>
          Shivamogga, Karnataka — Established 2020
        </div>

        <h1 className="hero-h1">
          <div>
            <Word delay={150}>BUILT</Word>{" "}
            <Word delay={260}>ON</Word>{" "}
            <Word delay={370} gold>
              TRUST.
            </Word>
          </div>

          <div>
            <Word delay={520}>DELIVERED</Word>{" "}
            <Word delay={630}>WITH</Word>{" "}
            <Word delay={740} gold>
              PRECISION.
            </Word>
          </div>
        </h1>

        <p className="hero-body">
          Aarnav Structura is Shivamogga's premier construction and civil
          engineering firm — combining technical excellence, transparent
          process, and client-first delivery across Karnataka.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Start your project
          </a>

          <a href="#portfolio" className="btn-ghost">
            View our work
          </a>
        </div>

        <div className="hero-trust">
          <span>SUDA / BBMP Approved</span>

          <span className="hero-trust-dot">•</span>

          <span>IS Code Compliant</span>

          <span className="hero-trust-dot">•</span>

          <span>Licensed &amp; Insured</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-r">
        <div className="hero-r-logo-bg">
          <img
            src={HERO_BG}
            alt="Aarnav Structura"
            loading="eager"
          />
        </div>

        <div className="hero-r-overlay"></div>

        <div className="hero-r-grid"></div>

        <div className="hero-location">
          📍 Shivamogga · Karnataka · India
        </div>

        <div className="hero-stats">
          <Stat target={50} suffix="+" label="Projects Delivered" />

          <Stat target={10} suffix="+" label="Expert Team" />

          <Stat target={100} suffix="%" label="IS Compliant" />

          <Stat target={5} suffix="+" label="Yrs Avg Experience" />
        </div>
      </div>
    </section>
  );
};

export default Hero;