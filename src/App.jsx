import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import { trackPageview } from "./services/api";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageview();
  }, []);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      <Home />
    </>
  );
}

export default App;