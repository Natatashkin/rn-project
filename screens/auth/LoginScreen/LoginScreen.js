import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Platform,
} from "react-native";
import { ImageBackground } from "../../../components";
import LoginForm from "../../../components/LoginForm/LoginForm";
import { useKeyboardStatus } from "../../../hooks";
import { useTheme } from "../../../context";

export default function LoginScreen({ navigation: { navigate } }) {
  const { theme } = useTheme();
  const style = styles(theme);
  const { isKeyboardOpen } = useKeyboardStatus();
  const [isFocusedInput, setIsFocusedInput] = useState(false);

  const isIOS = Platform.OS === "ios";
  const isAndroid = Platform.OS === "android";

  const viewTopMargin = isIOS ? 48 : 24;
  const setBottomPadding =
    isFocusedInput && isIOS
      ? { paddingBottom: 48 }
      : isKeyboardOpen && isAndroid
      ? { paddingBottom: 24 }
      : null;

  const wasFocused = (data) => {
    setIsFocusedInput(data);
  };

  return (
    <ImageBackground>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[style.container, { marginTop: viewTopMargin }]}>
          <KeyboardAvoidingView style={style.container} behavior="padding">
            <SafeAreaView style={{ flex: 1 }}>
              <View style={[style.screenLayout]}>
                <View style={[style.formLayout, setBottomPadding]}>
                  <Text style={style.title}>Вхід</Text>
                  {/*  */}
                  <LoginForm wasFocused={wasFocused} />
                  <Text style={[style.hasAccountText, { marginBottom: 16 }]}>
                    Ще не зареєстровані?{" "}
                    <Text
                      onPress={() => navigate("Registration")}
                      style={style.hasAccountTextLink}
                    >
                      Реєструватися
                    </Text>{" "}
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "transparent",
    },
    screenLayout: {
      flex: 1,
      justifyContent: "flex-end",
    },

    formLayout: {
      paddingTop: 32,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingBottom: 45,
    },

    title: {
      alignSelf: "center",
      marginBottom: 32,
      fontSize: 30,
      fontWeight: "500",
    },

    hasAccountText: {
      ...theme.primaryText,
      alignSelf: "center",
      marginTop: 16,
    },
    hasAccountTextLink: {
      color: theme.colors.lightBlue,
    },
  });
