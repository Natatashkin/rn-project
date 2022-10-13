import {
  ImageBackground as Background,
  StyleSheet,
  Dimensions,
} from "react-native";

export default function ImageBackground({ children }) {
  return (
    <Background
      style={styles.background}
      source={require("../../assets/images/imageBackground.jpeg")}
      resizeMode="cover"
      resizeMethod="resize"
    >
      {children}
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
