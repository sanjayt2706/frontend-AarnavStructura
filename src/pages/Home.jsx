import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Ticker from "../components/Ticker.jsx";
import Services from "../components/Services.jsx";
import About from "../components/About.jsx";
import Process from "../components/Process.jsx";
import Projects from "../components/Projects.jsx";
import Engineers from "../components/Engineers.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Brochure from "../components/Brochure.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import EffectsLayer from "../components/EffectsLayer.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

const Home = () => {
  useScrollReveal();
  return (
    <>
      <EffectsLayer />
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <About />
      <Process />
      <Projects />
      <Engineers />
      <Testimonials />
      <Brochure />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
