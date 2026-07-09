const ITEMS = [
  "Residential Construction", "Commercial Fit-outs", "Structural Engineering",
  "SUDA Approved", "Interior Design", "Project Management",
  "Civil Works", "IS Code Compliant", "Shivamogga · Karnataka"
];

const Ticker = () => {
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {all.map((item, i) => (
          <span key={i}>{item}<span className="dot">&nbsp;◆&nbsp;</span></span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
