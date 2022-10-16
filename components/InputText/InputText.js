import React, { useContext, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { ThemeContext } from "../../context";

export default function InputText({
  autoCapitalize = "none",
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  keyboardType = "default",
}) {
  const { theme } = useContext(ThemeContext);
  const style = styles(theme);
  value;
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={theme.colors.grey}
      style={style.input}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
}
const styles = (theme) =>
  StyleSheet.create({
    input: {
      padding: 16,
      backgroundColor: theme.colors.lightGrey,
      borderColor: theme.colors.stroke,
      borderWidth: theme.borderWidth,
      borderRadius: theme.borderRadius,
      fontSize: 16,
    },
  });
