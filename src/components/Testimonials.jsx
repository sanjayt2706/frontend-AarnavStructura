const TESTIMONIALS = [
  {
    quote: "Aarnav Structura delivered our 3,200 sq ft villa on time and exactly within budget. The milestone billing system meant we always knew where our money was. Exceptional quality.",
    name: "Ramesh Gowda",
    role: "Villa Owner · Shivamogga",
    initials: "RG"
  },
  {
    quote: "From BBMP approvals to final handover, they managed everything. Our showroom fit-out was completed in 6 weeks flat. Professional, communicative, and precise.",
    name: "Preethi Shetty",
    role: "Retail Owner · Bengaluru",
    initials: "PS"
  },
  {
    quote: "The structural team's attention to IS code compliance gave us complete confidence. Regular site reports meant we were never in the dark. Highly recommend.",
    name: "Vivek Kamath",
    role: "Commercial Client · Mangaluru",
    initials: "VK"
  }
];

const Testimonials = () => (
  <section className="section-sm section-surface" id="testimonials">
    <div className="container">
      <div className="reveal" style={{ textAlign: "center" }}>
        <div className="s-eye" style={{ justifyContent: "center" }}>06 — Client voices</div>
        <h2 className="s-heading">What our <em>clients say</em></h2>
      </div>
      <div className="testi-grid reveal">
        {TESTIMONIALS.map((t) => (
          <div className="testi-card" key={t.name}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"{t.quote}"</div>
            <div className="testi-author">
              <div className="testi-av">{t.initials}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
