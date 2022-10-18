import { createContext, useContext } from "react";
import theme from "./constants";

export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
