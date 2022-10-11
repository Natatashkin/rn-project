import "react-native-gesture-handler";
import UserProvider from "./context/UserContext";
import ThemeContext from "./context/ThemeContext";
import theme from "./theme/theme";
import { Navigator } from "./components/Navigator";

export default function App() {
  return (
    <ThemeContext.Provider value={{ theme }}>
      <UserProvider>
        <Navigator />
      </UserProvider>
    </ThemeContext.Provider>
  );
}
