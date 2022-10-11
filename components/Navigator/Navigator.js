import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { HomeScreen, RegistrationScreen } from "../../screens";
import { HomeTabs } from "../HomeTabs";

const MainStack = createStackNavigator();

export default function Navigator() {
  const { isLoggedIn } = useContext(UserContext);
  console.log("isLoggedIn", isLoggedIn);
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {isLoggedIn ? (
          <MainStack.Screen name="Home" component={HomeTabs} />
        ) : (
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
