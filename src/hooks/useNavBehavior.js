import { useEffect, useState, useRef } from "react";

// Tracks scroll direction + position.
// Returns { hidden, scrolled }:
//   hidden  → nav should shrink/fade (user scrolled down past threshold)
//   scrolled → nav has left the top (add shadow)
const useNavBehavior = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 50);
        // Hide after 120px scroll-down; always show when scrolling up
        if (y > lastY.current && y > 120) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, scrolled };
};

export default useNavBehavior;
