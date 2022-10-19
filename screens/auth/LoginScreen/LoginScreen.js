import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { DEFAULT_LOGIN_FORM_VALUES, FORM_FIELDS_NAMES } from "../../constants";
import {
  ImageBackground,
  LoginForm,
  InputText,
  Button,
} from "../../../components";
import { useKeyboardStatus } from "../../../hooks";
import { useTheme, useUser } from "../../../context";
import { AUTH_ERRORS } from "../../constants";

export default function LoginScreen({ navigation: { navigate } }) {
  const { theme } = useTheme();
  const style = styles(theme);
  const { isKeyboardOpen } = useKeyboardStatus();

  const isIOS = Platform.OS === "ios";
  const formPosition = useMemo(
    () => (isKeyboardOpen ? "flex-start" : "flex-end"),
    [isKeyboardOpen]
  );

  return (
    <ImageBackground>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[style.container, { marginTop: isIOS ? 100 : 24 }]}>
          <KeyboardAvoidingView style={style.container} behavior="padding">
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={[style.screenLayout, { justifyContent: formPosition }]}
              >
                <View style={style.formLayout}>
                  <Text style={style.title}>Вхід</Text>
                  {/*  */}
                  <LoginForm />
                  <Text style={style.hasAccountText}>
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
