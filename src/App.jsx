import { useEffect } from "react";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import { trackPageview } from "./services/api";

function App() {
  useEffect(() => {
    trackPageview();
  }, []);

  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;