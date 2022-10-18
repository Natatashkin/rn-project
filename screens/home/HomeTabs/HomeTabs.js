import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { useUser, useTheme } from "../../../context";
import { HOME_TABS_OPTIONS } from "../../constants";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { IconButton } from "../../../components";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { logoutUser } = useUser();
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
            <View>
              <IconButton onPress={handleLogout}>
                <MaterialIcons
                  name="logout"
                  size={24}
                  color={theme.colors.grey}
                />
              </IconButton>
            </View>
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
