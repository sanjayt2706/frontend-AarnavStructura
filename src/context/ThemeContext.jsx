import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("aarnav_theme_mode") || "system";
  });

  const [activeTheme, setActiveTheme] = useState("light");

  useEffect(() => {
    const getSystemTheme = () =>
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    let resolved = themeMode;
    if (themeMode === "system") {
      resolved = getSystemTheme();
    }

    setActiveTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    localStorage.setItem("aarnav_theme_mode", themeMode);

    if (themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        const newSys = e.matches ? "dark" : "light";
        setActiveTheme(newSys);
        document.documentElement.setAttribute("data-theme", newSys);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};
