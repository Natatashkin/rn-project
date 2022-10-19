import { Text, StyleSheet } from "react-native";
import { useTheme } from "../../context";

export default function FormValidationError({ error }) {
  const { theme } = useTheme();
  const style = styles(theme);
  return <Text style={style.error}>{error}</Text>;
}

const styles = () =>
  StyleSheet.create({
    error: {
      color: "red",
    },
  });
