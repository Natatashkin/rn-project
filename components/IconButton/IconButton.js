import { Pressable, StyleSheet } from "react-native";

export default function IconButton({
  onPress,
  iconComponent,
  iconSize,
  iconColor,
  iconName,
}) {
  const Icon = iconComponent;
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 4,
  },
});
