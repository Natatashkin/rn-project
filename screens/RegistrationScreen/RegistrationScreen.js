import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";

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
    <View style={styles.container}>
      <View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "blue",
    marginHorizontal: 40,
    marginBottom: 10,
  },
  button: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginHorizontal: 40,
    backgroundColor: "blue",
  },

  buttonText: {
    color: "white",
  },
});
