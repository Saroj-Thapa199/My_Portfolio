import React, { createContext, useContext, useEffect, useState } from "react";

const initialState = {
   theme: "system",
   setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

const ThemeProvider = ({
   children,
   defaultTheme = "dark",
   storageKey = "vite-ui-theme",
   ...props
}) => {
   const [theme, setThemeState] = useState(
      () => localStorage.getItem(storageKey) || defaultTheme
   );

   useEffect(() => {
      const root = window.document.documentElement;

      root.classList.remove("light", "dark");

      let newTheme = theme;

      if (theme === "system") {
         newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
      }

      if (["light", "dark"].includes(newTheme)) {
         root.classList.add(newTheme);
      }
   }, [theme]);

   const setTheme = (newTheme) => {
      if (["light", "dark", "system"].includes(newTheme)) {
         localStorage.setItem(storageKey, newTheme);
         setThemeState(newTheme);
      }
   };

   const value = {
      theme,
      setTheme,
   };

   return (
      <ThemeProviderContext.Provider value={value} {...props}>
         {children}
      </ThemeProviderContext.Provider>
   );
};

const useTheme = () => {
   const context = useContext(ThemeProviderContext);

   if (context === undefined)
      throw new Error("useTheme must be used within a ThemeProvider");

   return context;
};

export { ThemeProvider, useTheme };
