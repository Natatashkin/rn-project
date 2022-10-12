import { createContext } from "react";
import { theme } from "../theme";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
