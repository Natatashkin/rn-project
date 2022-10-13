import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { ImageBackground } from "../../../components";

export default function RegistrationScreen() {
  const [formData, setFormData] = useState(null);

  const handleInputText = (text, key) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: text,
      };
    });
  };
  const handleSubmit = () => {};
  return (
    <ImageBackground>
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 24, justifyContent: "flex-end" }}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => handleInputText(text, "username")}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => handleInputText(text, "email")}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                autoCapitalize="none"
                onChangeText={(text) => handleInputText(text, "password")}
              />
              <Pressable style={styles.button} onPress={(e) => console.log(e)}>
                <Text style={styles.buttonText}>Sign Up!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  formContainer: {
    height: "80%",
    paddingTop: 92,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    alignSelf: "center",
    fontFamily: "Roboto-Medium",
    marginBottom: 32,
    fontSize: 30,
  },
  form: {
    marginHorizontal: 40,
  },
  input: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "blue",
    marginBottom: 10,
  },
  button: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: "blue",
  },

  buttonText: {
    color: "white",
  },
});
