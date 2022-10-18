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
import { ImageBackground, InputText, Button } from "../../../components";
import { useKeyboardStatus } from "../../../hooks";
import { useTheme, useUser } from "../../../context";
import { AUTH_ERRORS } from "../../constants";

export default function LoginScreen({ navigation: { navigate } }) {
  const { theme } = useTheme();
  const style = styles(theme);
  const { isKeyboardOpen } = useKeyboardStatus();

  const { loginUser } = useUser();
  const [formData, setFormData] = useState(DEFAULT_LOGIN_FORM_VALUES);
  const [authError, setAuthError] = useState(null);

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

  const handleLoginError = () => {
    switch (authError) {
      case AUTH_ERRORS.noUser:
        Alert.alert("Помилка входу", authError, [
          { text: "Реєструватися", onPress: () => navigate("Registration") },
          { text: "Відмінити", onPress: () => setAuthError(null) },
        ]);
        break;
      case AUTH_ERRORS.userError:
        Alert.alert("Помилка входу", authError, [{ text: "Ok" }]);
        break;
      default:
        Alert.alert("Помилка входу", authError, [{ text: "Ok" }]);
        return;
    }
  };

  const handleSubmit = async () => {
    try {
      await loginUser(formData);
    } catch (error) {
      setAuthError(error?.message || AUTH_ERRORS.serverError);
    }
  };

  useEffect(() => {
    console.log("authError >>>", authError);
    if (authError) {
      handleLoginError();
    }
  }, [authError]);

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
                      <Button onPress={handleSubmit} title="Увійти" />
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
