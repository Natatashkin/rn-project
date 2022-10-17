import React, { useContext, useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext } from "../../context";
import { useFontsLoadedState } from "../../hooks";
import RegistrationScreen from "../../screens/auth/RegistrationScreen/RegistrationScreen";
import LoginScreen from "../../screens/auth/LoginScreen/LoginScreen";
import HomeTabs from "../../screens/home/HomeTabs/HomeTabs";

const MainStack = createStackNavigator();

export default function Navigator() {
  const { isLoggedIn } = useContext(UserContext);
  const { fontsLoaded, onLayoutRootView } = useFontsLoadedState();

  const isReady = useMemo(
    () => isLoggedIn && fontsLoaded,
    [isLoggedIn, fontsLoaded]
  );

  useEffect(() => {
    if (isReady || fontsLoaded) {
      onLayoutRootView();
    }
  }, [isReady, fontsLoaded]);

  // console.log("fontsLoaded", fontsLoaded);

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <MainStack.Screen name="Home" component={HomeTabs} />
        ) : (
          <>
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
