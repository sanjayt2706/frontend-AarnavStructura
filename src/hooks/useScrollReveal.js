import { useEffect } from "react";

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const observeElements = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (!el.classList.contains("in")) {
          observer.observe(el);
        }
      });
    };

    // Initial observation
    observeElements();

    // Watch for new .reveal elements added to the DOM
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};

export default useScrollReveal;
