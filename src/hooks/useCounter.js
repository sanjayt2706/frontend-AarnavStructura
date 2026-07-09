import { useEffect, useRef, useState } from "react";

const useCounter = (target) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        let n = 0;
        const step = Math.max(1, Math.ceil(target / 55));
        const id = setInterval(() => {
          n = Math.min(n + step, target);
          setValue(n);
          if (n >= target) clearInterval(id);
        }, 28);
        observer.unobserve(el);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return { ref, value };
};

export default useCounter;
