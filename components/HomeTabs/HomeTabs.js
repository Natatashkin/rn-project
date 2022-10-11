import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen, CreatePostsScreen, ProfileScreen } from "../../screens";
import { MaterialIcons } from "@expo/vector-icons";
import { IconButton } from "../IconButton";
import ThemeContext from "../../context/ThemeContext";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const {
    theme: {
      colors: { darkGrey, blue },
    },
  } = useContext(ThemeContext);
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Tab.Navigator
      screenOptions={{
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
      }}
    >
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
              iconColor={darkGrey}
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
