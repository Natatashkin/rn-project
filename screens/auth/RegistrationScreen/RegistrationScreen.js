import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
} from "react-native";

import {
  DEFAULT_REGISTRATION_FORM_VALUES,
  FORM_FIELDS_NAMES,
} from "../../constants";
import { useTheme } from "../../../context";
import { useKeyboardStatus } from "../../../hooks";
import {
  ImageBackground,
  InputText,
  Button,
  UserAvatar,
} from "../../../components";

export default function RegistrationScreen({ navigation: { navigate } }) {
  const { theme } = useTheme();
  const style = styles(theme);
  const { isKeyboardOpen } = useKeyboardStatus();
  const [formData, setFormData] = useState(DEFAULT_REGISTRATION_FORM_VALUES);
  const isIOS = Platform.OS === "ios";

  const handleInputText = (text, key) => {
    console.log(key);
    setFormData((prev) => {
      return {
        ...prev,
        [key]: text,
      };
    });
  };
  const handleSubmit = (e) => {
    console.log("submit");
  };
  console.log(formData);
  return (
    <ImageBackground>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, marginTop: isIOS ? 44 : 24 }}>
          <SafeAreaView style={style.container}>
            <KeyboardAvoidingView
              style={style.container}
              behavior={isIOS ? "padding" : "height"}
            >
              <View style={[style.screenLayout]}>
                <UserAvatar />
                <View style={style.formContainer}>
                  <Text style={style.title}>Реєстрація</Text>
                  <View style={style.form}>
                    <View style={style.formFieldContainer}>
                      <InputText
                        value={formData.name}
                        placeholder="Name"
                        onChangeText={(text) => handleInputText(text, "name")}
                      />
                    </View>

                    <View style={style.formFieldContainer}>
                      <InputText
                        value={formData.email}
                        placeholder="Email"
                        onChangeText={(text) =>
                          handleInputText(text, FORM_FIELDS_NAMES.email)
                        }
                        keyboardType="email-address"
                      />
                    </View>
                    <View>
                      <InputText
                        value={formData.password}
                        placeholder="Password"
                        onChangeText={(text) =>
                          handleInputText(text, FORM_FIELDS_NAMES.password)
                        }
                        secureTextEntry
                      />
                    </View>
                    <View style={style.buttonContainer}>
                      <Button onPress={handleSubmit} title="Sign Up!" />
                    </View>
                  </View>

                  <Text style={style.hasAccountText}>
                    Вже маєте аккаунт?{" "}
                    <Text
                      onPress={() => navigate("Login")}
                      style={style.hasAccountTextLink}
                    >
                      Увійти
                    </Text>{" "}
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
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
      justifyContent: "flex-end",
      marginTop: 48,
    },

    formContainer: {
      paddingTop: 92,
      backgroundColor: "white",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },

    title: {
      alignSelf: "center",
      marginBottom: 32,
      fontSize: 30,
      fontWeight: "500",
    },
    form: {
      marginHorizontal: 40,
    },
    formFieldContainer: {
      marginBottom: 16,
    },
    buttonContainer: {
      marginTop: 42,
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
