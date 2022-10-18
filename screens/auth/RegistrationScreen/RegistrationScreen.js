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

import {
  DEFAULT_REGISTRATION_FORM_VALUES,
  FORM_FIELDS_NAMES,
} from "../../constants";
import { useTheme, useUser } from "../../../context";
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
  const { registerUser } = useUser();
  const [formData, setFormData] = useState(DEFAULT_REGISTRATION_FORM_VALUES);
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
  const handleSubmit = async () => {
    console.log("submit");
    await registerUser(formData);
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
                <UserAvatar />
                <View style={style.formLayout}>
                  <Text style={style.title}>Реєстрація</Text>
                  <ScrollView contentContainerStyle={style.form}>
                    <View style={style.formFieldContainer}>
                      <InputText
                        value={formData.name}
                        placeholder="Ім'я"
                        onChangeText={(text) =>
                          handleInputText(text, FORM_FIELDS_NAMES.name)
                        }
                      />
                    </View>

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
                      <Button onPress={handleSubmit} title="Зареєструватися" />
                    </View>
                  </ScrollView>

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
      paddingTop: 92,
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
      // marginBottom: 45,
    },
    hasAccountTextLink: {
      color: theme.colors.lightBlue,
    },
  });
