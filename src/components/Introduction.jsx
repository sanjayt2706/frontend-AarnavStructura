const Introduction = () => {
  return (
    <section style={{ padding: "64px 0", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <p style={{ fontSize: "20px", lineHeight: "1.6", color: "var(--color-text)", fontWeight: "500", marginBottom: "20px" }}>
          Every project starts with a different site, requirement and budget. Our role is to bring the architectural, structural and execution decisions together before work begins on site.
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-text-secondary)" }}>
          From planning and structural design to construction and site coordination, we help clients move through the project with clear responsibilities and documentation.
        </p>
      </div>
    </section>
  );
};

export default Introduction;
