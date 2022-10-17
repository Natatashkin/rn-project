import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context";
import { IconButton } from "../IconButton";

export default function UserAvatar() {
  const { theme } = useTheme();
  const style = styles(theme);
  const handleAvatarAdd = () => {
    console.log("add avatar");
  };
  return (
    <View style={style.avatar}>
      <View style={style.avatarImage}>
        <Feather name="user" size={150} color={theme.colors.grey} />
      </View>
      <View style={style.addButtonContainer}>
        <IconButton onPress={handleAvatarAdd}>
          <Feather
            name="plus-circle"
            size={24}
            color={theme.colors.lightBlue}
          />
        </IconButton>
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
    addButtonContainer: {
      position: "absolute",
      right: -20,
      bottom: 10,
      width: 40,
      height: 40,
    },
  });
