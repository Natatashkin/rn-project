import "react-native-gesture-handler";
import { UserProvider } from "./context";
import { ThemeProvider } from "./context";
import Navigator from "./components/Navigator/Navigator";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </UserProvider>
  );
}
