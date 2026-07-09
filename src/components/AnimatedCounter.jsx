import { useEffect, useRef, useState } from "react";

// Replicates the static site's counter animation:
// counts up from 0 to `target` once the element is 50% visible,
// appending "%" if isPercent is true, otherwise "+".
// Step size and interval (28ms) match the original exactly.
const AnimatedCounter = ({ target, isPercent = false, className }) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done) return;

          let n = 0;
          const step = Math.max(1, Math.ceil(target / 55));
          const interval = setInterval(() => {
            n = Math.min(n + step, target);
            setValue(n);
            if (n >= target) {
              clearInterval(interval);
              setDone(true);
            }
          }, 28);

          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const suffix = value >= target ? (isPercent ? "%" : "+") : "";

  return (
    <div ref={ref} className={className}>
      {value}{suffix}
    </div>
  );
};

export default AnimatedCounter;
