import "react-native-gesture-handler";
import React, { useEffect, useCallback } from "react";
import UserProvider from "./context/UserContext";
import { Navigator } from "./components/Navigator";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
}
