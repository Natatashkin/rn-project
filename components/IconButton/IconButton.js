import { Pressable, StyleSheet } from "react-native";

export default function IconButton({ onPress, children }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
