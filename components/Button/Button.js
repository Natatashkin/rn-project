import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context";

export default function Button({ onPress, title }) {
  const { theme } = useTheme();
  const style = styles(theme);

  return (
    <Pressable style={style.button} onPress={onPress}>
      <Text style={style.title}>{title}</Text>
    </Pressable>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      padding: 12,
      backgroundColor: theme.colors.lightBlue,
      borderRadius: 100,
    },
    title: {
      ...theme.primaryText,
      color: theme.colors.white,
      fontWeight: "500",
    },
  });
