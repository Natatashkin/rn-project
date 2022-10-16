import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context";
import { IconButton } from "../IconButton";

export default function UserAvatar() {
  const { theme } = useTheme();
  const style = styles(theme);
  return (
    <View style={style.avatar}>
      <View style={style.avatarImage}>
        <Feather name="user" size={150} color={style.userIcon.color} />
      </View>
      <View style={{ position: "absolute", right: -12, bottom: 14 }}>
        <IconButton
          iconComponent={Feather}
          iconSize={24}
          iconColor={style.addIcon.color}
          iconName="plus-circle"
        />
      </View>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    avatar: {
      width: 150,
      height: 150,
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.lightGrey,
      borderRadius: 16,
      marginBottom: -75,
      zIndex: 2,
    },
    avatarImage: {
      flex: 1,
      justifyContent: "center",
    },
    userIcon: {
      color: theme.colors.grey,
    },
    addIcon: {
      color: theme.colors.lightBlue,
    },
  });
