import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { UserContext, useTheme } from "../../../context";
// import { PostsScreen, CreatePostsScreen, ProfileScreen } from "../../screens";
import { HOME_TABS_OPTIONS } from "../../constants";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { IconButton } from "../../../components";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { logoutUser } = useContext(UserContext);
  const { theme } = useTheme();

  const handleLogout = async () => {
    console.log("logout");
    await logoutUser();
  };

  return (
    <Tab.Navigator screenOptions={HOME_TABS_OPTIONS}>
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: "Пости",
          headerRight: () => (
            <IconButton onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color={theme.color.grey} />
            </IconButton>
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
