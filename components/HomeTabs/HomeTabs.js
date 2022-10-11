import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen, CreatePostsScreen, ProfileScreen } from "../../screens";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Пости" component={PostsScreen} />
      <Tab.Screen name="Створити пост" component={CreatePostsScreen} />
      <Tab.Screen name="Профіль" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
