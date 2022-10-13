import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect, useMemo } from "react";
import { UserContext } from "../../context";
import { useFontsLoadedState } from "../../hooks";
import { HomeScreen, RegistrationScreen, LoginScreen } from "../../screens";
import { HomeTabs } from "../HomeTabs";

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

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <MainStack.Screen name="Home" component={HomeTabs} />
        ) : (
          <>
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
            <MainStack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
