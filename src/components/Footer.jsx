const Footer = () => (
  <footer>
    <div className="footer-main">
      <div>
        <span className="f-logo-name">Aarnav <span>Structura</span></span>
        <div className="f-tagline">
          Premium construction and civil engineering headquartered in
          Shivamogga, Karnataka. Building excellence across the state.
        </div>
      </div>
      <div className="f-col">
        <div className="f-col-title">Services</div>
        <ul>
          <li><a href="#services">Residential</a></li>
          <li><a href="#services">Commercial</a></li>
          <li><a href="#services">Structural</a></li>
          <li><a href="#services">Architecture</a></li>
          <li><a href="#services">Renovation</a></li>
        </ul>
      </div>
      <div className="f-col">
        <div className="f-col-title">Company</div>
        <ul>
          <li><a href="#about">About us</a></li>
          <li><a href="#process">Our process</a></li>
          <li><a href="#portfolio">Projects</a></li>
          <li><a href="#team">Meet the team</a></li>
          <li><a href="#brochure">Brochure</a></li>
        </ul>
      </div>
      <div className="f-col">
        <div className="f-col-title">Contact</div>
        <ul>
          <li><a href="tel:+917760376348">+91 77603 76348</a></li>
          <li><a href="tel:+918762398728">+91 87623 98728</a></li>
          <li><a href="mailto:satvikrajgowda282@gmail.com">satvikrajgowda282@gmail.com</a></li>
          <li><a href="https://wa.me/918762398728">WhatsApp Us</a></li>
          <li><a href="https://anrvictoriumgroup.netlify.app" style={{ color: "var(--gold-lt)" }}>ANR Victorium Group ↗</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bar">
      <span>© {new Date().getFullYear()} Aarnav Structura · A subsidiary of <a href="https://anrvictoriumgroup.netlify.app" style={{ color: "var(--gold-lt)" }}>ANR Victorium Group</a> · Shivamogga, Karnataka</span>
      <span>Built with precision. Delivered with integrity.</span>
    </div>
  </footer>
);

export default Footer;
