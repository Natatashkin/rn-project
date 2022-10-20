import React, { useMemo, useState } from "react";
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
import { Formik } from "formik";
import {
  DEFAULT_REGISTRATION_FORM_VALUES,
  FORM_FIELDS_NAMES,
} from "../../constants";
import { useTheme, useUser } from "../../../context";
import { useKeyboardStatus } from "../../../hooks";
import { registrationSchema } from "../../../schemas";
import {
  ImageBackground,
  InputText,
  Button,
  UserAvatar,
  RegistrationForm,
} from "../../../components";

export default function RegistrationScreen({ navigation: { navigate } }) {
  const { theme } = useTheme();
  const style = styles(theme);
  const { isKeyboardOpen } = useKeyboardStatus();
  const { registerUser } = useUser();
  const isIOS = Platform.OS === "ios";
  const isAndroid = Platform.OS === "android";

  const viewTopMargin = isIOS ? 48 : 24;
  // const bottomPadding = isIOS ? 0 : 24;
  // const bottomMargin = isIOS ? 16 : 0;
  // { paddingBottom: bottomPadding }
  console.log(isKeyboardOpen);
  return (
    <ImageBackground>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[style.container, { marginTop: viewTopMargin }]}>
          <KeyboardAvoidingView style={style.container} behavior="padding">
            <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
              <ScrollView contentContainerStyle={[style.screenLayout]}>
                <UserAvatar />
                <View style={[style.formLayout]}>
                  <Text style={style.title}>Реєстрація</Text>
                  <RegistrationForm />
                  <Text
                    style={[
                      style.hasAccountText,
                      // { marginBottom: isKeyboardOpen ? 16 : 0 },
                    ]}
                  >
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
