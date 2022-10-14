import { useState, useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Font, { useFonts } from "expo-font";

const useFontsLoadedState = () => {
  // const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    // "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // useEffect(() => {
  //   async function loadFonts() {
  //     try {
  //       await Font.loadAsync({
  //         "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  //         "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  //       });

  //       setFontsLoaded(true);
  //     } catch (e) {
  //       console.warn("не звгрузилось");
  //     }
  //   }
  //   loadFonts();
  // }, []);

  return { fontsLoaded, onLayoutRootView };
};

export default useFontsLoadedState;
