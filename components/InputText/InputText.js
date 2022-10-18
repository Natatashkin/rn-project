import React, { useState, useRef, useEffect } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context";
import { IconButton } from "../IconButton";

export default function InputText({
  autoCapitalize = "none",
  placeholder,
  onChangeText,
  value,
  secureTextEntry = false,
  keyboardType = "default",
}) {
  const { theme } = useTheme();
  const style = styles(theme);
  const currentInputRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
    setShowPassword(false);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (showPassword) {
      setFocus(true);
      currentInputRef.current.focus();
    }
  }, [showPassword]);

  return (
    <View style={[style.fieldContainer, focus && style.focused]}>
      <TextInput
        ref={currentInputRef}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.grey}
        style={[style.input, secureTextEntry && { paddingRight: 0 }]}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        secureTextEntry={!showPassword && secureTextEntry}
        keyboardType={keyboardType}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {secureTextEntry && (
        <View style={style.buttonContainer}>
          <IconButton onPress={toggleShowPassword}>
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={showPassword ? theme.colors.lightBlue : theme.colors.grey}
            />
          </IconButton>
        </View>
      )}
    </View>
  );
}
const styles = (theme) =>
  StyleSheet.create({
    fieldContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.colors.lightGrey,
      borderColor: theme.colors.stroke,
      borderWidth: theme.borderWidth,
      borderRadius: theme.borderRadius,
    },
    input: {
      flex: 1,
      padding: 16,
      fontSize: 16,
      color: theme.colors.black,
    },

    focused: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.lightBlue,
    },

    buttonContainer: {
      maxHeight: 50,
      width: 50,
    },
  });
