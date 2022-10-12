import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen, CreatePostsScreen, ProfileScreen } from "../../screens";
import { MaterialIcons } from "@expo/vector-icons";
import { IconButton } from "../IconButton";
import { theme } from "../../theme";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const HOME_TABS_OPTIONS = {
  headerRightContainerStyle: {
    backgroundColor: "red",
    right: 10,
  },
  headerTitleContainerStyle: {
    backgroundColor: "green",
  },
  headerLeftContainerStyle: {
    backgroundColor: "blue",
    left: 10,
  },
  headerTitleStyle: {
    marginHorizontal: 10,
  },
  tabBarShowLabel: false,
};

export default function HomeTabs() {
  const {
    colors: { grey },
  } = theme;

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Tab.Navigator screenOptions={HOME_TABS_OPTIONS}>
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: "Пости",
          headerRight: () => (
            <IconButton
              onPress={handleLogout}
              iconComponent={MaterialIcons}
              iconSize={24}
              iconColor={grey}
              iconName={"logout"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{ headerTitle: "Створити пост" }}
      />
      <Tab.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{ headerTitle: "Профіль" }}
      />
    </Tab.Navigator>
  );
}
