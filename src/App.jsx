import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import { trackPageview } from "./services/api";

function App() {
  useEffect(() => {
    trackPageview();
  }, []);

  return <Home />;
}
export default App;
