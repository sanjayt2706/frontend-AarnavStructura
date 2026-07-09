import { useEffect, useState } from "react";

// Replicates the static site's nav scroll behavior: adds a shadow once
// the page has scrolled past 50px. Returns a boolean to apply the "up" class.
const useNavScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
};

export default useNavScroll;
