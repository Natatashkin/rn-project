import React, { useMemo, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme, useUser } from "../../../context";
import { useKeyboardStatus } from "../../../hooks";
import {
  ImageBackground,
  UserAvatar,
  RegistrationForm,
} from "../../../components";

export default function RegistrationScreen({ navigation: { navigate } }) {
  const { theme } = useTheme();
  const style = styles(theme);
  const { isKeyboardOpen } = useKeyboardStatus();
  const { registerUser } = useUser();
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
            <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
              <ScrollView contentContainerStyle={[style.screenLayout]}>
                <UserAvatar />
                <View style={[style.formLayout, setBottomPadding]}>
                  <Text style={style.title}>Реєстрація</Text>
                  <RegistrationForm wasFocused={wasFocused} />

                  <Text style={[style.hasAccountText, { marginBottom: 16 }]}>
                    Вже маєте аккаунт?{" "}
                    <Text
                      onPress={() => navigate("Login")}
                      style={style.hasAccountTextLink}
                    >
                      Увійти
                    </Text>{" "}
                  </Text>
                </View>
              </ScrollView>
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
      paddingTop: 92,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      // paddingBottom: 16,
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
