import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Introduction from "../components/Introduction.jsx";
import Services from "../components/Services.jsx";
import Process from "../components/Process.jsx";
import Projects from "../components/Projects.jsx";
import About from "../components/About.jsx";
import Engineers from "../components/Engineers.jsx";
import EngineeringApproach from "../components/EngineeringApproach.jsx";
import Testimonials from "../components/Testimonials.jsx";
import CostEstimator from "../components/CostEstimator.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import EffectsLayer from "../components/EffectsLayer.jsx";
import AiAssistant from "../components/AiAssistant.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

const Home = () => {
  useScrollReveal();
  return (
    <>
      <EffectsLayer />
      <Navbar />
      <Hero />
      <Introduction />
      <Services />
      <Process />
      <Projects />
      <About />
      <Engineers />
      <EngineeringApproach />
      <Testimonials />
      <CostEstimator />
      <Contact />
      <Footer />
      <AiAssistant />
    </>
  );
};

export default Home;
