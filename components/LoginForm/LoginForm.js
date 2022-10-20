import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import { loginSchema } from "../../schemas";
import { useUser, useTheme } from "../../context";
import {
  DEFAULT_LOGIN_FORM_VALUES,
  FORM_FIELDS_NAMES,
  AUTH_ERRORS,
} from "../../screens/constants";
import { InputText, Button, FormValidationError } from "../../components";

export default function LoginForm() {
  const { theme } = useTheme();
  const style = styles(theme);

  const { loginUser } = useUser();
  const [authError, setAuthError] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const handleLoginError = () => {
    switch (authError) {
      case AUTH_ERRORS.noUser:
        Alert.alert("Помилка входу", authError, [
          { text: "Реєструватися", onPress: () => navigate("Registration") },
          { text: "Відмінити", onPress: () => setAuthError(null) },
        ]);
        break;
      case AUTH_ERRORS.userError:
        Alert.alert("Помилка входу", authError, [
          { text: "Ok", onPress: () => setAuthError(null) },
        ]);
        break;
      default:
        Alert.alert("Помилка входу", authError, [
          { text: "Ok", onPress: () => setAuthError(null) },
        ]);
        return;
    }
  };

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await loginUser(values);
      setShowErrors(false);
    } catch (error) {
      setAuthError(error?.message || AUTH_ERRORS.serverError);
    }
  };

  useEffect(() => {
    if (authError) {
      handleLoginError();
    }
  }, [authError]);

  return (
    <Formik
      initialValues={DEFAULT_LOGIN_FORM_VALUES}
      onSubmit={onSubmit}
      validationSchema={loginSchema}
      validateOnChange={showErrors}
    >
      {({ handleChange, handleSubmit, submitCount, values, errors }) => {
        useEffect(() => {
          if (submitCount > 0) {
            setShowErrors(true);
          }
        }, [submitCount]);

        return (
          <ScrollView contentContainerStyle={style.form}>
            <View style={style.formFieldContainer}>
              <InputText
                value={values.email}
                placeholder="Електронна адреса"
                onChangeText={handleChange(FORM_FIELDS_NAMES.email)}
                keyboardType="email-address"
              />
              {errors.email && <FormValidationError error={errors.email} />}
            </View>
            <View style={style.formFieldContainer}>
              <InputText
                value={values.password}
                placeholder="Пароль"
                onChangeText={handleChange(FORM_FIELDS_NAMES.password)}
                secureTextEntry
              />
              {errors.password && (
                <FormValidationError error={errors.password} />
              )}
            </View>
            <View style={style.buttonContainer}>
              <Button onPress={handleSubmit} title="Увійти" />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    form: {
      marginHorizontal: 20,
    },
    formFieldContainer: {
      height: 70,
    },
    buttonContainer: {
      marginTop: 18,
    },
  });
