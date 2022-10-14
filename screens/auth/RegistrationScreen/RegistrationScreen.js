import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import {
  DEFAULT_REGISTRATION_FORM_VALUES,
  FORM_FIELDS_NAMES,
} from "../../constants";
import { useStatusBarHeigtAsync } from "../../../hooks";
import { useTheme } from "../../../context";
import { ImageBackground, InputText, Button } from "../../../components";

export default function RegistrationScreen({ navigation: { navigate } }) {
  const { statusBarHeight } = useStatusBarHeigtAsync();
  const { theme } = useTheme();
  const style = styles(theme);

  const [formData, setFormData] = useState(DEFAULT_REGISTRATION_FORM_VALUES);

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
      <SafeAreaView style={style.container}>
        <View
          style={[
            style.screenLayout,
            statusBarHeight && { marginTop: statusBarHeight },
          ]}
        >
          <View style={style.avatar}></View>
          <View style={style.formContainer}>
            <Text style={style.title}>Реєстрація</Text>
            <View style={style.form}>
              <View style={style.formFieldContainer}>
                <InputText
                  value={formData.name}
                  placeholder="Name"
                  onChangeText={(text) =>
                    handleInputText(text, FORM_FIELDS_NAMES.name)
                  }
                />
              </View>
              <View style={style.formFieldContainer}>
                <InputText
                  value={formData.email}
                  placeholder="Email"
                  onChangeText={(text) =>
                    handleInputText(text, FORM_FIELDS_NAMES.email)
                  }
                />
              </View>
              <View>
                <InputText
                  value={formData.password}
                  placeholder="Password"
                  onChangeText={(text) =>
                    handleInputText(text, FORM_FIELDS_NAMES.password)
                  }
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
      </SafeAreaView>
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
    },

    formContainer: {
      height: "80%",
      paddingTop: 92,
      backgroundColor: "white",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    avatar: {
      width: 150,
      height: 150,
      alignSelf: "center",
      backgroundColor: theme.colors.lightGrey,
      borderRadius: 16,
      marginBottom: -75,
      zIndex: 2,
    },
    title: {
      alignSelf: "center",
      // fontFamily: "Roboto-Medium",
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
