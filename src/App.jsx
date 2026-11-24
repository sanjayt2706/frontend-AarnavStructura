import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SiteContentProvider, useSite } from "./content/SiteContent";
import { trackPageview } from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AiAssistant from "./components/AiAssistant";
import { EASE } from "./components/primitives";
import { Home, About, WhatWeDo, Projects, ProjectDetail, GalleryPage, Team, Contact, NotFound } from "./pages/pages";

function Page({ children }) {
  return (
    <motion.main id="main" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.25 } }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      {children}
    </motion.main>
  );
}

/** Shown only on a first visit, for at most a few seconds, while content loads. */
function Splash() {
  return (
    <motion.div className="splash" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }} aria-label="Loading">
      <img src="/brand/mark-white.png" alt="" className="splash__mark" />
      <span className="splash__bar"><span /></span>
    </motion.div>
  );
}

function Routed() {
  const location = useLocation();
  const { hasData } = useSite();

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);

  if (!hasData) {
    return <AnimatePresence><Splash /></AnimatePresence>;
  }

  return (
    <>
      <Header />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/what-we-do" element={<Page><WhatWeDo /></Page>} />
          <Route path="/projects" element={<Page><Projects /></Page>} />
          <Route path="/projects/:id" element={<Page><ProjectDetail /></Page>} />
          <Route path="/gallery" element={<Page><GalleryPage /></Page>} />
          <Route path="/team" element={<Page><Team /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      {/* maroon wipe between pages */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="curtain"
          initial={{ scaleY: 1, transformOrigin: "top" }}
          animate={{ scaleY: 0, transition: { duration: 0.7, ease: EASE, delay: 0.1 } }}
          exit={{ scaleY: 0 }}
        />
      </AnimatePresence>
      <Footer />
      <AiAssistant />
    </>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <BrowserRouter>
        <Routed />
      </BrowserRouter>
    </SiteContentProvider>
  );
}
