import React, { useState, useMemo } from "react";
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
} from "react-native";
import { DEFAULT_LOGIN_FORM_VALUES, FORM_FIELDS_NAMES } from "../../constants";
import { ImageBackground, InputText, Button } from "../../../components";
import { useKeyboardStatus } from "../../../hooks";
import { useTheme } from "../../../context";

export default function LoginScreen({ navigation: { navigate } }) {
  const { theme } = useTheme();
  const style = styles(theme);
  const { isKeyboardOpen } = useKeyboardStatus();
  const [formData, setFormData] = useState(DEFAULT_LOGIN_FORM_VALUES);
  const isIOS = Platform.OS === "ios";
  const formPosition = useMemo(
    () => (isKeyboardOpen ? "flex-start" : "flex-end"),
    [isKeyboardOpen]
  );

  const handleInputText = (text, key) => {
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
                  <ScrollView contentContainerStyle={style.form}>
                    <View style={style.formFieldContainer}>
                      <InputText
                        value={formData.email}
                        placeholder="Електронна адреса"
                        onChangeText={(text) =>
                          handleInputText(text, FORM_FIELDS_NAMES.email)
                        }
                        keyboardType="email-address"
                      />
                    </View>
                    <View>
                      <InputText
                        value={formData.password}
                        placeholder="Пароль"
                        onChangeText={(text) =>
                          handleInputText(text, FORM_FIELDS_NAMES.password)
                        }
                        secureTextEntry
                      />
                    </View>
                    <View style={style.buttonContainer}>
                      <Button onPress={handleSubmit} title="Sign Up!" />
                    </View>
                  </ScrollView>

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
      // fontFamily: "Roboto-Medium",
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
