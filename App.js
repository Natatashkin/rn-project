import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { RegistrationScreen } from "./screens";
import UserProvider from "./context/UserContext";
import { Navigator } from "./components/Navigator";

export default function App() {
  return (
    <UserProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* <RegistrationScreen /> */}
        <Navigator />
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
